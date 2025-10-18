import React, { useState, useEffect } from 'react';
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

const CryptoContainer = styled.div`
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  animation: ${fadeInUp} 0.8s ease-out;
`;

const CryptoHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const CryptoTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: ${({ theme }) => theme.text};
  margin-bottom: 1rem;
  background: ${({ theme }) => theme.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const CryptoSubtitle = styled.p`
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
  font-size: 1.1rem;
`;

const CryptoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const CryptoCard = styled.div`
  background: ${({ theme }) => theme.cardBg};
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: 0 10px 30px ${({ theme }) => theme.shadow};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px ${({ theme }) => theme.shadow};
  }
`;

const CryptoInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const CryptoName = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const CryptoIcon = styled.div`
  font-size: 2rem;
`;

const CryptoDetails = styled.div``;

const CryptoTitleText = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  margin: 0 0 0.25rem 0;
`;

const CryptoSymbol = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
`;

const CryptoPrice = styled.div`
  text-align: right;
`;

const PriceValue = styled.div`
  font-size: 1.8rem;
  font-weight: 800;
  color: ${({ theme }) => theme.text};
  margin-bottom: 0.25rem;
`;

const PriceChange = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ change }) => change >= 0 ? '#27ae60' : '#e74c3c'};
`;

const CryptoTracker = ({ userData, theme }) => {
  const [cryptoData, setCryptoData] = useState({
    BTC: { price: 45000, change: 2.5 },
    ETH: { price: 3200, change: -1.2 },
    ADA: { price: 2.0, change: 5.8 }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCryptoData(prev => ({
        BTC: { ...prev.BTC, price: prev.BTC.price + (Math.random() - 0.5) * 100 },
        ETH: { ...prev.ETH, price: prev.ETH.price + (Math.random() - 0.5) * 50 },
        ADA: { ...prev.ADA, price: prev.ADA.price + (Math.random() - 0.5) * 0.1 }
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <CryptoContainer>
      <CryptoHeader>
        <CryptoTitle theme={theme}>₿ Crypto Tracker</CryptoTitle>
        <CryptoSubtitle theme={theme}>
          Real-time cryptocurrency prices and portfolio tracking
        </CryptoSubtitle>
      </CryptoHeader>

      <CryptoGrid>
        {Object.entries(cryptoData).map(([symbol, data]) => (
          <CryptoCard key={symbol} theme={theme}>
            <CryptoInfo>
              <CryptoName>
                <CryptoIcon>
                  {symbol === 'BTC' ? '₿' : symbol === 'ETH' ? 'Ξ' : '₳'}
                </CryptoIcon>
                <CryptoDetails>
                  <CryptoTitleText theme={theme}>
                    {symbol === 'BTC' ? 'Bitcoin' : symbol === 'ETH' ? 'Ethereum' : 'Cardano'}
                  </CryptoTitleText>
                  <CryptoSymbol theme={theme}>{symbol}</CryptoSymbol>
                </CryptoDetails>
              </CryptoName>
              <CryptoPrice>
                <PriceValue theme={theme}>{formatCurrency(data.price)}</PriceValue>
                <PriceChange change={data.change}>
                  {data.change >= 0 ? '↗' : '↘'} {data.change >= 0 ? '+' : ''}{data.change.toFixed(2)}%
                </PriceChange>
              </CryptoPrice>
            </CryptoInfo>
          </CryptoCard>
        ))}
      </CryptoGrid>
    </CryptoContainer>
  );
};

export default CryptoTracker;
