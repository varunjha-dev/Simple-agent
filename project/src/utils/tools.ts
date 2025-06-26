import axios from 'axios';
import { CryptoData, NewsArticle, DCFResult, CurrencyData } from '../types';

// Sum Tool
export const sumTool = ({ num1, num2 }: { num1: number; num2: number }): number => {
  return num1 + num2;
};

// Prime Number Tool
export const primeNumberTool = ({ number }: { number: number }): boolean => {
  if (number < 2) return false;
  if (number === 2) return true;
  if (number % 2 === 0) return false;
  
  for (let i = 3; i <= Math.sqrt(number); i += 2) {
    if (number % i === 0) return false;
  }
  return true;
};

// Crypto Price Tool
export const cryptoPriceTool = async ({ coin }: { coin: string }): Promise<CryptoData | null> => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coin.toLowerCase()}&order=market_cap_desc&per_page=1&page=1&sparkline=false`
    );
    
    if (response.data && response.data.length > 0) {
      return response.data[0];
    }
    return null;
  } catch (error) {
    console.error('Error fetching crypto data:', error);
    throw new Error('Failed to fetch cryptocurrency data');
  }
};

// News Tool
export const newsTool = async ({ query, category }: { query?: string; category?: string }): Promise<NewsArticle[]> => {
  try {
    const apiKey = import.meta.env.VITE_NEWS_API_KEY;
    if (!apiKey) {
      throw new Error('News API key not configured');
    }

    let url = 'https://newsapi.org/v2/';
    const params = new URLSearchParams({
      apiKey,
      pageSize: '5',
      language: 'en'
    });

    if (query) {
      url += 'everything';
      params.append('q', query);
    } else if (category) {
      url += 'top-headlines';
      params.append('category', category);
      params.append('country', 'us');
    } else {
      url += 'top-headlines';
      params.append('country', 'us');
    }

    const response = await axios.get(`${url}?${params}`);
    return response.data.articles || [];
  } catch (error) {
    console.error('Error fetching news:', error);
    throw new Error('Failed to fetch news data');
  }
};

// DCF Valuation Tool
export const dcfValuationTool = async ({ ticker }: { ticker: string }): Promise<DCFResult> => {
  try {
    const apiKey = import.meta.env.VITE_ALPHA_VANTAGE_API_KEY;
    if (!apiKey) {
      throw new Error('Alpha Vantage API key not configured');
    }

    // Fetch company overview
    const overviewResponse = await axios.get(
      `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=${apiKey}`
    );

    // Fetch cash flow data
    const cashFlowResponse = await axios.get(
      `https://www.alphavantage.co/query?function=CASH_FLOW&symbol=${ticker}&apikey=${apiKey}`
    );

    // Fetch current price
    const priceResponse = await axios.get(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${apiKey}`
    );

    const overview = overviewResponse.data;
    const cashFlow = cashFlowResponse.data;
    const quote = priceResponse.data['Global Quote'];

    if (!overview || !cashFlow || !quote) {
      throw new Error('Insufficient data for DCF calculation');
    }

    // Extract financial metrics
    const currentPrice = parseFloat(quote['05. price']);
    const pe = parseFloat(overview.PERatio) || 0;
    const marketCap = parseFloat(overview.MarketCapitalization) || 0;
    const sharesOutstanding = marketCap / currentPrice;

    // Get latest FCF (simplified calculation)
    const latestCashFlow = cashFlow.annualReports?.[0];
    const fcf = parseFloat(latestCashFlow?.operatingCashflow || '0') - 
               parseFloat(latestCashFlow?.capitalExpenditures || '0');

    // Simplified DCF calculation
    const growthRate = 0.05; // 5% assumed growth
    const discountRate = 0.10; // 10% WACC
    const terminalGrowth = 0.03; // 3% terminal growth

    // Project FCF for 5 years
    let projectedFCF = fcf;
    let totalPV = 0;

    for (let year = 1; year <= 5; year++) {
      projectedFCF *= (1 + growthRate);
      totalPV += projectedFCF / Math.pow(1 + discountRate, year);
    }

    // Terminal value
    const terminalFCF = projectedFCF * (1 + terminalGrowth);
    const terminalValue = terminalFCF / (discountRate - terminalGrowth);
    const terminalPV = terminalValue / Math.pow(1 + discountRate, 5);

    // Enterprise value and intrinsic value per share
    const enterpriseValue = totalPV + terminalPV;
    const intrinsicValue = enterpriseValue / sharesOutstanding;

    // Calculate PEG ratio
    const estimatedGrowth = growthRate * 100;
    const peg = pe / estimatedGrowth;

    // Determine recommendations
    const safetyMargin = ((intrinsicValue - currentPrice) / intrinsicValue) * 100;
    const buffettBuyPrice = intrinsicValue * 0.7; // 30% margin of safety
    const lynchBuyPrice = intrinsicValue * 0.8; // 20% margin of safety

    let recommendation = 'HOLD';
    if (currentPrice <= buffettBuyPrice && safetyMargin >= 30) {
      recommendation = 'STRONG BUY (Buffett Criteria)';
    } else if (currentPrice <= lynchBuyPrice && peg < 1) {
      recommendation = 'BUY (Lynch Criteria)';
    } else if (currentPrice > intrinsicValue * 1.2) {
      recommendation = 'SELL';
    }

    return {
      ticker,
      intrinsicValue,
      currentPrice,
      recommendation,
      safetyMargin,
      buyRange: {
        buffett: buffettBuyPrice,
        lynch: lynchBuyPrice
      },
      metrics: {
        pe,
        peg,
        fcf,
        growth: estimatedGrowth
      }
    };
  } catch (error) {
    console.error('Error calculating DCF:', error);
    throw new Error('Failed to calculate DCF valuation');
  }
};

// Currency Conversion Tool
export const currencyConversionTool = async ({ 
  amount, 
  from, 
  to 
}: { 
  amount: number; 
  from: string; 
  to: string; 
}): Promise<CurrencyData> => {
  try {
    const apiKey = import.meta.env.VITE_EXCHANGE_RATE_API_KEY;
    if (!apiKey) {
      throw new Error('Exchange Rate API key not configured');
    }

    const response = await axios.get(
      `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from.toUpperCase()}/${to.toUpperCase()}/${amount}`
    );

    const data = response.data;
    
    return {
      amount,
      from: from.toUpperCase(),
      to: to.toUpperCase(),
      rate: data.conversion_rate,
      convertedAmount: data.conversion_result,
      timestamp: data.time_last_update_utc
    };
  } catch (error) {
    console.error('Error converting currency:', error);
    throw new Error('Failed to convert currency');
  }
};

// Tool registry
export const availableTools = {
  sum: sumTool,
  primeNumber: primeNumberTool,
  cryptoPrice: cryptoPriceTool,
  news: newsTool,
  dcfValuation: dcfValuationTool,
  currencyConversion: currencyConversionTool
};

// Tool declarations for Gemini API
export const toolDeclarations = [
  {
    name: 'sum',
    description: 'Calculate the sum of two numbers',
    parameters: {
      type: 'OBJECT',
      properties: {
        num1: { type: 'NUMBER', description: 'First number' },
        num2: { type: 'NUMBER', description: 'Second number' }
      },
      required: ['num1', 'num2']
    }
  },
  {
    name: 'primeNumber',
    description: 'Check if a number is prime',
    parameters: {
      type: 'OBJECT',
      properties: {
        number: { type: 'NUMBER', description: 'Number to check for primality' }
      },
      required: ['number']
    }
  },
  {
    name: 'cryptoPrice',
    description: 'Get current cryptocurrency price and market data',
    parameters: {
      type: 'OBJECT',
      properties: {
        coin: { type: 'STRING', description: 'Cryptocurrency ID (e.g., bitcoin, ethereum)' }
      },
      required: ['coin']
    }
  },
  {
    name: 'news',
    description: 'Get latest news articles by category or search query',
    parameters: {
      type: 'OBJECT',
      properties: {
        query: { type: 'STRING', description: 'Search query for news articles' },
        category: { type: 'STRING', description: 'News category (technology, business, sports, etc.)' }
      }
    }
  },
  {
    name: 'dcfValuation',
    description: 'Perform DCF (Discounted Cash Flow) valuation analysis for a stock',
    parameters: {
      type: 'OBJECT',
      properties: {
        ticker: { type: 'STRING', description: 'Stock ticker symbol (e.g., AAPL, GOOGL)' }
      },
      required: ['ticker']
    }
  },
  {
    name: 'currencyConversion',
    description: 'Convert amount from one currency to another',
    parameters: {
      type: 'OBJECT',
      properties: {
        amount: { type: 'NUMBER', description: 'Amount to convert' },
        from: { type: 'STRING', description: 'Source currency code (e.g., USD)' },
        to: { type: 'STRING', description: 'Target currency code (e.g., EUR)' }
      },
      required: ['amount', 'from', 'to']
    }
  }
];