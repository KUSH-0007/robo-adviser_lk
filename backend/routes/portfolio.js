const express = require('express');
const router = express.Router();

// Mock portfolio database
let portfolios = [
  {
    id: 1,
    userId: 1,
    name: 'My Investment Portfolio',
    totalValue: 50000,
    totalReturn: 2500,
    totalReturnPercent: 5.25,
    risk: 'moderate',
    createdAt: '2024-01-01T00:00:00Z',
    assets: [
      {
        id: 1,
        type: 'crypto',
        symbol: 'BTC',
        name: 'Bitcoin',
        amount: 0.5,
        currentPrice: 45000,
        totalValue: 22500,
        return: 1500,
        returnPercent: 7.14,
        allocation: 45
      },
      {
        id: 2,
        type: 'crypto',
        symbol: 'ETH',
        name: 'Ethereum',
        amount: 2.0,
        currentPrice: 3200,
        totalValue: 6400,
        return: 400,
        returnPercent: 6.67,
        allocation: 12.8
      },
      {
        id: 3,
        type: 'stock',
        symbol: 'RELIANCE',
        name: 'Reliance Industries',
        shares: 10,
        currentPrice: 2450,
        totalValue: 24500,
        return: 500,
        returnPercent: 2.08,
        allocation: 49
      },
      {
        id: 4,
        type: 'mutual_fund',
        symbol: 'HDFCMF',
        name: 'HDFC Mid-Cap Opportunities Fund',
        units: 100,
        currentPrice: 45.50,
        totalValue: 4550,
        return: 100,
        returnPercent: 2.25,
        allocation: 9.1
      }
    ],
    transactions: [
      {
        id: 1,
        assetId: 1,
        type: 'buy',
        amount: 0.5,
        price: 42000,
        total: 21000,
        date: '2024-01-15T10:30:00Z'
      },
      {
        id: 2,
        assetId: 2,
        type: 'buy',
        amount: 2.0,
        price: 3000,
        total: 6000,
        date: '2024-01-10T14:20:00Z'
      },
      {
        id: 3,
        assetId: 3,
        type: 'buy',
        shares: 10,
        price: 2400,
        total: 24000,
        date: '2024-01-05T09:15:00Z'
      }
    ]
  }
];

// Get user portfolio
router.get('/', (req, res) => {
  try {
    const portfolio = portfolios[0]; // Mock: get first portfolio
    
    res.json({
      success: true,
      data: portfolio
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch portfolio'
    });
  }
});

// Get portfolio summary
router.get('/summary', (req, res) => {
  try {
    const portfolio = portfolios[0];
    
    const summary = {
      totalValue: portfolio.totalValue,
      totalReturn: portfolio.totalReturn,
      totalReturnPercent: portfolio.totalReturnPercent,
      risk: portfolio.risk,
      assetAllocation: {
        crypto: portfolio.assets.filter(a => a.type === 'crypto').reduce((sum, a) => sum + a.allocation, 0),
        stocks: portfolio.assets.filter(a => a.type === 'stock').reduce((sum, a) => sum + a.allocation, 0),
        mutualFunds: portfolio.assets.filter(a => a.type === 'mutual_fund').reduce((sum, a) => sum + a.allocation, 0)
      },
      topPerformers: portfolio.assets
        .sort((a, b) => b.returnPercent - a.returnPercent)
        .slice(0, 3)
    };

    res.json({
      success: true,
      data: summary
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch portfolio summary'
    });
  }
});

// Get portfolio assets
router.get('/assets', (req, res) => {
  try {
    const portfolio = portfolios[0];
    
    res.json({
      success: true,
      data: portfolio.assets
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch portfolio assets'
    });
  }
});

// Get portfolio transactions
router.get('/transactions', (req, res) => {
  try {
    const portfolio = portfolios[0];
    const { limit = 10, offset = 0 } = req.query;
    
    const transactions = portfolio.transactions
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(parseInt(offset), parseInt(offset) + parseInt(limit));

    res.json({
      success: true,
      data: transactions,
      total: portfolio.transactions.length
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch transactions'
    });
  }
});

// Add new asset to portfolio
router.post('/assets', (req, res) => {
  try {
    const { type, symbol, name, amount, price, date } = req.body;
    const portfolio = portfolios[0];
    
    const newAsset = {
      id: portfolio.assets.length + 1,
      type,
      symbol: symbol.toUpperCase(),
      name,
      amount: type === 'stock' ? amount : amount,
      shares: type === 'stock' ? amount : null,
      currentPrice: price,
      totalValue: amount * price,
      return: 0,
      returnPercent: 0,
      allocation: 0
    };
    
    portfolio.assets.push(newAsset);
    
    // Add transaction
    const newTransaction = {
      id: portfolio.transactions.length + 1,
      assetId: newAsset.id,
      type: 'buy',
      amount: type === 'stock' ? amount : amount,
      shares: type === 'stock' ? amount : null,
      price,
      total: amount * price,
      date: date || new Date().toISOString()
    };
    
    portfolio.transactions.push(newTransaction);
    
    // Recalculate portfolio totals
    updatePortfolioTotals(portfolio);
    
    res.json({
      success: true,
      data: {
        message: 'Asset added successfully',
        asset: newAsset
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to add asset'
    });
  }
});

// Update asset price (simulate market update)
router.put('/assets/:id/price', (req, res) => {
  try {
    const { id } = req.params;
    const { currentPrice } = req.body;
    const portfolio = portfolios[0];
    
    const asset = portfolio.assets.find(a => a.id === parseInt(id));
    if (!asset) {
      return res.status(404).json({
        success: false,
        error: 'Asset not found'
      });
    }
    
    const oldValue = asset.totalValue;
    asset.currentPrice = currentPrice;
    asset.totalValue = (asset.amount || asset.shares) * currentPrice;
    
    // Calculate returns based on purchase price
    const purchaseTransaction = portfolio.transactions.find(t => t.assetId === asset.id && t.type === 'buy');
    if (purchaseTransaction) {
      const purchaseValue = purchaseTransaction.total;
      asset.return = asset.totalValue - purchaseValue;
      asset.returnPercent = ((asset.return / purchaseValue) * 100);
    }
    
    // Recalculate portfolio totals
    updatePortfolioTotals(portfolio);
    
    res.json({
      success: true,
      data: {
        message: 'Asset price updated',
        asset,
        valueChange: asset.totalValue - oldValue
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update asset price'
    });
  }
});

// Sell asset
router.post('/assets/:id/sell', (req, res) => {
  try {
    const { id } = req.params;
    const { amount, price, date } = req.body;
    const portfolio = portfolios[0];
    
    const asset = portfolio.assets.find(a => a.id === parseInt(id));
    if (!asset) {
      return res.status(404).json({
        success: false,
        error: 'Asset not found'
      });
    }
    
    // Add sell transaction
    const sellTransaction = {
      id: portfolio.transactions.length + 1,
      assetId: asset.id,
      type: 'sell',
      amount: type === 'stock' ? amount : amount,
      shares: type === 'stock' ? amount : null,
      price,
      total: amount * price,
      date: date || new Date().toISOString()
    };
    
    portfolio.transactions.push(sellTransaction);
    
    // Update asset amount
    const newAmount = (asset.amount || asset.shares) - amount;
    if (newAmount <= 0) {
      // Remove asset if fully sold
      portfolio.assets = portfolio.assets.filter(a => a.id !== parseInt(id));
    } else {
      asset.amount = newAmount;
      asset.shares = type === 'stock' ? newAmount : null;
      asset.totalValue = newAmount * asset.currentPrice;
    }
    
    // Recalculate portfolio totals
    updatePortfolioTotals(portfolio);
    
    res.json({
      success: true,
      data: {
        message: 'Asset sold successfully',
        transaction: sellTransaction
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to sell asset'
    });
  }
});

// Get portfolio performance
router.get('/performance', (req, res) => {
  try {
    const portfolio = portfolios[0];
    
    const performance = {
      totalValue: portfolio.totalValue,
      totalReturn: portfolio.totalReturn,
      totalReturnPercent: portfolio.totalReturnPercent,
      dailyChange: 250,
      dailyChangePercent: 0.5,
      weeklyChange: 1200,
      weeklyChangePercent: 2.4,
      monthlyChange: 3500,
      monthlyChangePercent: 7.5,
      yearlyChange: 8500,
      yearlyChangePercent: 20.5,
      bestPerformer: portfolio.assets.reduce((best, current) => 
        current.returnPercent > best.returnPercent ? current : best
      ),
      worstPerformer: portfolio.assets.reduce((worst, current) => 
        current.returnPercent < worst.returnPercent ? current : worst
      )
    };

    res.json({
      success: true,
      data: performance
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch performance data'
    });
  }
});

// Helper functions
function updatePortfolioTotals(portfolio) {
  const totalValue = portfolio.assets.reduce((sum, asset) => sum + asset.totalValue, 0);
  const totalReturn = portfolio.assets.reduce((sum, asset) => sum + asset.return, 0);
  
  portfolio.totalValue = totalValue;
  portfolio.totalReturn = totalReturn;
  portfolio.totalReturnPercent = totalValue > 0 ? (totalReturn / (totalValue - totalReturn)) * 100 : 0;
  
  // Update allocations
  portfolio.assets.forEach(asset => {
    asset.allocation = totalValue > 0 ? (asset.totalValue / totalValue) * 100 : 0;
  });
}

module.exports = router;


