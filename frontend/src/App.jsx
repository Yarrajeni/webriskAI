import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import RiskForm from './components/RiskForm';
import ModelMonitoring from './components/ModelMonitoring';
import PipelineView from './components/PipelineView';
import ComplianceReports from './components/ComplianceReports';
import MarketIntelligence from './components/MarketIntelligence';
import AlertsSystem from './components/AlertsSystem';
import NotificationSystem from './components/NotificationSystem';
import DataExplorer from './components/DataExplorer';
import RiskAIAssistant from './components/RiskAIAssistant';
import Settings from './components/Settings';
import FraudHub from './components/FraudHub';
import PortfolioSimulator from './components/PortfolioSimulator';
import BulkProcessing from './components/BulkProcessing';
import XAIStudio from './components/XAIStudio';
import ComplianceChecklist from './components/ComplianceChecklist';
import ApprovalQueue from './components/ApprovalQueue';
import BenchmarkingStudio from './components/BenchmarkingStudio';
import Auth from './components/Auth';
import Landing from './components/Landing';

function App() {
  const [user, setUser] = useState(null); 
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState('signin');
  const [activeTab, setActiveTab] = useState('dashboard');

  const onLogin = (userData) => {
    setUser(userData);
    setShowAuth(false);
    setActiveTab('dashboard');
  };

  const onLogout = () => {
    setUser(null);
    setShowAuth(false);
    setActiveTab('dashboard');
  };

  const isAccessible = (tab) => {
    if (!user) return false;
    const role = user.role;
    
    const permissions = {
      user: ['dashboard', 'market', 'scoring', 'xai', 'bulk', 'portfolio', 'insights', 'alerts', 'settings'],
      admin: ['dashboard', 'bulk', 'fraud', 'insights', 'benchmarks', 'monitoring', 'pipeline', 'reports', 'compliance', 'approvals', 'settings'],
      guest: ['dashboard', 'market', 'insights', 'settings']
    };

    return permissions[role]?.includes(tab);
  };

  const renderContent = () => {
    if (!isAccessible(activeTab)) {
      return (
        <div className="fade-in" style={{ padding: '4rem', textAlign: 'center' }}>
          <h2 style={{ color: 'var(--risk-high)' }}>Access Restricted</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Module restricted based on your current role: <strong>{user?.role?.toUpperCase()}</strong>.</p>
          <button onClick={() => setActiveTab('dashboard')} style={{ marginTop: '1rem', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid var(--accent-primary)', background: 'transparent', color: 'var(--accent-primary)', cursor: 'pointer' }}>Back to Dashboard</button>
        </div>
      );
    }

    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'market': return <MarketIntelligence />;
      case 'scoring': return <RiskForm />;
      case 'xai': return <XAIStudio />;
      case 'bulk': return <BulkProcessing />;
      case 'portfolio': return <PortfolioSimulator />;
      case 'fraud': return <FraudHub />;
      case 'insights': return <DataExplorer />;
      case 'monitoring': return <ModelMonitoring />;
      case 'pipeline': return <PipelineView />;
      case 'reports': return <ComplianceReports />;
      case 'compliance': return <ComplianceChecklist />;
      case 'approvals': return <ApprovalQueue />;
      case 'benchmarks': return <BenchmarkingStudio />;
      case 'alerts': return <AlertsSystem />;
      case 'settings': return <Settings user={user} />;
      default: return <Dashboard />;
    }
  };

  if (!user && !showAuth) {
    return (
      <Landing 
        onGetStarted={() => { setAuthMode('signup'); setShowAuth(true); }}
        onSignIn={() => { setAuthMode('signin'); setShowAuth(true); }}
      />
    );
  }

  if (!user && showAuth) {
    return <Auth onLogin={onLogin} initialMode={authMode} />;
  }

  return (
    <>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} user={user} onLogout={onLogout} />
      <main style={{ flex: 1, height: '100vh', overflowY: 'auto' }}>
        <div className="ticker-container" style={{ background: 'rgba(0,0,0,0.2)', backdropFilter: 'blur(10px)', sticky: 'top', top: 0, zIndex: 50 }}>
          <div className="ticker-wrapper">
            <span className="ticker-item">BTC <span className="ticker-price">₹64,281.20</span> <span className="ticker-up">▲ 2.4%</span></span>
            <span className="ticker-item">ETH <span className="ticker-price">₹3,142.15</span> <span className="ticker-down">▼ 0.8%</span></span>
            <span className="ticker-item">SPY <span className="ticker-price">₹512.30</span> <span className="ticker-up">▲ 0.1%</span></span>
            <span className="ticker-item">VIX <span className="ticker-price">14.25</span> <span className="ticker-down">▼ 4.2%</span></span>
            <span className="ticker-item">NVDA <span className="ticker-price">₹894.52</span> <span className="ticker-up">▲ 4.8%</span></span>
          </div>
        </div>
        {renderContent()}
        <NotificationSystem />
        <RiskAIAssistant />
      </main>
    </>
  );
}

export default App;
