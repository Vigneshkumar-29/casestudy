import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight, Sparkles, BookOpen, PenTool,
  Layout, Zap, Shield, ChevronRight,
  Search, FileText, GitBranch,
  Cpu, Command, Globe, Loader2, CheckCircle2,
  PieChart, MessageSquare
} from 'lucide-react';
import { Button, Badge } from '../components/UI';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import ClientFeedback from '@/components/ui/testimonial';

// --- Components for Landing Page Only ---



const BentoCard = ({ children, className = "", title, icon: Icon, dark = false }: { children?: React.ReactNode, className?: string, title?: string, icon?: any, dark?: boolean }) => (
  <motion.div
    whileHover={{ y: -4 }}
    className={`
        relative overflow-hidden group transition-all duration-300
        rounded-3xl p-6 md:p-8 flex flex-col
        ${dark
        ? 'bg-ink-900 border border-white/10 text-white shadow-2xl shadow-black/50'
        : 'bg-white border border-stone-100 text-ink-900 shadow-xl shadow-stone-200/50'
      }
        ${className}
    `}
  >
    {/* Background Gradient/Glow */}
    <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${dark ? 'from-academic-blue/20' : 'from-academic-accent/10'} to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

    {title && (
      <div className="flex items-center gap-3 mb-4 relative z-10">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${dark ? 'bg-white/10 text-white' : 'bg-stone-50 text-ink-900 border border-stone-100'}`}>
          {Icon && <Icon className="w-5 h-5" />}
        </div>
        <h3 className={`font-serif text-xl font-medium ${dark ? 'text-white' : 'text-ink-900'}`}>{title}</h3>
      </div>
    )}
    <div className="relative z-10 flex-1">{children}</div>
  </motion.div>
);

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const { googleSignIn, currentUser } = useAuth();

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  // Quick action for hero button only
  const handleQuickGoogleAuth = async () => {
    setIsLoginLoading(true);
    try {
      await googleSignIn();
      navigate('/dashboard');
    } catch (error) {
      console.error("Google auth failed", error);
    } finally {
      setIsLoginLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-ink-900 font-sans selection:bg-academic-accent selection:text-white overflow-x-hidden">

      {/* Navbar - Floating Glass Pill */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
        {/* Background Mesh */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-academic-accent/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-academic-blue/10 rounded-full blur-[100px]" />
          {/* Grid overlay */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-stone-200 text-xs font-semibold tracking-wide uppercase text-stone-600 mb-8 hover:border-academic-accent/50 hover:bg-stone-50 transition-all cursor-pointer shadow-sm group">
              <span className="w-2 h-2 rounded-full bg-academic-accent animate-pulse"></span>
              <span>v2.0 Now Available</span>
              <ChevronRight size={12} className="text-stone-400 group-hover:translate-x-0.5 transition-transform" />
            </div>

            <h1 className="font-serif text-6xl md:text-8xl leading-[0.95] tracking-tight text-ink-900 mb-8 drop-shadow-sm">
              Write at the speed <br /> of <span className="italic bg-gradient-to-r from-academic-blue via-ink-800 to-ink-900 text-transparent bg-clip-text">thought.</span>
            </h1>

            <p className="text-lg md:text-xl text-stone-500 max-w-2xl mx-auto leading-relaxed mb-10">
              The AI-native workspace designed for academic excellence. <br className="hidden md:block" />
              Draft, cite, and refine your research in one unified interface.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-24">
              <Button onClick={() => navigate('/signup')} className="!rounded-full !px-10 !py-5 !text-lg !font-bold bg-ink-900 text-white shadow-2xl hover:scale-105 transition-transform hover:bg-black border border-transparent">
                Start Writing Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <button
                onClick={handleQuickGoogleAuth}
                className="flex items-center gap-2 px-8 py-4 rounded-full bg-white border border-stone-200 text-stone-600 font-medium hover:bg-stone-50 hover:border-stone-300 transition-all shadow-sm group"
              >
                {isLoginLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-4 h-4 grayscale group-hover:grayscale-0 transition-all" alt="Google" />
                )}
                <span>Continue with Google</span>
              </button>
            </div>
          </motion.div>

          {/* 3D App Perspective */}
          <div style={{ perspective: '2000px' }} className="relative mx-auto max-w-6xl group">
            <motion.div
              initial={{ rotateX: 20, y: 100, opacity: 0 }}
              animate={{ rotateX: 0, y: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
              className="relative z-10 transform-gpu transition-transform duration-500 ease-out group-hover:translate-y-[-10px] group-hover:rotate-x-1"
            >
              {/* Main Window Frame */}
              <div className="rounded-2xl bg-stone-900 p-2 md:p-3 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.25)] border border-stone-200/50 ring-1 ring-white/20">
                {/* Traffic Lights */}
                <div className="absolute top-6 left-6 flex gap-2 z-20">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                </div>

                <div className="rounded-xl overflow-hidden bg-white h-[400px] md:h-[600px] relative">
                  <video
                    src="/hero-video.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>

            {/* Reflective Glow */}
            <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[90%] h-20 bg-academic-blue/20 blur-[100px] rounded-full opacity-50 pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Social Proof - Futuristic Marquee */}
      <section className="py-24 bg-white border-y border-stone-100 overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-12">
            Trusted by researchers at top institutions
          </p>

          <div className="flex overflow-hidden relative w-full">
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
              className="flex gap-20 items-center whitespace-nowrap opacity-40 hover:opacity-100 transition-opacity duration-500"
            >
              {[...Array(2)].map((_, i) => (
                <React.Fragment key={i}>
                  {['Stanford', 'Oxford', 'MIT', 'Cambridge', 'Berkeley', 'Harvard', 'Princeton', 'Yale'].map((uni) => (
                    <a href="#" key={`${i}-${uni}`} className="font-serif text-4xl md:text-5xl font-bold text-ink-900 cursor-pointer hover:text-academic-blue transition-colors hover:underline decoration-2 underline-offset-8">{uni}</a>
                  ))}
                </React.Fragment>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Engine Section - Dark Mode */}
      <section id="engine" className="bg-ink-900 text-white py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
        {/* Glowing orbs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-academic-blue/30 blur-[150px] rounded-full translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-academic-accent/20 blur-[150px] rounded-full -translate-x-1/3 translate-y-1/3"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <Badge color="blue" ><span className="text-xs tracking-widest">GEMINI 2.5 FLASH</span></Badge>
              <h2 className="font-serif text-5xl md:text-6xl my-6 leading-[1.1]">
                Not just an editor. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-stone-400 italic">An intellectual partner.</span>
              </h2>
              <p className="text-stone-400 text-lg leading-relaxed mb-10 max-w-lg">
                Thesis runs on Gemini 2.5 Flash, understanding the nuance of your specific field of study. It doesn't just autocomplete; it challenges your arguments, suggests visual data representations, and formats citations in real-time.
              </p>

              <div className="grid gap-6">
                {[
                  { title: 'Context-Aware Editing', desc: 'Reads your entire document to maintain consistency.', icon: BookOpen },
                  { title: 'Auto-Generated Visuals', desc: 'Turns text concepts into diagrams automatically.', icon: PieChart },
                  { title: 'AI Socratic Partner', desc: 'Asks clarifying questions to deepen your analysis.', icon: MessageSquare }
                ].map((item, i) => (
                  <div key={i} className="group flex gap-5 p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all cursor-default">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-academic-blue to-ink-900 flex items-center justify-center text-white border border-white/10 shadow-lg group-hover:scale-110 transition-transform">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-xl mb-1 text-white group-hover:text-academic-accent transition-colors">{item.title}</h4>
                      <p className="text-stone-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative h-[600px] flex items-center justify-center">
              {/* Abstract Engine Visual */}
              <div className="relative w-full aspect-square max-w-md">
                <div className="absolute inset-0 border border-white/10 rounded-full animate-[spin_30s_linear_infinite]" />
                <div className="absolute inset-12 border border-white/10 rounded-full animate-[spin_20s_linear_infinite_reverse]" />
                <div className="absolute inset-24 border border-white/10 rounded-full animate-[spin_10s_linear_infinite]" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl flex flex-col items-center justify-center p-8 text-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-academic-blue/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <Cpu className="w-16 h-16 text-academic-accent mb-6 relative z-10 drop-shadow-[0_0_15px_rgba(196,164,132,0.5)]" />
                    <div className="text-3xl font-serif font-medium mb-2 relative z-10">Gemini 2.5</div>
                    <div className="text-[10px] text-stone-400 uppercase tracking-widest border border-white/10 px-3 py-1 rounded-full relative z-10 bg-black/20">Active Model</div>
                  </div>
                </div>

                {/* Floating Orbs */}
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-10 right-10 w-16 h-16 bg-academic-blue rounded-2xl rotate-12 blur-md opacity-60"
                />
                <motion.div
                  animate={{ y: [0, 20, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-20 left-10 w-12 h-12 bg-academic-accent rounded-full blur-md opacity-60"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="product" className="py-32 px-6 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <Badge color="stone">PRODUCT SUITE</Badge>
            <h2 className="font-serif text-5xl text-ink-900 mb-6 mt-6">Everything you need to publish</h2>
            <p className="text-stone-500 text-lg">A complete suite of tools designed to take you from blank page to final submission.</p>
          </div>

          <div className="grid md:grid-cols-3 md:grid-rows-2 gap-6 h-auto md:h-[700px]">
            {/* Large Card */}
            <BentoCard className="md:col-span-2 md:row-span-2 !bg-white" title="Intelligent Drafting" icon={PenTool}>
              <p className="text-stone-500 mb-10 max-w-sm text-xl leading-loose font-light">
                Start with a simple prompt. Thesis generates structural outlines, drafts sections, and even suggests relevant case studies based on your topic.
              </p>
              <div className="absolute bottom-0 right-0 w-3/4 translate-y-10 translate-x-10 shadow-2xl rounded-tl-2xl overflow-hidden border border-stone-100 group-hover:translate-y-6 group-hover:translate-x-6 transition-transform duration-500">
                <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000" alt="Code" className="opacity-90 grayscale hover:grayscale-0 transition-all duration-700" />
              </div>
            </BentoCard>

            {/* Smaller Cards */}
            <BentoCard title="Live Citations" icon={BookOpen} className="!bg-white">
              <p className="text-stone-500 mb-4 leading-relaxed">Automatic formatting for APA, MLA, and Chicago styles as you type.</p>
              <div className="mt-auto flex flex-wrap gap-2">
                <Badge color="stone">APA 7</Badge>
                <Badge color="stone">MLA 9</Badge>
                <Badge color="stone">Chicago</Badge>
              </div>
            </BentoCard>

            <BentoCard title="Visual Data" icon={Layout} className="!bg-white group">
              <p className="text-stone-500 mb-6 leading-relaxed">Turn messy notes into clear flowcharts and diagrams instantly.</p>
              <div className="mt-auto h-32 bg-stone-50 rounded-xl border border-dashed border-stone-200 flex items-center justify-center overflow-hidden relative">
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded border border-stone-300 bg-white flex items-center justify-center text-[8px]">Input</div>
                  <ArrowRight size={10} className="text-stone-300" />
                  <div className="w-8 h-8 rounded border border-academic-blue bg-academic-blue text-white flex items-center justify-center text-[8px]">Output</div>
                </div>
              </div>
            </BentoCard>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 bg-white border-t border-stone-100">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8 flex justify-center">
            <div className="w-16 h-16 bg-ink-900 rounded-2xl flex items-center justify-center text-white font-serif italic text-3xl shadow-xl">T</div>
          </div>
          <h2 className="font-serif text-5xl md:text-7xl text-ink-900 mb-8 tracking-tight">Ready to write your <br /><span className="italic text-stone-400">masterpiece?</span></h2>
          <p className="text-xl text-stone-500 mb-12 max-w-2xl mx-auto">Join thousands of students and researchers using Thesis to elevate their work to professional standards.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button onClick={() => navigate('/signup')} className="!h-16 !px-12 !text-lg !rounded-full shadow-2xl shadow-ink-900/20 hover:scale-105 transition-transform">
              Start Your Project
            </Button>
            <button onClick={handleQuickGoogleAuth} className="px-10 py-4 rounded-full border border-stone-200 text-stone-600 hover:bg-stone-50 flex items-center gap-3 transition-all hover:border-stone-400">
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
              <span className="font-medium">Sign in with Google</span>
            </button>
          </div>
          <p className="mt-8 text-sm text-stone-400">No credit card required for the free tier.</p>
        </div>
      </section>

      {/* Client Feedback */}
      <ClientFeedback />

      {/* Footer */}
      {/* Footer - Futuristic Design */}
      <Footer />
    </div>
  );
};

export default Landing;