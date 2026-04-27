import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  ZAxis,
  Cell
} from 'recharts';
import { 
  Eye, 
  Zap, 
  Info, 
  Layers, 
  TrendingUp, 
  AlertCircle,
  Activity,
  Cpu
} from 'lucide-react';

const globalImportance = [
  { feature: 'Credit History', importance: 0.35, color: 'var(--accent-primary)' },
  { feature: 'Debt-to-Income', importance: 0.28, color: 'var(--accent-secondary)' },
  { feature: 'Annual Income', importance: 0.15, color: 'var(--accent-primary)' },
  { feature: 'Late Payments', importance: 0.12, color: 'var(--risk-high)' },
  { feature: 'Loan Amount', importance: 0.06, color: 'var(--accent-secondary)' },
  { feature: 'Age', importance: 0.04, color: 'var(--text-muted)' },
];

const shapData = Array.from({ length: 30 }, (_, i) => ({
  x: Math.random() * 100 - 50,
  y: Math.random() * 100,
  z: Math.random() * 20,
  impact: Math.random() > 0.5 ? 'Positive' : 'Negative'
}));

const XAIStudio = () => {
  return (
    <div className="fade-in" style={{ padding: '2rem' }}>
      <header style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>AI Explainability Studio</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Deconstructing black-box models into transparent, actionable financial intelligence.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: '2rem', marginBottom: '2rem' }}>
        {/* Global Feature Importance */}
        <div className="glass" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Layers size={20} color="var(--accent-primary)" /> Global Feature Importance
            </h3>
            <Info size={16} color="var(--text-muted)" style={{ cursor: 'help' }} />
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={globalImportance} layout="vertical" margin={{ left: 40 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" horizontal={false} />
              <XAxis type="number" hide />
              <YAxis dataKey="feature" type="category" stroke="var(--text-muted)" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 700 }} />
              <Tooltip 
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                contentStyle={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px' }}
              />
              <Bar dataKey="importance" radius={[0, 6, 6, 0]} barSize={30}>
                {globalImportance.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(56, 189, 248, 0.05)', borderRadius: '12px', border: '1px solid var(--accent-primary)' }}>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--accent-primary)', lineHeight: 1.5 }}>
              <strong>Insight:</strong> "Credit History" remains the primary driver of risk scores, accounting for 35% of model decisions globally.
            </p>
          </div>
        </div>

        {/* SHAP Summary Plot */}
        <div className="glass" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Cpu size={20} color="var(--accent-secondary)" /> SHAP Value Distribution
            </h3>
            <div style={{ display: 'flex', gap: '1rem', fontSize: '0.7rem', fontWeight: 800 }}>
              <span style={{ color: 'var(--risk-high)' }}>● POSITIVE IMPACT</span>
              <span style={{ color: 'var(--accent-primary)' }}>● NEGATIVE IMPACT</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis type="number" dataKey="x" name="SHAP Value" stroke="var(--text-muted)" axisLine={false} />
              <YAxis type="number" dataKey="y" name="Feature Value" stroke="var(--text-muted)" axisLine={false} />
              <ZAxis type="number" dataKey="z" range={[60, 200]} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ borderRadius: '12px', background: 'var(--bg-secondary)' }} />
              <Scatter name="SHAP Points" data={shapData}>
                {shapData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.impact === 'Positive' ? 'var(--risk-high)' : 'var(--accent-primary)'} fillOpacity={0.6} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
          <p style={{ marginTop: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>
            The beeswarm plot visualizes the magnitude and direction of each feature's contribution to individual predictions.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem' }}>
        {[
          { title: 'Model Fidelity', value: '98.2%', icon: Activity, color: 'var(--risk-low)' },
          { title: 'Bias Variance', value: 'Low', icon: AlertCircle, color: 'var(--accent-secondary)' },
          { title: 'Stability Index', value: '0.94', icon: TrendingUp, color: 'var(--accent-primary)' }
        ].map((stat, i) => (
          <div key={i} className="glass" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ background: 'var(--bg-tertiary)', padding: '10px', borderRadius: '12px' }}>
              <stat.icon size={20} color={stat.color} />
            </div>
            <div>
              <p style={{ margin: 0, fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 800 }}>{stat.title.toUpperCase()}</p>
              <p style={{ margin: 0, fontSize: '1.25rem', fontWeight: 900 }}>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default XAIStudio;
