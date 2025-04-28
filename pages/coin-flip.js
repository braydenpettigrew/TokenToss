import PageContainer from "@/components/PageContainer";
import styled, { keyframes } from "styled-components";
import Heading from "@/components/Heading";
import Subheading from "@/components/Subheading";
import HighlightedText from "@/components/HighlightedText";
import Button from "@/components/Button";
import { useState } from "react";
import { ethers } from "ethers";
import BraydenTokenABI from "@/contracts/abi/BraydenTokenABI.json";
import { useAddress, useSigner } from "@thirdweb-dev/react";
import { useTokenBalance } from "@/context/TokenBalanceContext";
import { toast } from "react-toastify";

export default function CoinFlip() {
  const [betAmount, setBetAmount] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [coinResult, setCoinResult] = useState(null);
  const [gameResult, setGameResult] = useState(null);
  const signer = useSigner();
  const address = useAddress();
  const { setTokenBalance, contractAddress } = useTokenBalance();

  const handleFlip = async (choice) => {
    if (betAmount <= 0) {
      toast.error("Please enter a valid bet amount!");
      return;
    }

    if (!signer) {
      toast.error("Please connect your wallet!");
      return;
    }

    try {
      // Create a contract instance
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

      // Start animation
      setIsFlipping(true);

      // Execute the actual transaction
      const tx = await contract.flipCoin(betAmountInWei, choice === "heads");
      const receipt = await tx.wait();

      // Fetch the updated token balance
      const balance = await contract.balanceOf(address);
      const decimals = await contract.decimals();
      const symbol = await contract.symbol();
      const displayValue = ethers.utils.formatUnits(balance, decimals);
      setTokenBalance({ displayValue, symbol });

      // Find the CoinFlipResult event in the transaction receipt
      const coinFlipEvent = receipt.events?.find(
        (event) => event.event === "CoinFlipResult"
      );

      if (coinFlipEvent && coinFlipEvent.args) {
        // Extract event arguments
        const { result, playerWon } = coinFlipEvent.args;

        // Update UI based on actual blockchain result
        setCoinResult(result.toNumber() === 0 ? "heads" : "tails");
        setGameResult(playerWon ? "You win!" : "You lose!");
      }
    } catch (error) {
      console.error("Error during coin flip:", error);
      setCoinResult("FLIP ME");
      setGameResult("Error, try again!");
      toast.error("An error occurred during the coin flip. Please try again.");
    } finally {
      setIsFlipping(false);
    }
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
          <Text>{isFlipping ? "Flipping the coin..." : gameResult}</Text>
          <CoinContainer>
            {isFlipping ? (
              <CoinWrapper>
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
            <Button onClick={() => handleFlip("heads")} disabled={isFlipping}>
              Heads
            </Button>
            <Button onClick={() => handleFlip("tails")} disabled={isFlipping}>
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
  width: 150px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.shadow};
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.default};
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
  animation: ${flipAnimation} 2s linear infinite;

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
`;

const Text = styled.div`
  font-size: ${({ theme }) => theme.fontSize.subheading};
  font-weight: bold;
  color: ${({ theme }) => theme.primaryLight};
`;
