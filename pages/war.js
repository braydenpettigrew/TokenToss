import PageContainer from "@/components/PageContainer";
import styled, { keyframes } from "styled-components";
import PlayingCard from "@/components/PlayingCard";
import Heading from "@/components/Heading";
import Deck from "@/components/Deck";
import Subheading from "@/components/Subheading";
import HighlightedText from "@/components/HighlightedText";
import Button from "@/components/Button";
import { useState } from "react";

export default function MyBets() {
  const [playerValue, setPlayerValue] = useState(null);
  const [dealerValue, setDealerValue] = useState(null);
  const [playerSuit, setPlayerSuit] = useState(null);
  const [dealerSuit, setDealerSuit] = useState(null);
  const [betAmount, setBetAmount] = useState(0);
  const [isDealing, setIsDealing] = useState(false);
  const [dealerCardMoving, setDealerCardMoving] = useState(false);
  const [playerCardMoving, setPlayerCardMoving] = useState(false);

  const handleDeal = () => {
    // Simulate dealing cards
    const suits = ["hearts", "diamonds", "clubs", "spades"];
    const playerCard = Math.floor(Math.random() * 13) + 1;
    const dealerCard = Math.floor(Math.random() * 13) + 1;
    const playerSuit = suits[Math.floor(Math.random() * suits.length)];
    const dealerSuit = suits[Math.floor(Math.random() * suits.length)];

    // Start the dealing animation
    setIsDealing(true);
    setDealerCardMoving(true);
    setPlayerCardMoving(true);

    // Simulate the delay for the card movement
    setTimeout(() => {
      setDealerCardMoving(false);
      setDealerValue(dealerCard);
      setDealerSuit(dealerSuit);
      setPlayerCardMoving(false);
      setPlayerValue(playerCard);
      setPlayerSuit(playerSuit);
      setIsDealing(false);
    }, 1000);
  };

  return (
    <PageContainer>
      <Container>
        <TextContainer>
          <Heading>
            The Game of <HighlightedText>War</HighlightedText>
          </Heading>
          <Subheading>
            Choose your bet amount and click "Deal" to start the game. If you
            have a higher value card than the dealer, you win! If you have an
            equal value card or a lower value card, you lose.
          </Subheading>
        </TextContainer>
        <GameContainer>
          <GameCardsContainer>
            <HorizontalContainer>
              <DeckContainer>
                <Deck>Dealer Deck</Deck>
              </DeckContainer>
              <CardSlot>
                {dealerCardMoving && (
                  <DealerMovingCard>
                    <PlayingCard faceDown />
                  </DealerMovingCard>
                )}
                {dealerValue !== null && !dealerCardMoving && (
                  <RevealedCard>
                    <PlayingCard value={dealerValue} suit={dealerSuit} />
                  </RevealedCard>
                )}
              </CardSlot>
            </HorizontalContainer>
            <HorizontalContainer>
              <CardSlot>
                {playerCardMoving && (
                  <PlayerMovingCard>
                    <PlayingCard faceDown />
                  </PlayerMovingCard>
                )}
                {playerValue !== null && !playerCardMoving && (
                  <RevealedCard>
                    <PlayingCard value={playerValue} suit={playerSuit} />
                  </RevealedCard>
                )}
              </CardSlot>
              <DeckContainer>
                <Deck>Player Deck</Deck>
              </DeckContainer>
            </HorizontalContainer>
          </GameCardsContainer>
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
            <Button onClick={handleDeal} disabled={isDealing}>
              Deal
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

const GameCardsContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 32px;
  justify-content: center;
  align-items: center;
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

const CardSlot = styled.div`
  width: 250px;
  height: 350px;
  position: relative;
`;

const DeckContainer = styled.div`
  width: 250px;
  height: 350px;
  position: relative;
`;

const dealerMoveFromDeck = keyframes`
  0% {
    transform: translate(-150px, 0) rotateY(180deg);
    opacity: 1;
  }
  100% {
    transform: translate(0, 0) rotateY(180deg);
    opacity: 1;
  }
`;

const playerMoveFromDeck = keyframes`
  0% {
    transform: translate(150px, 0) rotateY(180deg);
    opacity: 1;
  }
  100% {
    transform: translate(0, 0) rotateY(180deg);
    opacity: 1;
  }
`;

const flipCard = keyframes`
  0% {
    transform: rotateY(180deg);
  }
  100% {
    transform: rotateY(0deg);
  }
`;

const DealerMovingCard = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${dealerMoveFromDeck} 1s ease forwards;
`;

const PlayerMovingCard = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${playerMoveFromDeck} 1s ease forwards;
`;

const RevealedCard = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${flipCard} 0.5s ease forwards;
`;
