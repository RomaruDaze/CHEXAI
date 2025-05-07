import React, { useState } from 'react';
import './Chatbot.css';

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      text: input,
      isUser: true,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate bot response (you can replace this with actual API calls)
    setTimeout(() => {
      const botMessage: Message = {
        text: "I'm a demo bot. This is a sample response!",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h2>Chat Assistant</h2>
      </div>
      
      <div className="chatbot-messages">
        {messages.length === 0 ? (
          <div className="welcome-message">
            <h3>Welcome! ��</h3>
            <p>How can I help you today?</p>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.isUser ? 'user-message' : 'bot-message'}`}
            >
              <div className="message-content">
                {message.text}
              </div>
              <div className="message-timestamp">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSend} className="chatbot-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </form>
    </div>
  );
};

export default Chatbot;