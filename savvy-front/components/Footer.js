import React, { Component } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Icon from 'react-icons-kit';
import {vk} from 'react-icons-kit/icomoon/vk'

const FooterStyles = styled.div`
    background-color: #112A62;
    color: white;
    max-height: 40%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const MissionContactStyles = styled.div`
    width: 70%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 2% 2%;
    div {
        font-size: 2.2rem;
    }
    @media (max-width: 900px) {
        flex-direction: column;
        div {
          font-size: 1.6rem; 
        }
        .motto {
            padding-bottom: 2%;
            border-bottom: 1px solid white;
            width: 105%;
        }
       
    }
`;

const LinksStyles = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    a {
        color: white;
        /* padding: 0 2%; */
    }
    a:hover {
        color: #005987;
        /* text-decoration: underline; */
    }
`;

const LegalAndSocial = styled.div`
    border-top: 0.5px solid white;
    width: 70%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 1% 2%;
    padding-bottom: 2%;
    font-size: 1.8rem;
    a {
        color: white;
    }
    div {
        padding: 0% 0%;
    }
    div > a {
        color: white;
    }
    a:hover, div > a:hover {
        color: #005987;
    }
    @media (max-width: 900px) {
        .year {
            font-size: 1.2rem;;
        }
        a {
            font-size: 1.2rem;
        }
       
    }
`;


const Footer = () => (
    <FooterStyles>
        <MissionContactStyles>
            <div className="motto">Наша задача – создавать новые инструменты для эффективного обучения <br/> и поиска нужной правовой информации</div>
            <LinksStyles>
                <Link href={{
                        pathname: '/about',
                    }}>
                    <a>
                        О нас
                    </a>
                </Link>
                <Link href={{
                        pathname: '/about',
                    }}>
                    <a>
                        Контактная информация
                    </a>
                </Link>
                <Link href={{
                        pathname: '/cases',
                    }}>
                    <a>
                        Курсы
                    </a>
                </Link>
                <Link href={{
                        pathname: '/cases',
                    }}>
                    <a>
                        Песочницы
                    </a>
                </Link>
            </LinksStyles> 
        </MissionContactStyles>
        <LegalAndSocial>
            <div className="year">© 2019 – Savvy</div>
            <Link href={{
                    pathname: '/pd',
                }}>
                <a>
                    Политика обработки персональных данных
                </a>
            </Link>
            <div className="VK">
                <a target="_blank" href='https://vk.com/savvy_university'>
                  <Icon size={40} icon={vk}/>  
                </a>
            </div>
        </LegalAndSocial>
    </FooterStyles>
    );

export default Footer;

