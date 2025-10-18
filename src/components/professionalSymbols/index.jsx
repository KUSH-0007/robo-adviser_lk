import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

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

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const SymbolsContainer = styled.div`
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  animation: ${fadeInUp} 0.8s ease-out;
`;

const SymbolsHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const SymbolsTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: ${({ theme }) => theme.text};
  margin-bottom: 1rem;
  background: ${({ theme }) => theme.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const SymbolsSubtitle = styled.p`
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
  font-size: 1.1rem;
`;

const SymbolsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const SymbolCard = styled.div`
  background: ${({ theme }) => theme.cardBg};
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: 0 10px 30px ${({ theme }) => theme.shadow};
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 20px 40px ${({ theme }) => theme.shadow};
  }
  
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

const SymbolIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  animation: ${float} 3s ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};
`;

const SymbolTitle = styled.h3`
  color: ${({ theme }) => theme.text};
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const SymbolDescription = styled.p`
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const SymbolStats = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  color: ${({ theme, positive }) => 
    positive ? theme.success : theme.error};
  font-size: 1.1rem;
  font-weight: 700;
`;

const StatLabel = styled.div`
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
  font-size: 0.8rem;
`;

const ActionButton = styled.button`
  background: ${({ theme }) => theme.gradient};
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.3s ease;
  width: 100%;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
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

const CategoryTabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const CategoryTab = styled.button`
  background: ${({ active, theme }) => 
    active ? theme.gradient : 'transparent'};
  color: ${({ active, theme }) => 
    active ? 'white' : theme.text};
  border: 1px solid ${({ active, theme }) => 
    active ? 'transparent' : theme.border};
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px ${({ theme }) => theme.shadow};
  }
`;

const ProfessionalSymbols = ({ theme, setCurrentView }) => {
  const [activeCategory, setActiveCategory] = useState('all');

  const symbolsData = {
    crypto: [
      {
        id: 1,
        icon: '₿',
        title: 'Bitcoin (BTC)',
        description: 'The world\'s first and most valuable cryptocurrency',
        price: '$45,000',
        change: '+2.5%',
        positive: true,
        marketCap: '$850B',
        volume: '$25B',
        redirectUrl: 'https://www.binance.com/en/buy-sell-crypto?fiat=USD&crypto=BTC',
        internalRoute: 'crypto'
      },
      {
        id: 2,
        icon: 'Ξ',
        title: 'Ethereum (ETH)',
        description: 'Smart contract platform and decentralized applications',
        price: '$3,200',
        change: '+1.8%',
        positive: true,
        marketCap: '$380B',
        volume: '$15B',
        redirectUrl: 'https://www.binance.com/en/buy-sell-crypto?fiat=USD&crypto=ETH',
        internalRoute: 'crypto'
      },
      {
        id: 3,
        icon: '₳',
        title: 'Cardano (ADA)',
        description: 'Proof-of-stake blockchain platform',
        price: '$0.45',
        change: '-0.5%',
        positive: false,
        marketCap: '$15B',
        volume: '$500M',
        redirectUrl: 'https://www.binance.com/en/buy-sell-crypto?fiat=USD&crypto=ADA',
        internalRoute: 'crypto'
      }
    ],
    stocks: [
      {
        id: 4,
        icon: '📈',
        title: 'Reliance Industries',
        description: 'India\'s largest private sector company',
        price: '₹2,450',
        change: '+1.87%',
        positive: true,
        marketCap: '₹15.2T',
        volume: '₹2.5B',
        redirectUrl: 'https://www.binance.com/en/stock-token',
        internalRoute: 'portfolio'
      },
      {
        id: 5,
        icon: '💼',
        title: 'TCS',
        description: 'Tata Consultancy Services Limited',
        price: '₹3,850',
        change: '+1.72%',
        positive: true,
        marketCap: '₹14.1T',
        volume: '₹1.8B',
        redirectUrl: 'https://www.binance.com/en/stock-token',
        internalRoute: 'portfolio'
      },
      {
        id: 6,
        icon: '🏦',
        title: 'HDFC Bank',
        description: 'India\'s largest private sector bank',
        price: '₹1,650',
        change: '+1.54%',
        positive: true,
        marketCap: '₹9.2T',
        volume: '₹800M',
        redirectUrl: 'https://www.binance.com/en/stock-token',
        internalRoute: 'portfolio'
      }
    ],
    indices: [
      {
        id: 7,
        icon: '📊',
        title: 'SENSEX',
        description: 'Bombay Stock Exchange Sensitive Index',
        price: '65,432',
        change: '+0.8%',
        positive: true,
        marketCap: '₹2,850T',
        volume: '₹2.5B',
        redirectUrl: 'https://www.moneycontrol.com/india/stockpricequote/',
        internalRoute: 'news'
      },
      {
        id: 8,
        icon: '📉',
        title: 'NIFTY 50',
        description: 'National Stock Exchange Fifty',
        price: '19,456',
        change: '+0.6%',
        positive: true,
        marketCap: '₹2,650T',
        volume: '₹1.8B',
        redirectUrl: 'https://www.moneycontrol.com/india/stockpricequote/',
        internalRoute: 'news'
      },
      {
        id: 9,
        icon: '🏛️',
        title: 'BANK NIFTY',
        description: 'Banking sector index',
        price: '43,210',
        change: '+1.2%',
        positive: true,
        marketCap: '₹1,850T',
        volume: '₹800M',
        redirectUrl: 'https://www.moneycontrol.com/india/stockpricequote/',
        internalRoute: 'news'
      }
    ],
    commodities: [
      {
        id: 10,
        icon: '🥇',
        title: 'Gold',
        description: 'Precious metal investment',
        price: '₹58,000',
        change: '-0.3%',
        positive: false,
        marketCap: '₹12.5T',
        volume: '₹2.1B',
        redirectUrl: 'https://www.binance.com/en/trade/GOLD_USDT',
        internalRoute: 'portfolio'
      },
      {
        id: 11,
        icon: '🥈',
        title: 'Silver',
        description: 'Industrial and investment metal',
        price: '₹72,000',
        change: '+0.5%',
        positive: true,
        marketCap: '₹8.2T',
        volume: '₹1.5B',
        redirectUrl: 'https://www.binance.com/en/trade/SILVER_USDT',
        internalRoute: 'portfolio'
      },
      {
        id: 12,
        icon: '🛢️',
        title: 'Crude Oil',
        description: 'Energy commodity trading',
        price: '$85.50',
        change: '+1.2%',
        positive: true,
        marketCap: '$2.1T',
        volume: '$45B',
        redirectUrl: 'https://www.binance.com/en/trade/OIL_USDT',
        internalRoute: 'portfolio'
      }
    ]
  };

  const handleSymbolClick = (symbol) => {
    if (symbol.internalRoute) {
      setCurrentView(symbol.internalRoute);
    } else if (symbol.redirectUrl) {
      window.open(symbol.redirectUrl, '_blank');
    }
  };

  const getFilteredSymbols = () => {
    if (activeCategory === 'all') {
      return [
        ...symbolsData.crypto,
        ...symbolsData.stocks,
        ...symbolsData.indices,
        ...symbolsData.commodities
      ];
    }
    return symbolsData[activeCategory] || [];
  };

  return (
    <SymbolsContainer>
      <SymbolsHeader>
        <SymbolsTitle theme={theme}>📊 Professional Market Symbols</SymbolsTitle>
        <SymbolsSubtitle theme={theme}>
          Click on any symbol to view detailed information and trading options
        </SymbolsSubtitle>
      </SymbolsHeader>

      <LiveIndicator theme={theme}>
        🔴 LIVE Market Data
      </LiveIndicator>

      <CategoryTabs>
        <CategoryTab 
          active={activeCategory === 'all'} 
          onClick={() => setActiveCategory('all')}
          theme={theme}
        >
          📊 All Markets
        </CategoryTab>
        <CategoryTab 
          active={activeCategory === 'crypto'} 
          onClick={() => setActiveCategory('crypto')}
          theme={theme}
        >
          ₿ Cryptocurrency
        </CategoryTab>
        <CategoryTab 
          active={activeCategory === 'stocks'} 
          onClick={() => setActiveCategory('stocks')}
          theme={theme}
        >
          📈 Stocks
        </CategoryTab>
        <CategoryTab 
          active={activeCategory === 'indices'} 
          onClick={() => setActiveCategory('indices')}
          theme={theme}
        >
          📊 Indices
        </CategoryTab>
        <CategoryTab 
          active={activeCategory === 'commodities'} 
          onClick={() => setActiveCategory('commodities')}
          theme={theme}
        >
          🥇 Commodities
        </CategoryTab>
      </CategoryTabs>

      <SymbolsGrid>
        {getFilteredSymbols().map((symbol, index) => (
          <SymbolCard 
            key={symbol.id} 
            theme={theme}
            onClick={() => handleSymbolClick(symbol)}
          >
            <SymbolIcon delay={`${index * 0.1}s`}>
              {symbol.icon}
            </SymbolIcon>
            <SymbolTitle theme={theme}>{symbol.title}</SymbolTitle>
            <SymbolDescription theme={theme}>
              {symbol.description}
            </SymbolDescription>
            
            <SymbolStats>
              <StatItem>
                <StatValue theme={theme} positive={symbol.positive}>
                  {symbol.price}
                </StatValue>
                <StatLabel theme={theme}>Current Price</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue theme={theme} positive={symbol.positive}>
                  {symbol.change}
                </StatValue>
                <StatLabel theme={theme}>24h Change</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue theme={theme}>
                  {symbol.marketCap}
                </StatValue>
                <StatLabel theme={theme}>Market Cap</StatLabel>
              </StatItem>
            </SymbolStats>

            <ActionButton theme={theme}>
              {symbol.internalRoute === 'crypto' ? '💰 Trade Crypto' :
               symbol.internalRoute === 'portfolio' ? '📊 View Portfolio' :
               symbol.internalRoute === 'news' ? '📰 Market News' :
               '🔗 Open Trading'}
            </ActionButton>
          </SymbolCard>
        ))}
      </SymbolsGrid>
    </SymbolsContainer>
  );
};

export default ProfessionalSymbols;


