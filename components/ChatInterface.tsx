import React, { useState, useRef, useEffect } from 'react';
import { Chat } from "@google/genai";
import { Message, Role, QuickPrompt } from '../types';
import { createChatSession, sendMessageStream } from '../services/geminiService';
import MessageBubble from './MessageBubble';
import { QUICK_PROMPTS } from '../constants';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Initialize Chat Session on Mount
  useEffect(() => {
    try {
      const chat = createChatSession();
      setChatSession(chat);
      // Add initial greeting
      setMessages([{
        id: 'init-1',
        role: Role.MODEL,
        text: "Welcome to SIT! I'm your Spartan Assistant. How can I help you today?",
        timestamp: new Date()
      }]);
    } catch (e) {
      console.error("Failed to init chat", e);
    }
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [inputText]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || !chatSession || isTyping) return;

    const userMessageId = Date.now().toString();
    const newUserMessage: Message = {
      id: userMessageId,
      role: Role.USER,
      text: text.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputText('');
    setIsTyping(true);
    if (textareaRef.current) textareaRef.current.style.height = 'auto';

    // Placeholder for bot message
    const botMessageId = (Date.now() + 1).toString();
    const initialBotMessage: Message = {
      id: botMessageId,
      role: Role.MODEL,
      text: '',
      timestamp: new Date(),
      isStreaming: true
    };
    setMessages(prev => [...prev, initialBotMessage]);

    try {
      const stream = sendMessageStream(chatSession, text);
      let accumulatedText = "";
      let accumulatedUrls: string[] = [];

      for await (const chunk of stream) {
        accumulatedText += chunk.text;
        if (chunk.groundingUrls) {
          accumulatedUrls = [...new Set([...accumulatedUrls, ...chunk.groundingUrls])];
        }

        setMessages(prev => prev.map(msg => 
          msg.id === botMessageId 
            ? { ...msg, text: accumulatedText, groundingUrls: accumulatedUrls } 
            : msg
        ));
      }
    } catch (error) {
      console.error("Chat error", error);
    } finally {
      setIsTyping(false);
      setMessages(prev => prev.map(msg => 
        msg.id === botMessageId 
          ? { ...msg, isStreaming: false } 
          : msg
      ));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputText);
    }
  };

  const onQuickPromptClick = (prompt: QuickPrompt) => {
    handleSendMessage(prompt.prompt);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 relative">
      
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 scrollbar-hide">
        <div className="max-w-3xl mx-auto flex flex-col min-h-full justify-end">
          
          {/* Welcome Empty State */}
          {messages.length <= 1 && (
            <div className="mb-10 text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl mx-auto flex items-center justify-center mb-4 text-indigo-600 shadow-sm border border-indigo-200">
                <span className="text-3xl">🏛️</span>
              </div>
              <h2 className="text-xl font-bold text-slate-800 mb-2">SIT Student Assistant</h2>
              <p className="text-slate-500 text-sm max-w-sm mx-auto mb-8">
                Your guide to Scholars Institute of Technology. Ask about courses, food, or campus life.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto">
                {QUICK_PROMPTS.map((qp, idx) => (
                  <button
                    key={idx}
                    onClick={() => onQuickPromptClick(qp)}
                    className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl hover:border-indigo-300 hover:shadow-md transition-all text-left group"
                  >
                    <span className="text-xl group-hover:scale-110 transition-transform">{qp.icon}</span>
                    <span className="text-sm font-medium text-slate-700">{qp.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Message List */}
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-slate-200 p-4 sticky bottom-0 z-10">
        <div className="max-w-3xl mx-auto">
          <div className="relative flex items-end bg-slate-100 rounded-2xl border border-transparent focus-within:border-indigo-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-100 transition-all">
            <textarea
              ref={textareaRef}
              className="w-full bg-transparent border-none text-slate-800 placeholder-slate-400 px-4 py-3 focus:ring-0 resize-none max-h-32 min-h-[50px] leading-normal"
              placeholder="Ask anything about SIT..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
            />
            <button
              onClick={() => handleSendMessage(inputText)}
              disabled={!inputText.trim() || isTyping}
              className={`mb-2 mr-2 p-2 rounded-xl flex items-center justify-center transition-all ${
                !inputText.trim() || isTyping 
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm'
              }`}
            >
              {isTyping ? (
                 <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                </svg>
              )}
            </button>
          </div>
          <p className="text-center text-[10px] text-slate-400 mt-2">
            SIT Assistant can make mistakes. Check official campus sources for critical info.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;