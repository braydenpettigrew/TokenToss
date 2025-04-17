import Heading from "@/components/Heading";
import PageContainer from "@/components/PageContainer";
import styled from "styled-components";

export default function MyBets() {
  return (
    <PageContainer>
      <Container>
        <Heading>Coin Flip</Heading>
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
`;
