import React, { Component } from "react";
import styled, { ThemeProvider } from "styled-components";
import { withRouter } from "next/router";
import { ModalProvider } from "styled-react-modal";
import dynamic from "next/dynamic";

import Nav from "./Nav";
import Meta from "./Meta";
import Footer from "./Footer";
import Header from "./Header";
import Layout from "../components/Layout";
import User from "./User";

// const DynamicComponent = dynamic(import("./Alert"), {
//   ssr: false,
// });

const theme = {
  blue: "#112A62",
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

const StyledPage = styled.div`
  background: #fff;
  color: ${(props) => props.theme.black};
`;

const Inner = styled.div`
  margin: 0;
  width: 100%;
`;

const SpecialModalBackground = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 30;
  background-color: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
`;

const Page = ({ children, router }) => {
  return (
    <ThemeProvider theme={theme}>
      <StyledPage>
        <User>
          {({ data: { me } }) => (
            <>
              <Meta />
              <Layout>
                <ModalProvider backgroundComponent={SpecialModalBackground}>
                  {/* <DynamicComponent /> */}
                  <Header />
                  <Nav />
                  <Inner>{children}</Inner>
                  <Footer />
                </ModalProvider>
              </Layout>
            </>
          )}
        </User>
      </StyledPage>
    </ThemeProvider>
  );
};

export default withRouter(Page);
