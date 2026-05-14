import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from './UI';
import { useAuth } from '../context/AuthContext';
import { ArrowRight } from 'lucide-react';

export const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { currentUser } = useAuth();

    const navItems = [
        { name: 'Product', path: '/product' },
        { name: 'Engine', path: '/engine' },
        { name: 'Pricing', path: '/pricing' }
    ];

    return (
        <nav className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4">
            <div className="w-full max-w-5xl bg-white/70 backdrop-blur-2xl border border-stone-200/60 shadow-card rounded-2xl px-5 py-3 flex items-center justify-between transition-all duration-500 hover:bg-white/85 hover:shadow-float hover:border-stone-200/80">
                <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/')}>
                    <div className="w-9 h-9 bg-ink-900 rounded-xl flex items-center justify-center text-stone-50 font-serif italic font-bold text-xl shadow-lg group-hover:shadow-glow transition-all duration-500 group-hover:scale-[1.05]">T</div>
                    <span className="font-serif text-xl tracking-tight hidden sm:block text-ink-900" style={{ fontStyle: 'normal' }}>Thesis</span>
                </div>

                <div className="hidden md:flex items-center gap-1">
                    {navItems.map((item) => (
                        <button
                            key={item.name}
                            onClick={() => navigate(item.path)}
                            className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                                location.pathname === item.path 
                                    ? 'text-ink-900 bg-stone-100/80' 
                                    : 'text-stone-500 hover:text-ink-900 hover:bg-stone-100/50'
                            }`}
                        >
                            {item.name}
                            {location.pathname === item.path && (
                                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-academic-accent" />
                            )}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-3">
                    {currentUser ? (
                        <Button onClick={() => navigate('/dashboard')} className="!px-5 !py-2.5 !rounded-xl !text-sm shadow-lg group">
                            Dashboard
                            <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
                        </Button>
                    ) : (
                        <>
                            <button
                                onClick={() => navigate('/login')}
                                className="px-4 py-2.5 rounded-xl text-stone-500 text-sm font-medium hover:text-ink-900 hover:bg-stone-100/50 transition-all"
                            >
                                Log in
                            </button>

                            <Button onClick={() => navigate('/signup')} className="!px-5 !py-2.5 !rounded-xl !text-sm shadow-lg hidden sm:flex group">
                                Get Started
                                <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};
