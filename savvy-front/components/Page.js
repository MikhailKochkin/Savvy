import React, { Component } from 'react';
import styled, {ThemeProvider, injectGlobal } from 'styled-components';
import { withRouter } from 'next/router'
import Nav from './Nav';
import Meta from './Meta';
import LandingPage from './Landing';
import Footer from './Footer';
import Header from './Header'

const theme = {
    blue: '#6DAAE1',
    black: '#393939',
    maxWidth: '1200px',
    offWhite: '#EDEDED',
    lightGrey: '#E1E1E1',
};

const StyledPage = styled.div`
    background: ${props => props.theme.lightgrey};
    color: ${props => props.theme.black};
`;

const Inner = styled.div`
    max-width: ${props => props.theme.maxWidth};
    margin: 0 auto;
    padding: 2rem;
`;

injectGlobal`
    html {
        box-sizing: border-box;
        font-size: 10px;
        font-family: "Gill Sans", serif;
        height:100%;
    }
    *, *:after, *:after {
        box-sizing: inherit;
    }
    body {
        padding: 0;
        margin: 0;
        font-size:1.5rem;
        line-height: 2;
        height:100%;
    }
    a {
        text-decoration: none;
        color: ${theme.black};
    }
`

const Page = ({ children, router }) => {
        return (
            <ThemeProvider theme={theme}>
              <StyledPage>
                <Meta/>
                <Header/>
                <Nav/>
                <Inner>{children}</Inner>
                <Footer/> 
                {/* {router.pathname !== '/' ? <Footer/> : null} */}
              </StyledPage>
            </ThemeProvider>
        );
}

export default withRouter(Page);