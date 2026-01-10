import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Badge } from '../components/UI';
import { Cpu, Network, Database, Lock, Zap, Code, GitBranch, Layers, Terminal } from 'lucide-react';

const Engine: React.FC = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"]
    });

    const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-academic-blue selection:text-white overflow-x-hidden">
            <Navbar />

            {/* Hero Section - Dark & Glowing */}
            <section className="relative pt-40 pb-32 px-6 overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-academic-blue/10 blur-[120px] rounded-full mix-blend-screen" />
                    <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-purple-900/10 blur-[150px] rounded-full mix-blend-screen" />
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.07]"></div>

                    {/* Grid Lines */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 hover:bg-white/10 transition-colors cursor-default shadow-[0_0_20px_rgba(74,222,128,0.1)] group"
                            >
                                <div className="relative">
                                    <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse absolute" />
                                    <span className="w-2.5 h-2.5 rounded-full bg-green-500 blur-[8px] absolute" />
                                </div>
                                <span className="text-xs font-mono text-green-400 uppercase tracking-widest font-semibold group-hover:text-green-300 transition-colors">System Online</span>
                            </motion.div>

                            <h1 className="font-serif text-6xl md:text-8xl mt-2 mb-8 leading-[0.9] tracking-tight">
                                The Neural <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-white animate-gradient-x">Architecture.</span>
                            </h1>
                            <p className="text-xl text-stone-400 mb-10 leading-relaxed max-w-lg">
                                Built on Gemini 2.5 Flash. A multimodal reasoning engine designed to deconstruct, analyze, and synthesize academic knowledge at scale.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <div className="px-6 py-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-4 hover:bg-white/10 transition-colors group cursor-default">
                                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Cpu className="text-blue-400 w-5 h-5" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-stone-500 uppercase tracking-widest font-bold">Context Window</span>
                                        <span className="font-mono text-lg font-bold text-white">1,000,000+</span>
                                    </div>
                                </div>
                                <div className="px-6 py-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-4 hover:bg-white/10 transition-colors group cursor-default">
                                    <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Zap className="text-yellow-400 w-5 h-5" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-stone-500 uppercase tracking-widest font-bold">Inference Speed</span>
                                        <span className="font-mono text-lg font-bold text-white">~45ms</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="relative h-[600px] flex items-center justify-center perspective-1000"
                        >
                            {/* Engine Video Visual */}
                            <div className="relative w-full h-full flex items-center justify-center">
                                <div className="relative w-full max-w-md aspect-square rounded-full overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(59,130,246,0.2)] group">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 z-10 pointer-events-none mix-blend-overlay" />
                                    <video
                                        src="/engine-video.mp4"
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700 ease-out"
                                    />

                                    {/* Overlay Ring */}
                                    <div className="absolute inset-0 border border-white/10 rounded-full z-20" />

                                    {/* Rotating Outer Ring */}
                                    <div className="absolute inset-[-20px] border border-dashed border-white/10 rounded-full z-0 animate-[spin_60s_linear_infinite]" />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Feature Deep Dive */}
            <section ref={targetRef} className="py-32 px-6 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Network,
                                title: "Knowledge Graph",
                                desc: "Constructs a dynamic, multidimensional graph of your arguments to ensure logical consistency and citation accuracy across your entire thesis.",
                                color: "blue"
                            },
                            {
                                icon: Lock,
                                title: "Local Encryption",
                                desc: "Your research data is encrypted locally using AES-256 before ever touching our servers. We never train on your unpublished work.",
                                color: "green"
                            },
                            {
                                icon: Code,
                                title: "LaTeX Synthesis",
                                desc: "Seamlessly converts natural language to complex LaTeX equations and formatting, handling packages and dependencies automatically.",
                                color: "purple"
                            },
                            {
                                icon: GitBranch,
                                title: "Version Control",
                                desc: "Git-like branching for your writing. Experiment with different argument structures without losing your original train of thought.",
                                color: "orange"
                            },
                            {
                                icon: Layers,
                                title: "Semantic Search",
                                desc: "Search your entire reference library not just by keywords, but by concepts, methodologies, and theoretical frameworks.",
                                color: "pink"
                            },
                            {
                                icon: Terminal,
                                title: "API Access",
                                desc: "Direct access to the Thesis Engine API for building custom workflows and integrating with specialized lab equipment data.",
                                color: "cyan"
                            }
                        ].map((item, i) => {
                            const colorClasses: Record<string, string> = {
                                blue: "bg-blue-500/10 group-hover:bg-blue-500/20",
                                green: "bg-green-500/10 group-hover:bg-green-500/20",
                                purple: "bg-purple-500/10 group-hover:bg-purple-500/20",
                                orange: "bg-orange-500/10 group-hover:bg-orange-500/20",
                                pink: "bg-pink-500/10 group-hover:bg-pink-500/20",
                                cyan: "bg-cyan-500/10 group-hover:bg-cyan-500/20",
                            };

                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    whileHover={{ y: -10, scale: 1.02 }}
                                    className="group p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 relative overflow-hidden"
                                >
                                    <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 transition-colors ${colorClasses[item.color]}`} />

                                    <div className="relative z-10">
                                        <div className={`w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                            <item.icon className="w-6 h-6 text-stone-300 group-hover:text-white transition-colors" />
                                        </div>
                                        <h3 className="text-2xl font-serif font-medium mb-4 text-white">{item.title}</h3>
                                        <p className="text-stone-400 leading-relaxed text-sm">{item.desc}</p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Code/Terminal Section */}
            <section className="py-20 px-6 border-t border-white/5 bg-black/40">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-4xl md:text-5xl mb-6">Developer First</h2>
                        <p className="text-stone-400 max-w-2xl mx-auto">
                            Extend the capabilities of Thesis with our robust Python SDK.
                        </p>
                    </div>

                    <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0F0F0F] shadow-2xl font-mono text-sm relative group">
                        <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                            </div>
                            <div className="text-stone-500 text-xs">main.py</div>
                            <div className="w-12" />
                        </div>
                        <div className="p-6 text-stone-300 overflow-x-auto">
                            <pre>
                                <code>
                                    <span className="text-purple-400">import</span> thesis <span className="text-purple-400">as</span> th

                                    <span className="text-stone-500"># Initialize the engine</span>
                                    engine = th.Engine(api_key=<span className="text-green-400">"th_..."</span>)

                                    <span className="text-stone-500"># Analyze a document for logical fallacies</span>
                                    analysis = engine.analyze(
                                    document=<span className="text-green-400">"./draft_v2.tex"</span>,
                                    mode=<span className="text-green-400">"socratic"</span>,
                                    depth=<span className="text-blue-400">2</span>
                                    )

                                    <span className="text-purple-400">print</span>(analysis.suggestions)
                                </code>
                            </pre>
                        </div>

                        {/* Glowing Border Effect */}
                        <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500/20 rounded-xl transition-colors pointer-events-none" />
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 px-6 border-t border-white/10 bg-[#050505] relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent opacity-50" />
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="font-serif text-4xl md:text-5xl mb-8 leading-tight">
                        Ready to harness the <br /> <span className="text-white">Neural Architecture?</span>
                    </h2>
                    <p className="text-stone-400 mb-10 text-lg">
                        Get API access today and start building intelligent academic applications.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button className="px-8 py-4 rounded-full bg-white text-black font-bold text-lg hover:bg-stone-200 transition-colors shadow-xl shadow-white/5">
                            Get API Key
                        </button>
                        <button className="px-8 py-4 rounded-full bg-transparent border border-white/20 text-white font-medium hover:bg-white/5 transition-colors">
                            Read Documentation
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Engine;
