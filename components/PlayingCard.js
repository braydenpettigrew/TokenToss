import styled from "styled-components";
import { Heart, Spade, Club, Diamond } from "lucide-react";

const PlayingCard = ({ value, suit }) => {
  return (
    <Card>
      {value}
      {suit === "hearts" && <Heart />}
      {suit === "spades" && <Spade />}
      {suit === "clubs" && <Club />}
      {suit === "diamonds" && <Diamond />}
    </Card>
  );
};

const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSize.xlheading};
  background-color: ${({ theme }) => theme.white};
  color: ${({ theme }) => theme.black};
  padding: 16px;
  border-radius: 8px;
  border: 2px solid ${({ theme }) => theme.primaryLight};
  box-shadow: 4px 4x 4px ${({ theme }) => theme.shadow};
  width: 150px;
  height: 200px;
  gap: 8px;
`;

export default PlayingCard;
