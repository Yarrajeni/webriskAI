import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Map, 
  Fingerprint, 
  Globe, 
  AlertTriangle, 
  CheckCircle, 
  ShieldCheck,
  Search,
  Filter,
  Zap,
  MousePointer2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const fraudEvents = [
  { id: 1, type: 'IP Anomaly', location: 'Kiev, Ukraine', amount: 4200.00, severity: 'High', status: 'Blocked' },
  { id: 2, type: 'Velocity Spike', location: 'London, UK', amount: 850.20, severity: 'Medium', status: 'Review' },
  { id: 3, type: 'Identity Match', location: 'New York, USA', amount: 15.00, severity: 'Low', status: 'Allowed' },
  { id: 4, type: 'Account Takeover', location: 'Mumbai, India', amount: 12000.00, severity: 'High', status: 'Frozen' },
];

const FraudHub = () => {
  const [activeEvent, setActiveEvent] = useState(null);

  return (
    <div className="fade-in" style={{ padding: '2rem' }}>
      <header style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Fraud Intelligence Hub</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Real-time transaction monitoring and anomaly detection using deep behavioral analytics.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        {/* Live Monitoring Table */}
        <div className="glass" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShieldAlert size={20} color="var(--risk-high)" /> Live Security Feed
            </h3>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span style={{ fontSize: '0.7rem', padding: '4px 8px', borderRadius: '6px', background: 'rgba(244, 63, 94, 0.1)', color: 'var(--risk-high)', fontWeight: 700 }}>3 CRITICAL</span>
              <span style={{ fontSize: '0.7rem', padding: '4px 8px', borderRadius: '6px', background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)', fontWeight: 700 }}>1200 SCANNED</span>
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left', color: 'var(--text-muted)', fontSize: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
                  <th style={{ padding: '1rem' }}>Type</th>
                  <th style={{ padding: '1rem' }}>Location</th>
                  <th style={{ padding: '1rem' }}>Amount</th>
                  <th style={{ padding: '1rem' }}>Severity</th>
                  <th style={{ padding: '1rem' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {fraudEvents.map((event) => (
                  <tr 
                    key={event.id} 
                    onClick={() => setActiveEvent(event)}
                    style={{ 
                      borderBottom: '1px solid var(--border-color)', cursor: 'pointer',
                      background: activeEvent?.id === event.id ? 'rgba(255,255,255,0.03)' : 'transparent',
                      transition: 'var(--transition-smooth)'
                    }}
                  >
                    <td style={{ padding: '1.25rem 1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ background: 'var(--bg-tertiary)', padding: '6px', borderRadius: '8px' }}><Fingerprint size={16} /></div>
                        <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{event.type}</span>
                      </div>
                    </td>
                    <td style={{ padding: '1.25rem 1rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Globe size={14} /> {event.location}</div>
                    </td>
                    <td style={{ padding: '1.25rem 1rem', fontWeight: 800 }}>${event.amount.toLocaleString()}</td>
                    <td style={{ padding: '1.25rem 1rem' }}>
                      <span style={{ 
                        fontSize: '0.7rem', fontWeight: 800, padding: '4px 8px', borderRadius: '6px',
                        background: event.severity === 'High' ? 'rgba(244, 63, 94, 0.1)' : 'rgba(251, 191, 36, 0.1)',
                        color: event.severity === 'High' ? 'var(--risk-high)' : 'var(--risk-medium)'
                      }}>
                        {event.severity}
                      </span>
                    </td>
                    <td style={{ padding: '1.25rem 1rem' }}>
                      <span style={{ fontSize: '0.8rem', color: event.status === 'Blocked' ? 'var(--risk-high)' : event.status === 'Allowed' ? 'var(--risk-low)' : 'var(--risk-medium)', fontWeight: 700 }}>
                        {event.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detailed Anomaly Analysis */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <AnimatePresence mode="wait">
            {activeEvent ? (
              <motion.div 
                key={activeEvent.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="glass" 
                style={{ padding: '2rem', border: `1px solid ${activeEvent.severity === 'High' ? 'var(--risk-high)' : 'var(--border-color)'}` }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
                  <div style={{ background: 'var(--risk-high)', padding: '10px', borderRadius: '12px' }}><AlertTriangle color="white" /></div>
                  <div>
                    <h3 style={{ margin: 0 }}>Anomaly Details</h3>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>CASE ID: #FRD-{activeEvent.id * 827}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div>
                    <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '4px' }}>ANALYSIS RATIONALE</p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      Unexpected login from <strong>{activeEvent.location}</strong>. IP address does not match historical user profile. Velocity check indicates 4 attempts in 2 seconds.
                    </p>
                  </div>
                  
                  <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '8px' }}>
                      <span>Behavioral Match</span>
                      <span style={{ color: 'var(--risk-high)' }}>12%</span>
                    </div>
                    <div style={{ height: '4px', background: 'var(--bg-tertiary)', borderRadius: '10px' }}>
                      <div style={{ width: '12%', height: '100%', background: 'var(--risk-high)' }}></div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                    <button style={{ padding: '0.75rem', borderRadius: '10px', border: 'none', background: 'var(--risk-high)', color: 'white', fontWeight: 700, cursor: 'pointer' }}>Block Permanently</button>
                    <button style={{ padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'transparent', color: 'white', fontWeight: 600, cursor: 'pointer' }}>False Positive</button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="glass" style={{ padding: '3rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                <MousePointer2 size={40} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                <p>Select an event from the feed to perform deep forensic analysis.</p>
              </div>
            )}
          </AnimatePresence>

          <div className="glass" style={{ padding: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Zap size={20} color="var(--accent-primary)" /> AI Shield Status
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem' }}>Real-time Protection</span>
                <span style={{ color: 'var(--risk-low)', fontWeight: 800 }}>ON</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem' }}>Ensemble Consensus</span>
                <span style={{ color: 'var(--risk-low)', fontWeight: 800 }}>98%</span>
              </div>
              <button style={{ marginTop: '1rem', width: '100%', padding: '0.85rem', borderRadius: '12px', border: '1px solid var(--accent-primary)', background: 'var(--accent-glow)', color: 'var(--accent-primary)', fontWeight: 800 }}>Recalibrate AI Shield</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FraudHub;
