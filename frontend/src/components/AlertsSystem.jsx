import React, { useState } from 'react';
import { Bell, AlertTriangle, Zap, Activity, CheckCircle, Info } from 'lucide-react';

const AlertsSystem = () => {
  const [alerts, setAlerts] = useState([
    { id: 1, type: 'critical', title: 'High Risk Cluster Detected', msg: 'Multiple applications from the same IP range showing high default probability.', time: '2 mins ago', icon: AlertTriangle, color: 'var(--risk-high)' },
    { id: 2, type: 'warning', title: 'Feature Drift: "Annual Income"', msg: 'Significant shift in income distribution observed in last 24h batch.', time: '45 mins ago', icon: Activity, color: 'var(--risk-medium)' },
    { id: 3, type: 'info', title: 'Model Retraining Started', msg: 'Scheduled retraining pipeline initiated for Credit-v2.5.', time: '1 hour ago', icon: Zap, color: 'var(--accent-primary)' },
    { id: 4, type: 'warning', title: 'Accuracy Drop', msg: 'Validation accuracy dropped below threshold (94% -> 91.5%).', time: '3 hours ago', icon: Zap, color: 'var(--risk-medium)' },
  ]);

  const resolveAlert = (id) => {
    setAlerts(alerts.filter(a => a.id !== id));
  };

  return (
    <div className="fade-in" style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>System Alerts</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Real-time notifications regarding risk anomalies and model health.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Auto-refresh: 30s</span>
          <div style={{ width: '40px', height: '20px', background: 'var(--accent-primary)', borderRadius: '10px', position: 'relative' }}>
            <div style={{ width: '16px', height: '16px', background: 'white', borderRadius: '50%', position: 'absolute', right: '2px', top: '2px' }}></div>
          </div>
        </div>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {alerts.length === 0 ? (
          <div className="glass" style={{ padding: '4rem', textAlign: 'center' }}>
            <CheckCircle size={48} color="var(--risk-low)" style={{ marginBottom: '1rem' }} />
            <h3>All Systems Clear</h3>
            <p style={{ color: 'var(--text-secondary)' }}>No active alerts or anomalies detected.</p>
          </div>
        ) : (
          alerts.map((alert) => (
            <div key={alert.id} className="glass" style={{ 
              padding: '1.5rem', 
              display: 'flex', 
              gap: '1.5rem', 
              alignItems: 'flex-start',
              borderLeft: `6px solid ${alert.color}`
            }}>
              <div style={{ 
                width: '48px', 
                height: '48px', 
                borderRadius: '12px', 
                background: `${alert.color}20`, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <alert.icon color={alert.color} size={24} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <h3 style={{ fontSize: '1.125rem', margin: 0 }}>{alert.title}</h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{alert.time}</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>{alert.msg}</p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button 
                    onClick={() => resolveAlert(alert.id)}
                    style={{ 
                      padding: '0.5rem 1rem', 
                      borderRadius: '6px', 
                      background: 'var(--bg-tertiary)', 
                      color: 'white', 
                      border: 'none', 
                      fontSize: '0.875rem', 
                      cursor: 'pointer',
                      fontWeight: 600
                    }}
                  >
                    Mark as Resolved
                  </button>
                  <button style={{ 
                    padding: '0.5rem 1rem', 
                    borderRadius: '6px', 
                    background: 'transparent', 
                    color: 'var(--accent-primary)', 
                    border: '1px solid var(--accent-primary)', 
                    fontSize: '0.875rem', 
                    cursor: 'pointer',
                    fontWeight: 600
                  }}>
                    Investigate
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {alerts.length > 0 && (
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <button style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', textDecoration: 'underline' }}>
            View Resolution History
          </button>
        </div>
      )}
    </div>
  );
};

export default AlertsSystem;
