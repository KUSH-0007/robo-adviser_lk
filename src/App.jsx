import { useState, useEffect } from 'react'
import styled, { ThemeProvider, createGlobalStyle, keyframes } from 'styled-components'
import './App.css'
import InvestmentForm from './components/investmentForm'
import PortfolioResult from './components/portfolioResult'
import Loader from './components/loader'
import Dashboard from './components/dashboard'
import NewsSection from './components/newsSection'
import CryptoTracker from './components/cryptoTracker'
import SavingsAdvisor from './components/savingsAdvisor'
import CommunitySection from './components/communitySection'
import AICoach from './components/aiCoach'
import Navigation from './components/navigation'
import ProfessionalSymbols from './components/professionalSymbols'
import PriceCharts from './components/priceCharts'

// Animations
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

// Theme configuration
const lightTheme = {
  body: '#f8fafc',
  text: '#2d3748',
  primary: '#667eea',
  secondary: '#764ba2',
  background: '#ffffff',
  cardBg: 'rgba(255, 255, 255, 0.95)',
  border: 'rgba(255, 255, 255, 0.2)',
  shadow: 'rgba(0, 0, 0, 0.1)',
  gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  success: '#27ae60',
  warning: '#f39c12',
  error: '#e74c3c',
  crypto: '#f7931a',
  news: '#3498db',
  savings: '#2ecc71'
}

const darkTheme = {
  body: '#1a202c',
  text: '#e2e8f0',
  primary: '#667eea',
  secondary: '#764ba2',
  background: '#2d3748',
  cardBg: 'rgba(45, 55, 72, 0.95)',
  border: 'rgba(255, 255, 255, 0.1)',
  shadow: 'rgba(0, 0, 0, 0.3)',
  gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  success: '#27ae60',
  warning: '#f39c12',
  error: '#e74c3c',
  crypto: '#f7931a',
  news: '#3498db',
  savings: '#2ecc71'
}

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.3s ease;
    margin: 0;
    padding: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  }
  
  * {
    box-sizing: border-box;
  }
`

const AppContainer = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.body};
  transition: all 0.3s ease;
`

const Header = styled.header`
  background: ${({ theme }) => theme.gradient};
  color: white;
  padding: 1rem 2rem;
  text-align: center;
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
`

const HeaderContent = styled.div`
  position: relative;
  z-index: 1;
`

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
`

const Subtitle = styled.p`
  font-size: 1.2rem;
  opacity: 0.9;
  font-weight: 400;
`

const ThemeToggle = styled.button`
  position: absolute;
  top: 1rem;
  right: 2rem;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
`

const MainContent = styled.main`
  width: 100%;
  min-height: calc(100vh - 200px);
`

function App() {
  const [portfolioData, setPortfolioData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [currentView, setCurrentView] = useState('dashboard')
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage for saved preference
    const saved = localStorage.getItem('darkMode')
    return saved ? JSON.parse(saved) : false
  })
  const [userData, setUserData] = useState({
    financialHealthScore: 75,
    totalSavings: 25000,
    monthlyIncome: 50000,
    monthlyExpenses: 35000,
    cryptoPortfolio: {
      BTC: { amount: 0.5, value: 15000 },
      ETH: { amount: 2.0, value: 8000 },
      ADA: { amount: 1000, value: 2000 }
    }
  })

  const theme = isDarkMode ? darkTheme : lightTheme

  // Save dark mode preference to localStorage
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode))
  }, [isDarkMode])

  const handleFormSubmit = async (formData) => {
    setLoading(true)
    
    // Simulate API call delay
    setTimeout(() => {
      // Mock portfolio data based on form inputs
      const mockPortfolio = {
        risk: formData.risk,
        investment_term: formData.investment_term,
        initial_amount: parseFloat(formData.initial_amount),
        monthly_contribution: parseFloat(formData.monthly_contribution),
        portfolio: {
          stocks: formData.risk === 'conservative' ? 30 : formData.risk === 'moderate' ? 60 : 80,
          bonds: formData.risk === 'conservative' ? 50 : formData.risk === 'moderate' ? 30 : 10,
          cash: formData.risk === 'conservative' ? 20 : formData.risk === 'moderate' ? 10 : 10
        },
        expected_return: formData.risk === 'conservative' ? 4.5 : formData.risk === 'moderate' ? 7.2 : 9.8,
        projected_value: calculateProjectedValue(formData)
      }
      
      setPortfolioData(mockPortfolio)
      setLoading(false)
      setCurrentView('portfolio')
    }, 2000)
  }

  const calculateProjectedValue = (formData) => {
    const initial = parseFloat(formData.initial_amount)
    const monthly = parseFloat(formData.monthly_contribution)
    const years = formData.investment_term === 'short' ? 3 : formData.investment_term === 'medium' ? 7 : 15
    const rate = formData.risk === 'conservative' ? 0.045 : formData.risk === 'moderate' ? 0.072 : 0.098
    
    // Simple compound interest calculation
    let futureValue = initial * Math.pow(1 + rate, years)
    for (let i = 1; i <= years * 12; i++) {
      futureValue += monthly * Math.pow(1 + rate, (years * 12 - i) / 12)
    }
    
    return Math.round(futureValue)
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard userData={userData} theme={theme} setCurrentView={setCurrentView} />
      case 'portfolio':
        return <PortfolioResult portfolioData={portfolioData} onReset={() => setCurrentView('dashboard')} />
      case 'news':
        return <NewsSection theme={theme} setCurrentView={setCurrentView} />
      case 'crypto':
        return <CryptoTracker userData={userData} theme={theme} setCurrentView={setCurrentView} />
      case 'savings':
        return <SavingsAdvisor userData={userData} theme={theme} setCurrentView={setCurrentView} />
      case 'community':
        return <CommunitySection theme={theme} setCurrentView={setCurrentView} />
      case 'ai-coach':
        return <AICoach theme={theme} setCurrentView={setCurrentView} />
      case 'investment-form':
        return <InvestmentForm onSubmit={handleFormSubmit} />
      case 'symbols':
        return <ProfessionalSymbols theme={theme} setCurrentView={setCurrentView} />
      case 'charts':
        return <PriceCharts theme={theme} setCurrentView={setCurrentView} />
      default:
        return <Dashboard userData={userData} theme={theme} setCurrentView={setCurrentView} />
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppContainer>
        <Header>
          <ThemeToggle onClick={() => setIsDarkMode(!isDarkMode)}>
            {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </ThemeToggle>
          <HeaderContent>
            <Title>🤖 Smart Finance Hub</Title>
            <Subtitle>Your AI-powered personal finance companion</Subtitle>
          </HeaderContent>
        </Header>
        
        <Navigation 
          currentView={currentView} 
          setCurrentView={setCurrentView}
          theme={theme}
        />
        
        <MainContent>
          {loading && <Loader />}
          {!loading && renderCurrentView()}
        </MainContent>
      </AppContainer>
    </ThemeProvider>
  )
}

export default App
