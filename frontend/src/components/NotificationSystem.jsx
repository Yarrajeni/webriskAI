import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, Info, CheckCircle, Bell } from 'lucide-react';

const NotificationSystem = () => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (title, message, type = 'warning') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeNotification(id);
    }, 6000);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  useEffect(() => {
    // Simulate random high-risk alerts for demo
    const interval = setInterval(() => {
      const chance = Math.random();
      if (chance > 0.85) {
        addNotification(
          'CRITICAL RISK DETECTED',
          'Customer #CUST-9284 flagged for immediate review.',
          'danger'
        );
      } else if (chance > 0.7) {
        addNotification(
          'Market Volatility Alert',
          'NVDA price surged +4.8%. Model recalibration suggested.',
          'info'
        );
      }
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 1000, display: 'flex', flexDirection: 'column', gap: '12px', pointerEvents: 'none' }}>
      <AnimatePresence>
        {notifications.map((n) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.8 }}
            style={{ pointerEvents: 'auto' }}
          >
            <div className="glass" style={{ 
              width: '320px', 
              padding: '1.25rem', 
              display: 'flex', 
              gap: '12px', 
              background: n.type === 'danger' ? 'rgba(244, 63, 94, 0.95)' : 'rgba(15, 23, 42, 0.95)',
              border: `1px solid ${n.type === 'danger' ? 'var(--risk-high)' : 'var(--glass-border)'}`,
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
              borderRadius: '16px',
              position: 'relative'
            }}>
              <div style={{ 
                background: 'rgba(255,255,255,0.1)', 
                padding: '8px', 
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {n.type === 'danger' ? <AlertTriangle size={20} color="white" /> : <Bell size={20} color="var(--accent-primary)" />}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 800, fontSize: '0.85rem', margin: 0, color: 'white', letterSpacing: '0.02em' }}>{n.title}</p>
                <p style={{ fontSize: '0.75rem', color: n.type === 'danger' ? 'rgba(255,255,255,0.8)' : 'var(--text-secondary)', margin: '4px 0 0' }}>{n.message}</p>
              </div>
              <X 
                size={16} 
                color="white" 
                style={{ cursor: 'pointer', opacity: 0.6 }} 
                onClick={() => removeNotification(n.id)}
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NotificationSystem;
