'use client';

import { useState, useRef, useEffect } from 'react';
import './ChatWidget.css';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Welcome to The Tool Shop HYD! 🛠️ How can I help you today? Select a category below or ask me anything.' }
  ]);
  const [isLeadCaptured, setIsLeadCaptured] = useState(false);

  const quickActions = [
    { label: '🌩️ Power Tools', query: 'FAST_PATH_POWER_TOOLS' },
    { label: '📦 Bulk Quote', query: 'FAST_PATH_BULK_QUOTE' },
    { label: '🛠️ Repair Services', query: 'Tell me about your repair services.' },
    { label: '😂 Tell a Joke', query: 'Tell me a tool-related joke!' }
  ];

  const handleQuickAction = (query) => {
    // Fast Path logic
    if (query === 'FAST_PATH_POWER_TOOLS') {
      const userMsg = { role: 'user', content: 'Power Tools' };
      const assistantMsg = { role: 'assistant', content: 'We stock Bosch, DeWalt, and Makita. Drills start at ₹3,500.' };
      setMessages(prev => [...prev, userMsg, assistantMsg]);
      return;
    }
    if (query === 'FAST_PATH_BULK_QUOTE') {
      const userMsg = { role: 'user', content: 'Bulk Quote' };
      const assistantMsg = { role: 'assistant', content: 'Wholesale rates available for 5+ units. What are your project requirements?' };
      setMessages(prev => [...prev, userMsg, assistantMsg]);
      return;
    }

    setInput(query);
    setTimeout(() => {
      const fakeEvent = { preventDefault: () => {} };
      handleSubmit(fakeEvent, query);
    }, 0);
  };
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e, customQuery = null) => {
    e.preventDefault();
    const query = customQuery || input;
    if (!query.trim() || isLoading) return;

    const userMessage = { role: 'user', content: query };
    setMessages(prev => [...prev, userMessage]);
    if (!customQuery) setInput('');

    // Lead detection logic (Logic Trigger)
    const phoneRegex = /(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
    const isCallbackRequest = query.toLowerCase().includes('callback') || query.toLowerCase().includes('call me');
    
    if (phoneRegex.test(query) || isCallbackRequest) {
      setTimeout(() => {
        setIsLeadCaptured(true);
      }, 1000);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content
          }))
        }),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
    } catch (error) {
      console.error('Chat Error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again later.' 
      }]);
    } finally {
      setIsLoading(false);
      if (customQuery) setInput('');
    }
  };

  return (
    <div className="chat-widget-container">
      {isOpen && (
        <div className="chat-window" id="chat-widget">
          <div className="chat-header">
            <div className="chat-header-info">
              <span className="chat-bot-icon">🔧</span>
              <div>
                <h3 className="chat-bot-name">Shop Assistant</h3>
                <span className="chat-bot-status">Online</span>
              </div>
            </div>
            <button className="chat-close-btn" onClick={() => setIsOpen(false)}>×</button>
          </div>
          
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message chat-message--${msg.role}`}>
                <div className="chat-message-content">
                  {msg.content}
                </div>
              </div>
            ))}
            
            {messages.length === 1 && !isLeadCaptured && (
              <div className="quick-actions">
                {quickActions.map((action, idx) => (
                  <button 
                    key={idx} 
                    className="quick-action-btn"
                    onClick={() => handleQuickAction(action.query)}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )}

            {isLeadCaptured && (
              <div className="lead-success-msg animate-fade-in">
                <div className="success-icon">✅</div>
                <p>Thank you! Our manager will call you shortly to discuss your requirements.</p>
              </div>
            )}

            {isLoading && !isLeadCaptured && (
              <div className="chat-message chat-message--assistant">
                <div className="chat-message-content chat-loading-text">
                  The Tool Shop is thinking<span>.</span><span>.</span><span>.</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {!isLeadCaptured && (
            <form className="chat-input-form" onSubmit={handleSubmit}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about tools or repairs..."
                className="chat-input"
                disabled={isLoading}
                aria-label="Chat input field"
              />
              <button type="submit" className="chat-send-btn" disabled={isLoading || !input.trim()} aria-label="Send message">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9L22 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </form>
          )}
        </div>
      )}

      <button 
        className={`chat-toggle-btn ${isOpen ? 'chat-toggle-btn--active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle chat"
      >
        {isOpen ? (
          <span className="chat-toggle-icon">✕</span>
        ) : (
          <span className="chat-toggle-icon">💬</span>
        )}
      </button>
    </div>
  );
}
