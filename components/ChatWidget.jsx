'use client';

import { useState, useRef, useEffect } from 'react';
import './ChatWidget.css';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I\'m The Tool Shop HYD Assistant. How can I help you today?' }
  ]);

  const quickActions = [
    { label: '🕒 Store Location & Hours', query: 'Where is your store and what are your operating hours?' },
    { label: '🛠️ Repair Services', query: 'What kind of repair services do you offer?' },
    { label: '😂 Tell me a Joke', query: 'Tell me a tool-related joke!' }
  ];

  const handleQuickAction = (query) => {
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
            
            {messages.length === 1 && (
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

            {isLoading && (
              <div className="chat-message chat-message--assistant">
                <div className="chat-message-content chat-loading-text">
                  The Tool Shop is thinking<span>.</span><span>.</span><span>.</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="chat-input-form" onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about tools or repairs..."
              className="chat-input"
              disabled={isLoading}
            />
            <button type="submit" className="chat-send-btn" disabled={isLoading || !input.trim()}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9L22 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </form>
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
