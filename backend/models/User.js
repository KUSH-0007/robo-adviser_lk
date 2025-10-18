const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // Basic Information
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  avatar: {
    type: String,
    default: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  phone: {
    type: String,
    trim: true
  },
  dateOfBirth: {
    type: Date
  },
  location: {
    country: String,
    city: String,
    timezone: String
  },

  // Financial Profile
  financialProfile: {
    monthlyIncome: {
      type: Number,
      default: 0
    },
    monthlyExpenses: {
      type: Number,
      default: 0
    },
    totalSavings: {
      type: Number,
      default: 0
    },
    emergencyFund: {
      type: Number,
      default: 0
    },
    riskTolerance: {
      type: String,
      enum: ['conservative', 'moderate', 'aggressive'],
      default: 'moderate'
    },
    investmentExperience: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner'
    },
    investmentGoals: [{
      name: String,
      target: Number,
      current: Number,
      deadline: Date,
      priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
      }
    }]
  },

  // Portfolio Data
  portfolio: {
    totalValue: {
      type: Number,
      default: 0
    },
    totalReturn: {
      type: Number,
      default: 0
    },
    totalReturnPercent: {
      type: Number,
      default: 0
    },
    assets: [{
      type: {
        type: String,
        enum: ['crypto', 'stock', 'mutual_fund', 'bond', 'real_estate', 'commodity'],
        required: true
      },
      symbol: String,
      name: String,
      amount: Number,
      shares: Number,
      currentPrice: Number,
      totalValue: Number,
      return: Number,
      returnPercent: Number,
      allocation: Number,
      purchaseDate: Date,
      purchasePrice: Number
    }],
    transactions: [{
      type: {
        type: String,
        enum: ['buy', 'sell', 'dividend', 'interest'],
        required: true
      },
      assetId: mongoose.Schema.Types.ObjectId,
      symbol: String,
      amount: Number,
      shares: Number,
      price: Number,
      total: Number,
      date: {
        type: Date,
        default: Date.now
      },
      fees: Number,
      notes: String
    }]
  },

  // Crypto Portfolio
  cryptoPortfolio: {
    BTC: { amount: { type: Number, default: 0 }, value: { type: Number, default: 0 } },
    ETH: { amount: { type: Number, default: 0 }, value: { type: Number, default: 0 } },
    ADA: { amount: { type: Number, default: 0 }, value: { type: Number, default: 0 } },
    SOL: { amount: { type: Number, default: 0 }, value: { type: Number, default: 0 } },
    BNB: { amount: { type: Number, default: 0 }, value: { type: Number, default: 0 } }
  },

  // Preferences & Settings
  preferences: {
    theme: {
      type: String,
      enum: ['light', 'dark', 'auto'],
      default: 'light'
    },
    notifications: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
      priceAlerts: { type: Boolean, default: true },
      newsUpdates: { type: Boolean, default: true },
      portfolioUpdates: { type: Boolean, default: true }
    },
    currency: {
      type: String,
      default: 'INR'
    },
    language: {
      type: String,
      default: 'en'
    },
    timezone: {
      type: String,
      default: 'Asia/Kolkata'
    }
  },

  // Watchlist
  watchlist: [{
    symbol: String,
    name: String,
    type: {
      type: String,
      enum: ['crypto', 'stock', 'commodity'],
      default: 'crypto'
    },
    addedAt: {
      type: Date,
      default: Date.now
    },
    targetPrice: Number,
    notes: String
  }],

  // Alerts & Notifications
  alerts: [{
    type: {
      type: String,
      enum: ['price_alert', 'portfolio_alert', 'news_alert', 'goal_alert'],
      required: true
    },
    title: String,
    message: String,
    read: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    data: mongoose.Schema.Types.Mixed
  }],

  // Financial Health Score
  financialHealthScore: {
    score: {
      type: Number,
      default: 50,
      min: 0,
      max: 100
    },
    factors: {
      savingsRate: Number,
      expenseRatio: Number,
      debtRatio: Number,
      investmentDiversification: Number,
      emergencyFundRatio: Number
    },
    lastUpdated: {
      type: Date,
      default: Date.now
    }
  },

  // Security & Authentication
  password: {
    type: String,
    required: true
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: String,
  passwordResetToken: String,
  passwordResetExpires: Date,
  lastLogin: Date,
  loginHistory: [{
    date: Date,
    ip: String,
    userAgent: String
  }],

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes for better performance
userSchema.index({ email: 1 });
userSchema.index({ 'portfolio.totalValue': -1 });
userSchema.index({ 'financialHealthScore.score': -1 });

// Pre-save middleware to update financial health score
userSchema.pre('save', function(next) {
  this.financialHealthScore.score = calculateFinancialHealthScore(this);
  this.financialHealthScore.lastUpdated = new Date();
  next();
});

// Method to calculate financial health score
function calculateFinancialHealthScore(user) {
  const profile = user.financialProfile;
  const portfolio = user.portfolio;
  
  let score = 50; // Base score
  
  // Savings rate (0-25 points)
  if (profile.monthlyIncome > 0) {
    const savingsRate = ((profile.monthlyIncome - profile.monthlyExpenses) / profile.monthlyIncome) * 100;
    if (savingsRate >= 20) score += 25;
    else if (savingsRate >= 15) score += 20;
    else if (savingsRate >= 10) score += 15;
    else if (savingsRate >= 5) score += 10;
    else score += 5;
  }
  
  // Emergency fund ratio (0-20 points)
  if (profile.monthlyExpenses > 0) {
    const emergencyFundRatio = (profile.emergencyFund / profile.monthlyExpenses) * 100;
    if (emergencyFundRatio >= 600) score += 20;
    else if (emergencyFundRatio >= 300) score += 15;
    else if (emergencyFundRatio >= 200) score += 10;
    else if (emergencyFundRatio >= 100) score += 5;
  }
  
  // Investment diversification (0-15 points)
  const assetTypes = new Set(portfolio.assets.map(asset => asset.type));
  if (assetTypes.size >= 4) score += 15;
  else if (assetTypes.size >= 3) score += 12;
  else if (assetTypes.size >= 2) score += 8;
  else if (assetTypes.size >= 1) score += 5;
  
  // Portfolio performance (0-10 points)
  if (portfolio.totalReturnPercent > 10) score += 10;
  else if (portfolio.totalReturnPercent > 5) score += 8;
  else if (portfolio.totalReturnPercent > 0) score += 5;
  else if (portfolio.totalReturnPercent > -5) score += 2;
  
  return Math.min(100, Math.max(0, Math.round(score)));
}

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return this.name;
});

// Method to add transaction
userSchema.methods.addTransaction = function(transactionData) {
  this.portfolio.transactions.push(transactionData);
  return this.save();
};

// Method to update asset
userSchema.methods.updateAsset = function(assetId, updates) {
  const asset = this.portfolio.assets.id(assetId);
  if (asset) {
    Object.assign(asset, updates);
    return this.save();
  }
  throw new Error('Asset not found');
};

// Method to add to watchlist
userSchema.methods.addToWatchlist = function(symbol, name, type, targetPrice = null) {
  const existing = this.watchlist.find(item => item.symbol === symbol);
  if (!existing) {
    this.watchlist.push({ symbol, name, type, targetPrice });
    return this.save();
  }
  return this;
};

// Method to remove from watchlist
userSchema.methods.removeFromWatchlist = function(symbol) {
  this.watchlist = this.watchlist.filter(item => item.symbol !== symbol);
  return this.save();
};

// Method to add alert
userSchema.methods.addAlert = function(alertData) {
  this.alerts.push(alertData);
  return this.save();
};

// Method to mark alert as read
userSchema.methods.markAlertAsRead = function(alertId) {
  const alert = this.alerts.id(alertId);
  if (alert) {
    alert.read = true;
    return this.save();
  }
  throw new Error('Alert not found');
};

module.exports = mongoose.model('User', userSchema);


