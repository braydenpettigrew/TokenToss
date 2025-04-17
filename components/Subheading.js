import styled from "styled-components";

const Subheading = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.subheading};
  color: ${({ theme }) => theme.accent};
`;

export default Subheading;
