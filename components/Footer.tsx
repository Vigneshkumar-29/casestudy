import React from 'react';
import { ArrowRight, Twitter, Github, Linkedin, MessageCircle } from 'lucide-react';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-ink-900 text-white pt-24 pb-12 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            <div className="absolute -top-60 -right-60 w-[500px] h-[500px] bg-academic-blue/15 rounded-full blur-[150px] pointer-events-none"></div>
            <div className="absolute -bottom-60 -left-60 w-[500px] h-[500px] bg-academic-accent/8 rounded-full blur-[150px] pointer-events-none"></div>

            {/* Grain */}
            <div className="absolute inset-0 grain-overlay"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid md:grid-cols-12 gap-12 mb-20">
                    {/* Brand Column */}
                    <div className="md:col-span-4">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-white text-ink-900 rounded-xl flex items-center justify-center font-serif font-bold text-xl shadow-[0_0_30px_rgba(255,255,255,0.15)]">T</div>
                            <span className="font-serif text-2xl tracking-tight">Thesis</span>
                        </div>
                        <p className="text-stone-400 text-sm leading-relaxed mb-8 max-w-xs">
                            The intelligent workspace for the next generation of academics.
                            Draft, cite, and publish with the power of Gemini 2.5.
                        </p>

                        {/* Newsletter Input */}
                        <div className="relative max-w-xs group">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-academic-accent/50 focus:bg-white/10 transition-all"
                            />
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-academic-accent text-ink-900 rounded-lg hover:bg-academic-accent/90 transition-colors font-bold">
                                <ArrowRight size={14} />
                            </button>
                        </div>

                        <div className="mt-10 pt-8 border-t border-white/10 max-w-xs">
                            <h5 className="font-bold text-white text-sm mb-4 tracking-wide">Ready to build your masterpiece?</h5>
                            <button className="w-full px-6 py-3.5 rounded-xl bg-white text-ink-900 font-bold hover:bg-stone-100 transition-all shadow-lg flex items-center justify-center gap-2 group">
                                Start Free Trial
                                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                            </button>
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className="md:col-span-2 md:col-start-6">
                        <h4 className="font-bold text-white mb-6 text-[10px] uppercase tracking-[0.2em] opacity-60">Product</h4>
                        <ul className="space-y-4 text-sm text-stone-400">
                            {['Features', 'Engine', 'Pricing', 'Changelog'].map(link => (
                                <li key={link}><a href="#" className="hover:text-white transition-colors flex items-center gap-2 group">
                                    <span className="w-0 h-px bg-academic-accent group-hover:w-3 transition-all duration-300"></span>
                                    {link}
                                </a></li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:col-span-2">
                        <h4 className="font-bold text-white mb-6 text-[10px] uppercase tracking-[0.2em] opacity-60">Resources</h4>
                        <ul className="space-y-4 text-sm text-stone-400">
                            {['Documentation', 'API Reference', 'Community', 'Help Center'].map(link => (
                                <li key={link}><a href="#" className="hover:text-white transition-colors flex items-center gap-2 group">
                                    <span className="w-0 h-px bg-academic-accent group-hover:w-3 transition-all duration-300"></span>
                                    {link}
                                </a></li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:col-span-2">
                        <h4 className="font-bold text-white mb-6 text-[10px] uppercase tracking-[0.2em] opacity-60">Company</h4>
                        <ul className="space-y-4 text-sm text-stone-400">
                            {['About', 'Careers', 'Legal', 'Contact'].map(link => (
                                <li key={link}><a href="#" className="hover:text-white transition-colors flex items-center gap-2 group">
                                    <span className="w-0 h-px bg-white group-hover:w-3 transition-all duration-300"></span>
                                    {link}
                                </a></li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/8 text-xs text-stone-500">
                    <div className="flex items-center gap-6">
                        <p>© 2025 Thesis Platform Inc.</p>
                        <div className="flex gap-4">
                            <a href="#" className="hover:text-stone-300 transition-colors">Privacy</a>
                            <a href="#" className="hover:text-stone-300 transition-colors">Terms</a>
                        </div>
                    </div>

                    <div className="flex gap-3 mt-4 md:mt-0">
                        {[Twitter, Github, Linkedin, MessageCircle].map((Icon, i) => (
                            <a key={i} href="#" className="w-9 h-9 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-stone-500 hover:bg-white hover:text-ink-900 transition-all duration-300 hover:scale-110 hover:shadow-lg">
                                <Icon size={14} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};
