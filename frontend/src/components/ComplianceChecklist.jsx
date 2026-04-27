import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Circle, 
  Lock, 
  FileText, 
  History, 
  AlertTriangle,
  ClipboardCheck,
  Search
} from 'lucide-react';
import { motion } from 'framer-motion';

const ComplianceChecklist = () => {
  const [items, setItems] = useState([
    { id: 1, title: 'Basel III Capital Adequacy', category: 'Regulatory', status: 'verified', desc: 'Ensure risk-weighted assets are within required capital ratios.' },
    { id: 2, title: 'GDPR Data Anonymization', category: 'Privacy', status: 'verified', desc: 'All PII data in the MLOps pipeline must be hashed or anonymized.' },
    { id: 3, title: 'Model Bias Audit (Fairness)', category: 'Ethical AI', status: 'pending', desc: 'Perform disparity analysis across demographic protected groups.' },
    { id: 4, title: 'Immutable Audit Logging', category: 'Governance', status: 'verified', desc: 'All assessment decisions must be saved to a non-volatile ledger.' },
    { id: 5, title: 'AML Transaction Scrubbing', category: 'Compliance', status: 'pending', desc: 'Cross-reference assessments with global Anti-Money Laundering watchlists.' },
  ]);

  const toggleItem = (id) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, status: item.status === 'verified' ? 'pending' : 'verified' } : item
    ));
  };

  const progress = (items.filter(i => i.status === 'verified').length / items.length) * 100;

  return (
    <div className="fade-in" style={{ padding: '2rem' }}>
      <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Compliance Governance</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Standardized regulatory tracking for high-stakes financial model deployment.</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ margin: '0 0 8px', fontSize: '0.8rem', fontWeight: 800 }}>AUDIT READINESS</p>
          <div style={{ width: '200px', height: '10px', background: 'var(--bg-tertiary)', borderRadius: '10px', overflow: 'hidden' }}>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              style={{ height: '100%', background: progress > 70 ? 'var(--risk-low)' : 'var(--risk-medium)' }}
            />
          </div>
          <p style={{ margin: '8px 0 0', fontSize: '0.75rem', color: 'var(--text-muted)' }}>{items.filter(i => i.status === 'verified').length} / {items.length} Modules Verified</p>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
        <div className="glass" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="text" placeholder="Search regulations..." 
                style={{ width: '100%', padding: '0.85rem 1rem 0.85rem 2.5rem', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', color: 'white' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {items.map((item) => (
              <div 
                key={item.id} 
                onClick={() => toggleItem(item.id)}
                style={{ 
                  padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border-color)',
                  background: 'rgba(255,255,255,0.02)', cursor: 'pointer', transition: 'var(--transition-smooth)',
                  display: 'flex', gap: '1.5rem', alignItems: 'flex-start'
                }}
              >
                <div style={{ marginTop: '4px' }}>
                  {item.status === 'verified' ? (
                    <CheckCircle2 color="var(--risk-low)" size={24} />
                  ) : (
                    <Circle color="var(--text-muted)" size={24} />
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <h4 style={{ margin: 0 }}>{item.title}</h4>
                    <span style={{ fontSize: '0.65rem', padding: '4px 8px', borderRadius: '6px', background: 'var(--bg-tertiary)', color: 'var(--text-muted)', fontWeight: 800 }}>{item.category.toUpperCase()}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="glass" style={{ padding: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <History size={20} color="var(--accent-primary)" /> Recent Audit Actions
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {[
                { action: 'Database backup completed', time: '2h ago', user: 'Admin' },
                { action: 'XAI Model Weights verified', time: '5h ago', user: 'Auditor' },
                { action: 'Compliance sign-off: Basel III', time: '1d ago', user: 'Risk Officer' }
              ].map((log, i) => (
                <div key={i} style={{ fontSize: '0.85rem', borderLeft: '2px solid var(--border-color)', paddingLeft: '1.5rem', position: 'relative' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-primary)', position: 'absolute', left: '-5px', top: '6px' }}></div>
                  <p style={{ margin: 0, fontWeight: 700 }}>{log.action}</p>
                  <p style={{ margin: 0, fontSize: '0.7rem', color: 'var(--text-muted)' }}>{log.time} • By {log.user}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass" style={{ padding: '2rem', background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.1), transparent)' }}>
            <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShieldCheck size={20} color="var(--accent-primary)" /> System Integrity
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.6 }}>
              The MLOps pipeline is currently operating within the "Basel III" and "GDPR" compliance envelopes. One manual sign-off required for <strong>Ethical AI Audit</strong>.
            </p>
            <button style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: 'none', background: 'var(--accent-primary)', color: 'white', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              <ClipboardCheck size={18} /> Run Full Audit Scan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceChecklist;
