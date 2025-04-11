import styled from "styled-components";

export default function Home() {
  return (
    <Container>
      <h1>Token Toss</h1>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.primaryLight};
`;
