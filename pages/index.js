import Button from "@/components/Button";
import PageContainer from "@/components/PageContainer";
import { useTheme } from "@/context/ThemeContext";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/router";
import styled from "styled-components";

export default function Home() {
  const theme = useTheme();
  const router = useRouter();

  return (
    <PageContainer>
      <Container>
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
          Not convinced? <HighlightedText>Grab a beer and come back.</HighlightedText>
        </Subheading>
        <Button
        onClick={() => {router.push("/my-bets")}}
          backgroundColor={theme.accent}
          textColor={theme.background}
          marginTop="32px"
        >
          Sounds Great!
          <ArrowRight />
        </Button>
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
