import React from 'react';
import { ToolResult } from '../types';
import { ExternalLink, TrendingUp, TrendingDown } from 'lucide-react';

interface ToolResultCardProps {
  result: ToolResult;
}

const ToolResultCard: React.FC<ToolResultCardProps> = ({ result }) => {
  if (result.error) {
    return (
      <div className="text-red-500 dark:text-red-400 text-sm">
        Error: {result.error}
      </div>
    );
  }

  const renderResult = () => {
    switch (result.name) {
      case 'sum':
        return (
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {result.result}
          </div>
        );

      case 'primeNumber':
        return (
          <div className={`text-lg font-semibold ${
            result.result ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
          }`}>
            {result.result ? 'Yes, it is prime!' : 'No, it is not prime.'}
          </div>
        );

      case 'cryptoPrice':
        if (!result.result) return <div>No data available</div>;
        const crypto = result.result;
        return (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                {crypto.name} ({crypto.symbol?.toUpperCase()})
              </h3>
              <div className={`flex items-center gap-1 ${
                crypto.price_change_percentage_24h > 0 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {crypto.price_change_percentage_24h > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                {crypto.price_change_percentage_24h?.toFixed(2)}%
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Current Price</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  ${crypto.current_price?.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Market Cap</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  ${crypto.market_cap?.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        );

      case 'news':
        if (!result.result || result.result.length === 0) return <div>No news available</div>;
        return (
          <div className="space-y-3">
            {result.result.slice(0, 3).map((article: any, index: number) => (
              <div key={index} className="border-b border-gray-200 dark:border-gray-600 pb-3 last:border-b-0">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {article.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {article.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {article.source?.name} • {new Date(article.publishedAt).toLocaleDateString()}
                  </span>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1 text-xs"
                  >
                    Read more <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        );

      case 'dcfValuation':
        if (!result.result) return <div>No valuation data available</div>;
        const dcf = result.result;
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                {dcf.ticker} Valuation Analysis
              </h3>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                dcf.recommendation.includes('BUY') 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : dcf.recommendation.includes('SELL')
                  ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
              }`}>
                {dcf.recommendation}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Current Price</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  ${dcf.currentPrice?.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Intrinsic Value</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  ${dcf.intrinsicValue?.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Buffett Buy Price (30% margin)</p>
                <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                  ${dcf.buyRange?.buffett?.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Lynch Buy Price (20% margin)</p>
                <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                  ${dcf.buyRange?.lynch?.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500 dark:text-gray-400">P/E Ratio</p>
                <p className="font-semibold text-gray-900 dark:text-white">{dcf.metrics?.pe?.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400">PEG Ratio</p>
                <p className="font-semibold text-gray-900 dark:text-white">{dcf.metrics?.peg?.toFixed(2)}</p>
              </div>
            </div>
          </div>
        );

      case 'currencyConversion':
        if (!result.result) return <div>No conversion data available</div>;
        const currency = result.result;
        return (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                Currency Conversion
              </h3>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(currency.timestamp).toLocaleDateString()}
              </span>
            </div>
            <div className="text-center py-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {currency.amount} {currency.from}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white my-2">
                {currency.convertedAmount?.toFixed(2)} {currency.to}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Rate: 1 {currency.from} = {currency.rate?.toFixed(4)} {currency.to}
              </p>
            </div>
          </div>
        );

      default:
        return (
          <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
            {JSON.stringify(result.result, null, 2)}
          </pre>
        );
    }
  };

  return (
    <div className="text-sm">
      {renderResult()}
    </div>
  );
};

export default ToolResultCard;