import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Globe, AlertTriangle } from 'lucide-react';

const hotspots = [
  { id: 1, name: 'North America', risk: 32, top: '35%', left: '20%', status: 'Stable' },
  { id: 2, name: 'Europe', risk: 45, top: '30%', left: '50%', status: 'Volatile' },
  { id: 3, name: 'Asia Pacific', risk: 78, top: '45%', left: '75%', status: 'Critical' },
  { id: 4, name: 'South America', risk: 52, top: '70%', left: '30%', status: 'Review' },
  { id: 5, name: 'Africa', risk: 28, top: '65%', left: '52%', status: 'Stable' },
];

const RiskMap = () => {
  return (
    <div className="glass" style={{ padding: '2.5rem', height: '100%', position: 'relative', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', position: 'relative', zIndex: 1 }}>
        <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Globe size={20} color="var(--accent-primary)" /> Global Risk Intelligence
        </h3>
        <div style={{ display: 'flex', gap: '12px' }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--risk-high)', fontWeight: 800 }}>● CRITICAL ZONE: ASIA</span>
        </div>
      </div>

      <div style={{ position: 'relative', height: '400px', width: '100%', background: 'rgba(0,0,0,0.1)', borderRadius: '20px', border: '1px solid var(--border-color)', backgroundImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }}>
        {/* Simplified SVG Map Background or abstraction */}
        <div style={{ 
          position: 'absolute', width: '100%', height: '100%', 
          opacity: 0.1, display: 'flex', alignItems: 'center', justifyContent: 'center' 
        }}>
          <Globe size={300} strokeWidth={0.5} />
        </div>

        {hotspots.map((spot) => (
          <motion.div
            key={spot.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.2 }}
            style={{
              position: 'absolute',
              top: spot.top,
              left: spot.left,
              cursor: 'pointer'
            }}
          >
            <div style={{ position: 'relative' }}>
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                  width: `${spot.risk * 0.8}px`, height: `${spot.risk * 0.8}px`, borderRadius: '50%',
                  background: spot.risk > 70 ? 'var(--risk-high)' : spot.risk > 40 ? 'var(--risk-medium)' : 'var(--risk-low)',
                  filter: 'blur(8px)'
                }}
              />
              <div style={{
                width: '12px', height: '12px', borderRadius: '50%',
                background: spot.risk > 70 ? 'var(--risk-high)' : 'var(--risk-low)',
                border: '2px solid white', boxShadow: '0 0 10px rgba(0,0,0,0.5)'
              }} />
              
              <div className="glass" style={{
                position: 'absolute', top: '-60px', left: '20px', padding: '8px 12px',
                minWidth: '120px', whiteSpace: 'nowrap', border: '1px solid var(--glass-border)',
                borderRadius: '10px', boxShadow: '0 10px 20px rgba(0,0,0,0.3)', pointerEvents: 'none'
              }}>
                <p style={{ margin: 0, fontSize: '0.75rem', fontWeight: 800 }}>{spot.name}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Risk Index</span>
                  <span style={{ fontSize: '0.65rem', fontWeight: 900, color: spot.risk > 70 ? 'var(--risk-high)' : 'var(--risk-low)' }}>{spot.risk}%</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-around' }}>
        {[
          { label: 'Americas', val: '32.1', status: 'Stable' },
          { label: 'EMEA', val: '45.8', status: 'Review' },
          { label: 'APAC', val: '78.2', status: 'Critical' }
        ].map((item, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: '4px' }}>{item.label}</p>
            <p style={{ fontSize: '1.1rem', fontWeight: 900, margin: 0, color: item.status === 'Critical' ? 'var(--risk-high)' : 'white' }}>{item.val}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RiskMap;
