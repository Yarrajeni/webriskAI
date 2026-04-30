import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Zap, 
  User, 
  Bot, 
  Loader2,
  Minimize2,
  Maximize2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AGENTS = {
  risk: {
    name: "Risk Analyst",
    specialty: "Credit & Fraud Analysis",
    description: "Deep-dives into credit scores and anomaly detection.",
    icon: <Zap size={20} fill="white" />,
    color: "var(--accent-primary)",
    greeting: "I am your assigned Risk Analyst. I've finished scanning the recent transaction logs. How can I help?",
    knowledge: ["risk", "credit", "fraud", "anomaly", "score"]
  },
  compliance: {
    name: "Compliance Officer",
    specialty: "Regulatory & Audit",
    description: "Ensures all models follow GDPR and financial regulations.",
    icon: <Bot size={20} fill="white" />,
    color: "#f59e0b",
    greeting: "Compliance Officer reporting for duty. All audit trails are secure. Ready for a regulatory review?",
    knowledge: ["audit", "log", "gdpr", "legal", "regulation", "report"]
  },
  market: {
    name: "Market Strategist",
    specialty: "Stock & Market Trends",
    description: "Analyzes live tickers and volatility signals.",
    icon: <User size={20} fill="white" />,
    color: "#10b981",
    greeting: "Market Strategist here. The bulls and bears are active today. Want a sector-wise breakdown?",
    knowledge: ["stock", "market", "ticker", "volatility", "price", "crypto"]
  }
};

const RiskAIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAgentMenu, setShowAgentMenu] = useState(false);
  const [currentAgent, setCurrentAgent] = useState('risk');
  const [messages, setMessages] = useState([
    { id: 1, text: AGENTS.risk.greeting, sender: 'bot', agent: 'risk' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  const agent = AGENTS[currentAgent];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const switchAgent = (key) => {
    setCurrentAgent(key);
    setShowAgentMenu(false);
    const newAgent = AGENTS[key];
    setMessages(prev => [...prev, { 
      id: Date.now(), 
      text: `SYSTEM: ${newAgent.name} has been assigned to this session.`, 
      sender: 'system' 
    }]);
    
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        text: newAgent.greeting, 
        sender: 'bot',
        agent: key
      }]);
    }, 600);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate specialized AI logic
    setTimeout(() => {
      let botResponse = `I'm analyzing your request from a ${agent.name} perspective. Everything looks stable.`;
      const lowerInput = input.toLowerCase();

      if (currentAgent === 'risk') {
        if (lowerInput.includes('risk')) botResponse = "Risk scores are currently optimized using XGBoost. I suggest reviewing the debt-to-income weights.";
        if (lowerInput.includes('fraud')) botResponse = "I've flagged 3 anomalies in the real-time stream. They seem to be location-based discrepancies.";
      } else if (currentAgent === 'compliance') {
        if (lowerInput.includes('audit')) botResponse = "The audit logs are fully immutable. You can export the signed PDF report from the Audit Center.";
        if (lowerInput.includes('log')) botResponse = "Every model prediction is logged with its feature importance for full XAI transparency.";
      } else if (currentAgent === 'market') {
        if (lowerInput.includes('stock') || lowerInput.includes('market')) botResponse = "The market is showing a 2.4% volatility spike. I've updated the risk-adjusted return forecasts.";
        if (lowerInput.includes('buy') || lowerInput.includes('sell')) botResponse = "My latest signal is HOLD for long-term tech assets due to the incoming CPI data.";
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, text: botResponse, sender: 'bot', agent: currentAgent }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div style={{ position: 'fixed', bottom: '30px', left: '30px', zIndex: 1000 }}>
      <AnimatePresence>
        {!isOpen ? (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            onClick={() => setIsOpen(true)}
            style={{ 
              width: '60px', height: '60px', borderRadius: '50%', background: agent.color, 
              border: 'none', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 10px 30px ${agent.color}66`, cursor: 'pointer', pointerEvents: 'auto'
            }}
          >
            <MessageSquare size={28} />
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="glass"
            style={{ 
              width: '380px', height: '550px', display: 'flex', flexDirection: 'column',
              overflow: 'hidden', border: '1px solid var(--glass-border)', boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
              background: 'rgba(15, 23, 42, 0.95)', backdropFilter: 'blur(40px)', pointerEvents: 'auto',
              borderRadius: '24px'
            }}
          >
            {/* Header */}
            <div style={{ 
              padding: '1.25rem', background: `linear-gradient(90deg, ${agent.color}, ${agent.color}cc)`,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ background: 'rgba(255,255,255,0.2)', padding: '6px', borderRadius: '10px' }}>
                  {agent.icon}
                </div>
                <div>
                  <p style={{ fontWeight: 800, margin: 0, fontSize: '0.95rem' }}>{agent.name}</p>
                  <p style={{ fontSize: '0.65rem', opacity: 0.8, margin: 0 }}>Assigned Agent • {agent.specialty}</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => setShowAgentMenu(!showAgentMenu)} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', cursor: 'pointer', padding: '4px', borderRadius: '6px' }}>
                  <User size={16} />
                </button>
                <button onClick={() => setIsOpen(false)} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Agent Switcher Menu */}
            <AnimatePresence>
              {showAgentMenu && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', overflow: 'hidden' }}
                >
                  <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <p style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Assign New Agent</p>
                    {Object.entries(AGENTS).map(([key, a]) => (
                      <button 
                        key={key}
                        onClick={() => switchAgent(key)}
                        style={{ 
                          display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', borderRadius: '10px',
                          border: key === currentAgent ? `1px solid ${a.color}` : '1px solid transparent',
                          background: key === currentAgent ? `${a.color}22` : 'transparent',
                          color: 'white', cursor: 'pointer', textAlign: 'left', transition: '0.2s'
                        }}
                      >
                        <div style={{ background: a.color, padding: '4px', borderRadius: '6px' }}>{a.icon}</div>
                        <div>
                          <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 600 }}>{a.name}</p>
                          <p style={{ margin: 0, fontSize: '0.65rem', opacity: 0.7 }}>{a.specialty}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Messages */}
            <div ref={scrollRef} style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {messages.map((m) => (
                <div key={m.id} style={{ 
                  alignSelf: m.sender === 'bot' ? 'flex-start' : m.sender === 'system' ? 'center' : 'flex-end',
                  maxWidth: m.sender === 'system' ? '100%' : '85%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: m.sender === 'bot' ? 'flex-start' : m.sender === 'system' ? 'center' : 'flex-end'
                }}>
                  {m.sender === 'system' ? (
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 700, background: 'var(--bg-tertiary)', padding: '4px 12px', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
                      {m.text}
                    </span>
                  ) : (
                    <>
                      <div style={{ 
                        padding: '0.85rem 1rem', borderRadius: '16px', fontSize: '0.9rem',
                        background: m.sender === 'bot' ? 'var(--bg-tertiary)' : agent.color,
                        color: 'white',
                        border: m.sender === 'bot' ? '1px solid var(--border-color)' : 'none',
                        borderBottomLeftRadius: m.sender === 'bot' ? '4px' : '16px',
                        borderBottomRightRadius: m.sender === 'user' ? '4px' : '16px'
                      }}>
                        {m.text}
                      </div>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '4px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {m.sender === 'bot' ? (
                          <><div style={{ width: '6px', height: '6px', borderRadius: '50%', background: AGENTS[m.agent].color }}></div> {AGENTS[m.agent].name.toUpperCase()}</>
                        ) : 'YOU'}
                      </span>
                    </>
                  )}
                </div>
              ))}
              {isTyping && (
                <div style={{ alignSelf: 'flex-start', background: 'var(--bg-tertiary)', padding: '0.75rem 1rem', borderRadius: '16px', borderBottomLeftRadius: '4px' }}>
                  <Loader2 size={16} className="animate-spin" color={agent.color} />
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSend} style={{ padding: '1.25rem', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '10px' }}>
              <input 
                type="text" value={input} onChange={(e) => setInput(e.target.value)} 
                placeholder={`Ask the ${agent.name}...`}
                style={{ 
                  flex: 1, padding: '0.75rem 1rem', borderRadius: '12px', border: '1px solid var(--border-color)',
                  background: 'var(--bg-primary)', color: 'white', fontSize: '0.9rem'
                }}
              />
              <button 
                type="submit" 
                style={{ 
                  width: '44px', height: '44px', borderRadius: '12px', background: agent.color,
                  border: 'none', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                }}
              >
                <Send size={20} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RiskAIAssistant;
