import styled from "styled-components";
import Image from "next/image";
import logo from "@/public/logo.svg";
import Button from "./Button";
import { useRouter } from "next/router";
import { ConnectWallet, useAddress, useSigner } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import BraydenTokenABI from "@/contracts/abi/BraydenTokenABI.json";

function Navbar() {
  const router = useRouter();
  const address = useAddress();
  const signer = useSigner();
  const [tokenBalance, setTokenBalance] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const tokenContractAddress = "0x0013610D45E94aCc701fb8aFF1FC7f45b54D0d03";

  // Fetch the user's BraydenToken balance
  useEffect(() => {
    const fetchTokenBalance = async () => {
      // Return if no address or signer
      if (!address || !signer) {
        setIsLoading(false);
        return;
      }

      try {
        const tokenContract = new ethers.Contract(
          tokenContractAddress,
          BraydenTokenABI,
          signer
        );

        const balance = await tokenContract.balanceOf(address);
        const decimals = await tokenContract.decimals();
        const symbol = await tokenContract.symbol();
        const displayValue = ethers.utils.formatUnits(balance, decimals);
        setTokenBalance({ displayValue, symbol });
      } catch (error) {
        console.error("Error fetching token balance:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTokenBalance();
  }, [address, signer]);

  const mintBraydenToken = async () => {
    if (!signer) {
      console.error("Signer is not available");
      return;
    }

    try {
      const tokenContract = new ethers.Contract(
        tokenContractAddress,
        BraydenTokenABI,
        signer // Only the owner (me) can mint tokens
      );
      const tx = await tokenContract.mint(
        address,
        ethers.utils.parseUnits("1000", 18)
      );
      await tx.wait();
    } catch (error) {
      console.error("Error minting tokens:", error);
    }
  };

  return (
    <NavbarSection>
      <LogoContainer onClick={() => router.push("/")}>
        <Image src={logo} alt="TokenToss Logo" width={32} height="auto" />
        <LogoText>TokenToss</LogoText>
      </LogoContainer>
      <LinksContainer>
        <Button
          onClick={() => router.push("/war")}
          padding="8px"
          backgroundColor="transparent"
          hoverBackgroundColor="transparent"
          textColor={({ theme }) => theme.primaryLight}
          hoverTextColor={({ theme }) => theme.primaryDark}
        >
          War
        </Button>
        <Button
          onClick={() => router.push("/coin-flip")}
          padding="8px"
          backgroundColor="transparent"
          hoverBackgroundColor="transparent"
          textColor={({ theme }) => theme.primaryLight}
          hoverTextColor={({ theme }) => theme.primaryDark}
        >
          Coin Flip
        </Button>
      </LinksContainer>
      <WalletInfo>
        {/* <Button
          onClick={mintBraydenToken}
          padding="8px"
          backgroundColor="transparent"
          hoverBackgroundColor="transparent"
          textColor={({ theme }) => theme.primaryLight}
          hoverTextColor={({ theme }) => theme.primaryDark}
        >
          Mint Tokens
        </Button> */}
        {address && !isLoading && (
          <p>
            {tokenBalance?.displayValue} {tokenBalance?.symbol}
          </p>
        )}
        <ConnectWallet />
      </WalletInfo>
    </NavbarSection>
  );
}

const NavbarSection = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
  padding: 6px 12px;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.accent};
  background-color: ${({ theme }) => theme.background};
  z-index: 100;
`;

const LinksContainer = styled.div`
  display: flex;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
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

const WalletInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: ${({ theme }) => theme.primaryLight};
  font-size: ${({ theme }) => theme.fontSize.default};
`;

export default Navbar;
