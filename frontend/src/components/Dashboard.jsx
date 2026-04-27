import React from 'react';
import { 
  Users, 
  ShieldAlert, 
  CheckCircle, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Activity,
  AlertTriangle
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

const StatCard = ({ title, value, change, icon: Icon, color }) => (
  <div className="glass" style={{ padding: '1.5rem', flex: 1 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div style={{ background: 'var(--bg-tertiary)', padding: '0.75rem', borderRadius: '12px' }}>
        <Icon color={color} size={24} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: change.startsWith('+') ? 'var(--risk-low)' : 'var(--risk-high)' }}>
        <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>{change}</span>
        {change.startsWith('+') ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
      </div>
    </div>
    <div style={{ marginTop: '1.25rem' }}>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>{title}</p>
      <h3 style={{ fontSize: '1.75rem', fontWeight: 800, margin: '0.25rem 0' }}>{value}</h3>
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="fade-in" style={{ padding: '2rem' }}>
      <header style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Executive Risk Overview</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Enterprise-grade financial risk intelligence and model observability.</p>
      </header>

      <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2.5rem' }}>
        <StatCard title="Total Customers" value="12,491" change="+12%" icon={Users} color="var(--accent-primary)" />
        <StatCard title="High Risk Alerts" value="156" change="+5%" icon={AlertTriangle} color="var(--risk-high)" />
        <StatCard title="Model Accuracy" value="94.2%" change="+0.4%" icon={CheckCircle} color="var(--risk-low)" />
        <StatCard title="Avg Risk Score" value="42.5" change="-2.1%" icon={Activity} color="var(--accent-secondary)" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
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
