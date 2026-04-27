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

const RiskAIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I am your RiskAI Assistant. How can I help you with your risk assessments today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI logic
    setTimeout(() => {
      let botResponse = "I'm analyzing that for you. Based on the current MLOps pipeline, the model stability is within the 95% confidence interval.";
      
      const lowerInput = input.toLowerCase();
      if (lowerInput.includes('risk')) botResponse = "Risk scores are calculated using a weighted ensemble of XGBoost and Random Forest models, focusing on debt-to-income ratios and credit history.";
      if (lowerInput.includes('stock') || lowerInput.includes('market')) botResponse = "The Market Intelligence module is currently showing high volatility in tech sectors. I recommend recalibrating the risk thresholds.";
      if (lowerInput.includes('hello') || lowerInput.includes('hi')) botResponse = "Hello! Ready to dive into some financial data science?";
      if (lowerInput.includes('audit') || lowerInput.includes('log')) botResponse = "All assessments are saved to the encrypted SQLite database and can be exported as PDF audit reports in the 'Audit Logs' tab.";

      setMessages(prev => [...prev, { id: Date.now() + 1, text: botResponse, sender: 'bot' }]);
      setIsTyping(false);
    }, 1500);
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
              width: '60px', height: '60px', borderRadius: '50%', background: 'var(--accent-primary)', 
              border: 'none', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 10px 30px rgba(56, 189, 248, 0.4)', cursor: 'pointer', pointerEvents: 'auto'
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
              background: 'rgba(15, 23, 42, 0.95)', backdropFilter: 'blur(40px)', pointerEvents: 'auto'
            }}
          >
            {/* Header */}
            <div style={{ 
              padding: '1.25rem', background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ background: 'rgba(255,255,255,0.2)', padding: '6px', borderRadius: '10px' }}>
                  <Zap size={20} fill="white" />
                </div>
                <div>
                  <p style={{ fontWeight: 800, margin: 0, fontSize: '0.95rem' }}>RiskAI Assistant</p>
                  <p style={{ fontSize: '0.65rem', opacity: 0.8, margin: 0 }}>Assigned Agent • Neural Engine v4.2</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {messages.map((m) => (
                <div key={m.id} style={{ 
                  alignSelf: m.sender === 'bot' ? 'flex-start' : 'flex-end',
                  maxWidth: '85%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: m.sender === 'bot' ? 'flex-start' : 'flex-end'
                }}>
                  <div style={{ 
                    padding: '0.85rem 1rem', borderRadius: '16px', fontSize: '0.9rem',
                    background: m.sender === 'bot' ? 'var(--bg-tertiary)' : 'var(--accent-primary)',
                    color: 'white',
                    border: m.sender === 'bot' ? '1px solid var(--border-color)' : 'none',
                    borderBottomLeftRadius: m.sender === 'bot' ? '4px' : '16px',
                    borderBottomRightRadius: m.sender === 'user' ? '4px' : '16px'
                  }}>
                    {m.text}
                  </div>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '4px', fontWeight: 600 }}>
                    {m.sender === 'bot' ? 'AI ASSISTANT' : 'YOU'}
                  </span>
                </div>
              ))}
              {isTyping && (
                <div style={{ alignSelf: 'flex-start', background: 'var(--bg-tertiary)', padding: '0.75rem 1rem', borderRadius: '16px', borderBottomLeftRadius: '4px' }}>
                  <Loader2 size={16} className="animate-spin" color="var(--accent-primary)" />
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSend} style={{ padding: '1.25rem', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '10px' }}>
              <input 
                type="text" value={input} onChange={(e) => setInput(e.target.value)} 
                placeholder="Ask me anything..."
                style={{ 
                  flex: 1, padding: '0.75rem 1rem', borderRadius: '12px', border: '1px solid var(--border-color)',
                  background: 'var(--bg-primary)', color: 'white', fontSize: '0.9rem'
                }}
              />
              <button 
                type="submit" 
                style={{ 
                  width: '44px', height: '44px', borderRadius: '12px', background: 'var(--accent-primary)',
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
