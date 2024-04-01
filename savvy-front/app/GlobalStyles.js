import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
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
        color: #000000;
    }
`;

export default GlobalStyles;
