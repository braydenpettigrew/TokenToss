import styled from "styled-components";

const HighlightedText = styled.span`
  color: ${({ theme }) => theme.primaryLight};
  font-weight: bold;
`;

export default HighlightedText;
