import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Phone, 
  Mail, 
  ShieldCheck, 
  Key, 
  ArrowRight, 
  Loader2, 
  UserCircle, 
  Fingerprint,
  Lock,
  ArrowLeft,
  Zap,
  Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGoogleLogin } from '@react-oauth/google';

const Auth = ({ onLogin, initialMode = 'signin' }) => {
  const [mode, setMode] = useState(initialMode); // 'signin' or 'signup'
  const [method, setMethod] = useState(null); 
  const [step, setStep] = useState('choice'); 
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChoice = (choice) => {
    if (choice === 'guest') {
      onLogin({ role: 'guest', name: 'Guest User' });
    } else {
      setMethod(choice);
      setStep('input');
    }
  };

  const handleSubmitInput = async (e) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (method === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setError('Please enter a valid email address.');
        return;
      }
    } else if (method === 'phone') {
      if (value.length < 10) {
        setError('Please enter a valid phone number.');
        return;
      }
    }

    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      await axios.post(`${apiUrl}/auth/send-otp`, {
        identifier: value,
        method: method
      });
      setStep(mode === 'signup' ? 'otp' : 'password_login');
      setTimer(60);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to send verification code.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitOtp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      await axios.post(`${apiUrl}/auth/verify-otp`, {
        identifier: value,
        code: otp
      });
      setStep('password_setup');
    } catch (err) {
      setError(err.response?.data?.detail || 'Invalid verification code.');
    } finally {
      setLoading(false);
    }
  };

  const handleAuthComplete = async (role = 'user') => {
    setError('');
    setLoading(true);
    const apiUrl = import.meta.env.VITE_API_URL || '';
    
    try {
      if (mode === 'signup') {
        // Extract name from email or set a friendly default for phone
        const extractedName = method === 'email' 
          ? (value.split('@')[0].charAt(0).toUpperCase() + value.split('@')[0].slice(1)) 
          : `Member ${value.slice(-4)}`;

        const payload = {
          password,
          role,
          name: extractedName,
          [method]: value
        };
        await axios.post(`${apiUrl}/auth/register`, payload);
      }
      
      // Login attempt
      const loginPayload = {
        password,
        [method]: value
      };
      const response = await axios.post(`${apiUrl}/auth/login`, loginPayload);
      onLogin(response.data);
    } catch (err) {
      const errorMessage = err.response?.data?.detail || 'Authentication failed. Please check your credentials.';
      setError(errorMessage);
      // If registration failed because user exists, maybe they should be in signin mode
      if (errorMessage.includes('already exists')) {
        setMode('signin');
        setStep('choice');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      setError('');
      try {
        const apiUrl = import.meta.env.VITE_API_URL || '';
        const response = await axios.post(`${apiUrl}/auth/google`, {
          token: tokenResponse.access_token
        });
        onLogin(response.data);
      } catch (err) {
        setError(err.response?.data?.detail || 'Google authentication failed.');
      } finally {
        setLoading(false);
      }
    },
    onError: () => {
      setError('Google Login failed. Please try again.');
    }
  });

  const renderStep = () => {
    switch (step) {
      case 'choice':
        return (
          <div className="fade-in">
            <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', textAlign: 'center' }}>
              {mode === 'signup' ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', textAlign: 'center' }}>
              {mode === 'signup' ? 'Join the next generation of risk intelligence.' : 'Access your secure MLOps dashboard.'}
            </p>
            
            {error && (
              <div style={{ padding: '0.75rem', borderRadius: '8px', background: 'rgba(244, 63, 94, 0.1)', color: 'var(--risk-high)', fontSize: '0.85rem', marginBottom: '1.5rem', textAlign: 'center', border: '1px solid var(--risk-high)' }}>
                {error}
              </div>
            )}
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <button onClick={() => handleGoogleLogin()} className="glass" style={{
                display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.25rem', width: '100%',
                border: '1px solid var(--accent-primary)', background: 'rgba(56, 189, 248, 0.05)', color: 'white',
                borderRadius: '16px', cursor: 'pointer', textAlign: 'left', position: 'relative', overflow: 'hidden'
              }}>
                <div style={{ background: 'white', padding: '0.75rem', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 800, margin: 0 }}>Continue with Google</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>One-click secure Gmail access</p>
                </div>
                <div style={{ 
                  position: 'absolute', right: '-10px', top: '-10px', width: '60px', height: '60px', 
                  background: 'var(--accent-primary)', opacity: 0.05, borderRadius: '50%' 
                }}></div>
              </button>

              <button onClick={() => handleChoice('email')} className="glass" style={{
                display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.25rem', width: '100%',
                border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.02)', color: 'white',
                borderRadius: '16px', cursor: 'pointer', textAlign: 'left'
              }}>
                <div style={{ background: 'var(--accent-glow)', padding: '0.75rem', borderRadius: '12px' }}>
                  <Mail size={24} color="var(--accent-primary)" />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 700, margin: 0 }}>Login with Email ID</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>Secure access via password</p>
                </div>
                <ArrowRight size={20} color="var(--text-muted)" />
              </button>

              <button onClick={() => handleChoice('phone')} className="glass" style={{
                display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.25rem', width: '100%',
                border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.02)', color: 'white',
                borderRadius: '16px', cursor: 'pointer', textAlign: 'left'
              }}>
                <div style={{ background: 'var(--accent-glow)', padding: '0.75rem', borderRadius: '12px' }}>
                  <Phone size={24} color="var(--accent-secondary)" />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 700, margin: 0 }}>Phone Number (India)</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>Fast OTP login via +91 mobile</p>
                </div>
                <ArrowRight size={20} color="var(--text-muted)" />
              </button>

              {mode === 'signin' && (
                <button onClick={() => handleChoice('guest')} style={{
                  width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)',
                  background: 'transparent', color: 'var(--text-secondary)', fontWeight: 600, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '0.5rem'
                }}>
                  <UserCircle size={18} />
                  Continue as Guest
                </button>
              )}
            </div>

            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                {mode === 'signup' ? 'Already have an account?' : "Don't have an account?"}
                <span 
                  onClick={() => setMode(mode === 'signup' ? 'signin' : 'signup')}
                  style={{ color: 'var(--accent-primary)', marginLeft: '8px', cursor: 'pointer', fontWeight: 700 }}
                >
                  {mode === 'signup' ? 'Sign In' : 'Sign Up'}
                </span>
              </p>
            </div>
          </div>
        );

      case 'input':
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="fade-in">
            <button onClick={() => setStep('choice')} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '1.5rem' }}>
              <ArrowLeft size={16} /> Back
            </button>
            <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>
              {method === 'phone' ? 'Mobile Number' : 'Work Email'}
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Enter your {method} to continue.
            </p>

            {error && (
              <div style={{ padding: '0.75rem', borderRadius: '8px', background: 'rgba(244, 63, 94, 0.1)', color: 'var(--risk-high)', fontSize: '0.85rem', marginBottom: '1.5rem', border: '1px solid var(--risk-high)' }}>
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmitInput}>
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ position: 'relative' }}>
                  {method === 'phone' ? <Phone size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} /> : <Mail size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />}
                  <input 
                    type={method === 'phone' ? 'tel' : 'email'} 
                    required 
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder={method === 'phone' ? '+91 99999-99999' : 'yourname@email.com'}
                    style={{ width: '100%', padding: '0.85rem 0.85rem 0.85rem 2.5rem', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'white' }}
                  />
                </div>
              </div>
              <button 
                type="submit" 
                disabled={loading}
                style={{ 
                  width: '100%', padding: '1rem', borderRadius: '12px', border: 'none', background: 'var(--accent-primary)', 
                  color: 'white', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'
                }}
              >
                {loading ? <Loader2 size={20} className="animate-spin" /> : <ShieldCheck size={20} />}
                {mode === 'signup' ? 'Send OTP' : 'Continue'}
              </button>
            </form>
          </motion.div>
        );

      case 'password_login':
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="fade-in">
             <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Verify Password</h2>
             <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Welcome back, {value}. Please enter your password.</p>
             {error && (
              <div style={{ padding: '0.75rem', borderRadius: '8px', background: 'rgba(244, 63, 94, 0.1)', color: 'var(--risk-high)', fontSize: '0.85rem', marginBottom: '1.5rem', border: '1px solid var(--risk-high)' }}>
                {error}
              </div>
            )}
             <form onSubmit={(e) => { e.preventDefault(); handleAuthComplete(); }}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ position: 'relative' }}>
                    <Lock size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input 
                      type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
                      style={{ width: '100%', padding: '0.85rem 0.85rem 0.85rem 2.5rem', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'white' }}
                    />
                  </div>
                </div>
                <button type="submit" style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: 'none', background: 'var(--accent-primary)', color: 'white', fontWeight: 700, cursor: 'pointer' }}>
                  Sign In
                </button>
             </form>
          </motion.div>
        );

      case 'otp':
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="fade-in">
            <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Security Code</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>Sent to {value}.</p>
            <div style={{ padding: '0.75rem', borderRadius: '8px', background: 'rgba(56, 189, 248, 0.1)', color: 'var(--accent-primary)', fontSize: '0.85rem', marginBottom: '1.5rem', textAlign: 'center', border: '1px solid var(--accent-primary)' }}>
              <strong>Demo Mode:</strong> Please enter <strong>123456</strong> to proceed.
            </div>
            <form onSubmit={handleSubmitOtp}>
              <input 
                type="text" maxLength="6" required value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="000000"
                style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'white', textAlign: 'center', fontSize: '1.5rem', letterSpacing: '0.5rem', fontWeight: 800, marginBottom: '1.5rem' }}
              />
              <button type="submit" style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: 'none', background: 'var(--accent-primary)', color: 'white', fontWeight: 700, cursor: 'pointer' }}>
                Verify & Continue
              </button>
            </form>
          </motion.div>
        );

      case 'password_setup':
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="fade-in">
            <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Create Password</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Set a secure password for future logins.</p>
            <form onSubmit={(e) => { e.preventDefault(); setStep('role_select'); }}>
              <input 
                type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New Password"
                style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'white', marginBottom: '1.5rem', width: '100%' }}
              />
              <button type="submit" style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: 'none', background: 'var(--risk-low)', color: 'white', fontWeight: 700, cursor: 'pointer' }}>
                Complete Registration
              </button>
            </form>
          </motion.div>
        );

      case 'role_select':
        return (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="fade-in">
            <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', textAlign: 'center' }}>Choose Workspace</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', textAlign: 'center' }}>Select your primary functional role.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
              <button onClick={() => handleAuthComplete('user')} className="glass" style={{
                padding: '1.25rem', borderRadius: '16px', border: '1px solid var(--accent-primary)',
                background: 'rgba(56, 189, 248, 0.05)', color: 'white', cursor: 'pointer', textAlign: 'left',
                display: 'flex', alignItems: 'center', gap: '12px'
              }}>
                <div style={{ background: 'var(--accent-primary)', padding: '8px', borderRadius: '8px' }}><Zap size={20} /></div>
                <div>
                  <p style={{ fontWeight: 800, margin: 0 }}>Business User / Analyst</p>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', margin: 0 }}>Full Risk Suite: Scoring, Markets, Alerts</p>
                </div>
              </button>

              <button onClick={() => handleAuthComplete('admin')} className="glass" style={{
                padding: '1.25rem', borderRadius: '16px', border: '1px solid var(--border-color)',
                background: 'rgba(255,255,255,0.02)', color: 'white', cursor: 'pointer', textAlign: 'left',
                display: 'flex', alignItems: 'center', gap: '12px'
              }}>
                <div style={{ background: 'var(--bg-tertiary)', padding: '8px', borderRadius: '8px' }}><Settings size={20} /></div>
                <div>
                  <p style={{ fontWeight: 800, margin: 0 }}>System Admin / Auditor</p>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', margin: 0 }}>MLOps: Monitoring, Pipeline, Audit Logs</p>
                </div>
              </button>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div style={{ 
      width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--bg-primary)',
      backgroundImage: 'radial-gradient(at 50% 50%, rgba(56, 189, 248, 0.1) 0px, transparent 50%)'
    }}>
      <div className="glass float" style={{ 
        width: '100%', maxWidth: '440px', padding: '3rem 2.5rem', 
        border: '1px solid var(--glass-border)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem' }}>
          <div style={{ 
            background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
            width: '60px', height: '60px', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 30px rgba(56, 189, 248, 0.4)'
          }}>
            <ShieldCheck color="white" size={32} />
          </div>
        </div>
        {renderStep()}
      </div>
    </div>
  );
};

export default Auth;
