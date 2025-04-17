import styled from "styled-components";

const Heading = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.xlheading};
  color: ${({ theme }) => theme.accent};
  text-shadow: 1px 1px 2px ${({ theme }) => theme.shadow};
`;

export default Heading;
