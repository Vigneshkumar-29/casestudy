import React from 'react';
import { ArrowRight, Globe, Twitter, Github, Linkedin, MessageCircle } from 'lucide-react';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-ink-900 text-white pt-24 pb-12 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-academic-blue/20 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-academic-accent/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid md:grid-cols-12 gap-12 mb-20">
                    {/* Brand Column */}
                    <div className="md:col-span-4">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-white text-ink-900 rounded-xl flex items-center justify-center font-serif font-bold text-xl shadow-[0_0_20px_rgba(255,255,255,0.3)]">T</div>
                            <span className="font-serif font-bold text-2xl tracking-tight">Thesis</span>
                        </div>
                        <p className="text-stone-400 text-sm leading-relaxed mb-8 max-w-xs">
                            The intelligent workspace for the next generation of academics.
                            Draft, cite, and publish with the power of Gemini 2.5.
                        </p>

                        {/* Newsletter Input */}
                        <div className="relative max-w-xs">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-academic-blue/50 focus:bg-white/10 transition-all"
                            />
                            <button className="absolute right-1.5 top-1.5 p-1.5 bg-white text-ink-900 rounded-md hover:bg-stone-200 transition-colors">
                                <ArrowRight size={14} />
                            </button>
                        </div>

                        <div className="mt-8 pt-8 border-t border-white/10 max-w-xs">
                            <h5 className="font-bold text-white text-sm mb-4">Ready to build your masterpiece?</h5>
                            <button className="w-full px-6 py-3 rounded-full bg-academic-blue text-white font-bold hover:bg-academic-blue/90 transition-all shadow-lg hover:shadow-academic-blue/20 flex items-center justify-center gap-2">
                                Start Free Trial
                                <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className="md:col-span-2 md:col-start-6">
                        <h4 className="font-bold text-white mb-6 text-xs uppercase tracking-widest opacity-80">Product</h4>
                        <ul className="space-y-4 text-sm text-stone-400">
                            {['Features', 'Engine', 'Pricing', 'Changelog'].map(link => (
                                <li key={link}><a href="#" className="hover:text-white transition-colors flex items-center gap-2 group">
                                    <span className="w-1 h-1 rounded-full bg-academic-blue opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    {link}
                                </a></li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:col-span-2">
                        <h4 className="font-bold text-white mb-6 text-xs uppercase tracking-widest opacity-80">Resources</h4>
                        <ul className="space-y-4 text-sm text-stone-400">
                            {['Documentation', 'API Reference', 'Community', 'Help Center'].map(link => (
                                <li key={link}><a href="#" className="hover:text-white transition-colors flex items-center gap-2 group">
                                    <span className="w-1 h-1 rounded-full bg-academic-accent opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    {link}
                                </a></li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:col-span-2">
                        <h4 className="font-bold text-white mb-6 text-xs uppercase tracking-widest opacity-80">Company</h4>
                        <ul className="space-y-4 text-sm text-stone-400">
                            {['About', 'Careers', 'Legal', 'Contact'].map(link => (
                                <li key={link}><a href="#" className="hover:text-white transition-colors flex items-center gap-2 group">
                                    <span className="w-1 h-1 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    {link}
                                </a></li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-xs text-stone-500">
                    <div className="flex items-center gap-6">
                        <p>© 2024 Thesis Platform Inc.</p>
                        <div className="flex gap-4">
                            <a href="#" className="hover:text-stone-300 transition-colors">Privacy</a>
                            <a href="#" className="hover:text-stone-300 transition-colors">Terms</a>
                        </div>
                    </div>

                    <div className="flex gap-4 mt-4 md:mt-0">
                        <a href="#" className="w-8 h-8 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-stone-400 hover:bg-white hover:text-ink-900 transition-all hover:scale-110">
                            <Twitter size={14} />
                        </a>
                        <a href="#" className="w-8 h-8 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-stone-400 hover:bg-white hover:text-ink-900 transition-all hover:scale-110">
                            <Github size={14} />
                        </a>
                        <a href="#" className="w-8 h-8 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-stone-400 hover:bg-white hover:text-ink-900 transition-all hover:scale-110">
                            <Linkedin size={14} />
                        </a>
                        <a href="#" className="w-8 h-8 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-stone-400 hover:bg-white hover:text-ink-900 transition-all hover:scale-110">
                            <MessageCircle size={14} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
