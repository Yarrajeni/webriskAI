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
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { 
  Database, 
  Info, 
  TrendingUp, 
  Filter, 
  Download,
  LayoutGrid,
  Activity
} from 'lucide-react';

const correlationData = [
  { x: 'Credit Score', y: 'Risk Score', value: 0.85 },
  { x: 'Income', y: 'Loan Amount', value: 0.65 },
  { x: 'Debt', y: 'Late Payments', value: 0.75 },
  { x: 'Age', y: 'Income', value: 0.45 },
];

const distributionData = [
  { range: '300-400', count: 120 },
  { range: '400-500', count: 250 },
  { range: '500-600', count: 480 },
  { range: '600-700', count: 890 },
  { range: '700-800', count: 650 },
  { range: '800-900', count: 310 },
];

const outlierData = Array.from({ length: 40 }, (_, i) => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  z: Math.random() * 20,
  isOutlier: Math.random() > 0.9
}));

const DataExplorer = () => {
  return (
    <div className="fade-in" style={{ padding: '2rem' }}>
      <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Exploratory Data Analysis</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Advanced visual intelligence into model training distributions and feature engineering.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button style={{ padding: '0.75rem 1.25rem', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-tertiary)', color: 'white', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Filter size={18} /> Filter Dataset
          </button>
          <button style={{ padding: '0.75rem 1.25rem', borderRadius: '12px', border: 'none', background: 'var(--accent-primary)', color: 'white', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Download size={18} /> Export Data
          </button>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem', marginBottom: '2rem' }}>
        <div className="glass" style={{ padding: '2rem', height: '400px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <LayoutGrid size={20} color="var(--accent-primary)" /> Feature Distribution (Credit Score)
            </h3>
            <Info size={18} color="var(--text-muted)" style={{ cursor: 'help' }} />
          </div>
          <ResponsiveContainer width="100%" height="80%">
            <BarChart data={distributionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
              <XAxis dataKey="range" stroke="var(--text-muted)" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
              <YAxis stroke="var(--text-muted)" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px' }}
                itemStyle={{ color: 'white' }}
              />
              <Bar dataKey="count" fill="var(--accent-primary)" radius={[6, 6, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass" style={{ padding: '2rem', height: '400px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Activity size={20} color="var(--accent-secondary)" /> Multi-dimensional Outlier Detection
            </h3>
            <span style={{ fontSize: '0.75rem', padding: '4px 8px', borderRadius: '6px', background: 'rgba(244, 63, 94, 0.1)', color: 'var(--risk-high)', fontWeight: 700 }}>HIGH ANOMALY SCORE</span>
          </div>
          <ResponsiveContainer width="100%" height="80%">
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis type="number" dataKey="x" name="Impact" stroke="var(--text-muted)" axisLine={false} />
              <YAxis type="number" dataKey="y" name="Frequency" stroke="var(--text-muted)" axisLine={false} />
              <ZAxis type="number" dataKey="z" range={[60, 400]} name="Magnitude" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ borderRadius: '12px', background: 'var(--bg-secondary)' }} />
              <Scatter name="Data Points" data={outlierData}>
                {outlierData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.isOutlier ? 'var(--risk-high)' : 'var(--accent-primary)'} fillOpacity={0.6} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '2rem' }}>
        <div className="glass" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Correlation Heatmap</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {correlationData.map((item, i) => (
              <div key={i} style={{ 
                padding: '1.25rem', 
                borderRadius: '12px', 
                background: 'rgba(255,255,255,0.02)', 
                border: '1px solid var(--border-color)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <p style={{ margin: 0, fontWeight: 700, fontSize: '0.9rem' }}>{item.x} ↔ {item.y}</p>
                  <p style={{ margin: 0, fontSize: '0.7rem', color: 'var(--text-muted)' }}>Pearson Coefficient</p>
                </div>
                <div style={{ 
                  width: '50px', height: '50px', borderRadius: '50%', border: '4px solid var(--bg-tertiary)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 900,
                  color: item.value > 0.8 ? 'var(--risk-high)' : 'var(--accent-primary)'
                }}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass" style={{ padding: '2rem' }}>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
             <h3 style={{ margin: 0 }}>Model Sensitivity Analysis</h3>
             <button style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', background: 'transparent', border: 'none', fontWeight: 700 }}>Run Simulation</button>
           </div>
           <ResponsiveContainer width="100%" height={250}>
             <AreaChart data={Array.from({length: 12}, (_, i) => ({ name: `T-${12-i}`, val: 40 + Math.random() * 40 }))}>
                <defs>
                  <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent-secondary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--accent-secondary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                <XAxis dataKey="name" hide />
                <YAxis hide />
                <Tooltip contentStyle={{ borderRadius: '12px', background: 'var(--bg-secondary)' }} />
                <Area type="monotone" dataKey="val" stroke="var(--accent-secondary)" fillOpacity={1} fill="url(#colorVal)" strokeWidth={3} />
             </AreaChart>
           </ResponsiveContainer>
           <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
             <div className="glass" style={{ padding: '1rem', flex: 1, textAlign: 'center', background: 'rgba(255,255,255,0.01)' }}>
               <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: '4px' }}>MEAN SQUARED ERROR</p>
               <p style={{ fontWeight: 800, margin: 0 }}>0.024</p>
             </div>
             <div className="glass" style={{ padding: '1rem', flex: 1, textAlign: 'center', background: 'rgba(255,255,255,0.01)' }}>
               <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: '4px' }}>R2 SCORE</p>
               <p style={{ fontWeight: 800, margin: 0 }}>0.912</p>
             </div>
             <div className="glass" style={{ padding: '1rem', flex: 1, textAlign: 'center', background: 'rgba(255,255,255,0.01)' }}>
               <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: '4px' }}>GINI COEFFICIENT</p>
               <p style={{ fontWeight: 800, margin: 0 }}>0.482</p>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default DataExplorer;
