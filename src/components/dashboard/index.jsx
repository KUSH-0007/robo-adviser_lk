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

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const DashboardContainer = styled.div`
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  animation: ${fadeInUp} 0.8s ease-out;
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const Card = styled.div`
  background: ${({ theme }) => theme.cardBg};
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: 0 10px 30px ${({ theme }) => theme.shadow};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px ${({ theme }) => theme.shadow};
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${({ variant, theme }) => {
      switch (variant) {
        case 'success': return theme.success;
        case 'warning': return theme.warning;
        case 'crypto': return theme.crypto;
        case 'news': return theme.news;
        case 'savings': return theme.savings;
        default: return theme.gradient;
      }
    }};
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const CardTitle = styled.h3`
  color: ${({ theme }) => theme.text};
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0;
`;

const CardIcon = styled.div`
  font-size: 2rem;
  animation: ${float} 3s ease-in-out infinite;
`;

const HealthScoreContainer = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const ScoreCircle = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: conic-gradient(
    ${({ score, theme }) => {
      const percentage = score;
      const color = score >= 80 ? theme.success : score >= 60 ? theme.warning : theme.error;
      return `${color} ${percentage * 3.6}deg, rgba(0,0,0,0.1) ${percentage * 3.6}deg`;
    }}
  );
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  position: relative;
  animation: ${pulse} 2s ease-in-out infinite;
  
  &::before {
    content: '';
    position: absolute;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: ${({ theme }) => theme.cardBg};
  }
`;

const ScoreText = styled.div`
  position: relative;
  z-index: 1;
  font-size: 1.5rem;
  font-weight: 800;
  color: ${({ theme }) => theme.text};
`;

const ScoreLabel = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
  margin-top: 0.5rem;
`;

const MetricGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const Metric = styled.div`
  text-align: center;
  padding: 1rem;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 12px;
  border-left: 4px solid ${({ theme }) => theme.primary};
`;

const MetricValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  margin-bottom: 0.25rem;
`;

const MetricLabel = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const CryptoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CryptoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: rgba(247, 147, 26, 0.1);
  border-radius: 12px;
  border-left: 4px solid ${({ theme }) => theme.crypto};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateX(5px);
    background: rgba(247, 147, 26, 0.15);
  }
`;

const CryptoInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const CryptoIcon = styled.div`
  font-size: 1.5rem;
`;

const CryptoDetails = styled.div``;

const CryptoName = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

const CryptoAmount = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
`;

const CryptoValue = styled.div`
  text-align: right;
`;

const CryptoPrice = styled.div`
  font-weight: 700;
  color: ${({ theme }) => theme.text};
`;

const CryptoChange = styled.div`
  font-size: 0.8rem;
  color: ${({ change }) => change >= 0 ? '#27ae60' : '#e74c3c'};
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  overflow: hidden;
  margin: 1rem 0;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: ${({ theme }) => theme.gradient};
  width: ${({ percentage }) => percentage}%;
  border-radius: 4px;
  transition: width 1s ease;
`;

const QuickActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
`;

const QuickActionButton = styled.button`
  background: ${({ variant, theme }) => {
    switch (variant) {
      case 'success': return theme.success;
      case 'warning': return theme.warning;
      case 'crypto': return theme.crypto;
      case 'news': return theme.news;
      default: return theme.gradient;
    }
  }};
  color: white;
  border: none;
  padding: 1rem 1.5rem;
  border-radius: 15px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }
`;

const Dashboard = ({ userData, theme }) => {
  const [cryptoPrices, setCryptoPrices] = useState({
    BTC: { price: 45000, change: 2.5 },
    ETH: { price: 3200, change: -1.2 },
    ADA: { price: 2.0, change: 5.8 }
  });

  useEffect(() => {
    // Simulate real-time crypto price updates
    const interval = setInterval(() => {
      setCryptoPrices(prev => ({
        BTC: { ...prev.BTC, price: prev.BTC.price + (Math.random() - 0.5) * 100 },
        ETH: { ...prev.ETH, price: prev.ETH.price + (Math.random() - 0.5) * 50 },
        ADA: { ...prev.ADA, price: prev.ADA.price + (Math.random() - 0.5) * 0.1 }
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getHealthScoreColor = (score) => {
    if (score >= 80) return theme.success;
    if (score >= 60) return theme.warning;
    return theme.error;
  };

  const getHealthScoreLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    return 'Needs Improvement';
  };

  return (
    <DashboardContainer>
      <DashboardGrid>
        {/* Financial Health Score */}
        <Card variant="success" theme={theme}>
          <CardHeader>
            <CardTitle>Financial Health Score</CardTitle>
            <CardIcon>🏥</CardIcon>
          </CardHeader>
          <HealthScoreContainer>
            <ScoreCircle score={userData.financialHealthScore} theme={theme}>
              <ScoreText>{userData.financialHealthScore}</ScoreText>
            </ScoreCircle>
            <ScoreLabel>{getHealthScoreLabel(userData.financialHealthScore)}</ScoreLabel>
          </HealthScoreContainer>
          <ProgressBar>
            <ProgressFill percentage={userData.financialHealthScore} theme={theme} />
          </ProgressBar>
        </Card>

        {/* Savings Overview */}
        <Card variant="savings" theme={theme}>
          <CardHeader>
            <CardTitle>Savings Overview</CardTitle>
            <CardIcon>💰</CardIcon>
          </CardHeader>
          <MetricGrid>
            <Metric theme={theme}>
              <MetricValue>{formatCurrency(userData.totalSavings)}</MetricValue>
              <MetricLabel>Total Savings</MetricLabel>
            </Metric>
            <Metric theme={theme}>
              <MetricValue>{formatCurrency(userData.monthlyIncome)}</MetricValue>
              <MetricLabel>Monthly Income</MetricLabel>
            </Metric>
            <Metric theme={theme}>
              <MetricValue>{formatCurrency(userData.monthlyExpenses)}</MetricValue>
              <MetricLabel>Monthly Expenses</MetricLabel>
            </Metric>
            <Metric theme={theme}>
              <MetricValue>{formatCurrency(userData.monthlyIncome - userData.monthlyExpenses)}</MetricValue>
              <MetricLabel>Net Savings</MetricLabel>
            </Metric>
          </MetricGrid>
        </Card>

        {/* Crypto Portfolio */}
        <Card variant="crypto" theme={theme}>
          <CardHeader>
            <CardTitle>Crypto Portfolio</CardTitle>
            <CardIcon>₿</CardIcon>
          </CardHeader>
          <CryptoList>
            {Object.entries(userData.cryptoPortfolio).map(([coin, data]) => (
              <CryptoItem key={coin} theme={theme}>
                <CryptoInfo>
                  <CryptoIcon>
                    {coin === 'BTC' ? '₿' : coin === 'ETH' ? 'Ξ' : '₳'}
                  </CryptoIcon>
                  <CryptoDetails>
                    <CryptoName>{coin}</CryptoName>
                    <CryptoAmount>{data.amount} {coin}</CryptoAmount>
                  </CryptoDetails>
                </CryptoInfo>
                <CryptoValue>
                  <CryptoPrice>{formatCurrency(data.value)}</CryptoPrice>
                  <CryptoChange change={cryptoPrices[coin]?.change || 0}>
                    {cryptoPrices[coin]?.change >= 0 ? '+' : ''}{cryptoPrices[coin]?.change?.toFixed(2)}%
                  </CryptoChange>
                </CryptoValue>
              </CryptoItem>
            ))}
          </CryptoList>
        </Card>

        {/* Quick Insights */}
        <Card variant="news" theme={theme}>
          <CardHeader>
            <CardTitle>Today's Insights</CardTitle>
            <CardIcon>💡</CardIcon>
          </CardHeader>
          <div style={{ lineHeight: '1.6' }}>
            <p>📈 <strong>Market Update:</strong> Sensex up 0.8% today</p>
            <p>💰 <strong>Savings Tip:</strong> Cut dining out by ₹2,000/month to save ₹24,000/year</p>
            <p>₿ <strong>Crypto Alert:</strong> Bitcoin showing bullish momentum</p>
            <p>🎯 <strong>Goal Progress:</strong> Emergency fund 75% complete</p>
          </div>
        </Card>
      </DashboardGrid>

      <QuickActionsGrid>
        <QuickActionButton variant="success" theme={theme}>
          💳 Add Expense
        </QuickActionButton>
        <QuickActionButton variant="crypto" theme={theme}>
          📈 Buy Crypto
        </QuickActionButton>
        <QuickActionButton variant="news" theme={theme}>
          📰 Read News
        </QuickActionButton>
        <QuickActionButton variant="warning" theme={theme}>
          ⚠️ Set Alerts
        </QuickActionButton>
      </QuickActionsGrid>
    </DashboardContainer>
  );
};

export default Dashboard;

