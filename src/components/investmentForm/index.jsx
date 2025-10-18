import React, { useState } from 'react';
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
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
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

// Styled Components
const FormContainer = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
`;

const FormCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  padding: 3rem;
  max-width: 600px;
  width: 100%;
  animation: ${fadeInUp} 0.8s ease-out;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const FormHeader = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;
`;

const FormTitle = styled.h1`
  color: #2d3748;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const FormSubtitle = styled.p`
  color: #718096;
  font-size: 1.1rem;
  margin: 0;
  font-weight: 400;
`;

const FormGroup = styled.div`
  margin-bottom: 2rem;
  animation: ${slideIn} 0.6s ease-out;
  animation-delay: ${props => props.delay || '0s'};
  animation-fill-mode: both;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.75rem;
  color: #2d3748;
  font-weight: 600;
  font-size: 1rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    transition: width 0.3s ease;
  }
  
  &:focus-within::after {
    width: 100%;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 1rem 1.25rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 500;
  background: white;
  color: #2d3748;
  transition: all 0.3s ease;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.75rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    transform: translateY(-2px);
  }
  
  &:hover {
    border-color: #cbd5e0;
    transform: translateY(-1px);
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 1.25rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 500;
  background: white;
  color: #2d3748;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    transform: translateY(-2px);
  }
  
  &:hover {
    border-color: #cbd5e0;
    transform: translateY(-1px);
  }
  
  &::placeholder {
    color: #a0aec0;
  }
`;

const InputGroup = styled.div`
  position: relative;
  
  &::before {
    content: '$';
    position: absolute;
    left: 1.25rem;
    top: 50%;
    transform: translateY(-50%);
    color: #667eea;
    font-weight: 600;
    font-size: 1.1rem;
    z-index: 1;
  }
  
  ${Input} {
    padding-left: 2.5rem;
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
    animation: ${pulse} 0.6s ease-in-out;
  }
  
  &:active {
    transform: translateY(-1px);
  }
  
  &:disabled {
    background: #cbd5e0;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
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

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: #e2e8f0;
  border-radius: 2px;
  margin-bottom: 2rem;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 2px;
  transition: width 0.5s ease;
  width: ${props => props.progress}%;
`;

const RiskLevelIndicator = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #718096;
`;

const RiskDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.active ? '#667eea' : '#e2e8f0'};
  transition: all 0.3s ease;
`;

const InvestmentForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    risk: 'moderate',
    investment_term: 'medium',
    initial_amount: '',
    monthly_contribution: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Calculate form completion progress
  const progress = Object.values(formData).filter(value => value !== '').length * 25;

  return (
    <FormContainer>
      <FormCard>
        <FormHeader>
          <FormTitle>Smart Portfolio Builder</FormTitle>
          <FormSubtitle>Let AI create your perfect investment strategy</FormSubtitle>
        </FormHeader>

        <ProgressBar>
          <ProgressFill progress={progress} />
        </ProgressBar>

        <form onSubmit={handleSubmit}>
          <FormGroup delay="0.1s">
            <Label htmlFor="risk">Risk Tolerance Level</Label>
            <Select 
              id="risk" 
              name="risk" 
              value={formData.risk} 
              onChange={handleChange}
            >
              <option value="conservative">Conservative - Low Risk</option>
              <option value="moderate">Moderate - Balanced Risk</option>
              <option value="aggressive">Aggressive - High Risk</option>
            </Select>
            <RiskLevelIndicator>
              <div>
                <RiskDot active={formData.risk === 'conservative'} />
                <span>Conservative</span>
              </div>
              <div>
                <RiskDot active={formData.risk === 'moderate'} />
                <span>Moderate</span>
              </div>
              <div>
                <RiskDot active={formData.risk === 'aggressive'} />
                <span>Aggressive</span>
              </div>
            </RiskLevelIndicator>
          </FormGroup>

          <FormGroup delay="0.2s">
            <Label htmlFor="investment_term">Investment Time Horizon</Label>
            <Select 
              id="investment_term" 
              name="investment_term" 
              value={formData.investment_term} 
              onChange={handleChange}
            >
              <option value="short">Short Term (1-3 years)</option>
              <option value="medium">Medium Term (3-7 years)</option>
              <option value="long">Long Term (7+ years)</option>
            </Select>
          </FormGroup>

          <FormGroup delay="0.3s">
            <Label htmlFor="initial_amount">Initial Investment Amount</Label>
            <InputGroup>
              <Input 
                type="number" 
                id="initial_amount" 
                name="initial_amount" 
                value={formData.initial_amount} 
                onChange={handleChange}
                placeholder="Enter initial amount"
                min="0"
                step="0.01"
              />
            </InputGroup>
          </FormGroup>

          <FormGroup delay="0.4s">
            <Label htmlFor="monthly_contribution">Monthly Contribution</Label>
            <InputGroup>
              <Input 
                type="number" 
                id="monthly_contribution" 
                name="monthly_contribution" 
                value={formData.monthly_contribution} 
                onChange={handleChange}
                placeholder="Enter monthly contribution"
                min="0"
                step="0.01"
              />
            </InputGroup>
          </FormGroup>

          <FormGroup delay="0.5s">
            <SubmitButton type="submit">
              🚀 Generate My Portfolio
            </SubmitButton>
          </FormGroup>
        </form>
      </FormCard>
    </FormContainer>
  );
};

export default InvestmentForm;
