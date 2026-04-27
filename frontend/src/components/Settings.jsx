import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Shield, 
  Cpu, 
  Bell, 
  Palette, 
  Lock, 
  User, 
  Save,
  RefreshCcw,
  Sliders,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { motion } from 'framer-motion';

const Settings = ({ user }) => {
  const [thresholds, setThresholds] = useState({ high: 70, medium: 40 });
  const [model, setModel] = useState('Ensemble-XG-v2');
  const [notifications, setNotifications] = useState({ risk: true, market: true, system: false });
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('System configuration updated successfully.');
    }, 1500);
  };

  return (
    <div className="fade-in" style={{ padding: '2rem', maxWidth: '1000px' }}>
      <header style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Strategic Governance</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Configure enterprise risk thresholds, model parameters, and global system behavior.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
        {/* Profile Summary */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="glass" style={{ padding: '2rem', textAlign: 'center' }}>
            <div style={{ 
              width: '80px', height: '80px', borderRadius: '50%', background: 'var(--bg-tertiary)', 
              margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '2px solid var(--accent-primary)', boxShadow: '0 0 20px var(--accent-glow)'
            }}>
              <User size={40} color="var(--accent-primary)" />
            </div>
            <h3 style={{ margin: 0, textTransform: 'capitalize' }}>{user.name}</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.5rem', textTransform: 'uppercase' }}>{user.role}</p>
            <button style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'transparent', color: 'white', fontSize: '0.85rem', cursor: 'pointer' }}>Edit Profile</button>
          </div>

          <div className="glass" style={{ padding: '1.5rem' }}>
            <h4 style={{ fontSize: '0.9rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Lock size={16} color="var(--risk-low)" /> Security Status
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>2FA Status</span>
                <span style={{ color: 'var(--risk-low)', fontWeight: 700 }}>ACTIVE</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Last Login</span>
                <span style={{ color: 'var(--text-primary)' }}>14m ago</span>
              </div>
            </div>
          </div>
        </div>

        {/* Configuration Tabs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Risk Thresholds */}
          <div className="glass" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Shield size={20} color="var(--accent-primary)" /> Risk Governance
              </h3>
              <button style={{ background: 'transparent', border: 'none', color: 'var(--accent-primary)', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}>Reset to Baseline</button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <label style={{ fontSize: '0.9rem', fontWeight: 600 }}>High Risk Threshold</label>
                  <span style={{ color: 'var(--risk-high)', fontWeight: 800 }}>{thresholds.high}%</span>
                </div>
                <input 
                  type="range" min="50" max="95" value={thresholds.high} 
                  onChange={(e) => setThresholds({...thresholds, high: e.target.value})}
                  style={{ width: '100%', accentColor: 'var(--risk-high)' }}
                />
                <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '8px' }}>Scores above this level will trigger immediate automated review.</p>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <label style={{ fontSize: '0.9rem', fontWeight: 600 }}>Medium Risk Threshold</label>
                  <span style={{ color: 'var(--risk-medium)', fontWeight: 800 }}>{thresholds.medium}%</span>
                </div>
                <input 
                  type="range" min="10" max="49" value={thresholds.medium} 
                  onChange={(e) => setThresholds({...thresholds, medium: e.target.value})}
                  style={{ width: '100%', accentColor: 'var(--risk-medium)' }}
                />
              </div>
            </div>
          </div>

          {/* Model Configuration */}
          <div className="glass" style={{ padding: '2rem' }}>
            <h3 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Cpu size={20} color="var(--accent-secondary)" /> Model Versioning (A/B)
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { id: 'Ensemble-XG-v2', label: 'Production Champion', desc: 'Weighted Ensemble XGBoost (94.2% Acc)', current: true },
                { id: 'Neural-LSTM-v1', label: 'Staging Challenger', desc: 'Deep Neural Network (93.8% Acc)', current: false },
                { id: 'Hybrid-RF-v3', label: 'Legacy Baseline', desc: 'Random Forest (91.5% Acc)', current: false }
              ].map(m => (
                <div 
                  key={m.id} 
                  onClick={() => setModel(m.id)}
                  style={{ 
                    padding: '1.25rem', borderRadius: '16px', border: '1px solid var(--border-color)',
                    background: model === m.id ? 'rgba(129, 140, 248, 0.1)' : 'rgba(255,255,255,0.02)',
                    cursor: 'pointer', border: model === m.id ? '1px solid var(--accent-secondary)' : '1px solid var(--border-color)',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                  }}
                >
                  <div>
                    <p style={{ fontWeight: 800, margin: 0, fontSize: '0.9rem' }}>{m.label}</p>
                    <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', margin: 0 }}>{m.desc}</p>
                  </div>
                  {model === m.id ? <ToggleRight color="var(--accent-secondary)" size={28} /> : <ToggleLeft color="var(--text-muted)" size={28} />}
                </div>
              ))}
            </div>
          </div>

          {/* Preferences */}
          <div className="glass" style={{ padding: '2rem' }}>
            <h3 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Palette size={20} color="var(--accent-primary)" /> System Preferences
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontWeight: 700, margin: 0, fontSize: '0.85rem' }}>Real-time Notifications</p>
                  <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', margin: 0 }}>Push alerts for critical events</p>
                </div>
                <ToggleRight color="var(--accent-primary)" size={24} style={{ cursor: 'pointer' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontWeight: 700, margin: 0, fontSize: '0.85rem' }}>Anonymize Data</p>
                  <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', margin: 0 }}>GDPR-compliant logging</p>
                </div>
                <ToggleLeft color="var(--text-muted)" size={24} style={{ cursor: 'pointer' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gridColumn: 'span 2', marginTop: '1rem', padding: '1rem', background: 'rgba(56, 189, 248, 0.05)', borderRadius: '12px', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--accent-primary)', boxShadow: '0 0 10px var(--accent-primary)' }}></div>
                  <div>
                    <p style={{ fontWeight: 700, margin: 0, fontSize: '0.85rem' }}>Assigned Platform Agent</p>
                    <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', margin: 0 }}>Antigravity AI (Active Support)</p>
                  </div>
                </div>
                <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Verified Enterprise</span>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <button 
            onClick={handleSave}
            disabled={isSaving}
            style={{ 
              width: '100%', padding: '1.25rem', borderRadius: '16px', border: 'none', 
              background: 'var(--accent-primary)', color: 'white', fontWeight: 800, 
              cursor: isSaving ? 'not-allowed' : 'pointer', fontSize: '1.1rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
              boxShadow: '0 10px 20px rgba(56, 189, 248, 0.3)'
            }}
          >
            {isSaving ? <RefreshCcw className="animate-spin" size={20} /> : <Save size={20} />}
            {isSaving ? 'Synchronizing System...' : 'Save Global Configuration'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
