import React, { useState } from 'react';
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

const Auth = ({ onLogin, initialMode = 'signin' }) => {
  const [mode, setMode] = useState(initialMode); // 'signin' or 'signup'
  const [method, setMethod] = useState(null); 
  const [step, setStep] = useState('choice'); 
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');

  const handleChoice = (choice) => {
    if (choice === 'guest') {
      onLogin({ role: 'user', name: 'Guest User' });
    } else {
      setMethod(choice);
      setStep('input');
    }
  };

  const handleSubmitInput = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(mode === 'signup' ? 'otp' : 'password_login');
    }, 1200);
  };

  const handleSubmitOtp = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('password_setup');
    }, 1200);
  };

  const handleAuthComplete = (role = 'user') => {
    onLogin({ 
      role: role, 
      name: value.split('@')[0] || 'Member',
      method 
    });
  };

  const renderStep = () => {
    switch (step) {
      case 'choice':
        return (
          <div className="fade-in">
            <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', textAlign: 'center' }}>
              {mode === 'signup' ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', textAlign: 'center' }}>
              {mode === 'signup' ? 'Join the next generation of risk intelligence.' : 'Access your secure MLOps dashboard.'}
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>Secure access via verified work/personal mail</p>
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
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              Enter your {method} to continue.
            </p>
            
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
             <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Welcome back, {value}. Please enter your password.</p>
             <form onSubmit={(e) => { e.preventDefault(); setStep('role_select'); }}>
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
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Sent to {value}.</p>
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
