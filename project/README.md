# AI Tools Assistant

A comprehensive ReactJS application powered by Google Gemini AI, featuring six powerful tools for calculations, financial analysis, and real-time data retrieval. Built with modern web technologies and designed with a beautiful, responsive interface.


## 🚀 Features

### Core Tools
- **Sum Calculator**: Perform arithmetic operations with natural language
- **Prime Number Checker**: Determine if numbers are prime with instant results
- **Cryptocurrency Prices**: Real-time crypto market data from CoinGecko
- **News Aggregator**: Latest news articles by category or search query
- **DCF Valuation**: Advanced stock analysis using Warren Buffett and Peter Lynch strategies
- **Currency Converter**: Real-time currency conversion with live exchange rates

### UI/UX Highlights
- **Dark/Light Mode**: Seamless theme switching with persistent preferences
- **Chat Interface**: Natural conversation flow with conversation history
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Real-time Updates**: Live data integration with smooth loading states
- **Beautiful Animations**: Micro-interactions and smooth transitions
- **Error Handling**: Comprehensive error boundaries and user feedback

## 🛠 Tech Stack

- **Frontend**: ReactJS 18, TypeScript, Tailwind CSS
- **AI Integration**: Google Gemini API (gemini-2.0-flash-exp)
- **APIs**: CoinGecko, Alpha Vantage, NewsAPI, ExchangeRate-API
- **Build Tool**: Vite
- **Deployment**: Firebase Hosting
- **State Management**: React Hooks (useState, useEffect)
- **Icons**: Lucide React

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Firebase CLI** (for deployment)

## 🔧 Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/ai-tools-assistant.git
cd ai-tools-assistant
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory and add your API keys:

```env
# Google Gemini API Key (Required)
VITE_GEMINI_API_KEY=your_gemini_api_key_here

# Alpha Vantage API Key (Required for DCF Valuation)
VITE_ALPHA_VANTAGE_API_KEY=your_alpha_vantage_api_key_here

# News API Key (Required for News Tool)
VITE_NEWS_API_KEY=your_news_api_key_here

# ExchangeRate API Key (Required for Currency Conversion)
VITE_EXCHANGE_RATE_API_KEY=your_exchange_rate_api_key_here

# CoinGecko API (Optional - Free tier doesn't require key)
# VITE_COINGECKO_API_KEY=your_coingecko_api_key_here
```

### 4. Run the Development Server
```bash
npm run dev
```

Visit `http://localhost:5173` to see the application in action.

## 🔑 API Keys Setup

### Google Gemini API
1. Visit [Google AI Studio](https://aistudio.google.com/)
2. Create a new project or select an existing one
3. Generate an API key for Gemini API
4. Add the key to your `.env` file

### Alpha Vantage API (DCF Valuation)
1. Sign up at [Alpha Vantage](https://www.alphavantage.co/support/#api-key)
2. Get your free API key
3. Add to `.env` file

### News API
1. Register at [NewsAPI](https://newsapi.org/register)
2. Get your API key
3. Add to `.env` file

### ExchangeRate API
1. Sign up at [ExchangeRate-API](https://app.exchangerate-api.com/sign-up)
2. Get your free API key
3. Add to `.env` file

### CoinGecko API (Optional)
1. Free tier doesn't require an API key
2. For higher rate limits, sign up at [CoinGecko](https://www.coingecko.com/en/api)

## 🔥 Firebase Deployment

### 1. Install Firebase CLI
```bash
npm install -g firebase-tools
```

### 2. Login to Firebase
```bash
firebase login
```

### 3. Initialize Firebase Project
```bash
firebase init
```
- Select "Hosting"
- Choose or create a Firebase project
- Set public directory to `dist`
- Configure as single-page app: Yes
- Set up automatic builds: No

### 4. Update Firebase Configuration
Edit `.firebaserc` and replace `your-firebase-project-id` with your actual project ID.

### 5. Build and Deploy
```bash
npm run build
firebase deploy
```

Your app will be available at `https://your-project-id.web.app`

## 📱 Usage Examples

### Basic Calculations
- "Sum 25 and 37"
- "Add 150 and 275"
- "What's 99 + 101?"

### Prime Number Checks
- "Is 17 prime?"
- "Check if 97 is a prime number"
- "Tell me if 100 is prime"

### Cryptocurrency Queries
- "Bitcoin price"
- "What's the current price of Ethereum?"
- "Show me Dogecoin market data"

### News Requests
- "Technology news"
- "Show me business news"
- "Latest news about AI"

### Stock Analysis
- "Analyze AAPL stock"
- "DCF valuation for GOOGL"
- "What's the intrinsic value of MSFT?"

### Currency Conversion
- "Convert 100 USD to EUR"
- "How much is 50 GBP in JPY?"
- "Convert 1000 CAD to USD"

## 💡 DCF Valuation Methodology

The DCF (Discounted Cash Flow) tool implements two renowned investment strategies:

### Warren Buffett Approach
- **Margin of Safety**: 30-50% below intrinsic value
- **Focus**: Stable free cash flow, low debt, predictable earnings
- **Recommendation**: Buy when current price ≤ 70% of intrinsic value

### Peter Lynch Approach
- **PEG Ratio**: Price/Earnings to Growth ratio < 1
- **Margin of Safety**: 20% below intrinsic value
- **Recommendation**: Buy when PEG < 1 and price ≤ 80% of intrinsic value

### Calculation Process
1. **Free Cash Flow Projection**: 5-year FCF projections with growth assumptions
2. **Terminal Value**: Perpetuity growth model
3. **Discount Rate**: 10% WACC assumption
4. **Present Value**: Discounted cash flows to present value
5. **Per Share Value**: Enterprise value divided by shares outstanding


## 🔧 Development

### Key Features Implementation

#### Gemini AI Integration
The app uses Google Gemini API with proper function calling:
- **History Management**: Proper role-based conversation history
- **Function Calling**: Tools are registered as functions with Gemini
- **Error Handling**: Comprehensive error handling for API calls
- **Response Processing**: Proper handling of tool responses

#### Tool Architecture
Each tool is implemented as a standalone function:
- **Modular Design**: Easy to add new tools
- **Error Handling**: Individual tool error handling
- **Type Safety**: Full TypeScript support
- **API Integration**: Proper API key management

### Building for Production
```bash
npm run build
```

### Linting
```bash
npm run lint
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Contribution Guidelines
- Follow the existing code style
- Add TypeScript types for new features
- Include error handling
- Update documentation
- Test your changes thoroughly

### Adding New Tools
1. Create the tool function in `src/utils/tools.ts`
2. Add the tool declaration to `toolDeclarations`
3. Update the `availableTools` registry
4. Add result rendering logic in `ToolResultCard.tsx`
5. Update the welcome screen examples

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Gemini**: For providing the AI capabilities
- **CoinGecko**: For cryptocurrency data
- **Alpha Vantage**: For financial market data
- **NewsAPI**: For news aggregation
- **ExchangeRate-API**: For currency conversion
- **Lucide React**: For beautiful icons
- **Tailwind CSS**: For utility-first styling

## 🐛 Known Issues

- **Rate Limits**: Some APIs have rate limits on free tiers
- **CORS**: Some APIs may require proxy for browser requests
- **API Keys**: Ensure all required API keys are configured

## 🚀 Future Enhancements

- [ ] Add more financial analysis tools
- [ ] Implement user authentication
- [ ] Add portfolio tracking
- [ ] Include technical analysis indicators
- [ ] Add export functionality for results
- [ ] Implement real-time notifications
- [ ] Add voice input support

## 📞 Support

If you encounter any issues or have questions:
1. Check the [Issues](https://github.com/yourusername/ai-tools-assistant/issues) page
2. Create a new issue with detailed information
3. Contact me or maintainers 

---

**Built with ❤️ using React, TypeScript, and Google Gemini AI**