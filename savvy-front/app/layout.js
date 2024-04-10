"use client";

import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import { Montserrat } from "next/font/google";

import StyledComponentsRegistry from "../lib/registry";
import Footer from "./Footer";
import Nav from "./Nav";
import { Providers } from "./providers";
import "./global.css";

const inter = Montserrat({
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

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

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <StyledComponentsRegistry>
          {/* do not remove fragments. Otherwise: Error: React.Children.only
          expected to receive a single React element child. */}
          <>
            <Nav />
            <main>{children}</main>
            <Footer />
          </>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}