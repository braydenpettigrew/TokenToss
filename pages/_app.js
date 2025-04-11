import { createGlobalStyle } from "styled-components";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@/context/ThemeContext";

export const GlobalStyles = createGlobalStyle`
* {
  font-family: "Roboto", sans-serif;
  box-sizing: border-box;
  font-weight: 400;
  margin: 0;
  padding: 0;
  line-height: 1;

  ::-webkit-scrollbar {
    width: 12px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color:#9AE19D;
    border-radius: 10px;
    border: 3px solid transparent;
  }
}
`;

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
      <ToastContainer position="top-right" autoClose={8000} />
    </>
  );
}
