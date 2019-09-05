import React, { Component } from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import { withRouter } from "next/router";
import { ModalProvider } from "styled-react-modal";

import Nav from "./Nav";
import Meta from "./Meta";
import Footer from "./Footer";
import Header from "./Header";
import Layout from "../components/Layout";

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
  yellow: "#FDF3C8"
};

const StyledPage = styled.div`
  background: #fff;
  color: ${props => props.theme.black};
`;

const Inner = styled.div`
  margin: 0;
  width: 100%;
`;

const Page = ({ children, router }) => {
  return (
    <ThemeProvider theme={theme}>
      <StyledPage>
        <Meta />
        <Layout>
          <ModalProvider>
            <Header />
            {router.pathname !== "/" && <Nav />}
            <Inner>{children}</Inner>
            {router.pathname !== "/" && <Footer />}
          </ModalProvider>
        </Layout>
      </StyledPage>
    </ThemeProvider>
  );
};

export default withRouter(Page);
