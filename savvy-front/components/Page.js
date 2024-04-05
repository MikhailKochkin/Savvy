import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import { withRouter, useRouter } from "next/router";
import { ModalProvider } from "styled-react-modal";
import dynamic from "next/dynamic";

import Meta from "./Meta";
import Footer from "./Footer";
import Header from "./Header";
import Layout from "../components/Layout";
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

const StyledPage = styled.div`
  background: #fff;
  color: ${(props) => props.theme.black};
`;

const Inner = styled.div`
  margin: 0;
  width: 100%;
  min-height: 80vh;
`;

const GlobalStyle = createGlobalStyle`

    html {
        font-family: 'Montserrat', sans-serif;
        box-sizing: border-box;
        font-size: 10px;
        height:100%;
        scroll-behavior: smooth;

    }
    *, *:after, *:after {
        box-sizing: inherit;
    }
    body {
        padding: 0;
        margin: 0;
        font-size:1.5rem;
        font-weight: 500;
        line-height: 1.8;
        height:100%;
    }
    a {
        text-decoration: none;
        color: ${theme.black};
    }
`;

const DynamicNav = dynamic(import("./Nav"), {
  ssr: false,
});

const DynamicSpaceNav = dynamic(import("./SpaceNav"), {
  ssr: false,
});

const Page = ({ children }) => {
  const router = useRouter();
  return (
    <ThemeProvider theme={theme}>
      <StyledPage>
        <>
          <GlobalStyle />
          <Meta />
          <Layout>
            <ModalProvider>
              <Header />
              {router.pathname !== "/conf" &&
                router.pathname !== "/embeddedPage" &&
                router.pathname !== "/recommend" &&
                router.pathname !== "/" &&
                router.pathname !== "/build_your_simulator" &&
                router.pathname !== "/connect" &&
                router.pathname !== "/useful" && <DynamicNav />}
              {router.pathname == "/useful" && <DynamicSpaceNav />}
              <Inner>{children}</Inner>
              {router.pathname !== "/lesson" &&
                router.pathname !== "/demo" &&
                router.pathname !== "/embeddedPage" &&
                router.pathname !== "/build_your_simulator" && <Footer />}
            </ModalProvider>
          </Layout>
        </>
      </StyledPage>
    </ThemeProvider>
  );
};

export default withRouter(Page);
