import React, { createContext, useContext, useState } from "react";

const TokenBalanceContext = createContext();

export const TokenBalanceProvider = ({ children }) => {
  const [tokenBalance, setTokenBalance] = useState(null);
  const contractAddress = "0xFBB9bBa94624Ad72a41b979E4073ab81e7b3ed97";

  return (
    <TokenBalanceContext.Provider value={{ tokenBalance, setTokenBalance, contractAddress }}>
      {children}
    </TokenBalanceContext.Provider>
  );
};

export const useTokenBalance = () => useContext(TokenBalanceContext);
