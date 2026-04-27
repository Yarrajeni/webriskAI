import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  FileText, 
  Download, 
  Search, 
  Filter, 
  Calendar,
  ShieldCheck,
  AlertTriangle,
  ExternalLink
} from 'lucide-react';
import { motion } from 'framer-motion';

const ComplianceReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await axios.get(`${apiUrl}/reports/all`);
      setReports(response.data);
    } catch (err) {
      console.error('Failed to fetch reports:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleDownload = (id) => {
    window.open(`http://localhost:8000/export/pdf/${id}`, '_blank');
  };

  return (
    <div className="fade-in" style={{ padding: '2rem' }}>
      <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Audit & Compliance Logs</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Immutable history of all AI risk assessments and governance events.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ position: 'relative' }}>
            <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input type="text" placeholder="Filter by ID..." style={{ padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'white' }} />
          </div>
          <button onClick={fetchReports} style={{ padding: '0.75rem 1.25rem', borderRadius: '12px', border: '1px solid var(--accent-primary)', background: 'var(--accent-glow)', color: 'var(--accent-primary)', fontWeight: 600, cursor: 'pointer' }}>
            Refresh Logs
          </button>
        </div>
      </header>

      <div className="glass" style={{ padding: '2rem' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                <th style={{ padding: '1rem' }}>Audit ID</th>
                <th style={{ padding: '1rem' }}>Timestamp</th>
                <th style={{ padding: '1rem' }}>Risk Score</th>
                <th style={{ padding: '1rem' }}>Category</th>
                <th style={{ padding: '1rem' }}>Status</th>
                <th style={{ padding: '1rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="6" style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>Fetching encrypted audit logs...</td></tr>
              ) : reports.length === 0 ? (
                <tr><td colSpan="6" style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>No audit logs found in database.</td></tr>
              ) : reports.map((report) => (
                <tr key={report.id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'all 0.3s' }}>
                  <td style={{ padding: '1.25rem 1rem' }}>
                    <div style={{ fontWeight: 800 }}>#ARK-{report.id}</div>
                  </td>
                  <td style={{ padding: '1.25rem 1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    {new Date(report.timestamp).toLocaleString()}
                  </td>
                  <td style={{ padding: '1.25rem 1rem' }}>
                    <span style={{ fontWeight: 900, color: report.category === 'High' ? 'var(--risk-high)' : 'var(--risk-low)' }}>
                      {report.risk_score}%
                    </span>
                  </td>
                  <td style={{ padding: '1.25rem 1rem' }}>
                    <span style={{ 
                      padding: '4px 10px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 700,
                      background: report.category === 'High' ? 'rgba(244, 63, 94, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                      color: report.category === 'High' ? 'var(--risk-high)' : 'var(--risk-low)'
                    }}>
                      {report.category.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ padding: '1.25rem 1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--risk-low)', fontSize: '0.85rem', fontWeight: 600 }}>
                      <ShieldCheck size={16} /> Verified
                    </div>
                  </td>
                  <td style={{ padding: '1.25rem 1rem' }}>
                    <button 
                      onClick={() => handleDownload(report.id)}
                      style={{ 
                        background: 'var(--bg-tertiary)', color: 'white', border: '1px solid var(--border-color)', 
                        borderRadius: '8px', padding: '8px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' 
                      }}
                    >
                      <Download size={14} /> PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ComplianceReports;
