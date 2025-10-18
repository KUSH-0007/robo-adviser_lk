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

const SavingsContainer = styled.div`
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  animation: ${fadeInUp} 0.8s ease-out;
`;

const SavingsHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const SavingsTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: ${({ theme }) => theme.text};
  margin-bottom: 1rem;
  background: ${({ theme }) => theme.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const SavingsSubtitle = styled.p`
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
  font-size: 1.1rem;
`;

const SavingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
`;

const SavingsCard = styled.div`
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

const CardTitle = styled.h3`
  color: ${({ theme }) => theme.text};
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const TipItem = styled.div`
  padding: 1rem;
  background: rgba(46, 204, 113, 0.1);
  border-radius: 12px;
  margin-bottom: 1rem;
  border-left: 4px solid ${({ theme }) => theme.savings};
`;

const TipText = styled.p`
  color: ${({ theme }) => theme.text};
  line-height: 1.6;
  margin: 0;
`;

const GoalCard = styled.div`
  padding: 1.5rem;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 15px;
  margin-bottom: 1rem;
  border-left: 4px solid ${({ theme }) => theme.primary};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateX(5px);
    background: rgba(102, 126, 234, 0.15);
  }
`;

const GoalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const GoalName = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  font-size: 1.1rem;
`;

const GoalAmount = styled.div`
  font-weight: 700;
  color: ${({ theme }) => theme.text};
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  overflow: hidden;
  margin: 0.5rem 0;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: ${({ theme }) => theme.gradient};
  width: ${({ percentage }) => percentage}%;
  border-radius: 4px;
  transition: width 1s ease;
`;

const ProgressText = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
`;

const SavingsAdvisor = ({ userData, theme }) => {
  const [goals] = useState([
    {
      id: 1,
      name: 'Emergency Fund',
      target: 100000,
      current: 75000,
      icon: '🛡️'
    },
    {
      id: 2,
      name: 'Vacation Fund',
      target: 50000,
      current: 15000,
      icon: '✈️'
    },
    {
      id: 3,
      name: 'Home Down Payment',
      target: 500000,
      current: 125000,
      icon: '🏠'
    }
  ]);

  const [tips] = useState([
    {
      id: 1,
      text: "Cut down eating out by ₹2,000 monthly to save ₹24,000 yearly",
      impact: "High Impact"
    },
    {
      id: 2,
      text: "Switch to public transport 3 days/week to save ₹1,500 monthly",
      impact: "Medium Impact"
    },
    {
      id: 3,
      text: "Cancel unused subscriptions to save ₹800 monthly",
      impact: "Low Impact"
    },
    {
      id: 4,
      text: "Start SIP in index funds for ₹5,000 monthly",
      impact: "High Impact"
    }
  ]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <SavingsContainer>
      <SavingsHeader>
        <SavingsTitle theme={theme}>💰 AI Savings Advisor</SavingsTitle>
        <SavingsSubtitle theme={theme}>
          Get personalized saving tips and track your financial goals
        </SavingsSubtitle>
      </SavingsHeader>

      <SavingsGrid>
        <SavingsCard theme={theme}>
          <CardTitle theme={theme}>
            🤖 AI-Powered Tips
          </CardTitle>
          {tips.map(tip => (
            <TipItem key={tip.id} theme={theme}>
              <TipText theme={theme}>
                <strong>{tip.impact}:</strong> {tip.text}
              </TipText>
            </TipItem>
          ))}
        </SavingsCard>

        <SavingsCard theme={theme}>
          <CardTitle theme={theme}>
            🎯 Savings Goals
          </CardTitle>
          {goals.map(goal => {
            const percentage = (goal.current / goal.target) * 100;
            return (
              <GoalCard key={goal.id} theme={theme}>
                <GoalHeader>
                  <GoalName theme={theme}>
                    {goal.icon} {goal.name}
                  </GoalName>
                  <GoalAmount theme={theme}>
                    {formatCurrency(goal.current)} / {formatCurrency(goal.target)}
                  </GoalAmount>
                </GoalHeader>
                <ProgressBar>
                  <ProgressFill percentage={percentage} theme={theme} />
                </ProgressBar>
                <ProgressText theme={theme}>
                  {percentage.toFixed(1)}% complete
                </ProgressText>
              </GoalCard>
            );
          })}
        </SavingsCard>
      </SavingsGrid>
    </SavingsContainer>
  );
};

export default SavingsAdvisor;

