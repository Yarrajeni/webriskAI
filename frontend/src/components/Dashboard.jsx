import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Users, 
  ShieldAlert, 
  CheckCircle, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Activity,
  AlertTriangle,
  Loader2
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line 
} from 'recharts';
import { motion } from 'framer-motion';
import RiskMap from './RiskMap';

const data = [
  { name: 'Mon', risk: 40, fraud: 24 },
  { name: 'Tue', risk: 30, fraud: 13 },
  { name: 'Wed', risk: 20, fraud: 98 },
  { name: 'Thu', risk: 27, fraud: 39 },
  { name: 'Fri', risk: 18, fraud: 48 },
  { name: 'Sat', risk: 23, fraud: 38 },
  { name: 'Sun', risk: 34, fraud: 43 },
];

const StatCard = ({ title, value, change, icon: Icon, color, loading, delay = 0 }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.2 } }}
    className="glass" 
    style={{ padding: '1.5rem', flex: 1, minWidth: '240px', cursor: 'default' }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div style={{ background: 'var(--bg-tertiary)', padding: '0.75rem', borderRadius: '12px' }}>
        <Icon color={color} size={24} />
      </div>
      {!loading && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: change.startsWith('+') ? 'var(--risk-low)' : 'var(--risk-high)' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>{change}</span>
          {change.startsWith('+') ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        </div>
      )}
    </div>
    <div style={{ marginTop: '1.25rem' }}>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>{title}</p>
      {loading ? (
        <div style={{ height: '2.25rem', width: '60%', background: 'var(--bg-tertiary)', borderRadius: '4px', marginTop: '0.5rem', animation: 'pulse 1.5s infinite' }}></div>
      ) : (
        <h3 style={{ fontSize: '1.75rem', fontWeight: 800, margin: '0.25rem 0' }}>{value}</h3>
      )}
    </div>
  </motion.div>
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    total_customers: '12,491',
    high_risk_alerts: '156',
    model_accuracy: '94.2%',
    avg_risk_score: '42.5'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || '';
        const response = await axios.get(`${apiUrl}/dashboard/stats`);
        const data = response.data;
        setStats({
          total_customers: data.total_customers.toLocaleString(),
          high_risk_alerts: data.high_risk_alerts.toString(),
          model_accuracy: `${data.model_accuracy}%`,
          avg_risk_score: data.avg_risk_score.toString()
        });
      } catch (err) {
        console.error('Failed to fetch dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="fade-in" style={{ padding: '2rem' }}>
      <header style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Executive Risk Overview</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Enterprise-grade financial risk intelligence and model observability.</p>
      </header>

      <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
        <StatCard title="Total Customers" value={stats.total_customers} change="+12%" icon={Users} color="var(--accent-primary)" loading={loading} delay={0.1} />
        <StatCard title="High Risk Alerts" value={stats.high_risk_alerts} change="+5%" icon={AlertTriangle} color="var(--risk-high)" loading={loading} delay={0.2} />
        <StatCard title="Model Accuracy" value={stats.model_accuracy} change="+0.4%" icon={CheckCircle} color="var(--risk-low)" loading={loading} delay={0.3} />
        <StatCard title="Avg Risk Score" value={stats.avg_risk_score} change="-2.1%" icon={Activity} color="var(--accent-secondary)" loading={loading} delay={0.4} />
      </div>

      <div className="dashboard-grid" style={{ display: 'grid', gap: '1.5rem', marginBottom: '1.5rem' }}>
        <RiskMap />
        
        <div className="glass" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '2rem' }}>Daily Risk Trends</h3>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
              <XAxis dataKey="name" stroke="var(--text-muted)" axisLine={false} tickLine={false} />
              <YAxis stroke="var(--text-muted)" axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px' }}
                itemStyle={{ color: 'white' }}
              />
              <Line type="monotone" dataKey="risk" stroke="var(--accent-primary)" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="fraud" stroke="var(--risk-high)" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass" style={{ padding: '2rem' }}>
        <h3 style={{ marginBottom: '2rem' }}>Portfolio Exposure Analysis</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
            <XAxis dataKey="name" stroke="var(--text-muted)" axisLine={false} tickLine={false} />
            <YAxis stroke="var(--text-muted)" axisLine={false} tickLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px' }}
              itemStyle={{ color: 'white' }}
            />
            <Bar dataKey="risk" fill="var(--accent-primary)" radius={[4, 4, 0, 0]} barSize={40} />
            <Bar dataKey="fraud" fill="var(--risk-high)" radius={[4, 4, 0, 0]} barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
