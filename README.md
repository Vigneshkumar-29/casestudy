# Thesis - The AI-Native Academic Workspace

<div align="center">
  <img src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" alt="Thesis Banner" width="100%" />
  
  <br />
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![React](https://img.shields.io/badge/React-19.2-blue)](https://react.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)](https://www.typescriptlang.org/)
  [![Vite](https://img.shields.io/badge/Vite-6.2-purple)](https://vitejs.dev/)
  [![Gemini 2.5](https://img.shields.io/badge/AI-Gemini%202.5%20Flash-orange)](https://deepmind.google/technologies/gemini/)
  [![Supabase](https://img.shields.io/badge/Backend-Supabase-green)](https://supabase.com/)
  
  <p align="center">
    <b>Write at the speed of thought.</b><br />
    The comprehensive research environment that understands the nuance of your work.
  </p>
</div>

---

## 🚀 Overview

**Thesis** is a next-generation academic writing platform designed to bridge the gap between raw research and polished publication. Built for students, researchers, and academics, it leverages **Google's Gemini 2.5 Flash** model to act as an intellectual partner—not just a text generator.

Unlike standard text editors, Thesis understands the context of your entire project. It can draft sections based on your research questions, generate relevant visual data (charts, diagrams), format citations in real-time, and even challenge your arguments using Socratic reasoning.

## ✨ Key Features

### 🧠 Intelligent Drafting Engine
*   **Context-Aware Generation**: Drafts content that flows logically from your thesis statement and previous sections.
*   **Socratic Mode**: The AI asks clarifying questions to deepen your analysis rather than just completing sentences.
*   **Structured Outlining**: Automatically generates comprehensive outlines for Case Studies, Dissertations, Reports, and more.

### 🎨 Visual Data Synthesis
*   **Text-to-Diagram**: Instantly converts complex text descriptions into clear Mermaid.js flowcharts and mind maps.
*   **Editorial Illustrations**: Generates professional, minimalist abstract imagery to accompany your sections using Gemini's multimodal capabilities.

### 📚 Research Management
*   **Live Citations**: Automatically formats references in APA, MLA, Chicago, and Harvard styles.
*   **Reference Upload**: Drag-and-drop support for PDF, DOCX, and TXT reference materials to ground the AI's output in your specific sources.
*   **Knowledge Graph**: (Beta) Visualizes the relationships between your arguments and sources.

### 🛠️ Professional Tools
*   **Distraction-Free Editor**: A clean, serif-focused interface designed for deep work.
*   **Export Options**: One-click export to formatted Word (.doc), Markdown (.md), HTML, or plain text.
*   **Cloud Sync**: Real-time saving and project management via Supabase.

## 🏗️ Technology Stack

This project is built with a modern, performance-first stack:

*   **Frontend**: React 19, TypeScript, Vite
*   **Styling**: Tailwind CSS, Framer Motion (for advanced animations)
*   **AI Engine**: Google Gemini 2.5 Flash (via `@google/genai` SDK)
*   **Backend & Auth**: Supabase (PostgreSQL, Auth, Storage)
*   **Icons**: Lucide React

## 📂 Project Structure

```bash
thesis-academic-editor/
├── src/
│   ├── components/       # Reusable UI components (Navbar, Footer, UI Kit)
│   ├── context/          # Global state (AuthContext)
│   ├── pages/            # Main application views
│   │   ├── Landing.tsx   # Marketing homepage
│   │   ├── Dashboard.tsx # Project management & creation
│   │   ├── Editor.tsx    # Core writing interface
│   │   ├── Engine.tsx    # Technical showcase of the AI model
│   │   └── ...
│   ├── services/         # External API integrations
│   │   ├── geminiService.ts # AI logic (Drafting, Chat, Vision)
│   │   └── supabase.ts      # Database client
│   └── types.ts          # TypeScript definitions
├── public/               # Static assets
└── ...
```

## ⚡ Getting Started

Follow these steps to set up the project locally.

### Prerequisites
*   Node.js (v18 or higher)
*   npm or yarn
*   A Google Cloud Project with the **Gemini API** enabled.
*   A **Supabase** project for authentication and database.

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/thesis-editor.git
    cd thesis-editor
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env.local` file in the root directory. You can copy from the `.env.example` template:
    ```bash
    cp .env.example .env.local
    ```
    
    Then add your Gemini API key:
    ```env
    # Google Gemini API (Required for AI features)
    VITE_GEMINI_API_KEY=your_gemini_api_key_here

    # Supabase Configuration (Optional - dev defaults are included)
    # Only set these if you're using your own Supabase project
    # VITE_SUPABASE_URL=your_supabase_project_url
    # VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```
    
    > **Note**: The app includes development defaults for Supabase, so you only need to add your Gemini API key to get started quickly.

4.  **Run the Development Server**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to view the app.

## 📖 Usage Guide

1.  **Sign Up/Login**: Create an account to save your work to the cloud.
2.  **Create a Project**: From the Dashboard, click "New Project". Select your document type (e.g., Thesis, Case Study) and upload any reference materials.
3.  **Generate Outline**: The AI will propose a structure. Approve or edit it to generate the document skeleton.
4.  **Draft & Refine**: Click the "Sparkles" icon in any section to have the AI draft content. Use the sidebar to reorder sections.
5.  **Visualize**: Use the image or flowchart buttons in the editor toolbar to generate visuals for your text.
6.  **Export**: When finished, use the "Export" menu to download your work in your preferred format.

## 🤝 Contributing

We welcome contributions from the academic and open-source community!

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Contact & Support

For support, feature requests, or academic partnerships, please contact:

*   **Email**: support@thesis.ai
*   **Twitter**: [@ThesisAI](https://twitter.com/thesisai)
*   **Project Link**: [https://github.com/yourusername/thesis-editor](https://github.com/yourusername/thesis-editor)

---

<p align="center">
  Built with ❤️ for the pursuit of knowledge.
</p>
