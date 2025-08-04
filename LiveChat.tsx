'use client';

import React, { useState, createContext, useContext } from 'react';
import { MessageCircle, X, Send, Minimize2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { analytics } from '@/lib/analytics';

interface LiveChatContextType {
  openChat: () => void;
}

const LiveChatContext = createContext<LiveChatContextType | undefined>(undefined);

export function useLiveChat() {
  const context = useContext(LiveChatContext);
  if (!context) {
    throw new Error('useLiveChat must be used within LiveChatProvider');
  }
  return context;
}

export function LiveChatProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openChat = () => {
    analytics.trackButtonClick('Open Live Chat', 'Chat Widget');
    setIsOpen(true);
  };

  return (
    <LiveChatContext.Provider value={{ openChat }}>
      {children}
      <LiveChatComponent isOpen={isOpen} setIsOpen={setIsOpen} />
    </LiveChatContext.Provider>
  );
}

interface LiveChatComponentProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

function LiveChatComponent({ isOpen, setIsOpen }: LiveChatComponentProps) {
  const { t } = useLanguage();
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: t('chat.welcome'),
      sender: 'support',
      timestamp: new Date()
    }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: message,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, newMessage]);
    setMessage('');

    // Simulate support response
    setTimeout(() => {
      const supportResponse = {
        id: messages.length + 2,
        text: t('chat.response'),
        sender: 'support',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, supportResponse]);
    }, 1000);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-teal-500 to-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 group"
        >
          <MessageCircle size={24} className="group-hover:scale-110 transition-transform duration-200" />
        </button>
        <div className="absolute -top-12 right-0 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {t('chat.tooltip')}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className={`bg-white rounded-2xl shadow-2xl border border-gray-200 transition-all duration-300 ${
        isMinimized ? 'w-80 h-16' : 'w-80 h-96'
      }`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-500 to-blue-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <MessageCircle size={16} />
            </div>
            <div>
              <h3 className="font-semibold text-sm">{t('chat.title')}</h3>
              <p className="text-xs opacity-90">{t('chat.subtitle')}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-white/80 hover:text-white transition-colors duration-200"
            >
              <Minimize2 size={16} />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors duration-200"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="h-64 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-teal-500 to-blue-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <form onSubmit={handleSendMessage} className="flex space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t('chat.placeholder')}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none text-sm"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-teal-500 to-blue-600 text-white p-2 rounded-lg hover:from-teal-600 hover:to-blue-700 transition-colors duration-200"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Keep the default export for backward compatibility
export default function LiveChat() {
  return <LiveChatProvider><div /></LiveChatProvider>;
}