"use client";

import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import StyledComponentsRegistry from "../lib/registry";
import GlobalStyles from "./GlobalStyles";
import Footer from "./Footer";
// import { useUser } from "./User";

const theme = {
  blue: "#6DAAE1",
  black: "#393939",
  maxWidth: "1200px",
  offWhite: "#EDEDED",
  lightGrey: "#E1E1E1",
  red: "#de6b48",
  darkRed: "#ac2c05",
  green: "#84BC9C",
  darkGreen: "#294d4a",
  yellow: "#FDF3C8",
};
// export const metadata = {
//   title: "Next.js",
//   description: "Generated by Next.js",
// };

const StyledPage = styled.div`
  background: #fff;
  color: ${(props) => props.theme.black};
`;

const Inner = styled.div`
  margin: 0;
  width: 100%;
  min-height: 80vh;
`;

export default function RootLayout({ children }) {
  return (
    // <ThemeProvider theme={theme}>
    <html lang={"ru"}>
      <StyledPage>
        <StyledComponentsRegistry>
          {/* <GlobalStyles /> */}
          {children}
        </StyledComponentsRegistry>
        <Footer />
      </StyledPage>
    </html>
  );
}
