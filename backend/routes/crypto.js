const express = require('express');
const axios = require('axios');
const router = express.Router();

// CoinGecko API configuration
const COINGECKO_API_BASE_URL = 'https://api.coingecko.com/api/v3';

// Get real-time crypto prices
router.get('/prices', async (req, res) => {
  try {
    const { ids = 'bitcoin,ethereum,cardano,solana,binancecoin' } = req.query;
    
    const response = await axios.get(`${COINGECKO_API_BASE_URL}/simple/price`, {
      params: {
        ids: ids,
        vs_currencies: 'usd,inr',
        include_24hr_change: true,
        include_market_cap: true,
        include_24hr_vol: true
      }
    });

    const cryptoData = Object.keys(response.data).map(symbol => {
      const data = response.data[symbol];
      return {
        id: symbol,
        symbol: symbol.toUpperCase(),
        name: getCryptoName(symbol),
        price_usd: data.usd,
        price_inr: data.inr,
        change_24h: data.usd_24h_change,
        market_cap: data.usd_market_cap,
        volume_24h: data.usd_24h_vol,
        buyUrl: `https://www.binance.com/en/buy-sell-crypto?fiat=USD&crypto=${symbol.toUpperCase()}`
      };
    });

    res.json({
      success: true,
      data: cryptoData,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Crypto API Error:', error.message);
    
    // Fallback to mock data
    const mockData = getMockCryptoData();
    res.json({
      success: true,
      data: mockData,
      timestamp: new Date().toISOString(),
      message: 'Using mock data due to API limit'
    });
  }
});

// Get detailed crypto info
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const response = await axios.get(`${COINGECKO_API_BASE_URL}/coins/${id}`, {
      params: {
        localization: false,
        tickers: false,
        market_data: true,
        community_data: false,
        developer_data: false,
        sparkline: false
      }
    });

    const cryptoInfo = {
      id: response.data.id,
      symbol: response.data.symbol.toUpperCase(),
      name: response.data.name,
      description: response.data.description.en,
      image: response.data.image.large,
      current_price: response.data.market_data.current_price,
      market_cap: response.data.market_data.market_cap,
      total_volume: response.data.market_data.total_volume,
      high_24h: response.data.market_data.high_24h,
      low_24h: response.data.market_data.low_24h,
      price_change_24h: response.data.market_data.price_change_24h,
      price_change_percentage_24h: response.data.market_data.price_change_percentage_24h,
      buyUrl: `https://www.binance.com/en/buy-sell-crypto?fiat=USD&crypto=${response.data.symbol.toUpperCase()}`
    };

    res.json({
      success: true,
      data: cryptoInfo
    });

  } catch (error) {
    console.error('Crypto Detail API Error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch crypto details',
      message: error.message
    });
  }
});

// Get trending cryptocurrencies
router.get('/trending', async (req, res) => {
  try {
    const response = await axios.get(`${COINGECKO_API_BASE_URL}/search/trending`);
    
    const trendingData = response.data.coins.map(coin => ({
      id: coin.item.id,
      symbol: coin.item.symbol.toUpperCase(),
      name: coin.item.name,
      price_btc: coin.item.price_btc,
      market_cap_rank: coin.item.market_cap_rank,
      score: coin.item.score,
      image: coin.item.large,
      buyUrl: `https://www.binance.com/en/buy-sell-crypto?fiat=USD&crypto=${coin.item.symbol.toUpperCase()}`
    }));

    res.json({
      success: true,
      data: trendingData
    });

  } catch (error) {
    console.error('Trending Crypto API Error:', error.message);
    
    const mockTrending = getMockTrendingData();
    res.json({
      success: true,
      data: mockTrending,
      message: 'Using mock trending data'
    });
  }
});

// Get Binance trading pairs
router.get('/binance/pairs', async (req, res) => {
  try {
    const response = await axios.get('https://api.binance.com/api/v3/exchangeInfo');
    
    const tradingPairs = response.data.symbols
      .filter(symbol => symbol.status === 'TRADING' && symbol.quoteAsset === 'USDT')
      .slice(0, 50)
      .map(symbol => ({
        symbol: symbol.symbol,
        baseAsset: symbol.baseAsset,
        quoteAsset: symbol.quoteAsset,
        status: symbol.status,
        buyUrl: `https://www.binance.com/en/trade/${symbol.baseAsset}_${symbol.quoteAsset}`
      }));

    res.json({
      success: true,
      data: tradingPairs
    });

  } catch (error) {
    console.error('Binance API Error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch Binance trading pairs'
    });
  }
});

// Get Binance price for specific symbol
router.get('/binance/price/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    
    const response = await axios.get(`https://api.binance.com/api/v3/ticker/price`, {
      params: { symbol: symbol.toUpperCase() }
    });

    res.json({
      success: true,
      data: {
        symbol: response.data.symbol,
        price: response.data.price,
        buyUrl: `https://www.binance.com/en/trade/${symbol.toUpperCase()}_USDT`
      }
    });

  } catch (error) {
    console.error('Binance Price API Error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch Binance price'
    });
  }
});

// Helper functions
function getCryptoName(symbol) {
  const names = {
    bitcoin: 'Bitcoin',
    ethereum: 'Ethereum',
    cardano: 'Cardano',
    solana: 'Solana',
    binancecoin: 'BNB',
    ripple: 'XRP',
    polkadot: 'Polkadot',
    dogecoin: 'Dogecoin',
    avalanche: 'Avalanche',
    polygon: 'Polygon'
  };
  
  return names[symbol] || symbol.charAt(0).toUpperCase() + symbol.slice(1);
}

function getMockCryptoData() {
  return [
    {
      id: 'bitcoin',
      symbol: 'BTC',
      name: 'Bitcoin',
      price_usd: 45000,
      price_inr: 3750000,
      change_24h: 2.5,
      market_cap: 850000000000,
      volume_24h: 25000000000,
      buyUrl: 'https://www.binance.com/en/buy-sell-crypto?fiat=USD&crypto=BTC'
    },
    {
      id: 'ethereum',
      symbol: 'ETH',
      name: 'Ethereum',
      price_usd: 3200,
      price_inr: 266000,
      change_24h: 1.8,
      market_cap: 380000000000,
      volume_24h: 15000000000,
      buyUrl: 'https://www.binance.com/en/buy-sell-crypto?fiat=USD&crypto=ETH'
    },
    {
      id: 'cardano',
      symbol: 'ADA',
      name: 'Cardano',
      price_usd: 0.45,
      price_inr: 37.5,
      change_24h: -0.5,
      market_cap: 15000000000,
      volume_24h: 500000000,
      buyUrl: 'https://www.binance.com/en/buy-sell-crypto?fiat=USD&crypto=ADA'
    }
  ];
}

function getMockTrendingData() {
  return [
    {
      id: 'bitcoin',
      symbol: 'BTC',
      name: 'Bitcoin',
      price_btc: 1,
      market_cap_rank: 1,
      score: 100,
      image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
      buyUrl: 'https://www.binance.com/en/buy-sell-crypto?fiat=USD&crypto=BTC'
    },
    {
      id: 'ethereum',
      symbol: 'ETH',
      name: 'Ethereum',
      price_btc: 0.071,
      market_cap_rank: 2,
      score: 95,
      image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
      buyUrl: 'https://www.binance.com/en/buy-sell-crypto?fiat=USD&crypto=ETH'
    }
  ];
}

module.exports = router;


