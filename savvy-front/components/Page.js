import React, { Component } from 'react';
import styled, {ThemeProvider, injectGlobal } from 'styled-components';
import Header from './Header';
import Meta from './Meta';


const theme = {
    blue: '#6DAAE1',
    black: '#393939',
    maxWidth: '800px',
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
    }
    *, *:after, *:after {
        box-sizing: inherit;
    }
    body {
        padding: 0;
        margin: 0;
        font-size:1.5rem;
        line-height: 2;
    }
    a {
        text-decoration: none;
        color: ${theme.black};
    }
`

class Page extends Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
              <StyledPage>
                <Meta/>
                <Header/>
                <Inner>{this.props.children}</Inner>
              </StyledPage>
            </ThemeProvider>
        );
    }
}

export default Page;