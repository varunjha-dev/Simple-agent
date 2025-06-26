import React from 'react';
import { User, Bot, Clock, TrendingUp, Newspaper, Calculator, Hash, DollarSign } from 'lucide-react';
import { Message } from '../types';
import ToolResultCard from './ToolResultCard';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  const getToolIcon = (toolName: string) => {
    switch (toolName) {
      case 'sum':
        return <Calculator className="h-4 w-4" />;
      case 'primeNumber':
        return <Hash className="h-4 w-4" />;
      case 'cryptoPrice':
        return <TrendingUp className="h-4 w-4" />;
      case 'news':
        return <Newspaper className="h-4 w-4" />;
      case 'dcfValuation':
        return <DollarSign className="h-4 w-4" />;
      case 'currencyConversion':
        return <DollarSign className="h-4 w-4" />;
      default:
        return <Calculator className="h-4 w-4" />;
    }
  };

  return (
    <div className={`flex gap-3 p-6 ${isUser ? 'bg-gray-50 dark:bg-gray-800/50' : 'bg-white dark:bg-gray-800'}`}>
      <div className="flex-shrink-0">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          isUser 
            ? 'bg-blue-500 text-white' 
            : 'bg-gradient-to-br from-purple-500 to-blue-500 text-white'
        }`}>
          {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
        </div>
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-medium text-gray-900 dark:text-white">
            {isUser ? 'You' : 'AI Assistant'}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {message.timestamp.toLocaleTimeString()}
          </span>
        </div>
        
        <div className="prose prose-sm max-w-none text-gray-700 dark:text-gray-300">
          {message.content}
        </div>

        {message.toolCalls && message.toolResults && (
          <div className="mt-4 space-y-3">
            {message.toolResults.map((result, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-3 bg-gray-50 dark:bg-gray-700/50">
                <div className="flex items-center gap-2 mb-2">
                  {getToolIcon(result.name)}
                  <span className="font-medium text-sm text-gray-900 dark:text-white capitalize">
                    {result.name.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                </div>
                <ToolResultCard result={result} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;