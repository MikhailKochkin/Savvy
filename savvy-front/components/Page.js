import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import { withRouter } from "next/router";

// import Nav from "./Nav";
import Meta from "./Meta";
// import Layout from "../components/Layout";
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
`;

const GlobalStyle = createGlobalStyle`

    html {
        font-family: Gill Sans, sans-serif;
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
        line-height: 1.8;
        height:100%;
    }
    a {
        text-decoration: none;
        color: ${theme.black};
    }
`;

const Page = ({ children, router }) => {
  return (
    <ThemeProvider theme={theme}>
      <StyledPage>
        <>
          <GlobalStyle />
          <Meta />
          <Inner>{children}</Inner>
        </>
      </StyledPage>
    </ThemeProvider>
  );
};

export default withRouter(Page);
