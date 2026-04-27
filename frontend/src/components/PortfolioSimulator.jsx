import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Wallet, 
  Plus, 
  Minus, 
  Info, 
  Target,
  BarChart2,
  PieChart as PieIcon,
  Zap,
  ArrowRight
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

const PortfolioSimulator = () => {
  const [investment, setInvestment] = useState(10000);
  const [stocks, setStocks] = useState([
    { symbol: 'NVDA', qty: 10, price: 894, risk: 'High' },
    { symbol: 'AAPL', qty: 25, price: 172, risk: 'Low' },
    { symbol: 'BTC', qty: 0.1, price: 64281, risk: 'Very High' }
  ]);

  const totalValue = stocks.reduce((acc, s) => acc + (s.qty * s.price), 0);
  const riskProfile = investment > 50000 ? 'Aggressive' : investment > 20000 ? 'Moderate' : 'Conservative';
  
  const chartData = Array.from({ length: 12 }, (_, i) => ({
    name: `Month ${i+1}`,
    value: totalValue * (1 + (Math.random() * 0.2 - 0.05))
  }));

  const pieData = [
    { name: 'Equities', value: 65, color: 'var(--accent-primary)' },
    { name: 'Crypto', value: 20, color: 'var(--accent-secondary)' },
    { name: 'Cash', value: 15, color: 'var(--bg-tertiary)' },
  ];

  return (
    <div className="fade-in" style={{ padding: '2rem' }}>
      <header style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Portfolio Risk Simulator</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Predictive wealth analysis by correlating asset volatility with individual credit risk.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Main Portfolio Summary */}
          <div className="glass" style={{ padding: '2.5rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.1em' }}>TOTAL ASSET VALUE</p>
                  <h2 style={{ fontSize: '3rem', margin: '0.5rem 0' }}>₹{totalValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}</h2>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--risk-low)' }}>
                    <TrendingUp size={18} />
                    <span style={{ fontWeight: 800 }}>+12.4% (YTD)</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ padding: '6px 12px', borderRadius: '10px', background: 'var(--accent-glow)', color: 'var(--accent-primary)', fontWeight: 800, fontSize: '0.75rem' }}>{riskProfile.toUpperCase()} PROFILE</span>
                </div>
              </div>
            </div>
            
            <div style={{ height: '250px', marginTop: '2rem' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--accent-primary)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--accent-primary)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                  <XAxis dataKey="name" hide />
                  <YAxis hide />
                  <Tooltip contentStyle={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px' }} />
                  <Area type="monotone" dataKey="value" stroke="var(--accent-primary)" fillOpacity={1} fill="url(#colorValue)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Asset Breakdown */}
          <div className="glass" style={{ padding: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Wallet size={20} color="var(--accent-primary)" /> Asset Allocation
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
              {stocks.map((s, i) => (
                <div key={i} className="glass" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.01)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <span style={{ fontWeight: 900, color: 'var(--accent-primary)' }}>{s.symbol}</span>
                    <span style={{ fontSize: '0.65rem', padding: '2px 6px', borderRadius: '4px', background: s.risk === 'Low' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(244, 63, 94, 0.1)', color: s.risk === 'Low' ? 'var(--risk-low)' : 'var(--risk-high)' }}>{s.risk}</span>
                  </div>
                  <p style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>{s.qty} Units</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>Avg Price: ₹{s.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="glass" style={{ padding: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Risk Correlation</h3>
            <div style={{ height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                 </PieChart>
               </ResponsiveContainer>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '1rem' }}>
               {pieData.map((p, i) => (
                 <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                     <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: p.color }}></div>
                     <span style={{ color: 'var(--text-secondary)' }}>{p.name}</span>
                   </div>
                   <span style={{ fontWeight: 800 }}>{p.value}%</span>
                 </div>
               ))}
            </div>
          </div>

          <div className="glass" style={{ padding: '2.5rem', background: 'linear-gradient(135deg, var(--bg-tertiary), rgba(56, 189, 248, 0.05))', border: '1px solid var(--accent-primary)' }}>
             <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
               <Target size={20} color="var(--accent-primary)" /> Smart Optimization
             </h3>
             <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.6 }}>
               Based on your <strong>72.4% Credit Risk Score</strong>, your current portfolio volatility is overexposed by 14.2%.
             </p>
             <button style={{ width: '100%', padding: '1.25rem', borderRadius: '16px', border: 'none', background: 'var(--accent-primary)', color: 'white', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
               <Zap size={18} fill="white" /> Rebalance Portfolio
             </button>
          </div>

          <div className="glass" style={{ padding: '1.5rem', border: '1px solid var(--border-color)' }}>
             <h4 style={{ margin: '0 0 1rem', fontSize: '0.9rem' }}>Recent Activity</h4>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.8rem' }}>
                 <div style={{ padding: '6px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--risk-low)' }}><Plus size={14} /></div>
                 <div style={{ flex: 1 }}>Bought 5 NVDA @ ₹894.12</div>
                 <ArrowRight size={14} color="var(--text-muted)" />
               </div>
               <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.8rem' }}>
                 <div style={{ padding: '6px', borderRadius: '8px', background: 'rgba(244, 63, 94, 0.1)', color: 'var(--risk-high)' }}><Minus size={14} /></div>
                 <div style={{ flex: 1 }}>Sold 10 AAPL @ ₹172.45</div>
                 <ArrowRight size={14} color="var(--text-muted)" />
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioSimulator;
