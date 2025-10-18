const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Middleware to verify JWT token
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Access token required'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'User not found'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      error: 'Invalid token'
    });
  }
};

// Register new user
router.post('/register', async (req, res) => {
  try {
    const { email, password, name, phone, dateOfBirth } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'User with this email already exists'
      });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const user = new User({
      email,
      password: hashedPassword,
      name,
      phone,
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      data: {
        message: 'User registered successfully',
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          financialHealthScore: user.financialHealthScore.score
        },
        token
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to register user',
      message: error.message
    });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password'
      });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password'
      });
    }

    // Update last login
    user.lastLogin = new Date();
    user.loginHistory.push({
      date: new Date(),
      ip: req.ip,
      userAgent: req.get('User-Agent')
    });
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      data: {
        message: 'Login successful',
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          avatar: user.avatar,
          financialHealthScore: user.financialHealthScore.score,
          preferences: user.preferences
        },
        token
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to login',
      message: error.message
    });
  }
});

// Get user profile (protected route)
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = req.user;
    
    res.json({
      success: true,
      data: {
        id: user._id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        phone: user.phone,
        dateOfBirth: user.dateOfBirth,
        location: user.location,
        financialProfile: user.financialProfile,
        financialHealthScore: user.financialHealthScore,
        preferences: user.preferences,
        createdAt: user.createdAt
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch profile'
    });
  }
});

// Update user profile (protected route)
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const user = req.user;
    const {
      name,
      phone,
      dateOfBirth,
      location,
      financialProfile
    } = req.body;

    // Update basic information
    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (dateOfBirth) user.dateOfBirth = new Date(dateOfBirth);
    if (location) user.location = location;

    // Update financial profile
    if (financialProfile) {
      if (financialProfile.monthlyIncome !== undefined) {
        user.financialProfile.monthlyIncome = financialProfile.monthlyIncome;
      }
      if (financialProfile.monthlyExpenses !== undefined) {
        user.financialProfile.monthlyExpenses = financialProfile.monthlyExpenses;
      }
      if (financialProfile.totalSavings !== undefined) {
        user.financialProfile.totalSavings = financialProfile.totalSavings;
      }
      if (financialProfile.emergencyFund !== undefined) {
        user.financialProfile.emergencyFund = financialProfile.emergencyFund;
      }
      if (financialProfile.riskTolerance) {
        user.financialProfile.riskTolerance = financialProfile.riskTolerance;
      }
      if (financialProfile.investmentExperience) {
        user.financialProfile.investmentExperience = financialProfile.investmentExperience;
      }
      if (financialProfile.investmentGoals) {
        user.financialProfile.investmentGoals = financialProfile.investmentGoals;
      }
    }

    await user.save();

    res.json({
      success: true,
      data: {
        message: 'Profile updated successfully',
        user: {
          id: user._id,
          name: user.name,
          financialHealthScore: user.financialHealthScore.score,
          financialProfile: user.financialProfile
        }
      }
    });

  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update profile',
      message: error.message
    });
  }
});

// Update user preferences (protected route)
router.put('/preferences', authenticateToken, async (req, res) => {
  try {
    const user = req.user;
    const { theme, notifications, currency, language, timezone } = req.body;

    if (theme) user.preferences.theme = theme;
    if (notifications) user.preferences.notifications = { ...user.preferences.notifications, ...notifications };
    if (currency) user.preferences.currency = currency;
    if (language) user.preferences.language = language;
    if (timezone) user.preferences.timezone = timezone;

    await user.save();

    res.json({
      success: true,
      data: {
        message: 'Preferences updated successfully',
        preferences: user.preferences
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update preferences'
    });
  }
});

// Get user dashboard data (protected route)
router.get('/dashboard', authenticateToken, async (req, res) => {
  try {
    const user = req.user;
    
    const dashboardData = {
      financialHealthScore: user.financialHealthScore.score,
      totalSavings: user.financialProfile.totalSavings,
      monthlyIncome: user.financialProfile.monthlyIncome,
      monthlyExpenses: user.financialProfile.monthlyExpenses,
      savingsRate: user.financialProfile.monthlyIncome > 0 ? 
        ((user.financialProfile.monthlyIncome - user.financialProfile.monthlyExpenses) / user.financialProfile.monthlyIncome * 100).toFixed(1) : 0,
      monthlySavings: user.financialProfile.monthlyIncome - user.financialProfile.monthlyExpenses,
      cryptoPortfolio: user.cryptoPortfolio,
      portfolio: user.portfolio,
      watchlist: user.watchlist,
      recentTransactions: user.portfolio.transactions
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5),
      goals: user.financialProfile.investmentGoals,
      alerts: user.alerts.filter(alert => !alert.read).slice(0, 5)
    };

    res.json({
      success: true,
      data: dashboardData
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch dashboard data'
    });
  }
});

// Add investment goal (protected route)
router.post('/goals', authenticateToken, async (req, res) => {
  try {
    const user = req.user;
    const { name, target, current, deadline, priority } = req.body;

    const newGoal = {
      name,
      target,
      current: current || 0,
      deadline: new Date(deadline),
      priority: priority || 'medium'
    };

    user.financialProfile.investmentGoals.push(newGoal);
    await user.save();

    res.json({
      success: true,
      data: {
        message: 'Goal added successfully',
        goal: newGoal
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to add goal'
    });
  }
});

// Update investment goal (protected route)
router.put('/goals/:goalId', authenticateToken, async (req, res) => {
  try {
    const user = req.user;
    const { goalId } = req.params;
    const updates = req.body;

    const goal = user.financialProfile.investmentGoals.id(goalId);
    if (!goal) {
      return res.status(404).json({
        success: false,
        error: 'Goal not found'
      });
    }

    Object.assign(goal, updates);
    await user.save();

    res.json({
      success: true,
      data: {
        message: 'Goal updated successfully',
        goal
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update goal'
    });
  }
});

// Delete investment goal (protected route)
router.delete('/goals/:goalId', authenticateToken, async (req, res) => {
  try {
    const user = req.user;
    const { goalId } = req.params;

    user.financialProfile.investmentGoals = user.financialProfile.investmentGoals.filter(
      goal => goal._id.toString() !== goalId
    );
    await user.save();

    res.json({
      success: true,
      data: {
        message: 'Goal deleted successfully'
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete goal'
    });
  }
});

// Add to watchlist (protected route)
router.post('/watchlist', authenticateToken, async (req, res) => {
  try {
    const user = req.user;
    const { symbol, name, type, targetPrice, notes } = req.body;

    await user.addToWatchlist(symbol, name, type, targetPrice);

    res.json({
      success: true,
      data: {
        message: 'Added to watchlist successfully',
        watchlist: user.watchlist
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to add to watchlist'
    });
  }
});

// Remove from watchlist (protected route)
router.delete('/watchlist/:symbol', authenticateToken, async (req, res) => {
  try {
    const user = req.user;
    const { symbol } = req.params;

    await user.removeFromWatchlist(symbol);

    res.json({
      success: true,
      data: {
        message: 'Removed from watchlist successfully',
        watchlist: user.watchlist
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to remove from watchlist'
    });
  }
});

// Get user notifications (protected route)
router.get('/notifications', authenticateToken, async (req, res) => {
  try {
    const user = req.user;
    const { limit = 10, offset = 0 } = req.query;

    const notifications = user.alerts
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(parseInt(offset), parseInt(offset) + parseInt(limit));

    res.json({
      success: true,
      data: {
        notifications,
        total: user.alerts.length,
        unread: user.alerts.filter(alert => !alert.read).length
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch notifications'
    });
  }
});

// Mark notification as read (protected route)
router.put('/notifications/:alertId/read', authenticateToken, async (req, res) => {
  try {
    const user = req.user;
    const { alertId } = req.params;

    await user.markAlertAsRead(alertId);

    res.json({
      success: true,
      data: {
        message: 'Notification marked as read'
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update notification'
    });
  }
});

// Change password (protected route)
router.put('/change-password', authenticateToken, async (req, res) => {
  try {
    const user = req.user;
    const { currentPassword, newPassword } = req.body;

    // Verify current password
    const isValidPassword = await bcrypt.compare(currentPassword, user.password);
    if (!isValidPassword) {
      return res.status(400).json({
        success: false,
        error: 'Current password is incorrect'
      });
    }

    // Hash new password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    user.password = hashedPassword;

    await user.save();

    res.json({
      success: true,
      data: {
        message: 'Password changed successfully'
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to change password'
    });
  }
});

// Delete account (protected route)
router.delete('/account', authenticateToken, async (req, res) => {
  try {
    const user = req.user;
    const { password } = req.body;

    // Verify password before deletion
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({
        success: false,
        error: 'Password is incorrect'
      });
    }

    await User.findByIdAndDelete(user._id);

    res.json({
      success: true,
      data: {
        message: 'Account deleted successfully'
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete account'
    });
  }
});

// Get user statistics (protected route)
router.get('/statistics', authenticateToken, async (req, res) => {
  try {
    const user = req.user;
    
    const statistics = {
      totalPortfolioValue: user.portfolio.totalValue,
      totalReturn: user.portfolio.totalReturn,
      totalReturnPercent: user.portfolio.totalReturnPercent,
      savingsRate: user.financialProfile.monthlyIncome > 0 ? 
        ((user.financialProfile.monthlyIncome - user.financialProfile.monthlyExpenses) / user.financialProfile.monthlyIncome * 100).toFixed(1) : 0,
      emergencyFundRatio: user.financialProfile.monthlyExpenses > 0 ? 
        (user.financialProfile.emergencyFund / user.financialProfile.monthlyExpenses * 100).toFixed(1) : 0,
      assetDiversification: new Set(user.portfolio.assets.map(asset => asset.type)).size,
      watchlistCount: user.watchlist.length,
      unreadNotifications: user.alerts.filter(alert => !alert.read).length,
      totalTransactions: user.portfolio.transactions.length,
      activeGoals: user.financialProfile.investmentGoals.length
    };

    res.json({
      success: true,
      data: statistics
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch statistics'
    });
  }
});

module.exports = router;
