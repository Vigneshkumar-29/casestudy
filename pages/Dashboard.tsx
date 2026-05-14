import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, FileText, MoreHorizontal, Clock, LogOut, BookOpen, Lightbulb, PenTool, GraduationCap, Library, X, ArrowRight, Edit2, Trash2, Copy, ExternalLink, Loader2, UploadCloud, File as FileIcon, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Card, Input, Badge } from '../components/UI';
import { Project } from '../types';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../services/supabase';

const DOC_TYPES = [
  {
    id: 'case-study',
    label: 'Case Study',
    desc: 'Analyze real-world scenarios and draw insights',
    icon: FileText,
    color: 'blue',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
    text: 'text-blue-600',
    hover: 'group-hover:border-blue-300'
  },
  {
    id: 'report',
    label: 'Research Report',
    desc: 'Comprehensive academic research documentation',
    icon: BookOpen,
    color: 'purple',
    bg: 'bg-purple-50',
    border: 'border-purple-100',
    text: 'text-purple-600',
    hover: 'group-hover:border-purple-300'
  },
  {
    id: 'proposal',
    label: 'Project Proposal',
    desc: 'Present and pitch your innovative ideas',
    icon: Lightbulb,
    color: 'yellow',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
    text: 'text-amber-600',
    hover: 'group-hover:border-amber-300'
  },
  {
    id: 'essay',
    label: 'Academic Essay',
    desc: 'Structured argumentative writing',
    icon: PenTool,
    color: 'green',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
    text: 'text-emerald-600',
    hover: 'group-hover:border-emerald-300'
  },
  {
    id: 'thesis',
    label: 'Thesis/Dissertation',
    desc: 'In-depth research for advanced degrees',
    icon: GraduationCap,
    color: 'red',
    bg: 'bg-rose-50',
    border: 'border-rose-100',
    text: 'text-rose-600',
    hover: 'group-hover:border-rose-300'
  },
  {
    id: 'review',
    label: 'Literature Review',
    desc: 'Survey and synthesize existing research',
    icon: Library,
    color: 'indigo',
    bg: 'bg-indigo-50',
    border: 'border-indigo-100',
    text: 'text-indigo-600',
    hover: 'group-hover:border-indigo-300'
  },
];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  // State
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const [selectedType, setSelectedType] = useState<typeof DOC_TYPES[0] | null>(null);
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [newProjectDesc, setNewProjectDesc] = useState('');
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // File Upload State
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchProjects();
  }, [currentUser]);

  const fetchProjects = async () => {
    if (!currentUser) return;
    try {
      setIsLoadingProjects(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching projects:', error);
      } else if (data) {
        // Map database fields to our Project type
        const mappedProjects: Project[] = data.map(p => ({
          id: p.id,
          title: p.title || 'Untitled',
          type: p.type || 'Draft',
          lastEdited: p.last_edited || 'Unknown',
          status: p.status || 'Draft',
          content: p.content || []
        }));
        setProjects(mappedProjects);
      }
    } catch (err) {
      console.error("Unexpected error fetching projects", err);
    } finally {
      setIsLoadingProjects(false);
    }
  };

  const filteredProjects = projects.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setActiveMenuId(null);
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const getInitials = (name: string | null) => {
    return name ? name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'U';
  };

  const handleCreateProject = () => {
    if (!selectedType || !newProjectTitle) return;
    setIsModalOpen(false);

    setTimeout(() => {
      setModalStep(1);
      setSelectedType(null);
      setNewProjectTitle('');
      setNewProjectDesc('');
      setUploadedFiles([]);
    }, 500);

    navigate('/editor/new', {
      state: {
        type: selectedType.label,
        title: newProjectTitle,
        description: newProjectDesc,
        files: uploadedFiles
      }
    });
  };

  const handleDeleteProject = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setProjects(prev => prev.filter(p => p.id !== id));
    setActiveMenuId(null);

    try {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;
    } catch (err) {
      console.error("Failed to delete project", err);
      fetchProjects();
    }
  };

  const handleDuplicateProject = async (e: React.MouseEvent, project: Project) => {
    e.stopPropagation();
    setActiveMenuId(null);
    if (!currentUser) return;

    try {
      const { data, error } = await supabase.from('projects').insert({
        title: `${project.title} (Copy)`,
        type: project.type,
        status: 'Draft',
        content: project.content,
        last_edited: 'Just now',
        user_id: currentUser.id
      }).select().single();

      if (error) throw error;

      if (data) {
        const newProject: Project = {
          id: data.id,
          title: data.title,
          type: data.type,
          status: data.status,
          lastEdited: data.last_edited,
          content: data.content
        };
        setProjects([newProject, ...projects]);
      }
    } catch (err) {
      console.error("Failed to duplicate", err);
    }
  };

  // File Upload Handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
      setUploadedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setUploadedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col font-sans relative">
      {/* Navbar */}
      <nav className="border-b border-stone-200/60 bg-white/60 backdrop-blur-xl sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5 cursor-pointer group" onClick={() => navigate('/')}>
            <div className="w-9 h-9 bg-ink-900 rounded-xl flex items-center justify-center text-stone-50 font-serif italic font-bold text-xl shadow-lg group-hover:shadow-glow transition-all duration-300">
              T
            </div>
            <span className="font-serif text-xl tracking-tight">Thesis</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-stone-500 hidden md:block font-medium">
              {currentUser?.user_metadata?.display_name || currentUser?.email}
            </span>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-academic-accent to-academic-blue flex items-center justify-center text-white font-bold text-xs shadow-lg">
              {getInitials(currentUser?.user_metadata?.display_name || currentUser?.email || '')}
            </div>
            <button
              onClick={handleLogout}
              className="p-2.5 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
              title="Log Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto px-6 py-14 w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <h1 className="font-serif text-3xl md:text-4xl text-ink-900 mb-2">Your Workspace</h1>
            <p className="text-stone-500 font-medium">Manage your research, reports, and case studies.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder="Search projects..."
                className="pl-10 pr-4 py-3 rounded-xl border border-stone-200/80 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-academic-accent/20 focus:border-academic-accent/30 w-64 transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button icon={Plus} onClick={() => setIsModalOpen(true)}>
              New Project
            </Button>
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* New Project Card */}
          <div
            onClick={() => setIsModalOpen(true)}
            className="group rounded-2xl border-2 border-dashed border-stone-200/80 hover:border-academic-accent/40 bg-stone-50/50 hover:bg-academic-accent/[0.03] flex flex-col items-center justify-center h-64 cursor-pointer transition-all duration-400 relative overflow-hidden"
          >
            <div className="w-13 h-13 rounded-xl bg-stone-100 flex items-center justify-center mb-4 group-hover:bg-academic-accent group-hover:text-white transition-all duration-300 z-10 shadow-subtle">
              <Plus className="w-6 h-6 text-stone-400 group-hover:text-white" />
            </div>
            <span className="font-semibold text-stone-500 group-hover:text-academic-accent transition-colors z-10">Create new project</span>
          </div>

          {isLoadingProjects && (
            <div className="col-span-full py-20 flex flex-col items-center justify-center text-stone-400">
              <Loader2 className="w-8 h-8 animate-spin mb-4 text-academic-accent" />
              <p className="font-medium">Loading projects...</p>
            </div>
          )}

          {!isLoadingProjects && filteredProjects.map((project) => (
            <Card
              key={project.id}
              hoverEffect
              onClick={() => navigate(`/editor/${project.id}`)}
              className="h-64 flex flex-col relative group overflow-visible z-0"
            >
              {/* Three Dots Menu */}
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMenuId(activeMenuId === project.id ? null : project.id);
                    }}
                    className={`p-2 rounded-lg transition-colors ${activeMenuId === project.id ? 'bg-stone-100 text-ink-900 opacity-100' : 'hover:bg-stone-100 text-stone-400 bg-white/80 backdrop-blur-sm shadow-subtle border border-stone-200/50'}`}
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>

                  <AnimatePresence>
                    {activeMenuId === project.id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        onClick={(e) => e.stopPropagation()}
                        className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-float border border-stone-200/60 py-1.5 overflow-hidden flex flex-col z-30 origin-top-right"
                      >
                        <button
                          onClick={(e) => { e.stopPropagation(); navigate(`/editor/${project.id}`); }}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-stone-600 hover:bg-stone-50 hover:text-ink-900 text-left transition-colors font-medium"
                        >
                          <ExternalLink className="w-4 h-4 opacity-60" /> Open
                        </button>
                        <button
                          onClick={(e) => handleDuplicateProject(e, project)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-stone-600 hover:bg-stone-50 hover:text-ink-900 text-left transition-colors font-medium"
                        >
                          <Copy className="w-4 h-4 opacity-60" /> Duplicate
                        </button>
                        <div className="h-px bg-stone-100 my-1" />
                        <button
                          onClick={(e) => handleDeleteProject(e, project.id)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 text-left transition-colors font-medium"
                        >
                          <Trash2 className="w-4 h-4 opacity-60" /> Delete
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="w-11 h-11 rounded-xl bg-stone-50 border border-stone-200/50 flex items-center justify-center mb-6 shadow-subtle">
                <FileText className="w-5 h-5 text-stone-600" />
              </div>

              <div className="flex-1">
                <h3 className="font-serif text-lg text-ink-900 leading-snug mb-2 line-clamp-2 pr-8">
                  {project.title}
                </h3>
                <div className="flex items-center gap-2 mb-4">
                  <Badge color={project.status === 'Complete' ? 'green' : project.status === 'Review' ? 'blue' : 'stone'}>
                    {project.status}
                  </Badge>
                  <span className="text-xs text-stone-400 font-medium">• {project.type}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center text-xs text-stone-400 font-medium">
                <Clock className="w-3 h-3 mr-1.5" />
                Edited {project.lastEdited}
              </div>
            </Card>
          ))}
        </div>
      </main>

      {/* New Project Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-ink-900/40 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="bg-white rounded-[1.5rem] shadow-dramatic w-full max-w-4xl max-h-[90vh] overflow-hidden relative z-10 flex flex-col"
            >
              {/* Modal Header */}
              <div className="px-8 py-6 border-b border-stone-100 flex items-center justify-between bg-white sticky top-0 z-20">
                <div>
                  <h2 className="font-serif text-2xl text-ink-900">Create New Document</h2>
                  <p className="text-stone-500 text-sm mt-1 font-medium">
                    {modalStep === 1 ? 'Choose a document type to get started' : 'Define your topic and scope'}
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2.5 hover:bg-stone-100 rounded-xl text-stone-400 hover:text-ink-900 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-8 bg-stone-50/30">
                <AnimatePresence mode="wait">
                  {modalStep === 1 ? (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
                    >
                      {DOC_TYPES.map((type) => (
                        <div
                          key={type.id}
                          onClick={() => {
                            setSelectedType(type);
                            setModalStep(2);
                          }}
                          className={`
                            group relative p-6 rounded-2xl border bg-white cursor-pointer transition-all duration-300
                            ${type.border} hover:shadow-float hover:-translate-y-1
                          `}
                        >
                          <div className={`w-12 h-12 rounded-xl ${type.bg} ${type.text} flex items-center justify-center mb-4`}>
                            <type.icon className="w-6 h-6" />
                          </div>
                          <h3 className="font-serif text-lg text-ink-900 mb-2">{type.label}</h3>
                          <p className="text-sm text-stone-500 leading-relaxed">{type.desc}</p>

                          <div className={`mt-4 text-[10px] font-bold ${type.text} flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity tracking-wider uppercase`}>
                            Select <ArrowRight className="w-3 h-3" />
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="max-w-xl mx-auto"
                    >
                      <div className="bg-white p-8 rounded-2xl border border-stone-200/60 shadow-card">
                        <div className="flex items-center gap-3 mb-6 p-3 bg-stone-50 rounded-xl border border-stone-100">
                          {selectedType && (
                            <div className={`w-9 h-9 rounded-lg ${selectedType.bg} ${selectedType.text} flex items-center justify-center`}>
                              <selectedType.icon className="w-4 h-4" />
                            </div>
                          )}
                          <span className="font-semibold text-ink-900">{selectedType?.label}</span>
                          <button
                            onClick={() => setModalStep(1)}
                            className="ml-auto text-xs text-stone-400 hover:text-academic-accent font-semibold"
                          >
                            Change
                          </button>
                        </div>

                        <div className="space-y-6">
                          <Input
                            label="Project Title"
                            placeholder="e.g., The Evolution of Brutalist Architecture"
                            value={newProjectTitle}
                            onChange={(e) => setNewProjectTitle(e.target.value)}
                            autoFocus
                          />

                          <div className="flex flex-col gap-2 w-full">
                            <label className="text-xs font-bold uppercase tracking-[0.15em] text-stone-400">
                              Description / Research Question
                            </label>
                            <textarea
                              className="bg-white border border-stone-200 rounded-xl px-4 py-3.5 text-ink-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-academic-accent/30 focus:border-academic-accent transition-all min-h-[120px] resize-none text-sm"
                              placeholder="Briefly describe what you want to write about. Thesis will use this to generate an initial outline."
                              value={newProjectDesc}
                              onChange={(e) => setNewProjectDesc(e.target.value)}
                            />
                          </div>

                          {/* Reference Document Upload */}
                          <div className="flex flex-col gap-2 w-full">
                            <label className="text-xs font-bold uppercase tracking-[0.15em] text-stone-400">
                              Reference Material (Optional)
                            </label>
                            <div
                              className={`
                                border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-all duration-300 cursor-pointer
                                ${isDragging
                                  ? 'border-academic-accent bg-academic-accent/[0.04]'
                                  : 'border-stone-200 bg-stone-50/50 hover:border-stone-300 hover:bg-stone-100/50'
                                }
                              `}
                              onDragOver={handleDragOver}
                              onDragLeave={handleDragLeave}
                              onDrop={handleDrop}
                              onClick={() => fileInputRef.current?.click()}
                            >
                              <input
                                type="file"
                                multiple
                                className="hidden"
                                ref={fileInputRef}
                                onChange={handleFileSelect}
                              />
                              <div className="w-11 h-11 rounded-xl bg-white shadow-subtle flex items-center justify-center mb-3 border border-stone-200/50">
                                <UploadCloud className={`w-5 h-5 ${isDragging ? 'text-academic-accent' : 'text-stone-400'}`} />
                              </div>
                              <p className="text-sm font-semibold text-ink-900 mb-1">
                                Click to upload or drag and drop
                              </p>
                              <p className="text-xs text-stone-400">
                                PDF, DOCX, TXT (Max 10MB)
                              </p>
                            </div>

                            {/* File List */}
                            {uploadedFiles.length > 0 && (
                              <div className="mt-3 space-y-2">
                                {uploadedFiles.map((file, index) => (
                                  <div key={index} className="flex items-center justify-between p-3 bg-white border border-stone-200/80 rounded-xl shadow-subtle">
                                    <div className="flex items-center gap-3 overflow-hidden">
                                      <div className="w-9 h-9 rounded-lg bg-stone-100 flex items-center justify-center flex-shrink-0">
                                        <FileIcon className="w-4 h-4 text-stone-500" />
                                      </div>
                                      <div className="flex flex-col min-w-0">
                                        <span className="text-sm font-semibold text-ink-900 truncate">{file.name}</span>
                                        <span className="text-xs text-stone-400">{(file.size / 1024).toFixed(1)} KB</span>
                                      </div>
                                    </div>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        removeFile(index);
                                      }}
                                      className="p-1.5 hover:bg-red-50 rounded-lg text-stone-400 hover:text-red-500 transition-colors"
                                    >
                                      <XCircle className="w-4 h-4" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="mt-8 flex gap-3">
                          <Button variant="ghost" onClick={() => setModalStep(1)} className="flex-1">
                            Back
                          </Button>
                          <Button
                            onClick={handleCreateProject}
                            disabled={!newProjectTitle}
                            className="flex-[2]"
                          >
                            Create Project
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;