# 🤖 Smart Finance Hub

A modern, AI-powered personal finance application that combines expense tracking, financial insights, market news, and cryptocurrency tracking into one comprehensive platform.

## 🌟 Features

### 📊 Core Features
- **Personal Finance Dashboard** - Track expenses, income, and savings with visual analytics
- **Investment Portfolio Builder** - AI-driven investment recommendations based on risk tolerance
- **Real-time Market Data** - Live cryptocurrency and stock prices with interactive charts
- **Financial News Hub** - Curated finance news with audio summaries
- **AI Financial Coach** - Personalized saving tips and financial advice
- **Community Challenges** - Gamified saving challenges and community forums

### 🚀 Advanced Features
- **Professional Market Symbols** - Interactive symbols that redirect to trading platforms
- **Historical Price Charts** - 10-15 year historical data for stocks and cryptocurrencies
- **Smart Financial Health Score** - AI-powered assessment of financial habits
- **Voice News Briefings** - Daily audio summaries of financial news
- **Price Alerts & Notifications** - Real-time alerts for price movements
- **Goal-based Saving Plans** - Personalized saving goals with progress tracking

### 🎨 UI/UX Features
- **Dark/Light Mode** - Professional theme switching
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Interactive Animations** - Smooth transitions and micro-interactions
- **Glass Morphism** - Modern design with backdrop blur effects
- **Real-time Updates** - Live data without page refreshes

## 🛠️ Tech Stack

### Frontend
- **React.js** - Modern UI framework
- **Styled Components** - CSS-in-JS styling
- **React Hooks** - State management and side effects
- **Responsive Design** - Mobile-first approach

### Backend
- **Node.js** - Server runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### APIs & Services
- **NewsAPI** - Financial news
- **CoinGecko** - Cryptocurrency data
- **Binance API** - Trading data
- **Google Finance** - Stock market data
- **Text-to-Speech** - Audio news summaries

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or cloud)

### Frontend Setup
```bash
# Clone the repository
git clone <repository-url>
cd robo-advisor-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Configure environment variables
# Edit .env file with your API keys and database URL

# Start backend server
npm run dev
```

### Environment Variables
Create a `.env` file in the backend directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5174

# Database
MONGODB_URI=mongodb://localhost:27017/smart-finance

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key

# API Keys
NEWS_API_KEY=your-news-api-key
COINGECKO_API_KEY=your-coingecko-api-key
BINANCE_API_KEY=your-binance-api-key
BINANCE_SECRET_KEY=your-binance-secret-key

# Optional: OpenAI for AI features
OPENAI_API_KEY=your-openai-api-key
```

## 🚀 Quick Start

### Using the Start Script
```bash
# Make the script executable
chmod +x backend/start_backend.sh

# Start the backend
./backend/start_backend.sh
```

### Manual Start
```bash
# Terminal 1: Start Frontend
npm run dev

# Terminal 2: Start Backend
cd backend
npm run dev
```

## 📱 Usage

### 1. Dashboard
- View financial health score
- Track savings and expenses
- Monitor crypto portfolio
- Quick insights and tips

### 2. Market Symbols
- Browse professional market symbols
- Click to view detailed information
- Redirect to trading platforms
- Real-time price updates

### 3. Price Charts
- Interactive historical charts
- 10-15 year data for stocks and crypto
- Multiple timeframes (1Y, 3Y, 5Y, 10Y, 15Y)
- Hover for detailed information

### 4. News Section
- Latest financial news
- Audio summaries
- Category filters
- Source links and buy buttons

### 5. Crypto Tracker
- Real-time cryptocurrency prices
- Portfolio tracking
- Price alerts
- Market analysis

### 6. Savings Advisor
- AI-powered saving tips
- Goal-based planning
- Progress tracking
- Personalized recommendations

### 7. Community
- Anonymous finance forums
- Saving challenges
- User-generated content
- Community insights

### 8. AI Coach
- Interactive chatbot
- Financial jargon explanation
- Personalized advice
- Quick question buttons

## 🔧 API Endpoints

### Authentication
- `POST /api/user/register` - User registration
- `POST /api/user/login` - User login
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile

### Portfolio
- `GET /api/portfolio` - Get user portfolio
- `POST /api/portfolio/assets` - Add new asset
- `PUT /api/portfolio/assets/:id` - Update asset
- `DELETE /api/portfolio/assets/:id` - Remove asset

### News
- `GET /api/news` - Get latest news
- `GET /api/news/category/:category` - Get news by category
- `GET /api/news/trending` - Get trending news

### Crypto
- `GET /api/crypto/prices` - Get crypto prices
- `GET /api/crypto/:id` - Get crypto details
- `GET /api/crypto/trending` - Get trending cryptos

### Market
- `GET /api/market/overview` - Market overview
- `GET /api/market/stocks/:symbol` - Stock information
- `GET /api/market/indices` - Market indices

## 🗄️ Database Schema

### User Model
```javascript
{
  email: String,
  name: String,
  password: String,
  financialProfile: {
    monthlyIncome: Number,
    monthlyExpenses: Number,
    totalSavings: Number,
    emergencyFund: Number,
    riskTolerance: String,
    investmentGoals: Array
  },
  portfolio: {
    totalValue: Number,
    assets: Array,
    transactions: Array
  },
  cryptoPortfolio: Object,
  preferences: Object,
  watchlist: Array,
  alerts: Array,
  financialHealthScore: Object
}
```

## 🎯 Key Features Explained

### Smart Financial Health Score
The app calculates a comprehensive financial health score based on:
- Savings rate (25 points)
- Emergency fund ratio (20 points)
- Investment diversification (15 points)
- Portfolio performance (10 points)
- Debt management (10 points)
- Expense control (10 points)
- Goal achievement (10 points)

### AI-Powered Recommendations
- Personalized saving tips based on spending patterns
- Investment suggestions based on risk tolerance
- Goal-based planning with realistic timelines
- Market timing insights for crypto investments

### Real-time Data Integration
- Live cryptocurrency prices from CoinGecko
- Real-time stock data from multiple sources
- Breaking financial news with instant updates
- Portfolio value calculations with live prices

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting on API endpoints
- CORS protection
- Input validation and sanitization
- Secure environment variable management

## 📊 Performance Optimizations

- Database indexing for fast queries
- Caching for frequently accessed data
- Lazy loading of components
- Optimized images and assets
- Efficient API rate limiting

## 🧪 Testing

```bash
# Run backend tests
cd backend
npm test

# Run frontend tests
npm test
```

## 📈 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy the dist folder
```

### Backend (Heroku/Railway)
```bash
# Set environment variables
# Deploy using git push
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review the API endpoints

## 🔮 Roadmap

- [ ] Mobile app (React Native)
- [ ] Advanced AI features
- [ ] Social trading features
- [ ] Tax optimization tools
- [ ] Retirement planning
- [ ] International markets support
- [ ] Advanced charting tools
- [ ] Portfolio rebalancing
- [ ] Dividend tracking
- [ ] Expense categorization AI

---

**Built with ❤️ for smart financial management**
