import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Search, 
  ArrowUpRight, 
  ArrowDownRight,
  Info,
  Zap,
  Activity,
  BarChart3,
  LineChart as LineChartIcon
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_STOCKS = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 182.63, change: 1.2, trend: 'up' },
  { symbol: 'TSLA', name: 'Tesla, Inc.', price: 171.05, change: -2.4, trend: 'down' },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 894.52, change: 4.8, trend: 'up' },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 420.72, change: 0.5, trend: 'up' },
  { symbol: 'AMZN', name: 'Amazon.com, Inc.', price: 178.15, change: -0.8, trend: 'down' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 151.77, change: 1.1, trend: 'up' },
];

const MarketIntelligence = () => {
  const [selectedStock, setSelectedStock] = useState(MOCK_STOCKS[2]); // Default to NVDA
  const [chartData, setChartData] = useState([]);
  const [signal, setSignal] = useState({ type: 'BUY', strength: 85, reason: 'Strong momentum and RSI breakout.' });

  useEffect(() => {
    // Generate simulated chart data
    const generateData = () => {
      let base = selectedStock.price * 0.95;
      return Array.from({ length: 20 }, (_, i) => ({
        time: `${9 + Math.floor(i/2)}:${i % 2 === 0 ? '00' : '30'}`,
        price: base + Math.random() * (selectedStock.price * 0.1)
      }));
    };
    setChartData(generateData());

    // Simulated Signal Logic
    const types = ['BUY', 'SELL', 'HOLD'];
    const randomType = types[Math.floor(Math.random() * 3)];
    const strength = Math.floor(Math.random() * 40) + 60;
    const reasons = {
      'BUY': 'Bullish engulfing pattern detected on 4H chart.',
      'SELL': 'Overbought conditions and resistance at recent highs.',
      'HOLD': 'Consolidation phase with low volatility expected.'
    };
    setSignal({ type: randomType, strength, reason: reasons[randomType] });
  }, [selectedStock]);

  return (
    <div className="fade-in" style={{ padding: '2rem' }}>
      <header style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Market Intelligence AI</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Real-time algorithmic stock analysis and decision support.</p>
      </header>

      {/* Ticker Tape */}
      <div className="glass" style={{ padding: '0', overflow: 'hidden', marginBottom: '2rem', borderRadius: '12px' }}>
        <div className="ticker-container" style={{ background: 'transparent' }}>
          <div className="ticker-wrapper" style={{ display: 'flex', gap: '40px' }}>
            {[...MOCK_STOCKS, ...MOCK_STOCKS].map((stock, i) => (
              <div key={i} className="ticker-item">
                <span style={{ fontWeight: 800, color: 'var(--text-primary)' }}>{stock.symbol}</span>
                <span className="ticker-price">₹{stock.price}</span>
                <span className={stock.trend === 'up' ? 'ticker-up' : 'ticker-down'} style={{ marginLeft: '8px' }}>
                  {stock.trend === 'up' ? '▲' : '▼'} {Math.abs(stock.change)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2.5fr', gap: '1.5rem' }}>
        {/* Stock Selector */}
        <div className="glass" style={{ padding: '1.5rem' }}>
          <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
            <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text" placeholder="Search Markets..." 
              style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'white' }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {MOCK_STOCKS.map((stock) => (
              <button
                key={stock.symbol}
                onClick={() => setSelectedStock(stock)}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem',
                  borderRadius: '12px',
                  border: 'none',
                  background: selectedStock.symbol === stock.symbol ? 'var(--accent-glow)' : 'rgba(255,255,255,0.02)',
                  cursor: 'pointer',
                  border: selectedStock.symbol === stock.symbol ? '1px solid var(--accent-primary)' : '1px solid transparent',
                  transition: 'var(--transition-smooth)'
                }}
              >
                <div style={{ textAlign: 'left' }}>
                  <p style={{ fontWeight: 800, margin: 0, color: 'white' }}>{stock.symbol}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>{stock.name}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontWeight: 700, margin: 0, color: 'white' }}>₹{stock.price}</p>
                  <p style={{ fontSize: '0.75rem', color: stock.trend === 'up' ? 'var(--risk-low)' : 'var(--risk-high)', margin: 0 }}>
                    {stock.trend === 'up' ? '+' : ''}{stock.change}%
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Detailed Analysis */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="glass" style={{ padding: '2rem', flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '0.5rem' }}>
                  <h2 style={{ fontSize: '2rem', margin: 0 }}>{selectedStock.name}</h2>
                  <span style={{ padding: '4px 12px', borderRadius: '8px', background: 'var(--bg-tertiary)', fontSize: '0.875rem', fontWeight: 600 }}>{selectedStock.symbol}</span>
                </div>
                <p style={{ fontSize: '2.5rem', fontWeight: 800, margin: 0 }}>
                  ₹{selectedStock.price} 
                  <span style={{ fontSize: '1.25rem', color: selectedStock.trend === 'up' ? 'var(--risk-low)' : 'var(--risk-high)', marginLeft: '12px', fontWeight: 600 }}>
                    {selectedStock.trend === 'up' ? '+' : ''}{selectedStock.change}%
                  </span>
                </p>
              </div>

              <div style={{ textAlign: 'right' }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>AI DECISION SIGNAL</p>
                <div style={{ 
                  padding: '1rem 2rem', 
                  borderRadius: '16px', 
                  background: signal.type === 'BUY' ? 'rgba(16, 185, 129, 0.15)' : signal.type === 'SELL' ? 'rgba(244, 63, 94, 0.15)' : 'rgba(251, 191, 36, 0.15)',
                  border: `2px solid ${signal.type === 'BUY' ? 'var(--risk-low)' : signal.type === 'SELL' ? 'var(--risk-high)' : 'var(--risk-medium)'}`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}>
                  <span style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: 900, 
                    color: signal.type === 'BUY' ? 'var(--risk-low)' : signal.type === 'SELL' ? 'var(--risk-high)' : 'var(--risk-medium)'
                  }}>
                    {signal.type}
                  </span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>Confidence: {signal.strength}%</span>
                </div>
              </div>
            </div>

            <div style={{ height: '300px', marginBottom: '2rem' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={selectedStock.trend === 'up' ? 'var(--risk-low)' : 'var(--risk-high)'} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={selectedStock.trend === 'up' ? 'var(--risk-low)' : 'var(--risk-high)'} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                  <XAxis dataKey="time" stroke="var(--text-muted)" axisLine={false} tickLine={false} />
                  <YAxis hide domain={['auto', 'auto']} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', backdropFilter: 'blur(10px)' }}
                    itemStyle={{ color: 'white' }}
                  />
                  <Area type="monotone" dataKey="price" stroke={selectedStock.trend === 'up' ? 'var(--risk-low)' : 'var(--risk-high)'} fillOpacity={1} fill="url(#colorPrice)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="glass" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.03)' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '0.75rem' }}>
                <Zap size={20} color="var(--accent-primary)" />
                <h4 style={{ margin: 0, color: 'white' }}>Decision Rationale</h4>
              </div>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>{signal.reason}</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            <div className="glass" style={{ padding: '1.5rem' }}>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>VOLATILITY</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Activity size={18} color="var(--accent-secondary)" />
                <span style={{ fontWeight: 700 }}>Medium</span>
              </div>
            </div>
            <div className="glass" style={{ padding: '1.5rem' }}>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>RSI (14)</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BarChart3 size={18} color="var(--accent-primary)" />
                <span style={{ fontWeight: 700 }}>{Math.floor(Math.random() * 40) + 30}</span>
              </div>
            </div>
            <div className="glass" style={{ padding: '1.5rem' }}>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>VOLUME</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <TrendingUp size={18} color="var(--risk-low)" />
                <span style={{ fontWeight: 700 }}>2.4M</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketIntelligence;
