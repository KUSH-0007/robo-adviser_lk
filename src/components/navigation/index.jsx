import React from 'react';
import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
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

const NavigationContainer = styled.nav`
  background: ${({ theme }) => theme.cardBg};
  backdrop-filter: blur(20px);
  border-bottom: 1px solid ${({ theme }) => theme.border};
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 4px 20px ${({ theme }) => theme.shadow};
  animation: ${slideIn} 0.6s ease-out;
`;

const NavList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  list-style: none;
  margin: 0;
  padding: 0;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

const NavItem = styled.li`
  position: relative;
`;

const NavButton = styled.button`
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
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px ${({ theme }) => theme.shadow};
    background: ${({ active, theme }) => 
      active ? theme.gradient : `rgba(${active ? '102, 126, 234' : '102, 126, 234'}, 0.1)`};
  }
  
  &:active {
    transform: translateY(0);
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
  
  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background: ${({ theme }) => theme.error};
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  animation: ${pulse} 2s ease-in-out infinite;
`;

const QuickActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-left: auto;
  
  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 1rem;
    justify-content: center;
  }
`;

const ActionButton = styled.button`
  background: ${({ variant, theme }) => {
    switch (variant) {
      case 'success': return theme.success;
      case 'warning': return theme.warning;
      case 'crypto': return theme.crypto;
      default: return theme.gradient;
    }
  }};
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

const Navigation = ({ currentView, setCurrentView, theme }) => {
  const navItems = [
    { id: 'dashboard', label: '📊 Dashboard', icon: '📊' },
    { id: 'symbols', label: '📈 Market Symbols', icon: '📈' },
    { id: 'charts', label: '📊 Price Charts', icon: '📊' },
    { id: 'news', label: '📰 Finance News', icon: '📰', notifications: 3 },
    { id: 'crypto', label: '₿ Crypto Tracker', icon: '₿', notifications: 1 },
    { id: 'savings', label: '💰 Savings', icon: '💰' },
    { id: 'investment-form', label: '🎯 Portfolio Builder', icon: '🎯' },
    { id: 'community', label: '👥 Community', icon: '👥' },
    { id: 'ai-coach', label: '🤖 AI Coach', icon: '🤖' }
  ];

  return (
    <NavigationContainer theme={theme}>
      <NavList>
        {navItems.map((item) => (
          <NavItem key={item.id}>
            <NavButton
              active={currentView === item.id}
              onClick={() => setCurrentView(item.id)}
              theme={theme}
            >
              {item.icon} {item.label}
              {item.notifications && (
                <NotificationBadge theme={theme}>
                  {item.notifications}
                </NotificationBadge>
              )}
            </NavButton>
          </NavItem>
        ))}
        
        <QuickActions>
          <ActionButton variant="success" theme={theme}>
            💳 Add Expense
          </ActionButton>
          <ActionButton variant="crypto" theme={theme}>
            📈 Buy Crypto
          </ActionButton>
          <ActionButton variant="warning" theme={theme}>
            ⚠️ Alerts
          </ActionButton>
        </QuickActions>
      </NavList>
    </NavigationContainer>
  );
};

export default Navigation;
