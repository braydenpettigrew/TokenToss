import styled from "styled-components";
import { Heart, Spade, Club, Diamond } from "lucide-react";

const PlayingCard = ({ value, suit, faceDown }) => {
  if (faceDown) {
    return <CardBack />;
  }

  return (
    <Card>
      {value === 1 && <span>A</span>}
      {value === 11 && <span>J</span>}
      {value === 12 && <span>Q</span>}
      {value === 13 && <span>K</span>}
      {value > 1 && value < 11 && <span>{value}</span>}
      {suit === "hearts" && <Heart color="red" />}
      {suit === "diamonds" && <Diamond color="red" />}
      {suit === "spades" && <Spade />}
      {suit === "clubs" && <Club />}
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
  width: 250px;
  height: 350px;
  gap: 8px;
`;

const CardBack = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.primaryDark};
  border-radius: 8px;
  border: 2px solid ${({ theme }) => theme.primaryLight};
  box-shadow: 4px 4x 4px ${({ theme }) => theme.shadow};
  width: 250px;
  height: 350px;
`;

export default PlayingCard;
