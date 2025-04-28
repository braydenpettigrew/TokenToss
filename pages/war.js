import PageContainer from "@/components/PageContainer";
import styled, { keyframes } from "styled-components";
import PlayingCard from "@/components/PlayingCard";
import Heading from "@/components/Heading";
import Deck from "@/components/Deck";
import Subheading from "@/components/Subheading";
import HighlightedText from "@/components/HighlightedText";
import Button from "@/components/Button";
import { useState } from "react";
import { ethers } from "ethers";
import BraydenTokenABI from "@/contracts/abi/BraydenTokenABI.json";
import { toast } from "react-toastify";
import { useAddress, useSigner } from "@thirdweb-dev/react";
import { useTokenBalance } from "@/context/TokenBalanceContext";

export default function MyBets() {
  const [playerValue, setPlayerValue] = useState(null);
  const [dealerValue, setDealerValue] = useState(null);
  const [playerSuit, setPlayerSuit] = useState(null);
  const [dealerSuit, setDealerSuit] = useState(null);
  const [betAmount, setBetAmount] = useState(0);
  const [isDealing, setIsDealing] = useState(false);
  const [dealerCardMoving, setDealerCardMoving] = useState(false);
  const [playerCardMoving, setPlayerCardMoving] = useState(false);
  const [gameResult, setGameResult] = useState(null);
  const signer = useSigner();
  const address = useAddress();
  const { setTokenBalance, contractAddress } = useTokenBalance();

  const handleDeal = async () => {
    if (betAmount <= 0) {
      toast.error("Please enter a valid bet amount!");
      return;
    }

    if (!signer) {
      toast.error("Please connect your wallet!");
      return;
    }

    try {
      const contract = new ethers.Contract(
        contractAddress,
        BraydenTokenABI,
        signer
      );

      // Convert bet amount to the appropriate token decimals
      const betAmountInWei = ethers.utils.parseUnits(betAmount.toString(), 18);

      // Check user's token balance
      const userBalance = await contract.balanceOf(address);
      if (userBalance.lt(betAmountInWei)) {
        toast.error("Insufficient token balance to place the bet.");
        return;
      }

      // Execute the playWar transaction
      setIsDealing(true);
      setDealerCardMoving(true);
      setPlayerCardMoving(true);
      const tx = await contract.playWar(betAmountInWei, {
        gasLimit: 300000,
      });
      const receipt = await tx.wait();

      // Fetch the updated token balance
      const balance = await contract.balanceOf(address);
      const decimals = await contract.decimals();
      const symbol = await contract.symbol();
      const displayValue = ethers.utils.formatUnits(balance, decimals);
      setTokenBalance({ displayValue, symbol });

      // Extract the WarGameResult event
      const warGameEvent = receipt.events.find(
        (event) => event.event === "WarGameResult"
      );

      if (warGameEvent) {
        const { playerCard, dealerCard, playerSuit, dealerSuit, playerWon } =
          warGameEvent.args;

        // Update the frontend state with the game results
        setPlayerValue(playerCard.toNumber());
        setDealerValue(dealerCard.toNumber());
        setPlayerSuit(getSuitName(playerSuit.toNumber()));
        setDealerSuit(getSuitName(dealerSuit.toNumber()));

        if (playerWon) {
          setGameResult("You win!");
        } else {
          setGameResult("You lose!");
        }
      }
    } catch (error) {
      console.error("Error during the War game:", error);
      toast.error("An error occurred. Please try again.");
      setGameResult("Error, try again!");
    } finally {
      setIsDealing(false);
      setDealerCardMoving(false);
      setPlayerCardMoving(false);
    }
  };

  // Helper function to map suit numbers to suit names
  const getSuitName = (suitNumber) => {
    const suits = ["hearts", "diamonds", "clubs", "spades"];
    return suits[suitNumber];
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
          <Text>{isDealing ? "Dealing cards..." : gameResult}</Text>
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
              step="1"
              value={betAmount}
              onChange={(e) => {
                const value = e.target.value;
                if (value === "" || /^[0-9]+$/.test(value)) {
                  // only allow whole numbers
                  setBetAmount(value);
                }
              }}
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
  width: 150px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.shadow};
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.default};
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

const Text = styled.div`
  font-size: ${({ theme }) => theme.fontSize.subheading};
  font-weight: bold;
  color: ${({ theme }) => theme.primaryLight};
`;
