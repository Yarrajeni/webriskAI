import React, { useState, useRef } from 'react';
import { 
  Upload, 
  FileSpreadsheet, 
  CheckCircle, 
  AlertCircle, 
  Download, 
  Trash2,
  Play,
  FileText,
  BarChart3,
  Info
} from 'lucide-react';

const BulkProcessing = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('idle');
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setStatus('idle');
    }
  };

  const startProcessing = () => {
    setStatus('processing');
    let p = 0;
    const interval = setInterval(() => {
      p += 5;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setStatus('completed');
      }
    }, 100);
  };

  return (
    <div style={{ padding: '2rem', color: 'white' }}>
      <header style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>AI Bulk-Processing Wizard</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)' }}>Automated batch intelligence for large-scale customer portfolios.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
        <div className="glass" style={{ padding: '3rem', minHeight: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {!file ? (
            <div 
              onClick={() => fileInputRef.current.click()}
              style={{ 
                border: '2px dashed rgba(255,255,255,0.1)', borderRadius: '24px', padding: '4rem',
                textAlign: 'center', cursor: 'pointer'
              }}
            >
              <Upload size={48} color="#38bdf8" style={{ marginBottom: '1rem' }} />
              <h3>Upload CSV Dataset</h3>
              <p style={{ color: 'rgba(255,255,255,0.4)' }}>Click to browse or drag and drop</p>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} accept=".csv" />
            </div>
          ) : (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', marginBottom: '2rem' }}>
                <FileSpreadsheet size={32} color="#818cf8" />
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: 0 }}>{file.name}</h4>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>{status.toUpperCase()}</p>
                </div>
              </div>

              {status === 'processing' && (
                <div style={{ marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span>Processing...</span>
                    <span>{progress}%</span>
                  </div>
                  <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}>
                    <div style={{ width: `${progress}%`, height: '100%', background: '#38bdf8', transition: 'width 0.1s' }}></div>
                  </div>
                </div>
              )}

              {status === 'completed' && (
                <div style={{ padding: '1.5rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981', borderRadius: '12px', marginBottom: '2rem' }}>
                  <p style={{ margin: 0, fontWeight: 800, color: '#10b981' }}>Analysis Complete</p>
                  <p style={{ margin: 0, fontSize: '0.8rem' }}>1,240 records processed successfully.</p>
                </div>
              )}

              <div style={{ display: 'flex', gap: '1rem' }}>
                {status === 'idle' && (
                  <button onClick={startProcessing} style={{ flex: 1, padding: '1rem', borderRadius: '12px', background: '#38bdf8', border: 'none', color: 'white', fontWeight: 800, cursor: 'pointer' }}>
                    Start AI Scoring
                  </button>
                )}
                {status === 'completed' && (
                  <button onClick={() => setFile(null)} style={{ flex: 1, padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: 'white', cursor: 'pointer' }}>
                    Process Another File
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="glass" style={{ padding: '2rem' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
            <Info size={20} color="#38bdf8" /> Requirements
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <li>● CSV Format only</li>
            <li>● Max 50k records</li>
            <li>● Must include Income/Credit Score columns</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BulkProcessing;
