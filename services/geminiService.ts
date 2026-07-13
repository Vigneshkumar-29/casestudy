import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Source } from "../types";

const getClient = (): GoogleGenAI => {
  // The API key must be defined in .env.local as VITE_GEMINI_API_KEY
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "Gemini API Key not found.\n\n" +
      "Please add VITE_GEMINI_API_KEY to your .env.local file:\n" +
      "  VITE_GEMINI_API_KEY=your-api-key-here\n\n" +
      "Get your key from: https://aistudio.google.com/app/apikey"
    );
  }

  return new GoogleGenAI({ apiKey });
};


export const generateOutline = async (topic: string, type: string): Promise<string> => {
  const ai = getClient();
  const prompt = `Create a structured academic outline for a ${type} on the topic: "${topic}". 
  Return ONLY a JSON array of section titles. Example: ["Introduction", "Methodology", "Analysis"]. 
  Keep it professional and academic. Do not include markdown formatting.`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });
    let text = response.text || "[]";
    // Cleanup potential markdown if the model ignores mimeType (rare but possible)
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();
    return text;
  } catch (error) {
    console.error("GenAI Error:", error);
    throw error;
  }
};

export const expandSection = async (sectionTitle: string, context: string): Promise<string> => {
  const ai = getClient();
  const prompt = `Write a comprehensive, academic draft for the section titled "${sectionTitle}". 
  Context/Topic of the paper: "${context}".
  
  Instructions:
  1. Ensure the content flows logically from the main topic.
  2. Tone: Professional, objective, cited (if applicable), and insightful.
  3. Length: Approximately 250-350 words.
  4. Format: Plain text. Use clear paragraph breaks. Do not use markdown headers (#).
  5. If appropriate, mention key concepts or theories related to the title.`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    return response.text || "";
  } catch (error) {
    console.error("GenAI Error:", error);
    return "Error generating content. Please check your network or API key.";
  }
};

export const chatWithAi = async (message: string, context: string): Promise<{ text: string; sources: Source[] }> => {
  const ai = getClient();

  const prompt = `You are a helpful, intelligent academic research assistant. 
  The student is writing a paper about: "${context}".
  
  User Query: "${message}"
  
  Provide a concise, helpful answer to guide them. 
  If the user asks for facts, news, or specific data, use Google Search to provide up-to-date information and citations.`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      }
    });

    const text = response.text || "";
    const sources: Source[] = [];

    // Extract grounding metadata if available
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (groundingChunks) {
      groundingChunks.forEach((chunk: any) => {
        if (chunk.web) {
          sources.push({
            title: chunk.web.title || "Source",
            uri: chunk.web.uri
          });
        }
      });
    }

    return { text, sources };
  } catch (error) {
    console.error("GenAI Chat Error:", error);
    return { text: "I am currently unable to assist. Please try again.", sources: [] };
  }
};

export const generateSectionImage = async (sectionContext: string): Promise<string> => {
  const ai = getClient();

  // FIXED: Standard LLMs cannot generate pixel images directly.
  // Instead, we generate SVG code which the model CAN produce as text.
  const prompt = `Create an SVG illustration relevant to this academic text. 
  
  Text: "${sectionContext.substring(0, 800)}..."
  
  Requirements:
  1. Return ONLY valid SVG code, starting with <svg and ending with </svg>
  2. Use a professional, minimalist style suitable for academic documents
  3. Use geometric shapes, clean lines, and a limited color palette (blues, grays, white)
  4. Include meaningful visual elements that represent the concepts in the text
  5. Set viewBox="0 0 400 300" for consistent sizing
  6. Do NOT include any explanation or markdown - ONLY the SVG code`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    let svgCode = response.text || "";

    // Clean up the response - extract SVG if wrapped in markdown
    svgCode = svgCode.replace(/```svg/gi, "").replace(/```xml/gi, "").replace(/```/g, "").trim();

    // Validate that we got SVG code
    if (svgCode.includes("<svg") && svgCode.includes("</svg>")) {
      // Extract just the SVG element
      const svgMatch = svgCode.match(/<svg[\s\S]*<\/svg>/i);
      if (svgMatch) {
        // Convert SVG to base64 data URL for consistent handling with image display
        const svgBase64 = btoa(unescape(encodeURIComponent(svgMatch[0])));
        return svgBase64;
      }
    }

    console.warn("Generated content was not valid SVG");
    return "";
  } catch (error) {
    console.error("GenAI SVG Generation Error:", error);
    return "";
  }
};

export const generateSectionFlowchart = async (sectionContext: string): Promise<string> => {
  const ai = getClient();
  const prompt = `Based on the following text, create a Mermaid.js flowchart or diagram code that visualizes the process, hierarchy, or relationship described.
  
  Text: "${sectionContext.substring(0, 1500)}..."
  
  Requirements:
  1. Return ONLY the raw mermaid code.
  2. Do not include markdown code blocks (like \`\`\`mermaid).
  3. Start with 'graph TD' or 'sequenceDiagram' or 'mindmap' as appropriate.
  4. Keep labels concise.`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    let text = response.text || "";
    // Clean up if the model includes markdown blocks despite instructions
    text = text.replace(/```mermaid/g, "").replace(/```/g, "").trim();
    return text;
  } catch (error) {
    console.error("GenAI Flowchart Error:", error);
    return "";
  }
};