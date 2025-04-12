import PageContainer from "@/components/PageContainer";
import styled from "styled-components";

export default function MyBets() {
  return (
    <PageContainer>
      <Container>
        <Heading>
          Welcome to the <HighlightedText>Basketball Page</HighlightedText>
        </Heading>
        <Subheading>
          Bet against your friends and lose!
        </Subheading>
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
  color: ${({ theme }) => theme.primaryLight};
`;

const HighlightedText = styled.span`
  color: ${({ theme }) => theme.primaryLight};
  font-weight: bold;
`;
