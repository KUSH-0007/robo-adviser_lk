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

const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const ChartsContainer = styled.div`
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  animation: ${fadeInUp} 0.8s ease-out;
`;

const ChartsHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const ChartsTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: ${({ theme }) => theme.text};
  margin-bottom: 1rem;
  background: ${({ theme }) => theme.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const ChartsSubtitle = styled.p`
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
  font-size: 1.1rem;
`;

const ChartSelector = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const ChartButton = styled.button`
  background: ${({ active, theme }) => 
    active ? theme.gradient : 'transparent'};
  color: ${({ active, theme }) => 
    active ? 'white' : theme.text};
  border: 1px solid ${({ active, theme }) => 
    active ? 'transparent' : theme.border};
  padding: 1rem 2rem;
  border-radius: 15px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px ${({ theme }) => theme.shadow};
  }
`;

const ChartCard = styled.div`
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

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const ChartTitle = styled.h2`
  color: ${({ theme }) => theme.text};
  font-size: 1.5rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ChartIcon = styled.div`
  font-size: 2rem;
  animation: ${float} 3s ease-in-out infinite;
`;

const ChartStats = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  color: ${({ theme, positive }) => 
    positive ? theme.success : theme.error};
  font-size: 1.2rem;
  font-weight: 700;
`;

const StatLabel = styled.div`
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
  font-size: 0.9rem;
`;

const ChartCanvas = styled.div`
  height: 400px;
  background: ${({ theme }) => theme.bg};
  border-radius: 15px;
  position: relative;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.border};
`;

const ChartLine = styled.div`
  position: absolute;
  height: 2px;
  background: ${({ theme, positive }) => 
    positive ? theme.success : theme.error};
  border-radius: 1px;
  transition: all 0.3s ease;
`;

const ChartPoint = styled.div`
  position: absolute;
  width: 8px;
  height: 8px;
  background: ${({ theme, positive }) => 
    positive ? theme.success : theme.error};
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.bg};
  transform: translate(-50%, -50%);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translate(-50%, -50%) scale(1.5);
    box-shadow: 0 0 10px ${({ theme, positive }) => 
      positive ? theme.success : theme.error};
  }
`;

const ChartTooltip = styled.div`
  position: absolute;
  background: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 10px;
  padding: 0.75rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text};
  box-shadow: 0 5px 15px ${({ theme }) => theme.shadow};
  z-index: 10;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
  
  &.visible {
    opacity: 1;
  }
`;

const TimeframeSelector = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const TimeframeButton = styled.button`
  background: ${({ active, theme }) => 
    active ? theme.gradient : 'transparent'};
  color: ${({ active, theme }) => 
    active ? 'white' : theme.text};
  border: 1px solid ${({ active, theme }) => 
    active ? 'transparent' : theme.border};
  padding: 0.5rem 1rem;
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-1px);
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;
`;

const ActionButton = styled.button`
  background: ${({ theme, variant }) => 
    variant === 'primary' ? theme.gradient : 'transparent'};
  color: ${({ theme, variant }) => 
    variant === 'primary' ? 'white' : theme.text};
  border: 1px solid ${({ theme, variant }) => 
    variant === 'primary' ? 'transparent' : theme.border};
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px ${({ theme }) => theme.shadow};
  }
`;

const PriceCharts = ({ theme, setCurrentView }) => {
  const [selectedChart, setSelectedChart] = useState('bitcoin');
  const [timeframe, setTimeframe] = useState('5Y');
  const [hoveredPoint, setHoveredPoint] = useState(null);

  // Historical data for 10-15 years
  const historicalData = {
    bitcoin: {
      icon: '₿',
      name: 'Bitcoin (BTC)',
      currentPrice: 45000,
      change: '+2.5%',
      positive: true,
      data: [
        { year: 2010, price: 0.08 },
        { year: 2011, price: 4.72 },
        { year: 2012, price: 13.51 },
        { year: 2013, price: 817.12 },
        { year: 2014, price: 310.00 },
        { year: 2015, price: 314.00 },
        { year: 2016, price: 963.74 },
        { year: 2017, price: 14156.40 },
        { year: 2018, price: 3869.47 },
        { year: 2019, price: 7194.89 },
        { year: 2020, price: 29374.15 },
        { year: 2021, price: 47686.81 },
        { year: 2022, price: 38500.00 },
        { year: 2023, price: 42000.00 },
        { year: 2024, price: 45000.00 }
      ]
    },
    reliance: {
      icon: '📈',
      name: 'Reliance Industries',
      currentPrice: 2450,
      change: '+1.87%',
      positive: true,
      data: [
        { year: 2010, price: 850 },
        { year: 2011, price: 720 },
        { year: 2012, price: 780 },
        { year: 2013, price: 920 },
        { year: 2014, price: 980 },
        { year: 2015, price: 1050 },
        { year: 2016, price: 1150 },
        { year: 2017, price: 1350 },
        { year: 2018, price: 1250 },
        { year: 2019, price: 1450 },
        { year: 2020, price: 1800 },
        { year: 2021, price: 2200 },
        { year: 2022, price: 2100 },
        { year: 2023, price: 2300 },
        { year: 2024, price: 2450 }
      ]
    },
    tcs: {
      icon: '💼',
      name: 'TCS',
      currentPrice: 3850,
      change: '+1.72%',
      positive: true,
      data: [
        { year: 2010, price: 850 },
        { year: 2011, price: 1100 },
        { year: 2012, price: 1250 },
        { year: 2013, price: 1400 },
        { year: 2014, price: 1600 },
        { year: 2015, price: 1750 },
        { year: 2016, price: 1900 },
        { year: 2017, price: 2200 },
        { year: 2018, price: 2100 },
        { year: 2019, price: 2400 },
        { year: 2020, price: 2800 },
        { year: 2021, price: 3200 },
        { year: 2022, price: 3100 },
        { year: 2023, price: 3500 },
        { year: 2024, price: 3850 }
      ]
    },
    hdfc: {
      icon: '🏦',
      name: 'HDFC Bank',
      currentPrice: 1650,
      change: '+1.54%',
      positive: true,
      data: [
        { year: 2010, price: 450 },
        { year: 2011, price: 480 },
        { year: 2012, price: 520 },
        { year: 2013, price: 580 },
        { year: 2014, price: 650 },
        { year: 2015, price: 720 },
        { year: 2016, price: 800 },
        { year: 2017, price: 950 },
        { year: 2018, price: 1100 },
        { year: 2019, price: 1250 },
        { year: 2020, price: 1400 },
        { year: 2021, price: 1550 },
        { year: 2022, price: 1500 },
        { year: 2023, price: 1600 },
        { year: 2024, price: 1650 }
      ]
    },
    sensex: {
      icon: '📊',
      name: 'SENSEX',
      currentPrice: 65432,
      change: '+0.8%',
      positive: true,
      data: [
        { year: 2010, price: 20509 },
        { year: 2011, price: 15454 },
        { year: 2012, price: 19426 },
        { year: 2013, price: 21170 },
        { year: 2014, price: 27499 },
        { year: 2015, price: 26117 },
        { year: 2016, price: 26626 },
        { year: 2017, price: 34056 },
        { year: 2018, price: 36068 },
        { year: 2019, price: 41253 },
        { year: 2020, price: 47851 },
        { year: 2021, price: 58253 },
        { year: 2022, price: 61275 },
        { year: 2023, price: 63432 },
        { year: 2024, price: 65432 }
      ]
    }
  };

  const getFilteredData = (data, timeframe) => {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - parseInt(timeframe.replace('Y', ''));
    return data.filter(item => item.year >= startYear);
  };

  const renderChart = (data, positive) => {
    const filteredData = getFilteredData(data, timeframe);
    const maxPrice = Math.max(...filteredData.map(d => d.price));
    const minPrice = Math.min(...filteredData.map(d => d.price));
    const priceRange = maxPrice - minPrice;
    
    const points = filteredData.map((point, index) => {
      const x = (index / (filteredData.length - 1)) * 100;
      const y = 100 - ((point.price - minPrice) / priceRange) * 100;
      return { x, y, ...point };
    });

    return (
      <ChartCanvas theme={theme}>
        {points.map((point, index) => (
          <React.Fragment key={point.year}>
            {index > 0 && (
              <ChartLine
                theme={theme}
                positive={positive}
                style={{
                  left: `${points[index - 1].x}%`,
                  top: `${points[index - 1].y}%`,
                  width: `${point.x - points[index - 1].x}%`,
                  transform: `rotate(${Math.atan2(
                    point.y - points[index - 1].y,
                    point.x - points[index - 1].x
                  ) * 180 / Math.PI}deg)`,
                  transformOrigin: 'left center'
                }}
              />
            )}
            <ChartPoint
              theme={theme}
              positive={positive}
              style={{
                left: `${point.x}%`,
                top: `${point.y}%`
              }}
              onMouseEnter={() => setHoveredPoint(point)}
              onMouseLeave={() => setHoveredPoint(null)}
            />
          </React.Fragment>
        ))}
        
        {hoveredPoint && (
          <ChartTooltip
            theme={theme}
            className="visible"
            style={{
              left: `${hoveredPoint.x}%`,
              top: `${hoveredPoint.y - 10}%`,
              transform: 'translateX(-50%)'
            }}
          >
            <div><strong>{hoveredPoint.year}</strong></div>
            <div>₹{hoveredPoint.price.toLocaleString()}</div>
          </ChartTooltip>
        )}
      </ChartCanvas>
    );
  };

  const handleBuyClick = (symbol) => {
    const buyUrls = {
      bitcoin: 'https://www.binance.com/en/buy-sell-crypto?fiat=USD&crypto=BTC',
      reliance: 'https://www.binance.com/en/stock-token',
      tcs: 'https://www.binance.com/en/stock-token',
      hdfc: 'https://www.binance.com/en/stock-token',
      sensex: 'https://www.moneycontrol.com/india/stockpricequote/'
    };
    window.open(buyUrls[symbol], '_blank');
  };

  const currentData = historicalData[selectedChart];

  return (
    <ChartsContainer>
      <ChartsHeader>
        <ChartsTitle theme={theme}>📈 Historical Price Charts</ChartsTitle>
        <ChartsSubtitle theme={theme}>
          10-15 years of historical data with interactive charts
        </ChartsSubtitle>
      </ChartsHeader>

      <ChartSelector>
        <ChartButton
          active={selectedChart === 'bitcoin'}
          onClick={() => setSelectedChart('bitcoin')}
          theme={theme}
        >
          ₿ Bitcoin
        </ChartButton>
        <ChartButton
          active={selectedChart === 'reliance'}
          onClick={() => setSelectedChart('reliance')}
          theme={theme}
        >
          📈 Reliance
        </ChartButton>
        <ChartButton
          active={selectedChart === 'tcs'}
          onClick={() => setSelectedChart('tcs')}
          theme={theme}
        >
          💼 TCS
        </ChartButton>
        <ChartButton
          active={selectedChart === 'hdfc'}
          onClick={() => setSelectedChart('hdfc')}
          theme={theme}
        >
          🏦 HDFC Bank
        </ChartButton>
        <ChartButton
          active={selectedChart === 'sensex'}
          onClick={() => setSelectedChart('sensex')}
          theme={theme}
        >
          📊 SENSEX
        </ChartButton>
      </ChartSelector>

      <ChartCard theme={theme}>
        <ChartHeader>
          <ChartTitle theme={theme}>
            <ChartIcon>{currentData.icon}</ChartIcon>
            {currentData.name}
          </ChartTitle>
          <ChartStats>
            <StatItem>
              <StatValue theme={theme} positive={currentData.positive}>
                ₹{currentData.currentPrice.toLocaleString()}
              </StatValue>
              <StatLabel theme={theme}>Current Price</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue theme={theme} positive={currentData.positive}>
                {currentData.change}
              </StatValue>
              <StatLabel theme={theme}>24h Change</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue theme={theme}>
                {timeframe}
              </StatValue>
              <StatLabel theme={theme}>Timeframe</StatLabel>
            </StatItem>
          </ChartStats>
        </ChartHeader>

        <TimeframeSelector>
          <TimeframeButton
            active={timeframe === '1Y'}
            onClick={() => setTimeframe('1Y')}
            theme={theme}
          >
            1Y
          </TimeframeButton>
          <TimeframeButton
            active={timeframe === '3Y'}
            onClick={() => setTimeframe('3Y')}
            theme={theme}
          >
            3Y
          </TimeframeButton>
          <TimeframeButton
            active={timeframe === '5Y'}
            onClick={() => setTimeframe('5Y')}
            theme={theme}
          >
            5Y
          </TimeframeButton>
          <TimeframeButton
            active={timeframe === '10Y'}
            onClick={() => setTimeframe('10Y')}
            theme={theme}
          >
            10Y
          </TimeframeButton>
          <TimeframeButton
            active={timeframe === '15Y'}
            onClick={() => setTimeframe('15Y')}
            theme={theme}
          >
            15Y
          </TimeframeButton>
        </TimeframeSelector>

        {renderChart(currentData.data, currentData.positive)}

        <ActionButtons>
          <ActionButton
            theme={theme}
            variant="primary"
            onClick={() => handleBuyClick(selectedChart)}
          >
            💰 Buy on Binance
          </ActionButton>
          <ActionButton
            theme={theme}
            onClick={() => setCurrentView('portfolio')}
          >
            📊 View Portfolio
          </ActionButton>
          <ActionButton
            theme={theme}
            onClick={() => setCurrentView('news')}
          >
            📰 Market News
          </ActionButton>
        </ActionButtons>
      </ChartCard>
    </ChartsContainer>
  );
};

export default PriceCharts;


