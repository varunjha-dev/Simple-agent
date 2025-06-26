import React from 'react';
import { Calculator, Hash, TrendingUp, Newspaper, DollarSign, RefreshCw } from 'lucide-react';

interface WelcomeScreenProps {
  onExampleClick: (example: string) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onExampleClick }) => {
  const examples = [
    {
      icon: <Calculator className="h-5 w-5" />,
      title: "Sum Calculator",
      description: "Add two numbers together",
      example: "Sum 25 and 37"
    },
    {
      icon: <Hash className="h-5 w-5" />,
      title: "Prime Number Check",
      description: "Check if a number is prime",
      example: "Is 97 a prime number?"
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      title: "Crypto Prices",
      description: "Get live cryptocurrency data",
      example: "What's the current price of Bitcoin?"
    },
    {
      icon: <Newspaper className="h-5 w-5" />,
      title: "Latest News",
      description: "Fetch recent news articles",
      example: "Show me technology news"
    },
    {
      icon: <DollarSign className="h-5 w-5" />,
      title: "DCF Valuation",
      description: "Analyze stock value with DCF model",
      example: "Analyze AAPL stock value"
    },
    {
      icon: <RefreshCw className="h-5 w-5" />,
      title: "Currency Conversion",
      description: "Convert between currencies",
      example: "Convert 100 USD to EUR"
    }
  ];

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="max-w-4xl w-full text-center">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to AI Tools Assistant
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            I'm powered by Google Gemini and equipped with powerful tools for calculations, 
            financial analysis, and real-time data. Try asking me anything or click on the examples below!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {examples.map((example, index) => (
            <button
              key={index}
              onClick={() => onExampleClick(example.example)}
              className="p-6 border border-gray-200 dark:border-gray-700 rounded-xl 
                       hover:border-blue-300 dark:hover:border-blue-600 
                       hover:shadow-lg transition-all duration-200
                       bg-white dark:bg-gray-800 text-left group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg 
                              text-blue-600 dark:text-blue-400 group-hover:bg-blue-100 
                              dark:group-hover:bg-blue-900/40 transition-colors">
                  {example.icon}
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {example.title}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                {example.description}
              </p>
              <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                "{example.example}"
              </p>
            </button>
          ))}
        </div>

        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            💡 <strong>Tip:</strong> You can ask me anything! I can perform calculations, analyze stocks, 
            get news, check crypto prices, and much more. Just type your question naturally.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;