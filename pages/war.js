import PageContainer from "@/components/PageContainer";
import styled from "styled-components";
import PlayingCard from "@/components/PlayingCard";
import Heading from "@/components/Heading";

export default function MyBets() {
  return (
    <PageContainer>
      <Container>
        <Heading>War</Heading>
        <PlayingCard value={2} suit={"hearts"}/>
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