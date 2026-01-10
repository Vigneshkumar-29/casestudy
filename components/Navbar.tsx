import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from './UI';
import { useAuth } from '../context/AuthContext';

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
        <nav className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
            <div className="w-full max-w-6xl bg-white/80 backdrop-blur-xl border border-white/40 shadow-lg shadow-stone-200/20 rounded-2xl px-4 py-3 sm:px-6 flex items-center justify-between transition-all hover:bg-white/90 hover:shadow-xl hover:shadow-stone-200/30">
                <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/')}>
                    <div className="w-9 h-9 bg-ink-900 rounded-lg flex items-center justify-center text-stone-50 font-serif italic font-bold text-xl shadow-lg group-hover:shadow-xl transition-all group-hover:scale-105">T</div>
                    <span className="font-serif font-bold text-xl tracking-tight hidden sm:block text-ink-900">Thesis</span>
                </div>

                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-500">
                    {navItems.map((item) => (
                        <button
                            key={item.name}
                            onClick={() => navigate(item.path)}
                            className={`hover:text-ink-900 transition-colors relative group py-1 ${location.pathname === item.path ? 'text-ink-900' : ''}`}
                        >
                            {item.name}
                            <span className={`absolute bottom-0 left-0 h-0.5 bg-academic-accent transition-all duration-300 ${location.pathname === item.path ? 'w-full' : 'w-0 group-hover:w-full'} opacity-50`}></span>
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-3">
                    {currentUser ? (
                        <Button onClick={() => navigate('/dashboard')} className="!px-5 !py-2 !rounded-full !text-sm shadow-lg">
                            Go to Dashboard
                        </Button>
                    ) : (
                        <>
                            <button
                                onClick={() => navigate('/login')}
                                className="group relative px-4 py-2 rounded-full bg-white/50 border border-stone-200 text-stone-600 text-sm font-medium hover:bg-white hover:border-stone-300 transition-all shadow-sm hover:shadow-md flex items-center gap-2 overflow-hidden"
                            >
                                <span className="group-hover:text-ink-900 transition-colors">Log in</span>
                            </button>

                            <Button onClick={() => navigate('/signup')} className="!px-5 !py-2 !rounded-full !text-sm shadow-lg shadow-ink-900/20 hover:shadow-xl hover:shadow-ink-900/30 hidden sm:flex">
                                Get Started
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};
