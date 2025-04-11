import React, { createContext, useContext } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

const ThemeContext = createContext();

const fontSize = {
  xlheading: "40px",
  heading: "30px",
  subheading: "24px",
  label: "18px",
  default: "16px",
  secondary: "14px",
};

export const myTheme = {
  primaryDark: "#4B644A",
  primaryLight: "#9AE19D",
  background: "#0D0106",
  accent: "#E7E7EF",
  white: "#FFFFFF",
  shadow: "#e1e0e0",
};

export const ThemeProvider = ({ children }) => {
  const theme = {
    ...myTheme,
    fontSize,
  };

  return (
    <ThemeContext.Provider value={theme}>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
