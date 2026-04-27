import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Activity, Zap, History, ShieldAlert } from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const driftData = [
  { time: '00:00', drift: 0.01 },
  { time: '04:00', drift: 0.02 },
  { time: '08:00', drift: 0.05 },
  { time: '12:00', drift: 0.08 },
  { time: '16:00', drift: 0.04 },
  { time: '20:00', drift: 0.03 },
  { time: '23:59', drift: 0.02 },
];

const accuracyData = [
  { epoch: 1, acc: 0.92 },
  { epoch: 5, acc: 0.94 },
  { epoch: 10, acc: 0.93 },
  { epoch: 15, acc: 0.95 },
  { epoch: 20, acc: 0.94 },
];

const ModelMonitoring = () => {
  const [drift, setDrift] = useState([
    { time: '00:00', drift: 0.01 },
    { time: '04:00', drift: 0.02 },
    { time: '08:00', drift: 0.05 },
    { time: '12:00', drift: 0.08 },
    { time: '16:00', drift: 0.04 },
    { time: '20:00', drift: 0.03 },
    { time: '23:59', drift: 0.02 },
  ]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || '';
        const response = await axios.get(`${apiUrl}/monitoring/drift`);
        setDrift(response.data);
      } catch (err) {
        console.error('Failed to fetch drift:', err);
      }
    };
    fetchLogs();
  }, []);

  return (
    <div className="fade-in" style={{ padding: '2rem' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Model Monitoring Dashboard</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Track live performance, drift metrics, and model health.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
        <div className="glass" style={{ padding: '1.5rem', height: '350px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
            <Activity color="var(--accent-primary)" />
            <h3 style={{ margin: 0 }}>Data Drift Index</h3>
          </div>
          <ResponsiveContainer width="100%" height="80%">
            <AreaChart data={drift}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
              <XAxis dataKey="time" stroke="var(--text-muted)" axisLine={false} tickLine={false} />
              <YAxis stroke="var(--text-muted)" axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px' }}
              />
              <Area type="monotone" dataKey="drift" stroke="var(--risk-medium)" fill="rgba(245, 158, 11, 0.1)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="glass" style={{ padding: '1.5rem', height: '350px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
            <ShieldAlert color="var(--risk-low)" />
            <h3 style={{ margin: 0 }}>Prediction Accuracy</h3>
          </div>
          <ResponsiveContainer width="100%" height="80%">
            <LineChart data={accuracyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
              <XAxis dataKey="epoch" stroke="var(--text-muted)" axisLine={false} tickLine={false} />
              <YAxis stroke="var(--text-muted)" axisLine={false} tickLine={false} domain={[0.8, 1]} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px' }}
              />
              <Line type="stepAfter" dataKey="acc" stroke="var(--risk-low)" strokeWidth={3} dot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem' }}>
        <div className="glass" style={{ padding: '1.5rem' }}>
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Zap size={20} color="var(--accent-secondary)" /> Model Health
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { label: 'Uptime', value: '99.98%', status: 'Healthy' },
              { label: 'Latency', value: '24ms', status: 'Optimal' },
              { label: 'CPU Usage', value: '12%', status: 'Low' },
              { label: 'Memory', value: '1.2 GB', status: 'Normal' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>{item.label}</span>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ margin: 0, fontWeight: 700 }}>{item.value}</p>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--risk-low)' }}>{item.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass" style={{ padding: '1.5rem' }}>
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <History size={20} color="var(--accent-primary)" /> Version History
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { version: 'v2.4.1', date: '2026-04-25', tag: 'Production', desc: 'Improved XGBoost parameters for high-income segments.' },
              { version: 'v2.4.0', date: '2026-04-20', tag: 'Archived', desc: 'Baseline model with feature engineered debt ratios.' },
              { version: 'v2.3.9', date: '2026-04-15', tag: 'Archived', desc: 'Initial random forest deployment.' },
            ].map((v, i) => (
              <div key={i} style={{ borderLeft: `3px solid ${i === 0 ? 'var(--accent-primary)' : 'var(--border-color)'}`, paddingLeft: '1.5rem', position: 'relative' }}>
                <div style={{ 
                  position: 'absolute', 
                  left: '-9px', 
                  top: '0', 
                  width: '15px', 
                  height: '15px', 
                  borderRadius: '50%', 
                  background: i === 0 ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
                  border: '3px solid var(--bg-primary)'
                }}></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <h4 style={{ margin: 0 }}>{v.version}</h4>
                  <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: '4px', background: i === 0 ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255,255,255,0.05)', color: i === 0 ? 'var(--accent-primary)' : 'var(--text-muted)' }}>{v.tag}</span>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Deployed on {v.date}</p>
                <p style={{ fontSize: '0.875rem' }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelMonitoring;
