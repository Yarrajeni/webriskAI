import React, { useState, useEffect } from 'react';
import { 
  Play, 
  RotateCw, 
  Database, 
  Cpu, 
  ShieldCheck, 
  CloudUpload, 
  Activity,
  History,
  Terminal,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const stages = [
  { id: 1, name: 'Data Ingestion', icon: Database, desc: 'Fetching raw transaction logs' },
  { id: 2, name: 'Feature Engineering', icon: Activity, desc: 'Calculating debt-to-income' },
  { id: 3, name: 'Data Validation', icon: ShieldCheck, desc: 'Check for missing values' },
  { id: 4, name: 'Model Training', icon: Cpu, desc: 'Optimizing XGBoost weights' },
  { id: 5, name: 'Evaluation', icon: RotateCw, desc: 'Cross-validation analysis' },
  { id: 6, name: 'Deployment', icon: CloudUpload, desc: 'Pushing to staging server' },
];

const PipelineView = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);
  const [logs, setLogs] = useState([
    { id: 1, time: '10:00:01', msg: 'System idle. Waiting for trigger...', type: 'info' }
  ]);

  const addLog = (msg, type = 'info') => {
    setLogs(prev => [{ id: Date.now(), time: new Date().toLocaleTimeString(), msg, type }, ...prev].slice(0, 10));
  };

  const startPipeline = () => {
    if (isRunning) return;
    setIsRunning(true);
    setCurrentStage(1);
    addLog('Manual pipeline execution triggered by Admin.', 'warning');
    
    let stage = 1;
    const interval = setInterval(() => {
      stage += 1;
      if (stage > stages.length) {
        clearInterval(interval);
        setIsRunning(false);
        setCurrentStage(0);
        addLog('Pipeline execution completed successfully.', 'success');
      } else {
        setCurrentStage(stage);
        addLog(`Processing Stage ${stage}: ${stages[stage-1].name}...`, 'info');
      }
    }, 3000);
  };

  return (
    <div className="fade-in" style={{ padding: '2rem' }}>
      <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>MLOps Pipeline Control</h1>
          <p style={{ color: 'var(--text-secondary)' }}>End-to-end automated lifecycle management for financial risk models.</p>
        </div>
        <button 
          onClick={startPipeline}
          disabled={isRunning}
          style={{ 
            padding: '1rem 2rem', borderRadius: '14px', border: 'none', 
            background: isRunning ? 'var(--bg-tertiary)' : 'var(--accent-primary)', 
            color: 'white', fontWeight: 800, cursor: isRunning ? 'not-allowed' : 'pointer',
            display: 'flex', alignItems: 'center', gap: '10px',
            boxShadow: isRunning ? 'none' : '0 10px 20px rgba(56, 189, 248, 0.2)'
          }}
        >
          {isRunning ? <RotateCw className="animate-spin" size={20} /> : <Play size={20} />}
          {isRunning ? 'Pipeline Running...' : 'Trigger Automated Retraining'}
        </button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '2.5fr 1fr', gap: '2rem' }}>
        <div className="glass" style={{ padding: '3rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
            {stages.map((s, i) => (
              <div key={s.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', flex: 1 }}>
                <motion.div 
                  animate={currentStage === s.id ? { scale: [1, 1.2, 1], boxShadow: ['0 0 0px var(--accent-primary)', '0 0 20px var(--accent-primary)', '0 0 0px var(--accent-primary)'] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ 
                    width: '60px', height: '60px', borderRadius: '20px', 
                    background: currentStage >= s.id ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '1rem', border: '1px solid var(--glass-border)',
                    transition: 'all 0.5s ease',
                    color: currentStage >= s.id ? 'white' : 'var(--text-muted)'
                  }}
                >
                  <s.icon size={24} />
                </motion.div>
                <p style={{ fontSize: '0.8rem', fontWeight: 800, textAlign: 'center', color: currentStage >= s.id ? 'white' : 'var(--text-muted)' }}>{s.name}</p>
                
                {i < stages.length - 1 && (
                  <div style={{ 
                    position: 'absolute', top: '30px', left: '60px', width: 'calc(100% - 60px)', height: '2px', 
                    background: currentStage > s.id ? 'var(--accent-primary)' : 'var(--border-color)',
                    zIndex: -1, transition: 'all 0.5s ease'
                  }}></div>
                )}
              </div>
            ))}
          </div>

          <div style={{ marginTop: '4rem', padding: '2rem', background: 'rgba(0,0,0,0.2)', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
            <h4 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <History size={18} color="var(--accent-secondary)" /> Pipeline History
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>LAST RUN</p>
                <p style={{ fontWeight: 700 }}>2h 14m ago</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>SUCCESS RATE</p>
                <p style={{ fontWeight: 700, color: 'var(--risk-low)' }}>99.8%</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>AVG LATENCY</p>
                <p style={{ fontWeight: 700 }}>18.4s</p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem' }}>
            <Terminal size={18} color="var(--accent-primary)" /> Live Execution Logs
          </h3>
          <div style={{ flex: 1, fontFamily: 'monospace', fontSize: '0.8rem', color: 'var(--text-secondary)', overflowY: 'auto' }}>
            <AnimatePresence>
              {logs.map((log) => (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={log.id} 
                  style={{ marginBottom: '0.75rem', paddingLeft: '1rem', borderLeft: `2px solid ${log.type === 'success' ? 'var(--risk-low)' : log.type === 'warning' ? 'var(--risk-medium)' : 'var(--accent-primary)'}` }}
                >
                  <span style={{ color: 'var(--text-muted)', marginRight: '8px' }}>[{log.time}]</span>
                  <span style={{ color: log.type === 'success' ? 'var(--risk-low)' : log.type === 'warning' ? 'var(--risk-medium)' : 'var(--text-primary)' }}>{log.msg}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PipelineView;
