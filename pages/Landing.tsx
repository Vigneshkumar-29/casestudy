import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight, Sparkles, BookOpen, PenTool,
  Layout, ChevronRight,
  Cpu, Loader2,
  PieChart, MessageSquare
} from 'lucide-react';
import { Button, Badge } from '../components/UI';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import ClientFeedback from '@/components/ui/testimonial';

// --- BentoCard Component ---
const BentoCard = ({ children, className = "", title, icon: Icon, dark = false }: { children?: React.ReactNode, className?: string, title?: string, icon?: any, dark?: boolean }) => (
  <motion.div
    whileHover={{ y: -5 }}
    transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
    className={`
        relative overflow-hidden group transition-all duration-500
        rounded-[1.5rem] p-7 md:p-9 flex flex-col
        ${dark
        ? 'bg-ink-900 border border-white/8 text-white shadow-dramatic'
        : 'bg-white border border-stone-200/60 text-ink-900 shadow-card hover:shadow-float'
      }
        ${className}
    `}
  >
    {/* Accent gradient on hover */}
    <div className={`absolute top-0 right-0 w-72 h-72 bg-gradient-to-br ${dark ? 'from-academic-accent/15' : 'from-academic-accent/8'} to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

    {title && (
      <div className="flex items-center gap-3 mb-5 relative z-10">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${dark ? 'bg-white/8 text-white' : 'bg-stone-100 text-ink-900 border border-stone-200/50'} group-hover:scale-105 transition-transform duration-300`}>
          {Icon && <Icon className="w-5 h-5" />}
        </div>
        <h3 className={`font-serif text-xl ${dark ? 'text-white' : 'text-ink-900'}`}>{title}</h3>
      </div>
    )}
    <div className="relative z-10 flex-1">{children}</div>
  </motion.div>
);

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const { googleSignIn, currentUser } = useAuth();

  const [isLoginLoading, setIsLoginLoading] = useState(false);

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
    <div className="min-h-screen bg-stone-50 text-ink-900 font-sans overflow-x-hidden">

      <Navbar />

      {/* ═══════════════════════════════════════ */}
      {/* HERO SECTION */}
      {/* ═══════════════════════════════════════ */}
      <section className="relative pt-44 pb-24 md:pt-52 md:pb-36 px-6 overflow-hidden">
        {/* Background mesh */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-15%] right-[-10%] w-[700px] h-[700px] bg-academic-accent/8 rounded-full blur-[150px]" />
          <div className="absolute bottom-[5%] left-[-15%] w-[600px] h-[600px] bg-academic-blue/8 rounded-full blur-[130px]" />
          {/* Dot grid overlay */}
          <div className="absolute inset-0 dot-grid" />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Status pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-stone-200/60 text-xs font-bold tracking-[0.15em] uppercase text-stone-500 mb-10 hover:border-academic-accent/40 transition-all cursor-pointer shadow-subtle group">
              <span className="w-2 h-2 rounded-full bg-academic-accent animate-pulse"></span>
              <span>v2.0 Now Available</span>
              <ChevronRight size={11} className="text-stone-400 group-hover:translate-x-0.5 transition-transform" />
            </div>

            {/* Main heading */}
            <h1 className="font-serif text-[3.5rem] md:text-[6.5rem] leading-[0.92] tracking-tight text-ink-900 mb-8">
              Write at the speed <br /> of <span className="italic text-gradient bg-gradient-to-r from-ink-900 via-academic-blue to-academic-accent">thought.</span>
            </h1>

            <p className="text-lg md:text-xl text-stone-500 max-w-2xl mx-auto leading-relaxed mb-12 font-medium">
              The AI-native workspace designed for academic excellence. <br className="hidden md:block" />
              Draft, cite, and refine your research in one unified interface.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-28">
              <Button onClick={() => navigate('/signup')} className="!rounded-full !px-10 !py-5 !text-base !font-bold bg-ink-900 text-white shadow-dramatic hover:scale-[1.03] transition-transform hover:bg-black border border-transparent group">
                Start Writing Free
                <ArrowRight className="w-4.5 h-4.5 ml-2 group-hover:translate-x-0.5 transition-transform" />
              </Button>
              <button
                onClick={handleQuickGoogleAuth}
                className="flex items-center gap-3 px-8 py-4.5 rounded-full bg-white border border-stone-200/80 text-stone-600 font-semibold hover:bg-stone-50 hover:border-stone-300 transition-all shadow-card group"
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

          {/* 3D App Preview */}
          <div style={{ perspective: '2200px' }} className="relative mx-auto max-w-6xl group">
            <motion.div
              initial={{ rotateX: 18, y: 100, opacity: 0 }}
              animate={{ rotateX: 0, y: 0, opacity: 1 }}
              transition={{ duration: 1.3, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.25 }}
              className="relative z-10 transform-gpu transition-transform duration-700 ease-out group-hover:translate-y-[-8px]"
            >
              {/* Window Frame */}
              <div className="rounded-2xl bg-ink-900 p-2.5 md:p-3.5 shadow-dramatic border border-white/5 ring-1 ring-white/10">
                {/* Traffic Lights */}
                <div className="absolute top-6 left-6 flex gap-2 z-20">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#28CA42]" />
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
            <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[80%] h-24 bg-academic-accent/15 blur-[120px] rounded-full opacity-60 pointer-events-none" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* SOCIAL PROOF MARQUEE */}
      {/* ═══════════════════════════════════════ */}
      <section className="py-20 bg-white border-y border-stone-200/50 overflow-hidden relative">
        <div className="absolute inset-0 diagonal-lines pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 mb-14">
            Trusted by researchers at top institutions
          </p>

          <div className="flex overflow-hidden relative w-full">
            <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

            <div className="flex gap-20 items-center whitespace-nowrap opacity-30 hover:opacity-100 transition-opacity duration-700 animate-marquee">
              {[...Array(2)].map((_, i) => (
                <React.Fragment key={i}>
                  {['Stanford', 'Oxford', 'MIT', 'Cambridge', 'Berkeley', 'Harvard', 'Princeton', 'Yale'].map((uni) => (
                    <span key={`${i}-${uni}`} className="font-serif text-4xl md:text-5xl text-ink-900 cursor-default select-none hover:text-academic-accent transition-colors duration-300">{uni}</span>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* ENGINE SECTION — DARK */}
      {/* ═══════════════════════════════════════ */}
      <section id="engine" className="bg-ink-900 text-white py-36 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 grain-overlay pointer-events-none" />
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-academic-blue/20 blur-[180px] rounded-full translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-academic-accent/12 blur-[180px] rounded-full -translate-x-1/3 translate-y-1/3"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <Badge color="gold"><span className="text-[10px] tracking-[0.2em]">GEMINI 2.5 FLASH</span></Badge>
              <h2 className="font-serif text-5xl md:text-[3.5rem] my-8 leading-[1.08]">
                Not just an editor. <br />
                <span className="italic text-gradient bg-gradient-to-r from-white via-stone-300 to-stone-500">An intellectual partner.</span>
              </h2>
              <p className="text-stone-400 text-lg leading-relaxed mb-12 max-w-lg">
                Thesis runs on Gemini 2.5 Flash, understanding the nuance of your specific field of study. It doesn't just autocomplete; it challenges your arguments, suggests visual data representations, and formats citations in real-time.
              </p>

              <div className="grid gap-4">
                {[
                  { title: 'Context-Aware Editing', desc: 'Reads your entire document to maintain consistency.', icon: BookOpen },
                  { title: 'Auto-Generated Visuals', desc: 'Turns text concepts into diagrams automatically.', icon: PieChart },
                  { title: 'AI Socratic Partner', desc: 'Asks clarifying questions to deepen your analysis.', icon: MessageSquare }
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ x: 4 }}
                    className="group flex gap-5 p-5 rounded-2xl bg-white/[0.04] border border-white/[0.06] hover:border-academic-accent/30 hover:bg-white/[0.08] transition-all duration-400 cursor-default"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-academic-blue/80 to-ink-900 flex items-center justify-center text-white border border-white/10 shadow-lg group-hover:scale-105 transition-transform duration-300">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1 text-white group-hover:text-academic-accent transition-colors">{item.title}</h4>
                      <p className="text-stone-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Engine Visual */}
            <div className="relative h-[600px] flex items-center justify-center">
              <div className="relative w-full aspect-square max-w-md">
                {/* Orbital rings */}
                <div className="absolute inset-0 border border-white/[0.06] rounded-full animate-orbital" />
                <div className="absolute inset-14 border border-white/[0.06] rounded-full animate-orbital-reverse" />
                <div className="absolute inset-28 border border-white/[0.08] rounded-full animate-orbital" style={{ animationDuration: '15s' }} />

                {/* Center piece */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-60 h-60 bg-white/[0.04] backdrop-blur-2xl rounded-3xl border border-white/8 shadow-dramatic flex flex-col items-center justify-center p-8 text-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-academic-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <Cpu className="w-14 h-14 text-academic-accent mb-5 relative z-10 drop-shadow-[0_0_20px_rgba(212,168,83,0.5)]" />
                    <div className="text-2xl font-serif mb-2 relative z-10">Gemini 2.5</div>
                    <div className="text-[9px] text-stone-400 uppercase tracking-[0.2em] border border-white/10 px-3 py-1 rounded-full relative z-10 bg-black/30">Active Model</div>
                  </div>
                </div>

                {/* Floating orbs */}
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-8 right-8 w-14 h-14 bg-academic-blue/60 rounded-2xl rotate-12 blur-md"
                />
                <motion.div
                  animate={{ y: [0, 20, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-16 left-8 w-10 h-10 bg-academic-accent/60 rounded-full blur-md"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* FEATURES BENTO GRID */}
      {/* ═══════════════════════════════════════ */}
      <section id="product" className="py-36 px-6 bg-stone-50 relative">
        <div className="absolute inset-0 dot-grid pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <Badge color="stone">PRODUCT SUITE</Badge>
            <h2 className="font-serif text-5xl text-ink-900 mb-6 mt-6">Everything you need to publish</h2>
            <p className="text-stone-500 text-lg">A complete suite of tools designed to take you from blank page to final submission.</p>
          </div>

          <div className="grid md:grid-cols-3 md:grid-rows-2 gap-6 h-auto md:h-[700px]">
            {/* Large Card */}
            <BentoCard className="md:col-span-2 md:row-span-2" title="Intelligent Drafting" icon={PenTool}>
              <p className="text-stone-500 mb-10 max-w-sm text-xl leading-loose font-light">
                Start with a simple prompt. Thesis generates structural outlines, drafts sections, and even suggests relevant case studies based on your topic.
              </p>
              <div className="absolute bottom-0 right-0 w-3/4 translate-y-10 translate-x-10 shadow-dramatic rounded-tl-2xl overflow-hidden border border-stone-200/30 group-hover:translate-y-6 group-hover:translate-x-6 transition-transform duration-700">
                <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000" alt="Code" className="opacity-80 grayscale hover:grayscale-0 transition-all duration-700" />
              </div>
            </BentoCard>

            {/* Smaller Cards */}
            <BentoCard title="Live Citations" icon={BookOpen}>
              <p className="text-stone-500 mb-4 leading-relaxed">Automatic formatting for APA, MLA, and Chicago styles as you type.</p>
              <div className="mt-auto flex flex-wrap gap-2">
                <Badge color="stone">APA 7</Badge>
                <Badge color="stone">MLA 9</Badge>
                <Badge color="stone">Chicago</Badge>
              </div>
            </BentoCard>

            <BentoCard title="Visual Data" icon={Layout} className="group">
              <p className="text-stone-500 mb-6 leading-relaxed">Turn messy notes into clear flowcharts and diagrams instantly.</p>
              <div className="mt-auto h-32 bg-stone-50 rounded-xl border border-dashed border-stone-200 flex items-center justify-center overflow-hidden relative">
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg border border-stone-300 bg-white flex items-center justify-center text-[9px] font-bold text-stone-500">Input</div>
                  <ArrowRight size={12} className="text-stone-300" />
                  <div className="w-10 h-10 rounded-lg border border-academic-accent bg-academic-accent text-white flex items-center justify-center text-[9px] font-bold">Output</div>
                </div>
              </div>
            </BentoCard>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* CTA SECTION */}
      {/* ═══════════════════════════════════════ */}
      <section className="py-36 px-6 bg-white border-t border-stone-200/50 relative overflow-hidden">
        <div className="absolute inset-0 diagonal-lines pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="mb-10 flex justify-center">
            <div className="w-16 h-16 bg-ink-900 rounded-2xl flex items-center justify-center text-white font-serif italic text-3xl shadow-dramatic">T</div>
          </div>
          <h2 className="font-serif text-5xl md:text-7xl text-ink-900 mb-8 tracking-tight">Ready to write your <br /><span className="italic text-stone-400">masterpiece?</span></h2>
          <p className="text-xl text-stone-500 mb-14 max-w-2xl mx-auto">Join thousands of students and researchers using Thesis to elevate their work to professional standards.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button onClick={() => navigate('/signup')} className="!h-16 !px-12 !text-lg !rounded-full shadow-dramatic hover:scale-[1.03] transition-transform group">
              Start Your Project
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-0.5 transition-transform" />
            </Button>
            <button onClick={handleQuickGoogleAuth} className="px-10 py-4 rounded-full border border-stone-200 text-stone-600 hover:bg-stone-50 flex items-center gap-3 transition-all hover:border-stone-300 shadow-card group">
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
              <span className="font-semibold">Sign in with Google</span>
            </button>
          </div>
          <p className="mt-10 text-sm text-stone-400">No credit card required for the free tier.</p>
        </div>
      </section>

      {/* Client Feedback */}
      <ClientFeedback />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Landing;