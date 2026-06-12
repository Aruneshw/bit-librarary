'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

/**
 * AIChatPanel — Client-side chat UI.
 *
 * 🔒 Security: This component ONLY calls fetch("/api/chat").
 *    It NEVER imports the Anthropic SDK or references any API key.
 */
export default function AIChatPanel() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    setError(null);
    setInput('');

    const userMessage: ChatMessage = {
      role: 'user',
      content: trimmed,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // 🔒 Only calls our server-side proxy — never api.anthropic.com
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || `Error (${res.status})`);
        return;
      }

      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: data.reply,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      setError('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
        style={{
          background: 'linear-gradient(135deg, #00d9ff 0%, #00ff41 100%)',
          boxShadow: '0 4px 20px rgba(0,217,255,0.3)',
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? 'Close AI Chat' : 'Open AI Chat'}
        id="ai-chat-toggle"
      >
        <span className="text-2xl font-bold text-black">
          {isOpen ? '✕' : 'AI'}
        </span>
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-h-[500px] flex flex-col rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(10, 14, 20, 0.95)',
              border: '1px solid rgba(0, 217, 255, 0.2)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 8px 40px rgba(0,0,0,0.5), 0 0 30px rgba(0,217,255,0.1)',
            }}
            id="ai-chat-panel"
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-5 py-4"
              style={{
                borderBottom: '1px solid rgba(0, 217, 255, 0.15)',
                background: 'linear-gradient(135deg, rgba(0,217,255,0.05) 0%, rgba(0,255,65,0.03) 100%)',
              }}
            >
              <div
                className="w-3 h-3 rounded-full animate-pulse"
                style={{
                  background: '#00ff41',
                  boxShadow: '0 0 8px rgba(0,255,65,0.5)',
                }}
              />
              <span className="font-mono text-xs text-white/80 tracking-wider uppercase">
                BIT Library AI
              </span>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 min-h-[200px] max-h-[340px]">
              {messages.length === 0 && (
                <div className="flex items-center justify-center h-full">
                  <p className="font-mono text-[11px] text-white/30 text-center">
                    Ask me anything about your subjects...
                  </p>
                </div>
              )}

              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-3 py-2 rounded-xl text-xs font-mono leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-arc-blue/15 text-arc-blue border border-arc-blue/20'
                        : 'bg-terminal-green/10 text-terminal-green/90 border border-terminal-green/15'
                    }`}
                    style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="px-3 py-2 rounded-xl bg-terminal-green/10 border border-terminal-green/15">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-terminal-green/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-terminal-green/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-terminal-green/60 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Error */}
            {error && (
              <div className="px-4 pb-2">
                <p className="font-mono text-[10px] text-red-400">{error}</p>
              </div>
            )}

            {/* Input */}
            <div
              className="flex items-center gap-2 px-4 py-3"
              style={{
                borderTop: '1px solid rgba(0, 217, 255, 0.15)',
                background: 'rgba(0, 0, 0, 0.3)',
              }}
            >
              <input
                ref={inputRef}
                type="text"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-arc-blue/50 transition-colors placeholder:text-white/25 disabled:opacity-50"
                id="ai-chat-input"
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                className="px-3 py-2 rounded-lg font-mono text-xs font-semibold uppercase tracking-wider transition-all disabled:opacity-30"
                style={{
                  background: 'rgba(0, 217, 255, 0.1)',
                  border: '1px solid rgba(0, 217, 255, 0.3)',
                  color: '#00d9ff',
                }}
                id="ai-chat-send"
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
