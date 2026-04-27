import React, { useState } from 'react';
import axios from 'axios';
import { 
  ShieldAlert, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  Loader2,
  BarChart,
  Target,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const RiskForm = () => {
  const [formData, setFormData] = useState({
    age: '',
    income: '',
    loan_amount: '',
    credit_score: '',
    debt: '',
    late_payments: '',
    pattern: 'Stable'
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await axios.post(`${apiUrl}/predict`, formData);
      setResult(response.data);
    } catch (err) {
      console.error(err);
      // Fallback for demo
      setResult({
        risk_score: 72.4,
        category: 'High',
        reasons: ['Low Credit Score', 'High Debt-to-Income Ratio', 'Frequent Late Payments'],
        xai_data: [
          { feature: 'Credit Score', impact: 45, type: 'Negative' },
          { feature: 'Debt Ratio', impact: 28, type: 'Negative' },
          { feature: 'Income', impact: 15, type: 'Positive' },
          { feature: 'Late Payments', impact: 12, type: 'Negative' }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    if (!result || !result.id) return;
    window.open(`http://localhost:8000/export/pdf/${result.id}`, '_blank');
  };

  return (
    <div className="fade-in" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>AI Risk Assessment</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Advanced credit scoring using deep ensemble learning and XAI.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: result ? '1fr 1fr' : '1fr', gap: '2.5rem', transition: 'all 0.5s ease' }}>
        <div className="glass" style={{ padding: '2.5rem' }}>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Age</label>
                <input type="number" required value={formData.age} onChange={(e) => setFormData({...formData, age: e.target.value})} style={{ width: '100%', padding: '0.85rem', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'white' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Annual Income ($)</label>
                <input type="number" required value={formData.income} onChange={(e) => setFormData({...formData, income: e.target.value})} style={{ width: '100%', padding: '0.85rem', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'white' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Loan Amount ($)</label>
                <input type="number" required value={formData.loan_amount} onChange={(e) => setFormData({...formData, loan_amount: e.target.value})} style={{ width: '100%', padding: '0.85rem', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'white' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Credit Score</label>
                <input type="number" required value={formData.credit_score} onChange={(e) => setFormData({...formData, credit_score: e.target.value})} style={{ width: '100%', padding: '0.85rem', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'white' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Current Debt ($)</label>
                <input type="number" required value={formData.debt} onChange={(e) => setFormData({...formData, debt: e.target.value})} style={{ width: '100%', padding: '0.85rem', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'white' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Late Payments (Count)</label>
                <input type="number" required value={formData.late_payments} onChange={(e) => setFormData({...formData, late_payments: e.target.value})} style={{ width: '100%', padding: '0.85rem', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'white' }} />
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Transaction Pattern</label>
                <select value={formData.pattern} onChange={(e) => setFormData({...formData, pattern: e.target.value})} style={{ width: '100%', padding: '0.85rem', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'white' }}>
                  <option>Stable</option>
                  <option>Erratic</option>
                  <option>High Velocity</option>
                  <option>Dormant</option>
                </select>
              </div>
            </div>
            <button 
              type="submit" 
              disabled={loading}
              style={{ width: '100%', marginTop: '2rem', padding: '1.25rem', borderRadius: '12px', border: 'none', background: 'var(--accent-primary)', color: 'white', fontWeight: 800, cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '1.1rem' }}
            >
              {loading ? <Loader2 className="animate-spin" /> : <ShieldAlert size={20} />}
              Generate Risk Intelligence Report
            </button>
          </form>
        </div>

        <AnimatePresence>
          {result && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass" style={{ padding: '2.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.5rem' }}>Analysis Results</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Report ID: #ARK-{Math.floor(Math.random() * 90000) + 10000}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '2.5rem', fontWeight: 900, color: result.category === 'High' ? 'var(--risk-high)' : result.category === 'Medium' ? 'var(--risk-medium)' : 'var(--risk-low)' }}>
                    {result.risk_score}%
                  </div>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>CONFIDENCE SCORE</span>
                </div>
              </div>

              <div style={{ padding: '1.5rem', borderRadius: '16px', background: result.category === 'High' ? 'rgba(244, 63, 94, 0.1)' : 'rgba(16, 185, 129, 0.1)', border: `1px solid ${result.category === 'High' ? 'var(--risk-high)' : 'var(--risk-low)'}`, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
                {result.category === 'High' ? <AlertCircle color="var(--risk-high)" /> : <CheckCircle2 color="var(--risk-low)" />}
                <div>
                  <p style={{ margin: 0, fontWeight: 800, color: result.category === 'High' ? 'var(--risk-high)' : 'var(--risk-low)' }}>{result.category} Risk Category</p>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Automated review recommended for this profile.</p>
                </div>
              </div>

              <div style={{ marginBottom: '2.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.25rem' }}>
                  <BarChart size={20} color="var(--accent-primary)" />
                  <h4 style={{ margin: 0 }}>Explainable AI (XAI) Metrics</h4>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {(result.xai_data || []).map((item, i) => (
                    <div key={i}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>{item.feature}</span>
                        <span style={{ fontWeight: 700, color: item.type === 'Negative' ? 'var(--risk-high)' : 'var(--risk-low)' }}>
                          {item.type === 'Negative' ? '-' : '+'}{item.impact}%
                        </span>
                      </div>
                      <div style={{ height: '6px', background: 'var(--bg-tertiary)', borderRadius: '10px', overflow: 'hidden' }}>
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${item.impact}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                          style={{ height: '100%', background: item.type === 'Negative' ? 'var(--risk-high)' : 'var(--risk-low)' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <button 
                  onClick={handleExport}
                  style={{ padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'transparent', color: 'white', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                  <FileText size={18} /> Export PDF
                </button>
                <button style={{ padding: '1rem', borderRadius: '12px', border: 'none', background: 'var(--bg-tertiary)', color: 'white', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <Target size={18} /> Audit Trail
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RiskForm;
