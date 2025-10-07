import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import {
  MessageCircle,
  Send,
  Bot,
  User,
  Loader,
  RefreshCw,
  Heart,
  Brain,
  Activity,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  message: string;
  timestamp: Date;
}

export function HealthChatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      message: 'Hello! I\'m CuraMind\'s health assistant. I can help answer your health-related questions. How can I assist you today?',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      message: inputMessage.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // THIS IS THE CORRECTED LINE
      const response = await fetch('http://localhost:3001/api/chatbot/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage.message }),
      });

      const data = await response.json();
      
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        message: data.response,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        message: 'Oops! Something went wrong. Please try again.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        sender: 'bot',
        message: 'Hello! I\'m CuraMind\'s health assistant. I can help answer your health-related questions. How can I assist you today?',
        timestamp: new Date(),
      },
    ]);
  };

  return (
    // ... the rest of your excellent JSX code is perfect and does not need to be changed ...
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex justify-center mb-4">
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-r from-primary-600 to-healthcare-600 flex items-center justify-center">
            <MessageCircle className="h-8 w-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">
          CuraMind Health Chatbot
        </h1>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          Your AI-powered health assistant for general health information and guidance
        </p>
      </motion.div>

      {/* Disclaimer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-warning-50 border border-warning-200 rounded-lg p-4"
      >
        <div className="flex items-start">
          <Brain className="h-5 w-5 text-warning-600 mr-3 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-warning-800">
              Important Medical Disclaimer
            </h3>
            <p className="text-sm text-warning-700 mt-1">
              This AI chatbot provides general health information only and should not replace professional medical advice. 
              Always consult with a healthcare provider for specific medical concerns or before making health decisions.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Chat Interface */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card p-0 overflow-hidden"
      >
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-primary-600 to-healthcare-600 text-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">CuraMind Assistant</h3>
                <p className="text-sm opacity-90">Online • Ready to help</p>
              </div>
            </div>
            <button
              onClick={clearChat}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              title="Clear chat"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${
                message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}>
                <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.sender === 'user' 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-healthcare-100 text-healthcare-600'
                }`}>
                  {message.sender === 'user' ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4" />
                  )}
                </div>
                <div className={`rounded-lg p-3 ${
                  message.sender === 'user'
                    ? 'bg-primary-600 text-white'
                    : 'bg-neutral-100 text-neutral-900'
                }`}>
                  <div className="text-sm">
                    <ReactMarkdown>{message.message}</ReactMarkdown>
                  </div>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-primary-100' : 'text-neutral-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
          
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="flex items-start space-x-2">
                <div className="h-8 w-8 rounded-full bg-healthcare-100 text-healthcare-600 flex items-center justify-center">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="bg-neutral-100 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <Loader className="h-4 w-4 animate-spin text-neutral-500" />
                    <span className="text-sm text-neutral-600">Thinking...</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-neutral-200 p-4">
          <div className="flex space-x-2">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about your health concerns..."
              className="flex-1 resize-none border border-neutral-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              rows={1}
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="btn-primary px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="card text-center">
          <div className="h-12 w-12 rounded-lg bg-primary-100 flex items-center justify-center mx-auto mb-4">
            <Heart className="h-6 w-6 text-primary-600" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">
            Health Guidance
          </h3>
          <p className="text-sm text-neutral-600">
            Get general health information and wellness tips from our AI assistant
          </p>
        </div>

        <div className="card text-center">
          <div className="h-12 w-12 rounded-lg bg-healthcare-100 flex items-center justify-center mx-auto mb-4">
            <Brain className="h-6 w-6 text-healthcare-600" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">
            AI-Powered Responses
          </h3>
          <p className="text-sm text-neutral-600">
            Intelligent responses based on medical knowledge and best practices
          </p>
        </div>

        <div className="card text-center">
          <div className="h-12 w-12 rounded-lg bg-accent-100 flex items-center justify-center mx-auto mb-4">
            <Activity className="h-6 w-6 text-accent-600" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">
            24/7 Availability
          </h3>
          <p className="text-sm text-neutral-600">
            Access health information and support whenever you need it
          </p>
        </div>
      </motion.div>
    </div>
  );
}