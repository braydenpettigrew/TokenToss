import PageContainer from "@/components/PageContainer";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "next/router";
import styled from "styled-components";

export default function Home() {
  const theme = useTheme();
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
          <GameCard onClick={() => router.push("/war")}>War</GameCard>
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

const Heading = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.xlheading};
  color: ${({ theme }) => theme.accent};
  text-shadow: 1px 1px 2px ${({ theme }) => theme.shadow};
`;

const Subheading = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.subheading};
  color: ${({ theme }) => theme.accent};
`;

const HighlightedText = styled.span`
  color: ${({ theme }) => theme.primaryLight};
  font-weight: bold;
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

  &:hover {
    transform: translateY(-4px);
    cursor: pointer;
  }
`;
