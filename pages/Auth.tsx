import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, AlertCircle, ArrowLeft, Sparkles } from 'lucide-react';
import { Button, Input } from '../components/UI';
import { useAuth } from '../context/AuthContext';

interface AuthProps {
  mode: 'login' | 'signup';
}

const Auth: React.FC<AuthProps> = ({ mode }) => {
  const navigate = useNavigate();
  const { login, signup, googleSignIn, resetPassword } = useAuth();
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [view, setView] = useState<'auth' | 'forgot-password'>('auth');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const isLogin = mode === 'login';

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
        navigate('/dashboard');
      } else {
        const data = await signup(email, password, name);
        if (data?.session) {
            // Auto-login successful
            navigate('/dashboard');
        } else if (data?.user) {
            // User created, but email verification required
            setMessage("Account created successfully! Please check your email to verify your account before logging in.");
            // Reset fields
            setPassword('');
        }
      }
    } catch (err: any) {
      console.error(err);
      // Handle Supabase specific errors
      const errMsg = err.message || '';
      
      if (errMsg.includes('Invalid login credentials')) {
        setError("Invalid email or password.");
      } else if (errMsg.includes('Email not confirmed')) {
        setError("Please verify your email address. Check your inbox for the confirmation link.");
      } else if (errMsg.includes('User already registered')) {
        setError("This email is already registered. Please log in.");
      } else if (errMsg.includes('Password should be')) {
        setError(errMsg); // Pass through password complexity errors
      } else if (err.code === 'auth/invalid-credential') {
        setError("Invalid email or password."); // Fallback for old/generic code
      } else {
        setError(errMsg || "Authentication failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setError('');
    setIsLoading(true);
    try {
      await googleSignIn();
      // Auth state change will trigger redirect in some cases, but usually OAuth redirects away
    } catch (err: any) {
      console.error(err);
      setError("Failed to sign in with Google.");
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!email) {
        setError("Please enter your email address.");
        return;
    }
    setError('');
    setMessage('');
    setIsLoading(true);
    
    try {
        await resetPassword(email);
        setMessage("Check your email for password reset instructions.");
    } catch (err: any) {
        if(err.message?.includes('User not found')) {
            setError("No account found with this email.");
        } else {
            setError(err.message || "Failed to send reset email.");
        }
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white font-sans text-ink-900">
      {/* Left Panel - Form */}
      <div className="w-full lg:w-1/2 flex flex-col p-6 sm:p-12 lg:p-20 justify-center relative">
        <div 
            onClick={() => navigate('/')} 
            className="absolute top-8 left-8 flex items-center gap-2.5 cursor-pointer group"
        >
            <div className="w-9 h-9 bg-ink-900 rounded-xl flex items-center justify-center text-stone-50 font-serif italic font-bold text-xl shadow-lg group-hover:scale-105 group-hover:shadow-glow transition-all duration-300">T</div>
            <span className="font-serif text-xl tracking-tight">Thesis</span>
        </div>

        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-md w-full mx-auto"
        >
          <AnimatePresence mode="wait">
            {view === 'auth' ? (
                <motion.div
                    key="auth-form"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                >
                    <h1 className="font-serif text-4xl mb-3">
                        {isLogin ? 'Welcome back.' : 'Start your masterpiece.'}
                    </h1>
                    <p className="text-stone-500 mb-10 text-lg">
                        {isLogin 
                        ? 'Enter your credentials to access your workspace.' 
                        : 'Join the academic platform designed for excellence.'}
                    </p>

                    <button 
                        onClick={handleGoogleAuth}
                        type="button"
                        className="w-full flex items-center justify-center gap-3 px-6 py-4 border border-stone-200 rounded-xl hover:bg-stone-50 hover:border-stone-300 transition-all mb-8 group shadow-subtle"
                    >
                        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5 group-hover:scale-110 transition-transform" alt="Google" />
                        <span className="font-semibold text-stone-600 group-hover:text-ink-900">
                            {isLogin ? 'Sign in with Google' : 'Sign up with Google'}
                        </span>
                    </button>

                    <div className="relative mb-8">
                        <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-stone-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white text-stone-400 uppercase tracking-[0.15em] text-[10px] font-bold">Or continue with email</span>
                        </div>
                    </div>

                    {error && (
                        <div className="mb-5 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-2.5 text-red-600 text-sm">
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            {error}
                        </div>
                    )}

                    {message && (
                        <div className="mb-5 p-4 bg-green-50 border border-green-100 rounded-xl flex items-center gap-2.5 text-green-700 text-sm">
                            <CheckCircle2 className="w-4 h-4 shrink-0" />
                            <span>{message}</span>
                        </div>
                    )}

                    <form onSubmit={handleAuth} className="space-y-5">
                        {!isLogin && (
                            <Input 
                                label="Full Name"
                                placeholder="e.g. Jane Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        )}
                        <Input 
                            label="Email Address"
                            type="email" 
                            placeholder="name@university.edu" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <div className="space-y-1.5">
                            <Input 
                                label="Password"
                                type="password" 
                                placeholder="••••••••" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            {isLogin && (
                                <div className="flex justify-end">
                                    <button 
                                        type="button"
                                        onClick={() => setView('forgot-password')} 
                                        className="text-xs text-stone-400 hover:text-academic-accent transition-colors"
                                    >
                                        Forgot password?
                                    </button>
                                </div>
                            )}
                        </div>

                        <Button 
                            type="submit" 
                            className="w-full !py-4 !rounded-xl !text-base shadow-lg shadow-ink-900/10 group"
                            isLoading={isLoading}
                        >
                        {isLogin ? 'Sign In' : 'Create Account'}
                        {!isLoading && <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />}
                        </Button>
                    </form>

                    <p className="mt-10 text-center text-stone-500 text-sm">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <Link 
                            to={isLogin ? "/signup" : "/login"} 
                            className="font-bold text-ink-900 hover:text-academic-accent transition-colors"
                            onClick={() => { setError(''); setMessage(''); }}
                        >
                        {isLogin ? "Sign up" : "Log in"}
                        </Link>
                    </p>
                </motion.div>
            ) : (
                <motion.div
                    key="forgot-password-form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                >
                    <button 
                        onClick={() => setView('auth')}
                        className="flex items-center gap-2 text-stone-500 hover:text-ink-900 mb-6 text-sm font-medium"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to login
                    </button>

                    <h1 className="font-serif text-3xl mb-3">
                        Reset Password
                    </h1>
                    <p className="text-stone-500 mb-8">
                        Enter your email address and we'll send you a link to reset your password.
                    </p>

                    {error && (
                        <div className="mb-5 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-2.5 text-red-600 text-sm">
                            <AlertCircle className="w-4 h-4" />
                            {error}
                        </div>
                    )}

                    {message && (
                        <div className="mb-5 p-4 bg-green-50 border border-green-100 rounded-xl flex items-center gap-2.5 text-green-700 text-sm">
                            <CheckCircle2 className="w-4 h-4" />
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleForgotPassword} className="space-y-5">
                         <Input 
                            label="Email Address"
                            type="email" 
                            placeholder="name@university.edu" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                         <Button 
                            type="submit" 
                            className="w-full !py-4 !rounded-xl !text-base"
                            isLoading={isLoading}
                        >
                            Send Reset Link
                        </Button>
                    </form>
                </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Right Panel - Visual */}
      <div className="hidden lg:flex w-1/2 bg-ink-900 text-white relative overflow-hidden items-center justify-center p-12">
        {/* Background Effects */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-academic-blue/15 blur-[150px] rounded-full translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-academic-accent/8 blur-[120px] rounded-full -translate-x-1/3 translate-y-1/3" />
        <div className="absolute inset-0 grain-overlay" />

        <div className="relative z-10 max-w-lg">
            <div className="w-14 h-14 mb-10 bg-white/8 backdrop-blur-sm border border-white/10 rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-7 h-7 text-academic-accent" />
            </div>
            <blockquote className="font-serif text-4xl leading-tight mb-10">
                "Thesis allows me to focus on the argument, not the formatting. It is the silent partner every researcher needs."
            </blockquote>
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-academic-accent/40 to-academic-blue/30 border-2 border-white/10" />
                <div>
                    <div className="font-semibold text-lg">Dr. Elena Rostova</div>
                    <div className="text-sm text-stone-400">Department of Anthropology, Cambridge</div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;