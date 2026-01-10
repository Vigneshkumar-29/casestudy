import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';
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
            className="absolute top-8 left-8 flex items-center gap-2 cursor-pointer group"
        >
            <div className="w-8 h-8 bg-ink-900 rounded-lg flex items-center justify-center text-stone-50 font-serif italic font-bold text-xl shadow-md group-hover:scale-105 transition-transform">T</div>
            <span className="font-serif font-bold text-xl tracking-tight">Thesis</span>
        </div>

        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
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
                    <h1 className="font-serif text-4xl font-medium mb-3">
                        {isLogin ? 'Welcome back.' : 'Start your masterpiece.'}
                    </h1>
                    <p className="text-stone-500 mb-8 text-lg">
                        {isLogin 
                        ? 'Enter your credentials to access your workspace.' 
                        : 'Join the academic platform designed for excellence.'}
                    </p>

                    <button 
                        onClick={handleGoogleAuth}
                        type="button"
                        className="w-full flex items-center justify-center gap-3 px-6 py-3.5 border border-stone-200 rounded-xl hover:bg-stone-50 transition-colors mb-6 group"
                    >
                        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5 group-hover:scale-110 transition-transform" alt="Google" />
                        <span className="font-medium text-stone-600 group-hover:text-ink-900">
                            {isLogin ? 'Sign in with Google' : 'Sign up with Google'}
                        </span>
                    </button>

                    <div className="relative mb-8">
                        <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-stone-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white text-stone-400 uppercase tracking-wider text-xs font-semibold">Or continue with email</span>
                        </div>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-lg flex items-center gap-2 text-red-600 text-sm">
                            <AlertCircle className="w-4 h-4" />
                            {error}
                        </div>
                    )}

                    {message && (
                        <div className="mb-4 p-3 bg-green-50 border border-green-100 rounded-lg flex items-center gap-2 text-green-700 text-sm">
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
                        <div className="space-y-1">
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
                                        className="text-xs text-stone-400 hover:text-academic-blue transition-colors"
                                    >
                                        Forgot password?
                                    </button>
                                </div>
                            )}
                        </div>

                        <Button 
                            type="submit" 
                            className="w-full !py-4 !rounded-xl !text-base shadow-lg shadow-ink-900/20"
                            isLoading={isLoading}
                        >
                        {isLogin ? 'Sign In' : 'Create Account'}
                        {!isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
                        </Button>
                    </form>

                    <p className="mt-8 text-center text-stone-500 text-sm">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <Link 
                            to={isLogin ? "/signup" : "/login"} 
                            className="font-semibold text-ink-900 hover:text-academic-blue transition-colors hover:underline"
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
                        className="flex items-center gap-2 text-stone-500 hover:text-ink-900 mb-6 text-sm"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to login
                    </button>

                    <h1 className="font-serif text-3xl font-medium mb-3">
                        Reset Password
                    </h1>
                    <p className="text-stone-500 mb-8">
                        Enter your email address and we'll send you a link to reset your password.
                    </p>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-lg flex items-center gap-2 text-red-600 text-sm">
                            <AlertCircle className="w-4 h-4" />
                            {error}
                        </div>
                    )}

                    {message && (
                        <div className="mb-4 p-3 bg-green-50 border border-green-100 rounded-lg flex items-center gap-2 text-green-700 text-sm">
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
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-academic-blue/20 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-academic-accent/10 blur-[100px] rounded-full -translate-x-1/3 translate-y-1/3" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.05]" />

        <div className="relative z-10 max-w-lg">
            <div className="w-12 h-12 mb-8 bg-white/10 backdrop-blur border border-white/20 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-academic-accent" />
            </div>
            <blockquote className="font-serif text-4xl leading-tight mb-8">
                "Thesis allows me to focus on the argument, not the formatting. It is the silent partner every researcher needs."
            </blockquote>
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-stone-200 border-2 border-white/10" />
                <div>
                    <div className="font-medium">Dr. Elena Rostova</div>
                    <div className="text-sm text-stone-400">Department of Anthropology, Cambridge</div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;