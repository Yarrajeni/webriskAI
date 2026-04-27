import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  UserCheck, 
  Zap, 
  History, 
  AlertCircle,
  ShieldCheck,
  Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ApprovalQueue = () => {
  const [requests, setRequests] = useState([
    { id: 1, action: 'Adjust High Risk Threshold', detail: '70% -> 85%', requester: 'Risk Analyst A', time: '10m ago', type: 'Config' },
    { id: 2, action: 'Trigger Model Retraining', detail: 'Dataset: q2_training_final.csv', requester: 'Data Scientist B', time: '1h ago', type: 'MLOps' },
    { id: 3, action: 'Update Market Signal Sensitivity', detail: 'Increased weight on VIX volatility', requester: 'Admin C', time: '3h ago', type: 'Market' },
  ]);

  const [history, setHistory] = useState([
    { id: 101, action: 'System Deployment', status: 'Approved', reviewer: 'Senior Admin X', time: '1d ago' },
    { id: 102, action: 'New Fraud Watchlist Import', status: 'Approved', reviewer: 'Compliance Lead', time: '2d ago' },
  ]);

  const handleAction = (id, approved) => {
    const req = requests.find(r => r.id === id);
    if (approved) {
      setHistory([{ ...req, status: 'Approved', reviewer: 'You', time: 'Just now' }, ...history]);
    }
    setRequests(requests.filter(r => r.id !== id));
  };

  return (
    <div className="fade-in" style={{ padding: '2rem' }}>
      <header style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Governance Approval Queue</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Secondary authorization gateway for critical system changes and model deployments.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="glass" style={{ padding: '2rem' }}>
            <h3 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Clock size={20} color="var(--accent-primary)" /> Pending Requests
            </h3>
            
            <AnimatePresence mode="popLayout">
              {requests.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {requests.map((req) => (
                    <motion.div 
                      key={req.id} 
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="glass" 
                      style={{ 
                        padding: '1.5rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)',
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                      }}
                    >
                      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                        <div style={{ 
                          width: '44px', height: '44px', borderRadius: '12px', background: 'var(--bg-tertiary)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                          <Zap size={20} color="var(--accent-primary)" />
                        </div>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <h4 style={{ margin: 0 }}>{req.action}</h4>
                            <span style={{ fontSize: '0.6rem', padding: '2px 6px', borderRadius: '4px', background: 'var(--accent-glow)', color: 'var(--accent-primary)', fontWeight: 800 }}>{req.type}</span>
                          </div>
                          <p style={{ margin: '4px 0', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{req.detail}</p>
                          <p style={{ margin: 0, fontSize: '0.7rem', color: 'var(--text-muted)' }}>By {req.requester} • {req.time}</p>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button 
                          onClick={() => handleAction(req.id, true)}
                          style={{ padding: '0.75rem 1rem', borderRadius: '10px', border: 'none', background: 'var(--risk-low)', color: 'white', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                        >
                          <UserCheck size={18} /> Approve
                        </button>
                        <button 
                          onClick={() => handleAction(req.id, false)}
                          style={{ padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid var(--risk-high)', background: 'transparent', color: 'var(--risk-high)', fontWeight: 700, cursor: 'pointer' }}
                        >
                          <XCircle size={18} /> Reject
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                  <ShieldCheck size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
                  <p>Queue is clear. No critical system changes pending approval.</p>
                </div>
              )}
            </AnimatePresence>
          </div>

          <div className="glass" style={{ padding: '2rem' }}>
            <h3 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <History size={20} color="var(--text-muted)" /> Governance History
            </h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left', fontSize: '0.75rem', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-color)' }}>
                  <th style={{ padding: '1rem' }}>Action</th>
                  <th style={{ padding: '1rem' }}>Reviewer</th>
                  <th style={{ padding: '1rem' }}>Status</th>
                  <th style={{ padding: '1rem' }}>Time</th>
                </tr>
              </thead>
              <tbody>
                {history.map((h) => (
                  <tr key={h.id} style={{ borderBottom: '1px solid var(--border-color)', fontSize: '0.85rem' }}>
                    <td style={{ padding: '1.25rem 1rem', fontWeight: 700 }}>{h.action}</td>
                    <td style={{ padding: '1.25rem 1rem' }}>{h.reviewer}</td>
                    <td style={{ padding: '1.25rem 1rem' }}>
                      <span style={{ color: 'var(--risk-low)', fontWeight: 800 }}>{h.status.toUpperCase()}</span>
                    </td>
                    <td style={{ padding: '1.25rem 1rem', color: 'var(--text-muted)' }}>{h.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="glass" style={{ padding: '2rem', background: 'linear-gradient(135deg, var(--bg-tertiary), transparent)' }}>
            <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <AlertCircle size={20} color="var(--risk-high)" /> Critical Notice
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Actions in this queue impact the live **Production Environment**. Changes to thresholds can affect 10k+ customer assessments instantaneously.
            </p>
          </div>

          <div className="glass" style={{ padding: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Governance Health</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.8rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Compliance Verification</span>
                  <span style={{ color: 'var(--risk-low)' }}>100%</span>
                </div>
                <div style={{ height: '6px', background: 'var(--bg-tertiary)', borderRadius: '10px' }}>
                  <div style={{ width: '100%', height: '100%', background: 'var(--risk-low)' }}></div>
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.8rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Average Approval Time</span>
                  <span style={{ color: 'var(--accent-primary)' }}>12m</span>
                </div>
                <div style={{ height: '6px', background: 'var(--bg-tertiary)', borderRadius: '10px' }}>
                  <div style={{ width: '40%', height: '100%', background: 'var(--accent-primary)' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApprovalQueue;
