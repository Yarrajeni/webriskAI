import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar
} from 'recharts';
import { 
  Activity, 
  Target, 
  Zap, 
  TrendingUp, 
  Info,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

const prCurveData = [
  { recall: 0.0, precision: 1.00 },
  { recall: 0.2, precision: 0.98 },
  { recall: 0.4, precision: 0.95 },
  { recall: 0.6, precision: 0.92 },
  { recall: 0.8, precision: 0.85 },
  { recall: 0.9, precision: 0.70 },
  { recall: 1.0, precision: 0.40 },
];

const rocCurveData = [
  { fpr: 0.0, tpr: 0.00 },
  { fpr: 0.1, tpr: 0.65 },
  { fpr: 0.2, tpr: 0.82 },
  { fpr: 0.4, tpr: 0.91 },
  { fpr: 0.6, tpr: 0.96 },
  { fpr: 0.8, tpr: 0.98 },
  { fpr: 1.0, tpr: 1.00 },
];

const confusionMatrix = [
  { actual: 'High Risk', predHigh: 420, predLow: 30 },
  { actual: 'Low Risk', predHigh: 15, predLow: 780 },
];

const BenchmarkingStudio = () => {
  return (
    <div className="fade-in" style={{ padding: '2rem' }}>
      <header style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Deep Benchmarking Studio</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Advanced model performance metrics: Precision-Recall curves, ROC analysis, and confusion matrices.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem', marginBottom: '2rem' }}>
        {/* ROC Curve */}
        <div className="glass" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <TrendingUp size={20} color="var(--accent-primary)" /> ROC Curve (AUC: 0.94)
            </h3>
            <Info size={16} color="var(--text-muted)" style={{ cursor: 'help' }} />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={rocCurveData}>
              <defs>
                <linearGradient id="colorROC" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--accent-primary)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--accent-primary)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis dataKey="fpr" stroke="var(--text-muted)" label={{ value: 'False Positive Rate', position: 'bottom', fill: 'var(--text-muted)', fontSize: 10 }} />
              <YAxis stroke="var(--text-muted)" label={{ value: 'True Positive Rate', angle: -90, position: 'insideLeft', fill: 'var(--text-muted)', fontSize: 10 }} />
              <Tooltip contentStyle={{ borderRadius: '12px', background: 'var(--bg-secondary)' }} />
              <Area type="monotone" dataKey="tpr" stroke="var(--accent-primary)" fillOpacity={1} fill="url(#colorROC)" strokeWidth={3} />
              <Line type="monotone" data={[ {fpr:0, tpr:0}, {fpr:1, tpr:1} ]} stroke="var(--text-muted)" strokeDasharray="5 5" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Precision-Recall Curve */}
        <div className="glass" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Activity size={20} color="var(--accent-secondary)" /> Precision-Recall (AP: 0.91)
            </h3>
            <div style={{ display: 'flex', gap: '1rem', fontSize: '0.7rem', fontWeight: 800 }}>
              <span style={{ color: 'var(--risk-low)' }}>IDEAL MODEL</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={prCurveData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis dataKey="recall" stroke="var(--text-muted)" label={{ value: 'Recall', position: 'bottom', fill: 'var(--text-muted)', fontSize: 10 }} />
              <YAxis stroke="var(--text-muted)" label={{ value: 'Precision', angle: -90, position: 'insideLeft', fill: 'var(--text-muted)', fontSize: 10 }} />
              <Tooltip contentStyle={{ borderRadius: '12px', background: 'var(--bg-secondary)' }} />
              <Line type="monotone" dataKey="precision" stroke="var(--accent-secondary)" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
        {/* Confusion Matrix */}
        <div className="glass" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '2rem' }}>Model Confusion Matrix</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 2fr', textAlign: 'center', gap: '10px' }}>
            <div style={{ visibility: 'hidden' }}></div>
            <div style={{ fontWeight: 800, fontSize: '0.8rem', color: 'var(--text-muted)' }}>PREDICTED HIGH</div>
            <div style={{ fontWeight: 800, fontSize: '0.8rem', color: 'var(--text-muted)' }}>PREDICTED LOW</div>
            
            <div style={{ fontWeight: 800, fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>ACTUAL HIGH</div>
            <div className="glass" style={{ padding: '2rem', background: 'rgba(56, 189, 248, 0.2)', border: '1px solid var(--accent-primary)' }}>
               <h2 style={{ margin: 0 }}>420</h2>
               <p style={{ fontSize: '0.65rem', margin: 0 }}>TRUE POSITIVE</p>
            </div>
            <div className="glass" style={{ padding: '2rem', background: 'rgba(244, 63, 94, 0.1)', border: '1px solid var(--risk-high)' }}>
               <h2 style={{ margin: 0 }}>30</h2>
               <p style={{ fontSize: '0.65rem', margin: 0 }}>FALSE NEGATIVE</p>
            </div>

            <div style={{ fontWeight: 800, fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>ACTUAL LOW</div>
            <div className="glass" style={{ padding: '2rem', background: 'rgba(251, 191, 36, 0.1)', border: '1px solid var(--risk-medium)' }}>
               <h2 style={{ margin: 0 }}>15</h2>
               <p style={{ fontSize: '0.65rem', margin: 0 }}>FALSE POSITIVE</p>
            </div>
            <div className="glass" style={{ padding: '2rem', background: 'rgba(16, 185, 129, 0.2)', border: '1px solid var(--risk-low)' }}>
               <h2 style={{ margin: 0 }}>780</h2>
               <p style={{ fontSize: '0.65rem', margin: 0 }}>TRUE NEGATIVE</p>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="glass" style={{ padding: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Target size={20} color="var(--accent-primary)" /> Core KPIs
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { label: 'F1-Score', val: '0.948', icon: CheckCircle, color: 'var(--risk-low)' },
                { label: 'Log Loss', val: '0.124', icon: Zap, color: 'var(--accent-primary)' },
                { label: 'Matthews Corr.', val: '0.892', icon: Activity, color: 'var(--accent-secondary)' }
              ].map((kpi, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <kpi.icon size={16} color={kpi.color} />
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{kpi.label}</span>
                  </div>
                  <span style={{ fontWeight: 900 }}>{kpi.val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass" style={{ padding: '1.5rem', border: '1px solid var(--risk-high)', background: 'rgba(244, 63, 94, 0.05)' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
               <AlertTriangle size={20} color="var(--risk-high)" />
               <div>
                 <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 800, color: 'var(--risk-high)' }}>Sensitivity Warning</p>
                 <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>The model is slightly over-predicting False Negatives in the low-income demographic.</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenchmarkingStudio;
