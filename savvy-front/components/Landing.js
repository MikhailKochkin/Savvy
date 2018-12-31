import React, { Component } from 'react';
import styled from 'styled-components';
import Link from 'next/link'

const Landing = styled.div`
    width: 100%;
    height: auto;
    content:url("../static/books.jpg");
    background-color: #80a3db;
    position: absolute;
    z-index: -1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Hello = styled.div`
    width: 40%;
    top: 20%;
    left: 30%;
    text-align: center;
    position: absolute;
    height: auto;
    background-color: white;
    opacity: 0.95;
    font-size: 24px;
    z-index: 1;
    border-radius: 10px;
    padding: 3%;
    button {
        background-color: #1E90FF;
        opacity: 0.8;
        font-weight: 700;
        text-transform: uppercase;
        cursor: pointer;
        border: none;
        color: white;
        padding: 15px 32px;
        text-decoration: none;
        display: inline-block;
        font-size: 2.2rem;
        width: 70%;
        margin: 0.5%;
        a {
            color: white;
        }
    }
    button:hover {
        opacity: 1;
    }

`;

const LandingPage = () => (
            <> 
                <Landing/>
                <Hello>
                    <h1>Welcome to the Savvy website!</h1>
                    <p> Savvy (derivative from Savigny, a famous German lawyer) is an online platform 
                    for efficient sharing of legal information.</p>
                    <Link prefetch href="/courses">
                        <button><a>Start the journey</a></button>
                    </Link>
                </Hello>
            </>
        ); 

export default LandingPage;