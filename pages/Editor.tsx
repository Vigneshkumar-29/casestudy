import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  ArrowLeft, Sidebar, Sparkles, Send, Download,
  ChevronRight, LayoutTemplate, Loader2, Image as ImageIcon, Workflow,
  FileText, Copy, FileCode, Check, ExternalLink, Settings2, AlertCircle, X, Info, Globe,
  Trash2, RefreshCw, GripVertical, Plus
} from 'lucide-react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { Button } from '../components/UI';
import { Section, ChatMessage, Visual, Source } from '../types';
import { generateOutline, expandSection, chatWithAi, generateSectionImage, generateSectionFlowchart } from '../services/geminiService';
import { supabase } from '../services/supabase';
import { useAuth } from '../context/AuthContext';

// Extend window for html2pdf
declare global {
  interface Window {
    html2pdf: any;
  }
}

// --- Sub-component for auto-resizing text area ---
const SectionEditor: React.FC<{
  section: Section;
  isActive: boolean;
  isGenerating: boolean;
  includeVisuals: boolean;
  includeHeaders: boolean;
  forcePreviewMode: boolean;
  onActivate: () => void;
  onChangeTitle: (newTitle: string) => void;
  onChangeContent: (newContent: string) => void;
  onExpand: () => void;
  onAddVisual: (type: 'image' | 'flowchart') => void;
  onDeleteVisual: (visualId: string) => void;
  onRegenerateVisual: (visual: Visual) => void;
}> = ({
  section, isActive, isGenerating,
  includeVisuals, includeHeaders, forcePreviewMode,
  onActivate, onChangeTitle, onChangeContent, onExpand, onAddVisual,
  onDeleteVisual, onRegenerateVisual
}) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [isGenVisual, setIsGenVisual] = useState<null | 'image' | 'flowchart'>(null);
    const [activeVisualId, setActiveVisualId] = useState<string | null>(null);

    const adjustHeight = () => {
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    };

    // Auto-resize textarea when content changes to prevent overflow
    useLayoutEffect(() => {
      adjustHeight();
    }, [section.content, isActive]);

    // Adjust height on window resize (e.g. going from desktop to mobile)
    useEffect(() => {
      window.addEventListener('resize', adjustHeight);
      return () => window.removeEventListener('resize', adjustHeight);
    }, []);

    const handleVisualGen = async (type: 'image' | 'flowchart') => {
      setIsGenVisual(type);
      await onAddVisual(type);
      setIsGenVisual(null);
    };

    // Determine which view to show
    const showPreview = forcePreviewMode;
    const showEditor = !forcePreviewMode;

    return (
      <div
        id={section.id}
        className={`
        transition-all duration-500 opacity-100 print:opacity-100 section-container
        ${forcePreviewMode ? 'mb-8' : 'mb-16'}
        print:mb-8
      `}
        onClick={onActivate}
      >
        {/* --- PREVIEW / PRINT VIEW (Clean Document) --- */}
        <div className={`${showPreview ? 'block' : 'hidden print:block'}`}>
          {includeHeaders && (
            <h2 className="text-2xl font-bold font-serif mb-4 text-black print-header" style={{ fontFamily: '"Times New Roman", serif' }}>
              {section.title}
            </h2>
          )}
          <div
            className="whitespace-pre-wrap text-lg leading-relaxed font-serif text-black text-justify pdf-text-content"
            style={{ fontFamily: '"Times New Roman", serif', fontSize: '12pt', lineHeight: '1.5' }}
          >
            {section.content || "No content."}
          </div>
          {includeVisuals && section.visuals?.map((visual) => (
            <div key={visual.id} className="my-6 break-inside-avoid print-visual flex flex-col items-center">
              {visual.type === 'image' && (
                <img src={`data:image/png;base64,${visual.data}`} alt="Visual" className="w-auto max-h-[400px] max-w-full" />
              )}
              {/* Flowcharts */}
              {visual.type === 'flowchart' && (
                <div className="border border-stone-200 p-4 rounded text-xs font-mono">
                  {visual.data}
                </div>
              )}
              <div className="text-center text-xs text-gray-500 mt-2 font-serif italic">Figure: Concept Illustration</div>
            </div>
          ))}
        </div>

        {/* --- EDITOR VIEW (Interactive) --- */}
        <div className={`${showEditor ? 'block print:hidden' : 'hidden'}`}>
          <div className="group relative flex items-center justify-between mb-4">
            <input
              className="font-serif text-3xl font-bold text-ink-900 w-full outline-none placeholder-stone-300 bg-transparent"
              value={section.title}
              onChange={(e) => onChangeTitle(e.target.value)}
              placeholder="Section Title"
            />

            {/* Floating Actions Toolbar - Always visible */}
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => { e.stopPropagation(); handleVisualGen('image'); }}
                disabled={!!isGenVisual}
                className="p-2 rounded-xl border border-stone-200 bg-white text-stone-500 hover:text-academic-blue hover:border-academic-blue transition-all shadow-sm"
                title="Generate Image"
              >
                {isGenVisual === 'image' ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImageIcon className="w-4 h-4" />}
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleVisualGen('flowchart'); }}
                disabled={!!isGenVisual}
                className="p-2 rounded-xl border border-stone-200 bg-white text-stone-500 hover:text-academic-blue hover:border-academic-blue transition-all shadow-sm"
                title="Generate Flowchart"
              >
                {isGenVisual === 'flowchart' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Workflow className="w-4 h-4" />}
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onExpand(); }}
                className="p-2 rounded-xl border border-stone-200 bg-white text-stone-500 hover:text-academic-accent hover:border-academic-accent transition-all shadow-sm"
                title="Draft with AI"
              >
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
          </div>

          <textarea
            ref={textareaRef}
            value={section.content}
            onChange={(e) => onChangeContent(e.target.value)}
            placeholder={isGenerating ? "" : "Start typing or use AI to draft..."}
            className={`w-full bg-transparent resize-none outline-none font-serif text-lg leading-relaxed text-ink-900 overflow-hidden ${isGenerating ? 'placeholder-transparent' : 'placeholder-stone-300'}`}
            rows={1}
          />

          {/* Generated Visuals Display with Interaction */}
          <div className="space-y-6 mt-6">
            {section.visuals?.map((visual) => (
              <div
                key={visual.id}
                className="relative rounded-xl overflow-hidden border border-stone-100 shadow-sm cursor-pointer group"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveVisualId(activeVisualId === visual.id ? null : visual.id);
                }}
              >
                {visual.type === 'image' ? (
                  <img src={`data:image/svg+xml;base64,${visual.data}`} alt="Generated visual" className="w-full h-auto bg-stone-50" />
                ) : (
                  <div className="bg-stone-50 p-4 font-mono text-xs overflow-x-auto">
                    <pre>{visual.data}</pre>
                    <p className="text-stone-400 mt-2 text-[10px]">(Mermaid diagram code)</p>
                  </div>
                )}

                <div className="bg-stone-50 px-4 py-2 text-xs text-stone-500 font-medium uppercase tracking-wider text-center border-t border-stone-100">
                  FIGURE: CONCEPT ILLUSTRATION
                </div>

                {/* Overlay for Actions */}
                <AnimatePresence>
                  {activeVisualId === visual.id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-ink-900/60 backdrop-blur-[2px] flex items-center justify-center gap-3 z-10"
                    >
                      <Button
                        variant="secondary"
                        className="!py-2 !px-3 !text-xs"
                        onClick={(e) => { e.stopPropagation(); onRegenerateVisual(visual); }}
                        icon={RefreshCw}
                      >
                        Regenerate
                      </Button>
                      <Button
                        className="!bg-red-500 !text-white !py-2 !px-3 !text-xs hover:!bg-red-600"
                        onClick={(e) => { e.stopPropagation(); onDeleteVisual(visual.id); }}
                        icon={Trash2}
                      >
                        Delete
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

const Editor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();

  // State
  const [dbProjectId, setDbProjectId] = useState<string | null>(id === 'new' ? null : id || null);
  const [project, setProject] = useState<{ title: string; type: string } | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState<string>("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Chat State
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Export State
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);
  const [includeVisuals, setIncludeVisuals] = useState(true);
  const [includeHeaders, setIncludeHeaders] = useState(true);

  // Confirmation Modal
  const [showAutoDraftModal, setShowAutoDraftModal] = useState(false);

  const exportMenuRef = useRef<HTMLDivElement>(null);
  const generatingLock = useRef(false);
  const isCreatingRef = useRef(false);

  // --- Initialization ---

  // Handle click outside export menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (exportMenuRef.current && !exportMenuRef.current.contains(event.target as Node)) {
        setIsExportMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Autosave
  useEffect(() => {
    if (!dbProjectId || isGenerating || sections.length === 0) return;

    const timeout = setTimeout(() => {
      saveProject();
    }, 2000);

    return () => clearTimeout(timeout);
  }, [sections, project?.title, dbProjectId]);

  // Load Project or Initialize New
  useEffect(() => {
    if (id === 'new') {
      const state = location.state as { type: string; title: string; description: string };
      if (state && !isCreatingRef.current) {
        setProject({ title: state.title, type: state.type });
        handleGenerateFullProject(state.type, state.title, state.description);
      }
    } else if (id && !isCreatingRef.current) {
      setDbProjectId(id);
      loadProject(id);
    }
  }, [id]);

  const loadProject = async (projectId: string) => {
    if (isCreatingRef.current) return;
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .single();

      if (error) throw error;
      if (data) {
        setProject({ title: data.title, type: data.type });
        setSections(data.content || []);
        if (data.content && data.content.length > 0) {
          setActiveSectionId(data.content[0].id);
        }
      }
    } catch (err) {
      console.error("Failed to load project", err);
      navigate('/dashboard');
    }
  };

  const saveProject = async () => {
    if (!currentUser || !dbProjectId) return;

    try {
      await supabase
        .from('projects')
        .update({
          content: sections,
          last_edited: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'Draft'
        })
        .eq('id', dbProjectId);
    } catch (err) {
      console.error("Auto-save failed", err);
    }
  };

  // --- Logic ---

  const handleGenerateFullProject = async (type: string, title: string, context: string) => {
    if (generatingLock.current) return;
    generatingLock.current = true;
    isCreatingRef.current = true;
    setIsGenerating(true);
    setGenerationProgress("Designing document structure...");

    try {
      // 1. Generate Outline
      const outlineJSON = await generateOutline(title, type);
      const sectionTitles: string[] = JSON.parse(outlineJSON);

      const newSections: Section[] = sectionTitles.map(t => ({
        id: crypto.randomUUID(),
        title: t,
        content: '',
        isAiGenerated: true
      }));

      setSections(newSections);
      setActiveSectionId(newSections[0].id);

      // 2. Create Project in DB immediately
      if (currentUser) {
        const { data, error } = await supabase.from('projects').insert({
          title: title,
          type: type,
          status: 'Draft',
          content: newSections,
          user_id: currentUser.id,
          last_edited: 'Just now'
        }).select().single();

        if (!error && data) {
          setDbProjectId(data.id);
          // Update URL without reloading
          navigate(`/editor/${data.id}`, { replace: true });
        }
      }

      setIsGenerating(false);
      setGenerationProgress("");
      generatingLock.current = false;
      isCreatingRef.current = false; // Allow loading now

      // 3. Ask user for confirmation to continue
      setShowAutoDraftModal(true);

    } catch (error) {
      console.error("Generation failed", error);
      setIsGenerating(false);
      generatingLock.current = false;
      isCreatingRef.current = false;
    }
  };

  const handleConfirmAutoDraft = async () => {
    setShowAutoDraftModal(false);
    setIsGenerating(true);

    // Draft Content Sequentially
    const currentSections = [...sections];

    for (let i = 0; i < currentSections.length; i++) {
      const section = currentSections[i];
      setGenerationProgress(`Drafting: ${section.title}`);
      setActiveSectionId(section.id);

      // Scroll to section
      const el = document.getElementById(section.id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });

      const content = await expandSection(section.title, project?.title || "");

      // Update state section by section
      currentSections[i] = { ...section, content };
      setSections([...currentSections]); // Trigger re-render

      // Small delay for UX
      await new Promise(r => setTimeout(r, 800));
    }

    setIsGenerating(false);
    setGenerationProgress("");
    saveProject(); // Final save
  };

  const handleExpandSection = async (sectionId: string) => {
    const section = sections.find(s => s.id === sectionId);
    if (!section || !project) return;

    setIsGenerating(true);
    const newContent = await expandSection(section.title, project.title);

    setSections(prev => prev.map(s =>
      s.id === sectionId ? { ...s, content: s.content + "\n\n" + newContent } : s
    ));
    setIsGenerating(false);
  };

  const handleAddVisual = async (sectionId: string, type: 'image' | 'flowchart') => {
    const section = sections.find(s => s.id === sectionId);
    if (!section) return;

    let visualData = "";
    if (type === 'image') {
      visualData = await generateSectionImage(section.content || section.title);
    } else {
      visualData = await generateSectionFlowchart(section.content || section.title);
    }

    if (visualData) {
      const newVisual: Visual = {
        id: crypto.randomUUID(),
        type,
        data: visualData
      };

      setSections(prev => prev.map(s =>
        s.id === sectionId ? { ...s, visuals: [...(s.visuals || []), newVisual] } : s
      ));
    }
  };

  const handleRegenerateVisual = async (visual: Visual) => {
    // Find parent section (inefficient but works for now)
    const section = sections.find(s => s.visuals?.some(v => v.id === visual.id));
    if (!section) return;

    let newData = "";
    if (visual.type === 'image') {
      newData = await generateSectionImage(section.content || section.title);
    } else {
      newData = await generateSectionFlowchart(section.content || section.title);
    }

    if (newData) {
      setSections(prev => prev.map(s => {
        if (s.id !== section.id) return s;
        return {
          ...s,
          visuals: s.visuals?.map(v => v.id === visual.id ? { ...v, data: newData } : v)
        };
      }));
    }
  };

  const handleDeleteVisual = (visualId: string) => {
    setSections(prev => prev.map(s => ({
      ...s,
      visuals: s.visuals?.filter(v => v.id !== visualId)
    })));
  };

  // --- Export Handlers ---

  const handleExport = async (format: 'markdown' | 'html' | 'text' | 'doc') => {
    setExportError(null);
    try {
      let content = '';
      const title = project?.title || 'Document';

      if (format === 'doc') {
        // Generate Word-compatible HTML
        const styles = `
                <style>
                    body { font-family: 'Times New Roman', serif; line-height: 1.5; color: #000; }
                    h1 { font-size: 24pt; margin-bottom: 24px; }
                    h2 { font-size: 18pt; margin-top: 24px; margin-bottom: 12px; }
                    p { margin-bottom: 12px; text-align: justify; }
                    img { max-width: 100%; height: auto; }
                    .visual-container { margin: 24px 0; text-align: center; }
                    .caption { font-size: 10pt; font-style: italic; color: #666; margin-top: 8px; }
                </style>
             `;

        let bodyContent = `<h1>${title}</h1>`;
        sections.forEach(s => {
          if (includeHeaders) bodyContent += `<h2>${s.title}</h2>`;
          bodyContent += `<p>${s.content.replace(/\n/g, '<br/>')}</p>`;

          if (includeVisuals && s.visuals) {
            s.visuals.forEach(v => {
              if (v.type === 'image') {
                bodyContent += `
                                <div class="visual-container">
                                    <img src="data:image/svg+xml;base64,${v.data}" />
                                    <div class="caption">Figure: Concept Illustration</div>
                                </div>
                             `;
              }
            });
          }
        });

        const fullHtml = `
                <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
                <head><meta charset='utf-8'><title>${title}</title>${styles}</head><body>${bodyContent}</body></html>
             `;

        const blob = new Blob(['\ufeff', fullHtml], { type: 'application/msword' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${title.replace(/\s+/g, '_')}.doc`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        return;
      }

      // Handle other text formats
      if (format === 'markdown') {
        content = `# ${title}\n\n`;
        sections.forEach(s => {
          if (includeHeaders) content += `## ${s.title}\n\n`;
          content += `${s.content}\n\n`;
        });
      } else if (format === 'html') {
        content = `<h1>${title}</h1>\n`;
        sections.forEach(s => {
          if (includeHeaders) content += `<h2>${s.title}</h2>\n`;
          content += `<p>${s.content.replace(/\n/g, '<br/>')}</p>\n`;
        });
      } else {
        content = `${title}\n\n`;
        sections.forEach(s => {
          if (includeHeaders) content += `${s.title}\n\n`;
          content += `${s.content}\n\n`;
        });
      }

      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${title.replace(/\s+/g, '_')}.${format === 'markdown' ? 'md' : format === 'html' ? 'html' : 'txt'}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (err: any) {
      console.error("Export failed", err);
      setExportError("Failed to export document. Please try again.");
    }
  };

  // --- Chat ---

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: chatInput, timestamp: new Date() };
    setChatHistory(prev => [...prev, userMsg]);
    setChatInput("");
    setIsChatLoading(true);

    const context = `Document Title: ${project?.title}. \nCurrent Content Summary: ${sections.map(s => s.title).join(', ')}.`;
    const response = await chatWithAi(userMsg.text, context);

    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: response.text,
      sources: response.sources,
      timestamp: new Date()
    };

    setChatHistory(prev => [...prev, aiMsg]);
    setIsChatLoading(false);
  };


  return (
    <div className="flex h-screen bg-stone-50 overflow-hidden font-sans" style={{ fontFamily: '"Satoshi", -apple-system, BlinkMacSystemFont, sans-serif' }}>

      {/* Sidebar - Outline */}
      <motion.div
        animate={{ width: sidebarOpen ? 300 : 0, opacity: sidebarOpen ? 1 : 0 }}
        className="bg-white border-r border-stone-200/60 flex-shrink-0 flex flex-col overflow-hidden relative print:hidden"
      >
        <div className="p-4 border-b border-stone-100 flex items-center justify-between min-w-[300px]">
          <div className="flex items-center gap-2 text-stone-500 font-bold text-xs tracking-wider uppercase">
            <Sidebar size={14} />
            <span>Outline</span>
          </div>
          <Button variant="ghost" className="!p-1.5" onClick={() => setSidebarOpen(false)}>
            <LayoutTemplate size={14} />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 min-w-[300px] flex flex-col">
          <Reorder.Group axis="y" values={sections} onReorder={setSections} className="space-y-1">
            {sections.map((section) => (
              <Reorder.Item
                key={section.id}
                value={section}
                className="relative"
              >
                <div
                  onClick={() => {
                    setActiveSectionId(section.id);
                    document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`
                    group flex items-center gap-2 p-3 rounded-xl text-sm cursor-pointer transition-all duration-300 border-l-2 select-none
                    ${activeSectionId === section.id
                      ? 'bg-stone-100/80 border-academic-accent text-ink-900 font-semibold'
                      : 'border-transparent text-stone-500 hover:bg-stone-50 hover:text-ink-900'}
                  `}
                >
                  <div className="cursor-grab active:cursor-grabbing p-1 -ml-1 text-stone-300 opacity-0 group-hover:opacity-100 hover:text-stone-500 transition-opacity" onClick={(e) => e.stopPropagation()}>
                    <GripVertical size={14} />
                  </div>
                  <span className="truncate flex-1">{section.title}</span>
                  {activeSectionId === section.id && <ChevronRight size={12} />}
                </div>
              </Reorder.Item>
            ))}
          </Reorder.Group>

          <div className="pt-4 mt-2">
            <button
              onClick={() => {
                const newSection = { id: crypto.randomUUID(), title: 'New Section', content: '' };
                setSections([...sections, newSection]);
                // Auto scroll to new section
                setTimeout(() => {
                  setActiveSectionId(newSection.id);
                  document.getElementById(newSection.id)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 100);
              }}
              className="w-full flex items-center gap-3 p-3 rounded-xl border-2 border-dashed border-stone-200 hover:border-academic-accent/40 hover:bg-academic-accent/[0.04] text-stone-400 hover:text-academic-accent transition-all duration-300 group"
            >
              <div className="w-5 h-5 rounded border border-current flex items-center justify-center">
                <Plus size={12} />
              </div>
              <span className="font-medium text-sm">Add Section</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Header */}
        <header className="h-16 bg-white/80 backdrop-blur-xl border-b border-stone-200/60 flex items-center justify-between px-6 flex-shrink-0 print:hidden z-20">
          <div className="flex items-center gap-4 overflow-hidden">
            {!sidebarOpen && (
              <Button variant="ghost" onClick={() => setSidebarOpen(true)} className="!p-2 mr-2">
                <Sidebar size={18} />
              </Button>
            )}
            <div
              className="w-8 h-8 bg-ink-900 rounded-xl flex items-center justify-center text-white font-serif italic font-bold cursor-pointer hover:scale-105 hover:shadow-glow transition-all duration-300"
              onClick={() => navigate('/dashboard')}
            >
              T
            </div>
            <div className="h-6 w-px bg-stone-200 mx-2" />
            <div className="flex flex-col overflow-hidden">
              <h1 className="font-serif text-lg text-ink-900 truncate">{project?.title || 'Untitled Project'}</h1>
              <span className="text-[9px] text-stone-400 uppercase tracking-[0.2em] font-bold">{project?.type || 'Draft'}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isGenerating && (
              <div className="flex items-center gap-2 text-xs text-academic-accent bg-academic-accent/10 px-3 py-1.5 rounded-full animate-pulse font-semibold">
                <Sparkles size={12} />
                <span>{generationProgress || "AI Working..."}</span>
              </div>
            )}

            {!isGenerating && (
              <div className="flex items-center gap-2 text-xs text-green-600 px-3 py-1.5">
                <Check size={12} />
                <span className="hidden sm:inline">SAVED {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            )}

            <div className="relative" ref={exportMenuRef}>
              <Button
                className="!py-2 !px-4 !text-xs"
                onClick={() => setIsExportMenuOpen(!isExportMenuOpen)}
              >
                Export
              </Button>

              <AnimatePresence>
                {isExportMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-xl border border-stone-100 p-2 z-50 origin-top-right"
                  >
                    <div className="px-3 py-2 text-[10px] font-bold text-stone-400 uppercase tracking-widest border-b border-stone-50 mb-2">
                      Options
                    </div>
                    <div className="px-3 py-2 flex items-center justify-between hover:bg-stone-50 rounded-lg">
                      <span className="text-sm text-stone-600">Include Visuals</span>
                      <div
                        className={`w-9 h-5 rounded-full p-1 cursor-pointer transition-colors ${includeVisuals ? 'bg-academic-blue' : 'bg-stone-200'}`}
                        onClick={() => setIncludeVisuals(!includeVisuals)}
                      >
                        <div className={`w-3 h-3 bg-white rounded-full shadow-sm transition-transform ${includeVisuals ? 'translate-x-4' : 'translate-x-0'}`} />
                      </div>
                    </div>
                    <div className="px-3 py-2 flex items-center justify-between hover:bg-stone-50 rounded-lg mb-2">
                      <span className="text-sm text-stone-600">Section Headers</span>
                      <div
                        className={`w-9 h-5 rounded-full p-1 cursor-pointer transition-colors ${includeHeaders ? 'bg-academic-blue' : 'bg-stone-200'}`}
                        onClick={() => setIncludeHeaders(!includeHeaders)}
                      >
                        <div className={`w-3 h-3 bg-white rounded-full shadow-sm transition-transform ${includeHeaders ? 'translate-x-4' : 'translate-x-0'}`} />
                      </div>
                    </div>

                    <div className="px-3 py-2 text-[10px] font-bold text-stone-400 uppercase tracking-widest border-b border-stone-50 mb-2">
                      Document Formats
                    </div>
                    <button onClick={() => handleExport('doc')} className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-stone-50 rounded-lg text-left transition-colors group">
                      <div className="w-8 h-8 rounded bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 group-hover:bg-blue-100">
                        <FileText size={16} />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-ink-900">Word / Google Docs (.doc)</div>
                      </div>
                    </button>

                    <div className="h-px bg-stone-100 my-2" />

                    <div className="px-3 py-2 text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">
                      Data & Code
                    </div>
                    <button onClick={() => handleExport('markdown')} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-stone-600 hover:text-ink-900 hover:bg-stone-50 rounded-md">
                      <FileCode size={14} /> Markdown (.md)
                    </button>
                    <button onClick={() => handleExport('html')} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-stone-600 hover:text-ink-900 hover:bg-stone-50 rounded-md">
                      <Globe size={14} /> HTML File
                    </button>
                    <button onClick={() => handleExport('text')} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-stone-600 hover:text-ink-900 hover:bg-stone-50 rounded-md">
                      <Copy size={14} /> Copy Plain Text
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              className={`p-2.5 rounded-xl transition-all duration-300 ${chatOpen ? 'bg-ink-900 text-white shadow-lg shadow-ink-900/20' : 'hover:bg-stone-100 text-stone-500'}`}
              onClick={() => setChatOpen(!chatOpen)}
            >
              <Sparkles size={20} />
            </button>
          </div>
        </header>

        {/* Error Banner */}
        <AnimatePresence>
          {exportError && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-red-50 border-b border-red-100 px-6 py-2 flex items-center justify-between text-sm text-red-800"
            >
              <div className="flex items-center gap-2">
                <AlertCircle size={16} />
                {exportError}
              </div>
              <button onClick={() => setExportError(null)} className="hover:text-red-900"><X size={14} /></button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Editor Area */}
        <div className="flex-1 overflow-y-auto bg-white p-4 md:p-8 flex justify-center relative">

          {/* A4 Paper - Modified to be seamless */}
          <div
            id="printable-content"
            className={`
                w-full max-w-[850px] min-h-screen
                p-0 md:p-12 
                ${isGenerating ? 'ring-2 ring-blue-500 ring-dashed ring-offset-4 ring-offset-white' : ''}
                print:p-0 print:w-[794px]
             `}
          >
            {sections.map((section) => (
              <SectionEditor
                key={section.id}
                section={section}
                isActive={activeSectionId === section.id}
                isGenerating={isGenerating}
                includeVisuals={includeVisuals}
                includeHeaders={includeHeaders}
                forcePreviewMode={false}
                onActivate={() => setActiveSectionId(section.id)}
                onChangeTitle={(t) => {
                  setSections(sections.map(s => s.id === section.id ? { ...s, title: t } : s));
                }}
                onChangeContent={(c) => {
                  setSections(sections.map(s => s.id === section.id ? { ...s, content: c } : s));
                }}
                onExpand={() => handleExpandSection(section.id)}
                onAddVisual={(type) => handleAddVisual(section.id, type)}
                onDeleteVisual={handleDeleteVisual}
                onRegenerateVisual={handleRegenerateVisual}
              />
            ))}

            {/* Add Section Button at bottom of doc */}
            <div className="mt-8 flex justify-center opacity-0 hover:opacity-100 transition-opacity print:hidden">
              <button
                onClick={() => {
                  const newSection = { id: crypto.randomUUID(), title: 'New Section', content: '' };
                  setSections([...sections, newSection]);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-stone-200 text-stone-600 hover:bg-stone-300 transition-colors text-sm font-medium"
              >
                <div className="w-4 h-4 rounded-full border border-stone-500 flex items-center justify-center text-[10px]">+</div>
                Add New Section
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Sidebar */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            className="w-[400px] bg-white border-l border-stone-200/60 shadow-dramatic absolute right-0 top-0 bottom-0 z-40 flex flex-col"
          >
            <div className="p-4 border-b border-stone-100 flex items-center justify-between bg-stone-50">
              <div className="flex items-center gap-2 font-serif font-bold text-lg text-ink-900">
                <Sparkles className="text-academic-accent" size={18} />
                Research Assistant
              </div>
              <button onClick={() => setChatOpen(false)} className="text-stone-400 hover:text-ink-900"><X size={18} /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatHistory.length === 0 && (
                <div className="text-center text-stone-400 mt-20 px-8">
                  <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Info size={24} />
                  </div>
                  <p className="mb-2 font-medium text-stone-600">How can I help with your project?</p>
                  <p className="text-sm">I can suggest citations, critique your arguments, or help you brainstorm visual concepts.</p>

                  <div className="mt-8 space-y-2">
                    {['Suggest references for this topic', 'Critique my introduction', 'Summarize the key arguments'].map(q => (
                      <button key={q} onClick={() => setChatInput(q)} className="w-full text-left p-3 text-sm bg-stone-50 hover:bg-stone-100 rounded-lg transition-colors border border-stone-100">
                        "{q}"
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {chatHistory.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed ${msg.role === 'user'
                      ? 'bg-ink-900 text-white rounded-br-sm shadow-lg shadow-ink-900/10'
                      : 'bg-stone-100 text-ink-900 rounded-bl-sm'
                      }`}
                  >
                    {msg.text}
                    {/* Grounding Sources */}
                    {msg.sources && msg.sources.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-black/10">
                        <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-2">Sources</p>
                        <div className="flex flex-wrap gap-2">
                          {msg.sources.map((src, i) => (
                            <a
                              key={i}
                              href={src.uri}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 px-2 py-1 bg-white/50 hover:bg-white rounded border border-black/5 text-[10px] transition-colors truncate max-w-[200px]"
                            >
                              <ExternalLink size={8} />
                              {src.title}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isChatLoading && (
                <div className="flex justify-start">
                  <div className="bg-stone-100 rounded-2xl rounded-bl-none p-4 flex gap-1">
                    <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleChatSubmit} className="p-4 border-t border-stone-200 bg-white">
              <div className="relative">
                <input
                  className="w-full bg-stone-50 border border-stone-200/80 rounded-xl pl-4 pr-12 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-academic-accent/20 focus:border-academic-accent/30 transition-all"
                  placeholder="Ask me anything..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={!chatInput.trim() || isChatLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-ink-900 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-black transition-all shadow-lg shadow-ink-900/10"
                >
                  <Send size={14} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auto Draft Modal */}
      <AnimatePresence>
        {showAutoDraftModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-ink-900/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full relative z-10 text-center"
            >
              <div className="w-14 h-14 bg-academic-accent/10 text-academic-accent rounded-2xl flex items-center justify-center mx-auto mb-5">
                <Sparkles size={24} />
              </div>
              <h3 className="text-xl font-serif text-ink-900 mb-2">Outline Generated</h3>
              <p className="text-stone-500 text-sm mb-6">
                I've created a structural outline for your document. Would you like me to write the first draft for all sections now?
              </p>
              <div className="flex gap-3">
                <Button variant="secondary" onClick={() => setShowAutoDraftModal(false)} className="flex-1">
                  I'll write manually
                </Button>
                <Button onClick={handleConfirmAutoDraft} className="flex-1">
                  Yes, Write Draft
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Editor;