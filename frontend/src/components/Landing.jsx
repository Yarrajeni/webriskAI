import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, Zap, Globe, BarChart3, Lock } from 'lucide-react';

const Landing = ({ onGetStarted, onSignIn }) => {
  return (
    <div style={{ 
      width: '100vw', 
      minHeight: '100vh', 
      background: 'var(--bg-primary)',
      color: 'white',
      overflowX: 'hidden',
      position: 'relative'
    }}>
      {/* 3D Background Elements */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
        <motion.div 
          animate={{ 
            rotateX: [0, 10, 0], 
            rotateY: [0, 20, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ 
            position: 'absolute', 
            top: '10%', 
            left: '10%', 
            width: '400px', 
            height: '400px', 
            background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(60px)'
          }} 
        />
        <motion.div 
          animate={{ 
            rotateX: [0, -15, 0], 
            rotateY: [0, -25, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          style={{ 
            position: 'absolute', 
            bottom: '10%', 
            right: '10%', 
            width: '500px', 
            height: '500px', 
            background: 'radial-gradient(circle, rgba(129, 140, 248, 0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(80px)'
          }} 
        />
      </div>

      {/* Navbar */}
      <nav style={{ 
        padding: '2rem 4rem', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Zap color="var(--accent-primary)" fill="var(--accent-primary)" size={32} />
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>RiskAI <span style={{ color: 'var(--accent-primary)' }}>MLOps</span></h2>
        </div>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <span style={{ cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Solutions</span>
          <span style={{ cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Enterprise</span>
          <button 
            onClick={onSignIn}
            style={{ 
              background: 'transparent', 
              border: 'none', 
              color: 'white', 
              fontWeight: 700, 
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            Sign In
          </button>
          <button 
            onClick={onGetStarted}
            style={{ 
              background: 'var(--accent-primary)', 
              color: 'white', 
              padding: '0.75rem 1.5rem', 
              borderRadius: '12px', 
              border: 'none', 
              fontWeight: 700, 
              cursor: 'pointer',
              boxShadow: '0 10px 20px rgba(56, 189, 248, 0.3)'
            }}
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ 
        padding: '6rem 4rem', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        textAlign: 'center',
        position: 'relative',
        zIndex: 10
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span style={{ 
            padding: '6px 16px', 
            borderRadius: '20px', 
            background: 'var(--bg-tertiary)', 
            border: '1px solid var(--border-color)',
            fontSize: '0.8rem',
            fontWeight: 700,
            color: 'var(--accent-primary)',
            letterSpacing: '0.1em',
            marginBottom: '2rem',
            display: 'inline-block'
          }}>
            NEXT-GEN RISK INTELLIGENCE
          </span>
          <h1 style={{ 
            fontSize: '5rem', 
            lineHeight: 1, 
            marginBottom: '1.5rem', 
            maxWidth: '900px',
            background: 'linear-gradient(to bottom, #fff 40%, rgba(255,255,255,0.4))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Resilient AI for High-Stakes Finance
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            color: 'var(--text-secondary)', 
            maxWidth: '650px', 
            margin: '0 auto 3rem',
            lineHeight: 1.6
          }}>
            An automated MLOps pipeline designed to predict, monitor, and mitigate financial risk with surgical precision and regulatory compliance.
          </p>
          
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
            <button 
              onClick={onGetStarted}
              style={{ 
                padding: '1.25rem 2.5rem', 
                borderRadius: '16px', 
                background: 'var(--accent-primary)', 
                color: 'white', 
                border: 'none', 
                fontSize: '1.1rem', 
                fontWeight: 800, 
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              Start Free Trial <ArrowRight size={20} />
            </button>
            <button style={{ 
              padding: '1.25rem 2.5rem', 
              borderRadius: '16px', 
              background: 'rgba(255,255,255,0.05)', 
              color: 'white', 
              border: '1px solid var(--border-color)', 
              fontSize: '1.1rem', 
              fontWeight: 800, 
              cursor: 'pointer'
            }}>
              View Documentation
            </button>
          </div>
        </motion.div>

        {/* 3D Intro Visual */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotateX: 20 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="glass"
          style={{ 
            marginTop: '6rem', 
            width: '100%', 
            maxWidth: '1000px', 
            height: '500px',
            padding: '2rem',
            position: 'relative',
            transform: 'perspective(1000px) rotateX(10deg)',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 50px 100px rgba(0,0,0,0.8)'
          }}
        >
          <div style={{ display: 'flex', gap: '2rem', height: '100%' }}>
            <div style={{ flex: 1.5, background: 'rgba(0,0,0,0.3)', borderRadius: '12px', padding: '1.5rem', textAlign: 'left' }}>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '2rem' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }}></div>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></div>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }}></div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ height: '20px', width: '60%', background: 'var(--bg-tertiary)', borderRadius: '4px' }}></div>
                <div style={{ height: '20px', width: '80%', background: 'var(--bg-tertiary)', borderRadius: '4px' }}></div>
                <div style={{ height: '20px', width: '40%', background: 'var(--bg-tertiary)', borderRadius: '4px' }}></div>
                <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                  <div style={{ flex: 1, height: '100px', background: 'rgba(56, 189, 248, 0.1)', border: '1px solid var(--accent-primary)', borderRadius: '8px' }}></div>
                  <div style={{ flex: 1, height: '100px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid var(--risk-low)', borderRadius: '8px' }}></div>
                </div>
              </div>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div className="glass" style={{ flex: 1, padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <BarChart3 size={48} color="var(--accent-secondary)" />
                <p style={{ marginTop: '1rem', fontWeight: 700 }}>Real-time Analytics</p>
              </div>
              <div className="glass" style={{ flex: 1, padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Lock size={48} color="var(--risk-low)" />
                <p style={{ marginTop: '1rem', fontWeight: 700 }}>Secure Governance</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section style={{ padding: '8rem 4rem', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3rem' }}>
          {[
            { icon: Globe, title: 'Global Market AI', desc: 'Predictive intelligence across 50+ global exchanges and asset classes.' },
            { icon: ShieldCheck, title: 'Compliance First', desc: 'Audit-ready reports and bias detection for strict regulatory standards.' },
            { icon: Zap, title: 'Auto-MLOps', desc: 'Automated retraining and drift detection for zero-latency model health.' }
          ].map((f, i) => (
            <div key={i} style={{ textAlign: 'left' }}>
              <div style={{ width: '50px', height: '50px', background: 'var(--bg-tertiary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <f.icon color="var(--accent-primary)" />
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{f.title}</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Landing;
