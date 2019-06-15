import React, { Component } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Icon from 'react-icons-kit';
import {vk} from 'react-icons-kit/icomoon/vk'
import {instagram} from 'react-icons-kit/icomoon/instagram'
import {telegram} from 'react-icons-kit/icomoon/telegram'


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
        font-size: 1.8rem;
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
    p {
        color: white;
        margin: 0%;
        padding-right: 10px;
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
    .IP {
        display: flex;
        flex-direction: row;
        
    }
    .social {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        a {
            padding-left: 15px;
        }

    }
    @media (max-width: 900px) {
        flex-direction: column;  
        .IP {
            display: flex;
            flex-direction: column;  
        } 
       
    }
`;


const Footer = () => (
    <FooterStyles>
        <MissionContactStyles>
            <div className="motto">Savvy – это сайт для управления своими юридическими знаниями. <br/>
            Проходите курсы, участвуйте в мероприятиях и рассказывайте о себе коллегам и работодателям.
            </div>
            <LinksStyles>
                <Link href={{
                        pathname: '/legal',
                        query: { name: 'terms' }
                    }}>
                    <a>
                        Пользовательское соглашение
                    </a>
                </Link>
                <Link href={{
                        pathname: '/legal',
                        query: { name: 'privacy' }
                    }}>
                    <a>
                        Политика обработки персональных данных
                    </a>
                </Link>
                <Link href={{
                        pathname: '/legal',
                        query: { name: 'offer' }
                    }}>
                    <a>
                        Оферта
                    </a>
                </Link>
                <a href="mailto:mikhailkochkin@savvvy.app">Напишите нам</a>  
            </LinksStyles> 
        </MissionContactStyles>
        <LegalAndSocial>
            <div className="year">© 2019 – Savvy</div>
            <div className="IP">
                <p>ИП Кочкин Михаил Валерьевич</p>
                <p>ИНН: 771771639796</p>
                <p>ОГРНИП: 318774600589944 </p>
            </div>
            <div className="social" >
        
                <a target="_blank" href='https://vk.com/savvy_university'>
                  <Icon size={40} icon={vk}/>  
                </a>
         
                <a target="_blank" href='https://www.instagram.com/savvy_legal'>
                  <Icon size={40} icon={instagram}/>  
                </a>
    
                <a target="_blank" href='https://t.me/SavvyLive'>
                  <Icon size={40} icon={telegram}/>  
                </a>
     
            </div>
        </LegalAndSocial>
    </FooterStyles>
    );

export default Footer;

