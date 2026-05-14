import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Button, Badge } from '../components/UI';
import {
    Zap, Layout, PenTool, BookOpen,
    Share2, ArrowRight, CheckCircle2, Sparkles
} from 'lucide-react';

const Product: React.FC = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

    const features = [
        {
            title: "AI-Powered Drafting",
            description: "Generate comprehensive outlines and first drafts based on your research questions. Our AI understands academic nuance.",
            icon: PenTool,
            colSpan: "col-span-1 md:col-span-2",
            bg: "bg-academic-blue/[0.04]",
            dark: false,
            borderColor: "border-academic-blue/20"
        },
        {
            title: "Smart Citations",
            description: "Auto-format references in APA, MLA, Chicago, and more instantly.",
            icon: BookOpen,
            colSpan: "col-span-1",
            bg: "bg-stone-50",
            dark: false
        },
        {
            title: "Real-time Collaboration",
            description: "Work with peers and mentors in the same document seamlessly.",
            icon: Share2,
            colSpan: "col-span-1",
            bg: "bg-stone-50",
            dark: false
        },
        {
            title: "Visual Data Engine",
            description: "Convert text descriptions into charts, graphs, and diagrams instantly.",
            icon: Layout,
            colSpan: "col-span-1 md:col-span-2",
            bg: "bg-ink-900",
            dark: true
        }
    ];

    return (
        <div className="min-h-screen bg-stone-50 text-ink-900 font-sans overflow-x-hidden">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-44 pb-36 px-6 overflow-hidden">
                {/* Background Elements */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-academic-blue/5 rounded-full blur-[150px] pointer-events-none" />
                <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-academic-accent/5 rounded-full blur-[130px] pointer-events-none" />
                <div className="absolute inset-0 dot-grid pointer-events-none"></div>

                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-stone-200/60 shadow-subtle mb-10">
                            <Sparkles className="w-3.5 h-3.5 text-academic-accent" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-stone-500">Product Suite v2.0</span>
                        </div>

                        <h1 className="font-serif text-6xl md:text-8xl mt-2 mb-8 leading-[0.92] tracking-tight">
                            Tools for the <br />
                            <span className="italic text-gradient bg-gradient-to-r from-academic-blue via-ink-800 to-academic-accent">Modern Scholar.</span>
                        </h1>
                        <p className="text-xl text-stone-500 mb-14 leading-relaxed max-w-2xl mx-auto">
                            Thesis isn't just a text editor. It's a comprehensive research environment
                            that understands the context of your work, powered by Gemini 2.5.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button className="!rounded-full !px-10 !py-5 !text-base !font-bold bg-ink-900 text-white shadow-dramatic hover:scale-[1.03] transition-transform hover:bg-black border border-transparent group">
                                Start Writing Free
                                <ArrowRight className="w-4.5 h-4.5 ml-2 group-hover:translate-x-0.5 transition-transform" />
                            </Button>
                            <button className="px-8 py-4.5 rounded-full bg-white border border-stone-200/80 text-stone-600 font-semibold hover:bg-stone-50 hover:border-stone-300 transition-all shadow-card flex items-center gap-3 group">
                                <span>Watch Demo</span>
                                <div className="w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center group-hover:bg-stone-200 transition-colors">
                                    <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[7px] border-l-stone-600 border-b-[5px] border-b-transparent ml-0.5"></div>
                                </div>
                            </button>
                        </div>
                    </motion.div>

                    {/* Product Visual */}
                    <motion.div
                        initial={{ opacity: 0, y: 100, rotateX: 20 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                        transition={{ delay: 0.4, duration: 1.2, type: "spring" }}
                        className="relative mt-24 mx-auto max-w-6xl perspective-1000"
                    >
                        <div className="relative rounded-2xl overflow-hidden shadow-dramatic border border-stone-200/30 bg-white ring-1 ring-stone-900/5 transform-gpu group">
                            <img
                                src="/product-showcase.jpeg"
                                alt="Thesis Product Interface"
                                className="w-full h-auto object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Bento Grid Features */}
            <section className="py-36 px-6 bg-stone-50 relative">
                <div className="absolute inset-0 diagonal-lines pointer-events-none" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="mb-20 md:flex justify-between items-end">
                        <div className="max-w-2xl">
                            <h2 className="font-serif text-4xl md:text-5xl text-ink-900 mb-6">Everything you need to publish.</h2>
                            <p className="text-lg text-stone-500">A complete suite of tools designed to take you from blank page to final submission.</p>
                        </div>
                        <Button variant="ghost" className="hidden md:flex group mt-6 md:mt-0">
                            View all features <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {features.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                                whileHover={{ y: -8 }}
                                className={`${feature.colSpan} ${feature.bg} ${feature.dark ? 'text-white' : 'text-ink-900'} p-8 md:p-10 rounded-[2rem] border ${feature.borderColor ? feature.borderColor : (feature.dark ? 'border-white/8' : 'border-stone-200/60')} ${feature.dark ? 'shadow-dramatic' : 'shadow-card hover:shadow-float'} flex flex-col justify-between group transition-all duration-500 relative overflow-hidden`}
                            >
                                <div className="relative z-10">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${feature.dark ? 'bg-white/8 text-white' : 'bg-white text-ink-900 border border-stone-200/50 shadow-subtle'} group-hover:scale-110 transition-transform duration-500`}>
                                        <feature.icon className="w-7 h-7" />
                                    </div>
                                    <h3 className="font-serif text-3xl mb-4 tracking-tight">
                                        {feature.title}
                                    </h3>
                                    <p className={`${feature.dark ? 'text-stone-400' : 'text-stone-500'} text-lg leading-relaxed`}>
                                        {feature.description}
                                    </p>
                                </div>

                                {feature.dark && (
                                    <div className="absolute inset-0 z-0">
                                        <div className="absolute inset-0 bg-gradient-to-br from-academic-accent/15 to-transparent opacity-50" />
                                        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-academic-accent/15 rounded-full blur-[80px]" />
                                    </div>
                                )}

                                {!feature.dark && (
                                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-stone-100 to-transparent rounded-tl-[4rem] opacity-40 group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Deep Dive Section */}
            <section ref={targetRef} className="py-36 px-6 bg-white overflow-hidden relative">
                <div className="absolute inset-0 grain-overlay pointer-events-none"></div>

                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center relative z-10">
                    <motion.div style={{ opacity, x: useTransform(scrollYProgress, [0, 1], [-50, 0]) }}>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stone-100 text-stone-600 text-[10px] font-bold uppercase tracking-[0.15em] mb-8">
                            <Zap size={12} />
                            <span>Ecosystem</span>
                        </div>
                        <h2 className="font-serif text-5xl md:text-6xl mb-10 leading-tight text-ink-900">
                            Seamlessly integrated <br /> with your workflow.
                        </h2>
                        <p className="text-xl text-stone-500 mb-12 leading-relaxed">
                            Connect your favorite reference managers, cloud storage, and university libraries directly into Thesis. No more context switching.
                        </p>

                        <div className="space-y-5">
                            {['Zotero & Mendeley Sync', 'Google Drive & Dropbox', 'University SSO (Shibboleth)', 'One-Click LaTeX Export'].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center gap-4 group cursor-default"
                                >
                                    <div className="w-9 h-9 rounded-lg bg-academic-green/10 text-academic-green flex items-center justify-center border border-academic-green/15 group-hover:scale-110 transition-transform">
                                        <CheckCircle2 size={16} />
                                    </div>
                                    <span className="text-lg font-medium text-ink-900 group-hover:text-academic-accent transition-colors">{item}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div style={{ scale }} className="relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-academic-blue/15 to-academic-accent/10 blur-[120px] rounded-full" />
                        <div className="relative rounded-[2rem] overflow-hidden shadow-dramatic border border-stone-200/30 ring-1 ring-stone-100 bg-white group">
                            <video
                                src="/integrations-demo.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-academic-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Product;
