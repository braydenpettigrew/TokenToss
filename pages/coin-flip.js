import PageContainer from "@/components/PageContainer";
import styled, { keyframes } from "styled-components";
import Heading from "@/components/Heading";
import Subheading from "@/components/Subheading";
import HighlightedText from "@/components/HighlightedText";
import Button from "@/components/Button";
import { useState } from "react";

export default function CoinFlip() {
  const [betAmount, setBetAmount] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [coinResult, setCoinResult] = useState(null);
  const [flipCount, setFlipCount] = useState(0);

  const handleFlip = () => {
    setCoinResult(null);
    setIsFlipping(true);
    setFlipCount((prev) => prev + 1); // Change key to restart animation

    // Simulate the coin flip result, this will be solidity eventually
    setTimeout(() => {
      const result = Math.random() < 0.5 ? "heads" : "tails";
      setCoinResult(result);
      setIsFlipping(false);
    }, 2000);
  };

  return (
    <PageContainer>
      <Container>
        <TextContainer>
          <Heading>
            Coin <HighlightedText>Flip</HighlightedText>
          </Heading>
          <Subheading>
            Choose your bet amount and click "Heads" or "Tails" to flip the
            coin. If you guess correctly, you win!
          </Subheading>
        </TextContainer>
        <GameContainer>
          <CoinContainer>
            {isFlipping ? (
              <CoinWrapper key={flipCount}>
                <Coin>
                  <CoinSide className="heads">HEADS</CoinSide>
                  <CoinSide className="tails">TAILS</CoinSide>
                </Coin>
              </CoinWrapper>
            ) : coinResult ? (
              <StaticCoin>{coinResult.toUpperCase()}</StaticCoin>
            ) : (
              <StaticCoin>FLIP ME</StaticCoin>
            )}
          </CoinContainer>
          <HorizontalContainer>
            <BetInput
              type="number"
              placeholder="Bet Amount"
              min="0"
              max="10000"
              step="1"
              value={betAmount}
              onChange={(e) => setBetAmount(e.target.value)}
            />
            <Button onClick={handleFlip} disabled={isFlipping}>
              Heads
            </Button>
            <Button onClick={handleFlip} disabled={isFlipping}>
              Tails
            </Button>
          </HorizontalContainer>
        </GameContainer>
      </Container>
    </PageContainer>
  );
}

const Container = styled.div`
  display: flex;
  padding: 32px;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  flex-grow: 1;
  text-align: center;
`;

const TextContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const GameContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

const HorizontalContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

const BetInput = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.shadow};
`;

const CoinContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
`;

const flipAnimation = keyframes`
  0% {
    transform: rotateY(0);
  }
  100% {
    transform: rotateY(1800deg);
  }
`;

const CoinWrapper = styled.div`
  width: 250px;
  height: 250px;
  position: relative;
`;

const Coin = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  animation: ${flipAnimation} 2s;

  .heads {
    transform: rotateY(0deg);
  }

  .tails {
    transform: rotateY(180deg);
  }
`;

const CoinSide = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  background: linear-gradient(145deg, #e6e6e6, #c0c0c0);
  color: #333;
  font-size: ${({ theme }) => theme.fontSize.subheading};
  border: 8px solid #a8a8a8;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3), inset 0 0 8px rgba(0, 0, 0, 0.1);
  text-shadow: 0 1px 1px rgba(255, 255, 255, 0.5);
`;

const StaticCoin = styled.div`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  background: linear-gradient(145deg, #e6e6e6, #c0c0c0);
  color: #333;
  font-size: ${({ theme }) => theme.fontSize.subheading};
  border: 8px solid #a8a8a8;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3), inset 0 0 8px rgba(0, 0, 0, 0.1);
  text-shadow: 0 1px 1px rgba(255, 255, 255, 0.5);
`;
