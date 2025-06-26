import React from 'react';
import { Bot, Moon, Sun, Trash2, Github } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

interface HeaderProps {
  onClearChat: () => void;
}

const Header: React.FC<HeaderProps> = ({ onClearChat }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              AI Tools Assistant
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Powered by Google Gemini
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={onClearChat}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 
                     text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300
                     transition-colors duration-200"
            title="Clear chat"
          >
            <Trash2 className="h-5 w-5" />
          </button>
          
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 
                     text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300
                     transition-colors duration-200"
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 
                     text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300
                     transition-colors duration-200"
            title="View on GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;