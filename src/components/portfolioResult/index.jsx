import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

// Advanced Animations
const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  25% { transform: translateY(-10px) rotate(1deg); }
  50% { transform: translateY(-5px) rotate(-1deg); }
  75% { transform: translateY(-15px) rotate(1deg); }
`;

const slideInFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(100px) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
`;

const slideInFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-100px) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
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

const rotate3D = keyframes`
  0% { transform: rotateY(0deg) rotateX(0deg); }
  25% { transform: rotateY(5deg) rotateX(2deg); }
  50% { transform: rotateY(0deg) rotateX(0deg); }
  75% { transform: rotateY(-5deg) rotateX(-2deg); }
  100% { transform: rotateY(0deg) rotateX(0deg); }
`;

const bounceIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.3) translateY(-100px);
  }
  50% {
    opacity: 1;
    transform: scale(1.05) translateY(0);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
`;

// Styled Components
const ResultContainer = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  padding: 2rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    animation: ${float} 20s ease-in-out infinite;
  }
`;

const MainCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 30px;
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(255, 255, 255, 0.2);
  padding: 3rem;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  animation: ${bounceIn} 1s ease-out;
  transform-style: preserve-3d;
  perspective: 1000px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    animation: ${shimmer} 3s infinite;
  }
`;

const ResultHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  animation: ${fadeInUp} 0.8s ease-out 0.2s both;
`;

const ResultTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  animation: ${pulse} 3s ease-in-out infinite;
`;

const ResultSubtitle = styled.p`
  color: #718096;
  font-size: 1.3rem;
  font-weight: 500;
  margin: 0;
  opacity: 0.9;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
  animation: ${fadeInUp} 0.8s ease-out 0.4s both;
`;

const StatCard = styled.div`
  background: linear-gradient(135deg, ${props => props.gradient || '#667eea 0%, #764ba2 100%'});
  color: white;
  padding: 2rem;
  border-radius: 20px;
  text-align: center;
  position: relative;
  overflow: hidden;
  transform-style: preserve-3d;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-10px) rotateY(5deg);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
    transform: rotate(45deg);
    transition: all 0.3s ease;
  }
  
  &:hover::before {
    transform: rotate(45deg) scale(1.2);
  }
`;

const StatIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  animation: ${float} 3s ease-in-out infinite;
`;

const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const StatLabel = styled.div`
  font-size: 1rem;
  font-weight: 600;
  opacity: 0.9;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const PortfolioGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PortfolioSection = styled.div`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  animation: ${props => props.side === 'left' ? slideInFromLeft : slideInFromRight} 0.8s ease-out ${props => props.delay}s both;
  transform-style: preserve-3d;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px) rotateY(2deg);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
`;

const SectionTitle = styled.h3`
  color: #2d3748;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ChartContainer = styled.div`
  position: relative;
  margin: 2rem 0;
`;

const ChartBar = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  position: relative;
`;

const ChartLabel = styled.span`
  width: 100px;
  font-weight: 600;
  color: #2d3748;
  font-size: 1rem;
`;

const ChartBarContainer = styled.div`
  flex: 1;
  height: 25px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  margin: 0 1rem;
  overflow: hidden;
  position: relative;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ChartBarFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, ${props => props.color}, ${props => props.color}dd);
  width: 0%;
  border-radius: 15px;
  transition: width 2s ease-out;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    animation: ${shimmer} 2s infinite;
  }
`;

const ChartPercentage = styled.span`
  font-weight: 700;
  color: #2d3748;
  min-width: 50px;
  font-size: 1.1rem;
  text-align: right;
`;

const StrategyList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StrategyItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 12px;
  border-left: 4px solid #667eea;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(102, 126, 234, 0.15);
    transform: translateX(5px);
  }
`;

const StrategyLabel = styled.span`
  font-weight: 600;
  color: #2d3748;
`;

const StrategyValue = styled.span`
  font-weight: 700;
  color: #667eea;
  background: rgba(102, 126, 234, 0.1);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.9rem;
`;

const ButtonContainer = styled.div`
  text-align: center;
  margin-top: 3rem;
  animation: ${fadeInUp} 0.8s ease-out 1s both;
`;

const ActionButton = styled.button`
  background: linear-gradient(135deg, ${props => props.variant === 'secondary' ? '#95a5a6 0%, #7f8c8d 100%' : '#667eea 0%, #764ba2 100%'});
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0.75rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  transform-style: preserve-3d;
  
  &:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  }
  
  &:active {
    transform: translateY(-1px) scale(1.02);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }
  
  &:hover::before {
    left: 100%;
  }
`;

const PortfolioResult = ({ portfolioData, onReset }) => {
  const [animatedValues, setAnimatedValues] = useState({
    stocks: 0,
    bonds: 0,
    cash: 0
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValues({
        stocks: portfolioData.portfolio.stocks,
        bonds: portfolioData.portfolio.bonds,
        cash: portfolioData.portfolio.cash
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [portfolioData]);

  const getColorForAsset = (asset) => {
    switch (asset) {
      case 'stocks': return '#e74c3c';
      case 'bonds': return '#3498db';
      case 'cash': return '#27ae60';
      default: return '#95a5a6';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getGradientForStat = (index) => {
    const gradients = [
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    ];
    return gradients[index % gradients.length];
  };

  return (
    <ResultContainer>
      <MainCard>
        <ResultHeader>
          <ResultTitle>🚀 Your AI-Generated Portfolio</ResultTitle>
          <ResultSubtitle>
            Personalized investment strategy based on your {portfolioData.risk} risk profile and {portfolioData.investment_term} term objectives
          </ResultSubtitle>
        </ResultHeader>

        <StatsGrid>
          <StatCard gradient={getGradientForStat(0)}>
            <StatIcon>💰</StatIcon>
            <StatValue>{formatCurrency(portfolioData.initial_amount)}</StatValue>
            <StatLabel>Initial Investment</StatLabel>
          </StatCard>
          <StatCard gradient={getGradientForStat(1)}>
            <StatIcon>📈</StatIcon>
            <StatValue>{formatCurrency(portfolioData.monthly_contribution)}</StatValue>
            <StatLabel>Monthly Contribution</StatLabel>
          </StatCard>
          <StatCard gradient={getGradientForStat(2)}>
            <StatIcon>🎯</StatIcon>
            <StatValue>{portfolioData.expected_return}%</StatValue>
            <StatLabel>Expected Annual Return</StatLabel>
          </StatCard>
          <StatCard gradient={getGradientForStat(3)}>
            <StatIcon>🏆</StatIcon>
            <StatValue>{formatCurrency(portfolioData.projected_value)}</StatValue>
            <StatLabel>Projected Value</StatLabel>
          </StatCard>
        </StatsGrid>

        <PortfolioGrid>
          <PortfolioSection side="left" delay={0.6}>
            <SectionTitle>
              📊 Asset Allocation
              <span style={{ fontSize: '1rem', opacity: 0.7 }}> (Optimized by AI)</span>
            </SectionTitle>
            <ChartContainer>
              <ChartBar>
                <ChartLabel>Stocks</ChartLabel>
                <ChartBarContainer>
                  <ChartBarFill 
                    color={getColorForAsset('stocks')} 
                    percentage={animatedValues.stocks} 
                    style={{ width: `${animatedValues.stocks}%` }}
                  />
                </ChartBarContainer>
                <ChartPercentage>{portfolioData.portfolio.stocks}%</ChartPercentage>
              </ChartBar>
              <ChartBar>
                <ChartLabel>Bonds</ChartLabel>
                <ChartBarContainer>
                  <ChartBarFill 
                    color={getColorForAsset('bonds')} 
                    percentage={animatedValues.bonds} 
                    style={{ width: `${animatedValues.bonds}%` }}
                  />
                </ChartBarContainer>
                <ChartPercentage>{portfolioData.portfolio.bonds}%</ChartPercentage>
              </ChartBar>
              <ChartBar>
                <ChartLabel>Cash</ChartLabel>
                <ChartBarContainer>
                  <ChartBarFill 
                    color={getColorForAsset('cash')} 
                    percentage={animatedValues.cash} 
                    style={{ width: `${animatedValues.cash}%` }}
                  />
                </ChartBarContainer>
                <ChartPercentage>{portfolioData.portfolio.cash}%</ChartPercentage>
              </ChartBar>
            </ChartContainer>
          </PortfolioSection>

          <PortfolioSection side="right" delay={0.8}>
            <SectionTitle>
              💡 Investment Strategy
              <span style={{ fontSize: '1rem', opacity: 0.7 }}> (AI-Powered)</span>
            </SectionTitle>
            <StrategyList>
              <StrategyItem>
                <StrategyLabel>Risk Level</StrategyLabel>
                <StrategyValue>{portfolioData.risk.charAt(0).toUpperCase() + portfolioData.risk.slice(1)}</StrategyValue>
              </StrategyItem>
              <StrategyItem>
                <StrategyLabel>Investment Horizon</StrategyLabel>
                <StrategyValue>
                  {portfolioData.investment_term === 'short' ? '1-3 years' : 
                   portfolioData.investment_term === 'medium' ? '3-10 years' : '10+ years'}
                </StrategyValue>
              </StrategyItem>
              <StrategyItem>
                <StrategyLabel>Rebalancing</StrategyLabel>
                <StrategyValue>Quarterly</StrategyValue>
              </StrategyItem>
              <StrategyItem>
                <StrategyLabel>Management Fee</StrategyLabel>
                <StrategyValue>0.25% annually</StrategyValue>
              </StrategyItem>
              <StrategyItem>
                <StrategyLabel>AI Monitoring</StrategyLabel>
                <StrategyValue>24/7</StrategyValue>
              </StrategyItem>
            </StrategyList>
          </PortfolioSection>
        </PortfolioGrid>

        <ButtonContainer>
          <ActionButton onClick={() => window.print()}>
            📄 Print Portfolio Report
          </ActionButton>
          <ActionButton variant="secondary" onClick={onReset}>
            🔄 Create New Portfolio
          </ActionButton>
        </ButtonContainer>
      </MainCard>
    </ResultContainer>
  );
};

export default PortfolioResult;
