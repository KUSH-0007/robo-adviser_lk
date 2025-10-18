const express = require('express');
const axios = require('axios');
const router = express.Router();

// Get market overview data
router.get('/overview', async (req, res) => {
  try {
    // Mock market data (in real app, you'd use Alpha Vantage, Yahoo Finance, or similar APIs)
    const marketData = {
      sensex: {
        value: 65432,
        change: 0.8,
        changePercent: '+0.8%',
        volume: '2.5B',
        high: 65500,
        low: 65200
      },
      nifty: {
        value: 19456,
        change: 0.6,
        changePercent: '+0.6%',
        volume: '1.8B',
        high: 19500,
        low: 19400
      },
      bankNifty: {
        value: 43210,
        change: 1.2,
        changePercent: '+1.2%',
        volume: '800M',
        high: 43300,
        low: 43100
      },
      gold: {
        value: 58000,
        change: -0.3,
        changePercent: '-0.3%',
        unit: 'per 10g'
      },
      silver: {
        value: 72000,
        change: 0.5,
        changePercent: '+0.5%',
        unit: 'per kg'
      },
      crudeOil: {
        value: 85.50,
        change: 1.2,
        changePercent: '+1.2%',
        unit: 'USD/barrel'
      },
      dollarIndex: {
        value: 102.5,
        change: -0.1,
        changePercent: '-0.1%'
      }
    };

    res.json({
      success: true,
      data: marketData,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Market API Error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch market data'
    });
  }
});

// Get stock information
router.get('/stocks/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    
    // Mock stock data (in real app, use Alpha Vantage or similar)
    const stockData = {
      symbol: symbol.toUpperCase(),
      name: getStockName(symbol),
      price: getRandomPrice(100, 5000),
      change: getRandomChange(-5, 5),
      changePercent: getRandomChange(-10, 10),
      volume: getRandomVolume(),
      marketCap: getRandomMarketCap(),
      pe: getRandomPE(),
      dividend: getRandomDividend(),
      buyUrl: `https://www.binance.com/en/stock-token?symbol=${symbol.toUpperCase()}`
    };

    res.json({
      success: true,
      data: stockData
    });

  } catch (error) {
    console.error('Stock API Error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch stock data'
    });
  }
});

// Get top gainers and losers
router.get('/top-movers', async (req, res) => {
  try {
    const topMovers = {
      gainers: [
        {
          symbol: 'RELIANCE',
          name: 'Reliance Industries',
          price: 2450,
          change: 45,
          changePercent: 1.87
        },
        {
          symbol: 'TCS',
          name: 'Tata Consultancy Services',
          price: 3850,
          change: 65,
          changePercent: 1.72
        },
        {
          symbol: 'HDFCBANK',
          name: 'HDFC Bank',
          price: 1650,
          change: 25,
          changePercent: 1.54
        }
      ],
      losers: [
        {
          symbol: 'INFY',
          name: 'Infosys',
          price: 1450,
          change: -35,
          changePercent: -2.36
        },
        {
          symbol: 'ITC',
          name: 'ITC Limited',
          price: 420,
          change: -8,
          changePercent: -1.87
        },
        {
          symbol: 'BHARTIARTL',
          name: 'Bharti Airtel',
          price: 850,
          change: -12,
          changePercent: -1.39
        }
      ]
    };

    res.json({
      success: true,
      data: topMovers
    });

  } catch (error) {
    console.error('Top Movers API Error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch top movers'
    });
  }
});

// Get sector performance
router.get('/sectors', async (req, res) => {
  try {
    const sectorData = [
      {
        name: 'Technology',
        performance: 2.5,
        change: '+2.5%',
        topStock: 'TCS',
        buyUrl: 'https://www.binance.com/en/stock-token'
      },
      {
        name: 'Banking',
        performance: 1.8,
        change: '+1.8%',
        topStock: 'HDFCBANK',
        buyUrl: 'https://www.binance.com/en/stock-token'
      },
      {
        name: 'Energy',
        performance: 3.2,
        change: '+3.2%',
        topStock: 'RELIANCE',
        buyUrl: 'https://www.binance.com/en/stock-token'
      },
      {
        name: 'Healthcare',
        performance: -0.5,
        change: '-0.5%',
        topStock: 'SUNPHARMA',
        buyUrl: 'https://www.binance.com/en/stock-token'
      },
      {
        name: 'Consumer Goods',
        performance: 0.8,
        change: '+0.8%',
        topStock: 'ITC',
        buyUrl: 'https://www.binance.com/en/stock-token'
      }
    ];

    res.json({
      success: true,
      data: sectorData
    });

  } catch (error) {
    console.error('Sectors API Error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch sector data'
    });
  }
});

// Get global market indices
router.get('/global', async (req, res) => {
  try {
    const globalIndices = [
      {
        name: 'S&P 500',
        value: 4567.89,
        change: 12.34,
        changePercent: 0.27,
        country: 'USA'
      },
      {
        name: 'NASDAQ',
        value: 14234.56,
        change: 45.67,
        changePercent: 0.32,
        country: 'USA'
      },
      {
        name: 'DOW JONES',
        value: 34567.89,
        change: -23.45,
        changePercent: -0.07,
        country: 'USA'
      },
      {
        name: 'FTSE 100',
        value: 7654.32,
        change: 34.56,
        changePercent: 0.45,
        country: 'UK'
      },
      {
        name: 'NIKKEI 225',
        value: 32345.67,
        change: 123.45,
        changePercent: 0.38,
        country: 'Japan'
      }
    ];

    res.json({
      success: true,
      data: globalIndices
    });

  } catch (error) {
    console.error('Global Markets API Error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch global market data'
    });
  }
});

// Helper functions
function getStockName(symbol) {
  const names = {
    'RELIANCE': 'Reliance Industries',
    'TCS': 'Tata Consultancy Services',
    'HDFCBANK': 'HDFC Bank',
    'INFY': 'Infosys',
    'ITC': 'ITC Limited',
    'BHARTIARTL': 'Bharti Airtel',
    'SUNPHARMA': 'Sun Pharmaceutical',
    'WIPRO': 'Wipro Limited',
    'AXISBANK': 'Axis Bank',
    'KOTAKBANK': 'Kotak Mahindra Bank'
  };
  
  return names[symbol.toUpperCase()] || symbol;
}

function getRandomPrice(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomChange(min, max) {
  return (Math.random() * (max - min) + min).toFixed(2);
}

function getRandomVolume() {
  const volumes = ['1.2M', '2.5M', '800K', '1.8M', '3.2M'];
  return volumes[Math.floor(Math.random() * volumes.length)];
}

function getRandomMarketCap() {
  const caps = ['50B', '120B', '85B', '200B', '75B'];
  return caps[Math.floor(Math.random() * caps.length)];
}

function getRandomPE() {
  return (Math.random() * 30 + 10).toFixed(2);
}

function getRandomDividend() {
  return (Math.random() * 5 + 1).toFixed(2);
}

module.exports = router;


