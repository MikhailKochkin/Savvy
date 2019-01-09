import Link from 'next/link'
import Nav from './Nav';
import styled from 'styled-components';
import Router from 'next/router';
import NProgress from 'nprogress';

Router.onRouteChangeStart = () => {
  NProgress.start();
}
Router.onRouteChangeComplete = () => {
  NProgress.done(); 
}
Router.onRouteChangeError = () => {
  NProgress.done(); 
}

const linkStyle = {
  marginRight: 15
}

const Logo = styled.h1`
    text-align: center;
    background-color: #6DAAE1;
    color: white;
    font-size: 2rem;
    margin: 1.5% 35%;
    padding: 0.5%;
    a {
       text-decoration: none;
       color:white;
    }
`;

const Header = () => (
    <div>
     
    </div>
)

export default Header