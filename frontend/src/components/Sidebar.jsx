import React from 'react';
import { 
  LayoutDashboard, 
  ShieldAlert, 
  Activity, 
  GitBranch, 
  FileText, 
  Bell, 
  LineChart,
  Settings as SettingsIcon,
  LogOut,
  User,
  Zap,
  BarChart3,
  ShieldX,
  Wallet2,
  Layers,
  Eye,
  ClipboardCheck,
  UserCheck,
  Target
} from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = ({ activeTab, setActiveTab, user, onLogout }) => {
  const allMenuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'market', icon: LineChart, label: 'Market AI' },
    { id: 'scoring', icon: ShieldAlert, label: 'Risk Scoring' },
    { id: 'xai', icon: Eye, label: 'XAI Studio' },
    { id: 'bulk', icon: Layers, label: 'Bulk AI' },
    { id: 'portfolio', icon: Wallet2, label: 'Wealth Sim' },
    { id: 'fraud', icon: ShieldX, label: 'Fraud Hub' },
    { id: 'insights', icon: BarChart3, label: 'Data Insights' },
    { id: 'benchmarks', icon: Target, label: 'Benchmarks' },
    { id: 'monitoring', icon: Activity, label: 'Model Monitoring' },
    { id: 'pipeline', icon: GitBranch, label: 'MLOps Pipeline' },
    { id: 'reports', icon: FileText, label: 'Audit Logs' },
    { id: 'compliance', icon: ClipboardCheck, label: 'Compliance' },
    { id: 'approvals', icon: UserCheck, label: 'Approvals' },
    { id: 'alerts', icon: Bell, label: 'System Alerts' },
    { id: 'settings', icon: SettingsIcon, label: 'Governance' },
  ];

  const permissions = {
    user: ['dashboard', 'market', 'scoring', 'xai', 'bulk', 'portfolio', 'insights', 'alerts', 'settings'],
    admin: ['dashboard', 'bulk', 'fraud', 'insights', 'benchmarks', 'monitoring', 'pipeline', 'reports', 'compliance', 'approvals', 'settings'],
    guest: ['dashboard', 'market', 'insights', 'settings']
  };

  const menuItems = allMenuItems.filter(item => permissions[user.role]?.includes(item.id));

  return (
    <aside className="sidebar glass" style={{
      width: '280px',
      height: 'calc(100vh - 40px)',
      margin: '20px',
      display: 'flex',
      flexDirection: 'column',
      padding: '1.5rem 1.25rem',
      position: 'sticky',
      top: '20px',
      zIndex: 100,
      background: 'rgba(15, 23, 42, 0.4)',
      backdropFilter: 'blur(40px)',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
    }}>
      <div className="logo-container" style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        marginBottom: '2rem',
        padding: '0 0.5rem'
      }}>
        <div className="float" style={{
          background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
          width: '44px',
          height: '44px',
          borderRadius: '14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 20px rgba(56, 189, 248, 0.3)'
        }}>
          <Zap color="white" size={24} fill="white" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, letterSpacing: '-0.04em' }}>RiskAI <span style={{ color: 'var(--accent-primary)', textFillColor: 'initial', background: 'none' }}>MLOps</span></h2>
          <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.1em' }}>ENTERPRISE SUITE</span>
        </div>
      </div>

      <nav style={{ flex: 1, overflowY: 'auto' }} className="custom-scrollbar">
        <ul style={{ listStyle: 'none' }}>
          {menuItems.map((item, index) => (
            <motion.li 
              key={item.id} 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              style={{ marginBottom: '0.25rem' }}
            >
              <motion.button
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(item.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '0.65rem 1.25rem',
                  borderRadius: '14px',
                  border: 'none',
                  background: activeTab === item.id ? 'linear-gradient(90deg, rgba(56, 189, 248, 0.1), transparent)' : 'transparent',
                  color: activeTab === item.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'var(--transition-smooth)',
                  textAlign: 'left',
                  position: 'relative'
                }}
              >
                {activeTab === item.id && (
                  <motion.div 
                    layoutId="activeTab"
                    style={{
                      position: 'absolute',
                      left: 0,
                      width: '4px',
                      height: '24px',
                      background: 'var(--accent-primary)',
                      borderRadius: '0 4px 4px 0',
                      boxShadow: '0 0 10px var(--accent-primary)'
                    }}
                  />
                )}
                <item.icon size={16} color={activeTab === item.id ? 'var(--accent-primary)' : 'currentColor'} strokeWidth={activeTab === item.id ? 2.5 : 2} />
                <span style={{ fontWeight: activeTab === item.id ? 700 : 500, fontSize: '0.8rem' }}>{item.label}</span>
              </motion.button>
            </motion.li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer" style={{
        paddingTop: '1rem',
        marginTop: 'auto'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          padding: '0.85rem',
          background: 'rgba(255,255,255,0.03)',
          borderRadius: '16px',
          border: '1px solid var(--border-color)'
        }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'var(--bg-tertiary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid var(--glass-border)'
          }}>
            <User size={18} color="var(--text-secondary)" />
          </div>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <p style={{ fontSize: '0.8rem', fontWeight: 700, margin: 0, color: 'white', textTransform: 'capitalize' }}>{user.name}</p>
            <p style={{ fontSize: '0.6rem', color: 'var(--text-muted)', margin: 0, fontWeight: 500, textTransform: 'uppercase' }}>{user.role}</p>
          </div>
          <motion.div whileHover={{ scale: 1.1 }} onClick={onLogout}>
            <LogOut size={16} color="var(--risk-high)" style={{ cursor: 'pointer' }} />
          </motion.div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
