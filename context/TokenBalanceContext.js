import React, { createContext, useContext, useState } from "react";

const TokenBalanceContext = createContext();

export const TokenBalanceProvider = ({ children }) => {
  const [tokenBalance, setTokenBalance] = useState(null);

  return (
    <TokenBalanceContext.Provider value={{ tokenBalance, setTokenBalance }}>
      {children}
    </TokenBalanceContext.Provider>
  );
};

export const useTokenBalance = () => useContext(TokenBalanceContext);
