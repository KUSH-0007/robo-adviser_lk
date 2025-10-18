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

const AICoachContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  animation: ${fadeInUp} 0.8s ease-out;
`;

const CoachHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const CoachTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: ${({ theme }) => theme.text};
  margin-bottom: 1rem;
  background: ${({ theme }) => theme.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const CoachSubtitle = styled.p`
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
  font-size: 1.1rem;
`;

const ChatContainer = styled.div`
  background: ${({ theme }) => theme.cardBg};
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: 0 10px 30px ${({ theme }) => theme.shadow};
  height: 500px;
  display: flex;
  flex-direction: column;
`;

const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

const AIIcon = styled.div`
  font-size: 2rem;
  animation: ${pulse} 2s ease-in-out infinite;
`;

const AIInfo = styled.div``;

const AIName = styled.div`
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  font-size: 1.2rem;
`;

const AIStatus = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
`;

const ChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-bottom: 1rem;
  padding-right: 0.5rem;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.primary};
    border-radius: 3px;
  }
`;

const Message = styled.div`
  margin-bottom: 1rem;
  display: flex;
  justify-content: ${({ isAI }) => isAI ? 'flex-start' : 'flex-end'};
`;

const MessageBubble = styled.div`
  max-width: 70%;
  padding: 1rem;
  border-radius: 15px;
  background: ${({ isAI, theme }) => 
    isAI ? 'rgba(102, 126, 234, 0.1)' : theme.gradient};
  color: ${({ isAI, theme }) => 
    isAI ? theme.text : 'white'};
  border-left: ${({ isAI, theme }) => 
    isAI ? `4px solid ${theme.primary}` : 'none'};
`;

const MessageText = styled.p`
  margin: 0;
  line-height: 1.5;
`;

const MessageTime = styled.div`
  font-size: 0.8rem;
  opacity: 0.7;
  margin-top: 0.5rem;
`;

const ChatInput = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-end;
`;

const InputField = styled.input`
  flex: 1;
  padding: 1rem;
  border: 2px solid ${({ theme }) => theme.border};
  border-radius: 25px;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.text};
    opacity: 0.5;
  }
`;

const SendButton = styled.button`
  background: ${({ theme }) => theme.gradient};
  color: white;
  border: none;
  padding: 1rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const QuickQuestions = styled.div`
  margin-top: 2rem;
`;

const QuickQuestionsTitle = styled.h3`
  color: ${({ theme }) => theme.text};
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const QuickButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const QuickButton = styled.button`
  background: rgba(102, 126, 234, 0.1);
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(102, 126, 234, 0.2);
    transform: translateY(-2px);
  }
`;

const AICoach = ({ theme }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI Finance Coach. I can help explain financial terms, provide investment advice, and answer your money questions. What would you like to know?",
      isAI: true,
      time: new Date().toLocaleTimeString()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickQuestions = [
    "What is SIP?",
    "Explain mutual funds",
    "How to start investing?",
    "What is compound interest?",
    "Best savings strategies",
    "Crypto investment tips"
  ];

  const aiResponses = {
    "sip": "SIP stands for Systematic Investment Plan. It's a way to invest a fixed amount regularly (like monthly) in mutual funds. Think of it as a recurring deposit for investments. Benefits: 1) Rupee cost averaging 2) Disciplined investing 3) Power of compounding 4) Small amounts can grow big over time.",
    "mutual funds": "Mutual funds pool money from many investors to buy stocks, bonds, or other assets. Think of it as a basket of investments managed by professionals. Types: 1) Equity funds (stocks) 2) Debt funds (bonds) 3) Hybrid funds (mix) 4) Index funds (track market). Perfect for beginners!",
    "investing": "Start investing with these steps: 1) Build emergency fund first 2) Start with SIP in index funds 3) Diversify across asset classes 4) Invest for long term (5+ years) 5) Don't invest money you'll need soon. Remember: Start small, stay consistent!",
    "compound interest": "Compound interest is when your money earns interest on both the principal and accumulated interest. Example: ₹10,000 at 10% becomes ₹11,000 in year 1, ₹12,100 in year 2. The longer you invest, the more powerful it becomes. Time is your best friend in investing!",
    "savings": "Top savings strategies: 1) 50/30/20 rule (50% needs, 30% wants, 20% savings) 2) Automate savings 3) Cut unnecessary expenses 4) Use high-yield savings accounts 5) Set specific goals 6) Track your spending 7) Increase income through side hustles",
    "crypto": "Crypto investment tips: 1) Only invest what you can afford to lose 2) Diversify across major cryptocurrencies 3) Use DCA (Dollar Cost Averaging) 4) Research before investing 5) Keep most in established coins (Bitcoin, Ethereum) 6) Consider it high-risk, high-reward"
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      isAI: false,
      time: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const lowerInput = inputValue.toLowerCase();
      let response = "I'm here to help with your financial questions! Could you please rephrase or ask something more specific about investing, saving, or financial planning?";

      for (const [key, value] of Object.entries(aiResponses)) {
        if (lowerInput.includes(key)) {
          response = value;
          break;
        }
      }

      const aiMessage = {
        id: messages.length + 2,
        text: response,
        isAI: true,
        time: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickQuestion = (question) => {
    setInputValue(question);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <AICoachContainer>
      <CoachHeader>
        <CoachTitle theme={theme}>🤖 AI Finance Coach</CoachTitle>
        <CoachSubtitle theme={theme}>
          Get personalized financial advice and learn about investing in simple terms
        </CoachSubtitle>
      </CoachHeader>

      <ChatContainer theme={theme}>
        <ChatHeader theme={theme}>
          <AIIcon>🤖</AIIcon>
          <AIInfo>
            <AIName theme={theme}>Finance Coach AI</AIName>
            <AIStatus theme={theme}>
              {isTyping ? 'Typing...' : 'Online'}
            </AIStatus>
          </AIInfo>
        </ChatHeader>

        <ChatMessages theme={theme}>
          {messages.map(message => (
            <Message key={message.id} isAI={message.isAI}>
              <MessageBubble isAI={message.isAI} theme={theme}>
                <MessageText>{message.text}</MessageText>
                <MessageTime theme={theme}>{message.time}</MessageTime>
              </MessageBubble>
            </Message>
          ))}
          {isTyping && (
            <Message isAI={true}>
              <MessageBubble isAI={true} theme={theme}>
                <MessageText>Typing...</MessageText>
              </MessageBubble>
            </Message>
          )}
        </ChatMessages>

        <ChatInput>
          <InputField
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about finance..."
            theme={theme}
          />
          <SendButton 
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            theme={theme}
          >
            Send
          </SendButton>
        </ChatInput>
      </ChatContainer>

      <QuickQuestions>
        <QuickQuestionsTitle theme={theme}>
          💡 Quick Questions
        </QuickQuestionsTitle>
        <QuickButtons>
          {quickQuestions.map((question, index) => (
            <QuickButton 
              key={index}
              onClick={() => handleQuickQuestion(question)}
              theme={theme}
            >
              {question}
            </QuickButton>
          ))}
        </QuickButtons>
      </QuickQuestions>
    </AICoachContainer>
  );
};

export default AICoach;

