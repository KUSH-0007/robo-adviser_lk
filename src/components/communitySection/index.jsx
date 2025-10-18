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

const CommunityContainer = styled.div`
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  animation: ${fadeInUp} 0.8s ease-out;
`;

const CommunityHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const CommunityTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: ${({ theme }) => theme.text};
  margin-bottom: 1rem;
  background: ${({ theme }) => theme.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const CommunitySubtitle = styled.p`
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
  font-size: 1.1rem;
`;

const CommunityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
`;

const CommunityCard = styled.div`
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

const PostItem = styled.div`
  padding: 1rem;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 12px;
  margin-bottom: 1rem;
  border-left: 4px solid ${({ theme }) => theme.primary};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateX(5px);
    background: rgba(102, 126, 234, 0.15);
  }
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const PostAuthor = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  font-size: 0.9rem;
`;

const PostTime = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.6;
`;

const PostContent = styled.p`
  color: ${({ theme }) => theme.text};
  line-height: 1.6;
  margin: 0;
  font-size: 0.95rem;
`;

const PostStats = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
`;

const ChallengeCard = styled.div`
  padding: 1.5rem;
  background: rgba(46, 204, 113, 0.1);
  border-radius: 15px;
  margin-bottom: 1rem;
  border-left: 4px solid ${({ theme }) => theme.savings};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateX(5px);
    background: rgba(46, 204, 113, 0.15);
  }
`;

const ChallengeTitle = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
`;

const ChallengeDescription = styled.div`
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const ChallengeStats = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
`;

const ChallengeParticipants = styled.div`
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
`;

const JoinButton = styled.button`
  background: ${({ theme }) => theme.savings};
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
    box-shadow: 0 5px 15px rgba(46, 204, 113, 0.3);
  }
`;

const CommunitySection = ({ theme }) => {
  const [posts] = useState([
    {
      id: 1,
      author: "FinanceGuru_2024",
      content: "Just saved ₹5,000 this month by switching to a no-fee credit card and using cashback apps! The key is to track every expense.",
      time: "2 hours ago",
      likes: 24,
      comments: 8
    },
    {
      id: 2,
      author: "CryptoTrader_Pro",
      content: "Started DCA (Dollar Cost Averaging) in Bitcoin 6 months ago. Even with the volatility, I'm up 15% overall. Patience pays!",
      time: "4 hours ago",
      likes: 18,
      comments: 12
    },
    {
      id: 3,
      author: "SavingChampion",
      content: "The 50/30/20 rule changed my life! 50% needs, 30% wants, 20% savings. Simple but effective budgeting strategy.",
      time: "6 hours ago",
      likes: 31,
      comments: 15
    },
    {
      id: 4,
      author: "InvestmentNewbie",
      content: "Started my first SIP in index funds today! Nervous but excited about building wealth for the long term.",
      time: "8 hours ago",
      likes: 42,
      comments: 20
    }
  ]);

  const [challenges] = useState([
    {
      id: 1,
      title: "30-Day No-Spend Challenge",
      description: "Avoid all non-essential purchases for 30 days and save the money for your emergency fund.",
      participants: 156,
      savings: "₹2,500 average"
    },
    {
      id: 2,
      title: "Side Hustle Challenge",
      description: "Start a side hustle and earn an extra ₹10,000 this month. Share your progress and tips!",
      participants: 89,
      earnings: "₹8,500 average"
    },
    {
      id: 3,
      title: "Investment Learning Challenge",
      description: "Learn one new investment concept each day for 30 days. Perfect for beginners!",
      participants: 234,
      completion: "85% success rate"
    }
  ]);

  return (
    <CommunityContainer>
      <CommunityHeader>
        <CommunityTitle theme={theme}>👥 Finance Community</CommunityTitle>
        <CommunitySubtitle theme={theme}>
          Connect with fellow finance enthusiasts, share tips, and join saving challenges
        </CommunitySubtitle>
      </CommunityHeader>

      <CommunityGrid>
        <CommunityCard theme={theme}>
          <CardTitle theme={theme}>
            💬 Community Forum
          </CardTitle>
          {posts.map(post => (
            <PostItem key={post.id} theme={theme}>
              <PostHeader>
                <PostAuthor theme={theme}>{post.author}</PostAuthor>
                <PostTime theme={theme}>{post.time}</PostTime>
              </PostHeader>
              <PostContent theme={theme}>{post.content}</PostContent>
              <PostStats theme={theme}>
                <span>👍 {post.likes}</span>
                <span>💬 {post.comments}</span>
              </PostStats>
            </PostItem>
          ))}
        </CommunityCard>

        <CommunityCard theme={theme}>
          <CardTitle theme={theme}>
            🏆 Saving Challenges
          </CardTitle>
          {challenges.map(challenge => (
            <ChallengeCard key={challenge.id} theme={theme}>
              <ChallengeTitle theme={theme}>{challenge.title}</ChallengeTitle>
              <ChallengeDescription theme={theme}>{challenge.description}</ChallengeDescription>
              <ChallengeStats>
                <ChallengeParticipants theme={theme}>
                  👥 {challenge.participants} participants
                </ChallengeParticipants>
                <JoinButton theme={theme}>Join Challenge</JoinButton>
              </ChallengeStats>
            </ChallengeCard>
          ))}
        </CommunityCard>
      </CommunityGrid>
    </CommunityContainer>
  );
};

export default CommunitySection;

