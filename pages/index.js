import Heading from "@/components/Heading";
import HighlightedText from "@/components/HighlightedText";
import PageContainer from "@/components/PageContainer";
import Subheading from "@/components/Subheading";
import { useRouter } from "next/router";
import styled from "styled-components";
import Image from "next/image"; // Import the Image component
import war from "@/public/war.png"; // Import the war.png image

export default function Home() {
  const router = useRouter();

  return (
    <PageContainer>
      <Container>
        <TextContainer>
          <Heading>
            Welcome to <HighlightedText>TokenToss</HighlightedText>
          </Heading>
          <Subheading>
            The one-stop solution for losing all of your money and becoming
            financially unstable.
          </Subheading>
          <HorizontalLine />
          <Subheading>
            The best part? <HighlightedText>No middlemen.</HighlightedText>
          </Subheading>
          <Subheading>
            Gambling problem? <HighlightedText>No problem.</HighlightedText>
          </Subheading>
          <Subheading>
            Not convinced?{" "}
            <HighlightedText>Grab a beer and come back.</HighlightedText>
          </Subheading>
        </TextContainer>
        <GameCardsContainer>
          <GameCard onClick={() => router.push("/coin-flip")}>
            Coin Flip
          </GameCard>
          <GameCard onClick={() => router.push("/war")}>
            <StyledImage src={war} alt="War Game" fill />
            <GameTitle>War</GameTitle>
          </GameCard>
        </GameCardsContainer>
      </Container>
    </PageContainer>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  padding: 32px;
`;

const TextContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const HorizontalLine = styled.div`
  width: 30%;
  height: 1px;
  background-color: ${({ theme }) => theme.shadow};
  margin: 16px;
`;

const GameCardsContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  width: 100%;
  gap: 16px;
`;

const GameCard = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.accent};
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0px 4px 8px ${({ theme }) => theme.shadow};
  transition: transform 0.2s;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-4px);
    cursor: pointer;
  }
`;

const StyledImage = styled(Image)`
  object-fit: cover;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 0;
`;

const GameTitle = styled.div`
  position: relative;
  z-index: 1;
  font-size: ${({ theme }) => theme.fontSize.subheading};
  font-weight: bold;
  color: ${({ theme }) => theme.primaryLight};
  padding: 16px;
  border-radius: 8px;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.8);
  background-color: rgba(0, 0, 0, 0.7);
`;
