import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
`;

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

const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const LoaderContainer = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  text-align: center;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
`;

const LoaderCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  padding: 3rem;
  max-width: 500px;
  width: 100%;
  animation: ${fadeInUp} 0.8s ease-out;
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    animation: ${shimmer} 2s infinite;
  }
`;

const SpinnerContainer = styled.div`
  position: relative;
  margin-bottom: 2rem;
`;

const Spinner = styled.div`
  width: 80px;
  height: 80px;
  border: 4px solid rgba(102, 126, 234, 0.1);
  border-top: 4px solid #667eea;
  border-right: 4px solid #764ba2;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin: 0 auto;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40px;
    height: 40px;
    border: 3px solid rgba(102, 126, 234, 0.2);
    border-top: 3px solid #667eea;
    border-radius: 50%;
    animation: ${spin} 0.8s linear infinite reverse;
  }
`;

const LoadingText = styled.h2`
  color: #2d3748;
  margin-bottom: 1rem;
  font-size: 1.8rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${pulse} 2s ease-in-out infinite;
`;

const LoadingSubtext = styled.p`
  color: #718096;
  font-size: 1.1rem;
  margin-bottom: 2rem;
  font-weight: 400;
  line-height: 1.6;
`;

const ProgressSteps = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  padding: 0 1rem;
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: ${props => props.active ? 1 : 0.4};
  transition: all 0.3s ease;
`;

const StepDot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.active ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#e2e8f0'};
  margin-bottom: 0.5rem;
  animation: ${props => props.active ? pulse : 'none'} 1.5s ease-in-out infinite;
`;

const StepText = styled.span`
  font-size: 0.8rem;
  color: #718096;
  font-weight: 500;
  text-align: center;
`;

const LoadingBar = styled.div`
  width: 100%;
  height: 6px;
  background: #e2e8f0;
  border-radius: 3px;
  margin: 1.5rem 0;
  overflow: hidden;
  position: relative;
`;

const LoadingBarFill = styled.div`
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 3px;
  animation: ${shimmer} 1.5s ease-in-out infinite;
  width: 60%;
`;

const Loader = () => {
  return (
    <LoaderContainer>
      <LoaderCard>
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
        
        <LoadingText>Building Your Portfolio...</LoadingText>
        <LoadingSubtext>
          Our AI is analyzing your preferences, market conditions, and creating a personalized investment strategy just for you.
        </LoadingSubtext>
        
        <LoadingBar>
          <LoadingBarFill />
        </LoadingBar>
        
        <ProgressSteps>
          <Step active={true}>
            <StepDot active={true} />
            <StepText>Analyzing<br />Preferences</StepText>
          </Step>
          <Step active={true}>
            <StepDot active={true} />
            <StepText>Market<br />Analysis</StepText>
          </Step>
          <Step active={false}>
            <StepDot active={false} />
            <StepText>Portfolio<br />Generation</StepText>
          </Step>
          <Step active={false}>
            <StepDot active={false} />
            <StepText>Final<br />Review</StepText>
          </Step>
        </ProgressSteps>
      </LoaderCard>
    </LoaderContainer>
  );
};

export default Loader;

