import styled from "styled-components";
import Image from "next/image";
import logo from "@/public/logo.svg";
import Button from "./Button";
import { useRouter } from "next/router";

function Navbar() {
  const router = useRouter();

  return (
    <NavbarSection>
      <LogoContainer onClick={() => router.push("/")}>
        <Image src={logo} alt="TokenToss Logo" width={32} height="auto" />
        <LogoText>TokenToss</LogoText>
      </LogoContainer>
      <LinksContainer>
        <Button
          padding="8px"
          backgroundColor="transparent"
          hoverBackgroundColor="transparent"
          textColor={({ theme }) => theme.primaryLight}
          hoverTextColor={({ theme }) => theme.primaryDark}
        >
          My Bets
        </Button>
        <Button
          padding="8px"
          backgroundColor="transparent"
          hoverBackgroundColor="transparent"
          textColor={({ theme }) => theme.primaryLight}
          hoverTextColor={({ theme }) => theme.primaryDark}
        >
          Baseball
        </Button>
        <Button
          padding="8px"
          backgroundColor="transparent"
          hoverBackgroundColor="transparent"
          textColor={({ theme }) => theme.primaryLight}
          hoverTextColor={({ theme }) => theme.primaryDark}
        >
          Basketball
        </Button>
      </LinksContainer>
    </NavbarSection>
  );
}

const NavbarSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
    padding: 6px 12px;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.accent};
  background-color: ${({ theme }) => theme.background};
  z-index: 100;
`;

const LinksContainer = styled.div`
  display: flex;
  gap: 16px;
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  a {
    text-decoration: none;
    font-size: ${({ theme }) => theme.fontSize.subheading};
    color: ${({ theme }) => theme.gray};
    font-weight: bold;
  }

  &:hover {
    cursor: pointer;
  }
`;

const LogoText = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.subheading};
  font-weight: bold;
  color: ${({ theme }) => theme.primaryLight};
`;

export default Navbar;
