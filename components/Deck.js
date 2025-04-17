import styled from "styled-components";

const Deck = ({ children }) => {
  return <Card>{children}</Card>;
};

const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.primaryDark};
  color: ${({ theme }) => theme.white};
  font-size: ${({ theme }) => theme.fontSize.xlheading};
  padding: 16px;
  border-radius: 8px;
  border: 2px solid ${({ theme }) => theme.primaryLight};
  box-shadow: 4px 4x 4px ${({ theme }) => theme.shadow};
  width: 250px;
  height: 350px;
`;

export default Deck;
