export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
  toolCalls?: ToolCall[];
  toolResults?: ToolResult[];
}

export interface ToolCall {
  name: string;
  args: Record<string, any>;
}

export interface ToolResult {
  name: string;
  result: any;
  error?: string;
}

export interface CryptoData {
  id: string;
  name: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
  symbol: string;
}

export interface NewsArticle {
  title: string;
  description: string;
  url: string;
  source: {
    name: string;
  };
  publishedAt: string;
  urlToImage?: string;
}

export interface DCFResult {
  ticker: string;
  intrinsicValue: number;
  currentPrice: number;
  recommendation: string;
  safetyMargin: number;
  buyRange: {
    buffett: number;
    lynch: number;
  };
  metrics: {
    pe: number;
    peg: number;
    fcf: number;
    growth: number;
  };
}

export interface CurrencyData {
  amount: number;
  from: string;
  to: string;
  rate: number;
  convertedAmount: number;
  timestamp: string;
}