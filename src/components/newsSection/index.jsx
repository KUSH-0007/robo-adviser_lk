import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

// Animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const bounceIn = keyframes`
  0% { transform: scale(0.3); opacity: 0; }
  50% { transform: scale(1.05); }
  70% { transform: scale(0.9); }
  100% { transform: scale(1); opacity: 1; }
`;

// Styled Components
const NewsContainer = styled.div`
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  animation: ${fadeInUp} 0.8s ease-out;
`;

const NewsHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const MainTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: ${({ theme }) => theme.text};
  margin-bottom: 1rem;
  background: ${({ theme }) => theme.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const NewsSubtitle = styled.p`
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
  font-size: 1.1rem;
`;

// Audio Summary Section
const AudioSummarySection = styled.div`
  background: ${({ theme }) => theme.cardBg};
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: 0 10px 30px ${({ theme }) => theme.shadow};
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    animation: ${shimmer} 3s infinite;
  }
`;

const AudioHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const AudioIcon = styled.div`
  font-size: 2rem;
  animation: ${pulse} 2s ease-in-out infinite;
`;

const AudioTitle = styled.h2`
  color: ${({ theme }) => theme.text};
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
`;

const AudioPlayer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 15px;
  border-left: 4px solid ${({ theme }) => theme.primary};
`;

const PlayButton = styled.button`
  background: ${({ theme }) => theme.gradient};
  color: white;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

const AudioInfo = styled.div`
  flex: 1;
`;

const AudioText = styled.div`
  color: ${({ theme }) => theme.text};
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

const AudioDuration = styled.div`
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
  font-size: 0.9rem;
`;

const AudioProgress = styled.div`
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  margin-top: 0.5rem;
  overflow: hidden;
`;

const AudioProgressFill = styled.div`
  height: 100%;
  background: ${({ theme }) => theme.gradient};
  width: ${({ progress }) => progress}%;
  transition: width 0.3s ease;
`;

// Market Data Section
const MarketInsightsCard = styled.div`
  background: ${({ theme }) => theme.cardBg};
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: 0 10px 30px ${({ theme }) => theme.shadow};
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    animation: ${shimmer} 3s infinite;
  }
`;

const LiveIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.success};
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 1rem;
  
  &::before {
    content: '';
    width: 8px;
    height: 8px;
    background: ${({ theme }) => theme.success};
    border-radius: 50%;
    animation: ${pulse} 1s ease-in-out infinite;
  }
`;

const InsightsTitle = styled.h2`
  color: ${({ theme }) => theme.text};
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const InsightsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const InsightItem = styled.div`
  padding: 1rem;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 12px;
  border-left: 4px solid ${({ theme }) => theme.primary};
  animation: ${slideIn} 0.6s ease-out;
  animation-delay: ${props => props.delay || '0s'};
  animation-fill-mode: both;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px ${({ theme }) => theme.shadow};
  }
`;

const InsightLabel = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
  margin-bottom: 0.5rem;
`;

const InsightValue = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
  color: ${({ theme, positive }) => 
    positive ? theme.success : theme.error};
`;

// News Cards
const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
`;

const NewsCard = styled.div`
  background: ${({ theme }) => theme.cardBg};
  backdrop-filter: blur(20px);
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: 0 10px 30px ${({ theme }) => theme.shadow};
  transition: all 0.3s ease;
  position: relative;
  animation: ${bounceIn} 0.6s ease-out;
  animation-delay: ${props => props.delay || '0s'};
  animation-fill-mode: both;
  
  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 20px 40px ${({ theme }) => theme.shadow};
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${({ category, theme }) => {
      switch (category) {
        case 'crypto': return theme.crypto;
        case 'market': return theme.news;
        case 'personal': return theme.savings;
        case 'policy': return theme.warning;
        case 'banking': return theme.primary;
        default: return theme.gradient;
      }
    }};
  }
`;

const NewsImage = styled.div`
  width: 100%;
  height: 200px;
  background: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50%;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.3));
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
    animation: ${shimmer} 3s infinite;
  }
`;

const NewsCardContent = styled.div`
  padding: 2rem;
`;

const NewsCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const NewsCategory = styled.span`
  background: ${({ category, theme }) => {
    switch (category) {
      case 'crypto': return `${theme.crypto}20`;
      case 'market': return `${theme.news}20`;
      case 'personal': return `${theme.savings}20`;
      case 'policy': return `${theme.warning}20`;
      case 'banking': return `${theme.primary}20`;
      default: return `${theme.primary}20`;
    }
  }};
  color: ${({ category, theme }) => {
    switch (category) {
      case 'crypto': return theme.crypto;
      case 'market': return theme.news;
      case 'personal': return theme.savings;
      case 'policy': return theme.warning;
      case 'banking': return theme.primary;
      default: return theme.primary;
    }
  }};
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
`;

const NewsTime = styled.span`
  color: ${({ theme }) => theme.text};
  opacity: 0.6;
  font-size: 0.8rem;
`;

const NewsCardTitle = styled.h3`
  color: ${({ theme }) => theme.text};
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.4;
`;

const NewsExcerpt = styled.p`
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const NewsFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NewsSource = styled.span`
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
  font-size: 0.9rem;
  font-weight: 500;
`;

const ReadMoreButton = styled.button`
  background: ${({ theme }) => theme.gradient};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const BuyButton = styled.button`
  background: ${({ theme }) => theme.success};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

const SourceButton = styled.button`
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

const NewsSection = ({ theme }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [news, setNews] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [marketData, setMarketData] = useState({
    sensex: { value: 65432, change: 0.8 },
    nifty: { value: 19456, change: 0.6 },
    bitcoin: { value: 45000, change: 2.5 },
    ethereum: { value: 3200, change: 1.8 },
    gold: { value: 58000, change: -0.3 }
  });

  const mockNews = [
    {
      id: 1,
      title: "Bitcoin Surges Past $45,000 as Institutional Adoption Grows",
      excerpt: "Major financial institutions continue to show interest in cryptocurrency investments, driving Bitcoin to new heights with increased institutional adoption and regulatory clarity.",
      category: "crypto",
      source: "CryptoNews",
      time: "2 hours ago",
      imageUrl: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400&h=200&fit=crop",
      sourceUrl: "https://cryptonews.com/news/bitcoin-surges-past-45000-institutional-adoption",
      buyUrl: "https://www.binance.com/en/buy-sell-crypto?fiat=USD&crypto=BTC",
      symbol: "BTC"
    },
    {
      id: 2,
      title: "RBI Announces New Digital Payment Guidelines",
      excerpt: "The Reserve Bank of India introduces comprehensive guidelines for digital payment security and user protection, enhancing the digital payment ecosystem for millions of users.",
      category: "policy",
      source: "Economic Times",
      time: "4 hours ago",
      imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=200&fit=crop",
      sourceUrl: "https://economictimes.indiatimes.com/news/economy/policy/rbi-announces-new-digital-payment-guidelines",
      buyUrl: null,
      symbol: null
    },
    {
      id: 3,
      title: "Sensex Hits Record High Amid Strong Corporate Earnings",
      excerpt: "Indian stock markets reach new milestones as major companies report better-than-expected quarterly results, boosting investor confidence and market sentiment.",
      category: "market",
      source: "Business Standard",
      time: "6 hours ago",
      imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=200&fit=crop",
      sourceUrl: "https://www.business-standard.com/article/markets/sensex-hits-record-high-corporate-earnings",
      buyUrl: "https://www.binance.com/en/stock-token",
      symbol: "SENSEX"
    },
    {
      id: 4,
      title: "5 Smart Ways to Save Money on Your Monthly Expenses",
      excerpt: "Financial experts share practical tips to reduce monthly spending and increase your savings rate with proven strategies that work in real life.",
      category: "personal",
      source: "Money Control",
      time: "8 hours ago",
      imageUrl: "https://images.unsplash.com/photo-1554224154-26032cdc0c0f?w=400&h=200&fit=crop",
      sourceUrl: "https://www.moneycontrol.com/news/business/personal-finance/5-smart-ways-save-money-monthly-expenses",
      buyUrl: null,
      symbol: null
    },
    {
      id: 5,
      title: "Ethereum 2.0 Update: What Investors Need to Know",
      excerpt: "The long-awaited Ethereum upgrade brings significant changes to the network's consensus mechanism and energy efficiency, impacting the entire crypto ecosystem.",
      category: "crypto",
      source: "CoinDesk",
      time: "10 hours ago",
      imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=200&fit=crop",
      sourceUrl: "https://www.coindesk.com/ethereum-2-0-update-investors-guide",
      buyUrl: "https://www.binance.com/en/buy-sell-crypto?fiat=USD&crypto=ETH",
      symbol: "ETH"
    },
    {
      id: 6,
      title: "Major Banks Introduce AI-Powered Financial Advisory",
      excerpt: "Leading banks are now offering AI-driven financial advice to customers, providing personalized investment recommendations and portfolio management.",
      category: "banking",
      source: "Financial Express",
      time: "12 hours ago",
      imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=200&fit=crop",
      sourceUrl: "https://www.financialexpress.com/banking-finance/major-banks-ai-financial-advisory",
      buyUrl: null,
      symbol: null
    }
  ];

  const audioSummary = "Welcome to today's financial news summary. Bitcoin has surged past $45,000 as institutional adoption grows. The RBI has announced new digital payment guidelines. The Sensex hit a record high with strong corporate earnings. Here are five smart ways to save money on monthly expenses. Ethereum 2.0 update brings significant changes. And major banks are introducing AI-powered financial advisory services.";

  useEffect(() => {
    setNews(mockNews);
    
    // Simulate real-time market data updates
    const interval = setInterval(() => {
      setMarketData(prev => ({
        sensex: { 
          value: prev.sensex.value + (Math.random() - 0.5) * 100,
          change: prev.sensex.change + (Math.random() - 0.5) * 0.2
        },
        nifty: { 
          value: prev.nifty.value + (Math.random() - 0.5) * 30,
          change: prev.nifty.change + (Math.random() - 0.5) * 0.2
        },
        bitcoin: { 
          value: prev.bitcoin.value + (Math.random() - 0.5) * 500,
          change: prev.bitcoin.change + (Math.random() - 0.5) * 1
        },
        ethereum: { 
          value: prev.ethereum.value + (Math.random() - 0.5) * 50,
          change: prev.ethereum.change + (Math.random() - 0.5) * 0.8
        },
        gold: { 
          value: prev.gold.value + (Math.random() - 0.5) * 200,
          change: prev.gold.change + (Math.random() - 0.5) * 0.3
        }
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Simulate audio progress for visual feedback
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setAudioProgress(prev => {
          if (prev >= 100) {
            return 100;
          }
          return prev + 2;
        });
      }, 1000); // Update every second
    } else {
      setAudioProgress(0);
    }

    return () => clearInterval(interval);
  }, [isPlaying]);

  const filteredNews = activeFilter === 'all' 
    ? news 
    : news.filter(item => item.category === activeFilter);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatCryptoPrice = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handlePlayAudio = () => {
    if (!isPlaying) {
      // Start audio playback
      setIsPlaying(true);
      
      // Use browser's built-in text-to-speech
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(audioSummary);
        utterance.rate = 0.9; // Slightly slower for better comprehension
        utterance.pitch = 1;
        utterance.volume = 1;
        
        utterance.onend = () => {
          setIsPlaying(false);
          setAudioProgress(0);
        };
        
        utterance.onpause = () => {
          setIsPlaying(false);
        };
        
        utterance.onresume = () => {
          setIsPlaying(true);
        };
        
        speechSynthesis.speak(utterance);
      } else {
        // Fallback for browsers without speech synthesis
        alert('Text-to-speech not supported in this browser. Audio summary: ' + audioSummary);
        setIsPlaying(false);
      }
    } else {
      // Stop audio playback
      setIsPlaying(false);
      speechSynthesis.cancel();
      setAudioProgress(0);
    }
  };

  return (
    <NewsContainer>
      <NewsHeader>
        <MainTitle theme={theme}>📰 Finance News & Insights</MainTitle>
        <NewsSubtitle theme={theme}>
          Stay updated with the latest financial news, market trends, and investment opportunities
        </NewsSubtitle>
      </NewsHeader>

      <AudioSummarySection theme={theme}>
        <AudioHeader>
          <AudioIcon>🎧</AudioIcon>
          <AudioTitle theme={theme}>Daily Voice News Brief</AudioTitle>
        </AudioHeader>
        <AudioPlayer theme={theme}>
          <PlayButton onClick={handlePlayAudio} theme={theme}>
            {isPlaying ? '⏸️' : '▶️'}
          </PlayButton>
          <AudioInfo>
            <AudioText theme={theme}>Today's Financial News Summary</AudioText>
            <AudioDuration theme={theme}>Duration: 2 minutes 30 seconds</AudioDuration>
            <AudioProgress>
              <AudioProgressFill progress={audioProgress} theme={theme} />
            </AudioProgress>
          </AudioInfo>
        </AudioPlayer>
      </AudioSummarySection>

      <MarketInsightsCard theme={theme}>
        <LiveIndicator theme={theme}>
          🔴 LIVE Market Data
        </LiveIndicator>
        <InsightsTitle theme={theme}>
          📈 Live Market Data
        </InsightsTitle>
        <InsightsGrid>
          <InsightItem theme={theme} delay="0.1s">
            <InsightLabel theme={theme}>Sensex</InsightLabel>
            <InsightValue theme={theme} positive={marketData.sensex.change >= 0}>
              {marketData.sensex.value.toLocaleString()} 
              <span style={{ fontSize: '0.9rem', marginLeft: '0.5rem' }}>
                ({marketData.sensex.change >= 0 ? '+' : ''}{marketData.sensex.change.toFixed(2)}%)
              </span>
            </InsightValue>
          </InsightItem>
          <InsightItem theme={theme} delay="0.2s">
            <InsightLabel theme={theme}>Nifty 50</InsightLabel>
            <InsightValue theme={theme} positive={marketData.nifty.change >= 0}>
              {marketData.nifty.value.toLocaleString()}
              <span style={{ fontSize: '0.9rem', marginLeft: '0.5rem' }}>
                ({marketData.nifty.change >= 0 ? '+' : ''}{marketData.nifty.change.toFixed(2)}%)
              </span>
            </InsightValue>
          </InsightItem>
          <InsightItem theme={theme} delay="0.3s">
            <InsightLabel theme={theme}>Bitcoin</InsightLabel>
            <InsightValue theme={theme} positive={marketData.bitcoin.change >= 0}>
              {formatCryptoPrice(marketData.bitcoin.value)}
              <span style={{ fontSize: '0.9rem', marginLeft: '0.5rem' }}>
                ({marketData.bitcoin.change >= 0 ? '+' : ''}{marketData.bitcoin.change.toFixed(2)}%)
              </span>
            </InsightValue>
          </InsightItem>
          <InsightItem theme={theme} delay="0.4s">
            <InsightLabel theme={theme}>Ethereum</InsightLabel>
            <InsightValue theme={theme} positive={marketData.ethereum.change >= 0}>
              {formatCryptoPrice(marketData.ethereum.value)}
              <span style={{ fontSize: '0.9rem', marginLeft: '0.5rem' }}>
                ({marketData.ethereum.change >= 0 ? '+' : ''}{marketData.ethereum.change.toFixed(2)}%)
              </span>
            </InsightValue>
          </InsightItem>
          <InsightItem theme={theme} delay="0.5s">
            <InsightLabel theme={theme}>Gold (per 10g)</InsightLabel>
            <InsightValue theme={theme} positive={marketData.gold.change >= 0}>
              {formatCurrency(marketData.gold.value)}
              <span style={{ fontSize: '0.9rem', marginLeft: '0.5rem' }}>
                ({marketData.gold.change >= 0 ? '+' : ''}{marketData.gold.change.toFixed(2)}%)
              </span>
            </InsightValue>
          </InsightItem>
        </InsightsGrid>
      </MarketInsightsCard>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <button 
          onClick={() => setActiveFilter('all')}
          style={{
            background: activeFilter === 'all' ? theme.gradient : 'transparent',
            color: activeFilter === 'all' ? 'white' : theme.text,
            border: `1px solid ${activeFilter === 'all' ? 'transparent' : theme.border}`,
            padding: '0.75rem 1.5rem',
            borderRadius: '25px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: '600',
            transition: 'all 0.3s ease'
          }}
        >
          📰 All News
        </button>
        <button 
          onClick={() => setActiveFilter('crypto')}
          style={{
            background: activeFilter === 'crypto' ? theme.gradient : 'transparent',
            color: activeFilter === 'crypto' ? 'white' : theme.text,
            border: `1px solid ${activeFilter === 'crypto' ? 'transparent' : theme.border}`,
            padding: '0.75rem 1.5rem',
            borderRadius: '25px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: '600',
            transition: 'all 0.3s ease'
          }}
        >
          ₿ Crypto
        </button>
        <button 
          onClick={() => setActiveFilter('market')}
          style={{
            background: activeFilter === 'market' ? theme.gradient : 'transparent',
            color: activeFilter === 'market' ? 'white' : theme.text,
            border: `1px solid ${activeFilter === 'market' ? 'transparent' : theme.border}`,
            padding: '0.75rem 1.5rem',
            borderRadius: '25px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: '600',
            transition: 'all 0.3s ease'
          }}
        >
          📈 Markets
        </button>
        <button 
          onClick={() => setActiveFilter('personal')}
          style={{
            background: activeFilter === 'personal' ? theme.gradient : 'transparent',
            color: activeFilter === 'personal' ? 'white' : theme.text,
            border: `1px solid ${activeFilter === 'personal' ? 'transparent' : theme.border}`,
            padding: '0.75rem 1.5rem',
            borderRadius: '25px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: '600',
            transition: 'all 0.3s ease'
          }}
        >
          💰 Personal Finance
        </button>
        <button 
          onClick={() => setActiveFilter('banking')}
          style={{
            background: activeFilter === 'banking' ? theme.gradient : 'transparent',
            color: activeFilter === 'banking' ? 'white' : theme.text,
            border: `1px solid ${activeFilter === 'banking' ? 'transparent' : theme.border}`,
            padding: '0.75rem 1.5rem',
            borderRadius: '25px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: '600',
            transition: 'all 0.3s ease'
          }}
        >
          🏦 Banking
        </button>
        <button 
          onClick={() => setActiveFilter('policy')}
          style={{
            background: activeFilter === 'policy' ? theme.gradient : 'transparent',
            color: activeFilter === 'policy' ? 'white' : theme.text,
            border: `1px solid ${activeFilter === 'policy' ? 'transparent' : theme.border}`,
            padding: '0.75rem 1.5rem',
            borderRadius: '25px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: '600',
            transition: 'all 0.3s ease'
          }}
        >
          🏛️ Policy
        </button>
      </div>

      <NewsGrid>
        {filteredNews.map((item, index) => (
          <NewsCard 
            key={item.id} 
            category={item.category} 
            theme={theme}
            delay={`${index * 0.1}s`}
          >
            <NewsImage imageUrl={item.imageUrl} />
            <NewsCardContent>
              <NewsCardHeader>
                <NewsCategory category={item.category} theme={theme}>
                  {item.category}
                </NewsCategory>
                <NewsTime theme={theme}>{item.time}</NewsTime>
              </NewsCardHeader>
              <NewsCardTitle theme={theme}>{item.title}</NewsCardTitle>
              <NewsExcerpt theme={theme}>{item.excerpt}</NewsExcerpt>
              <NewsFooter>
                <NewsSource theme={theme}>{item.source}</NewsSource>
                <ActionButtons>
                  <SourceButton 
                    theme={theme}
                    onClick={() => window.open(item.sourceUrl, '_blank')}
                  >
                    📰 Source
                  </SourceButton>
                  {item.buyUrl && (
                    <BuyButton 
                      theme={theme}
                      onClick={() => window.open(item.buyUrl, '_blank')}
                    >
                      💰 Buy {item.symbol}
                    </BuyButton>
                  )}
                  <ReadMoreButton theme={theme}>
                    Read More →
                  </ReadMoreButton>
                </ActionButtons>
              </NewsFooter>
            </NewsCardContent>
          </NewsCard>
        ))}
      </NewsGrid>
    </NewsContainer>
  );
};

export default NewsSection;
