import React, { Component } from 'react';
import styled from 'styled-components';
import Link from 'next/link'

const Level1 = styled.div`
    display: flex;
    flex-direction: row;
    @media (max-width: 900px) {
        flex-direction: column;
    }
`;

const IntroText = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    align-content: center;
    align-items: center;
    flex-basis: 50%;
    background: #F0F8FF;
    @media (max-width: 900px) {
        line-height: 1.4;
    }
`;

const Header = styled.p`
    font-size: 4rem;
    font-weight: bold;
    @media (max-width: 900px) {
        margin: 3%;
    }
`;

const Text = styled.p`
    font-size: 2.6rem;
    margin-left: 3%;
    margin-right: 3%;
`;


const IntroPicture= styled.div`
    width: 50%;
    height: 400px;
    content:url("../static/laptop.jpg");
    flex-basis: 50%;
    @media (max-width: 900px) {
        width: 100%;
        height: auto;
    }
`;

const Introduction = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    align-content: center;
    align-items: center;
    background: white;
    padding-bottom: 3%;
`;

const Ask = styled.p`
    font-size: 3.2rem;
    @media (max-width: 900px) {
        margin: 8%;
        font-size: 2.2rem;
    }
`;

const Options = styled.div`
    font-size: 1.8rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    @media (max-width: 900px) {
        flex-direction: column;
    }
`;

const Option = styled.p`
    background: ${props => props.active ? "#F0F8FF" : "white"};
    padding: 2%;
    flex-basis: 33%;
    cursor: pointer;
    @media (max-width: 900px) {
      margin: 0;
      padding: 4%;
    }
`;

const Pool = styled.div`
    display: flex;
    flex-direction: column;
    flex-basis: 50%;
    padding: 0 5%;
    align-items: center;
    justify-content: space-between;
    @media (max-width: 900px) {
      flex-direction: column;
      order: 1;
      margin-bottom: 5%;
      border-top: 1px solid black;
    }
`;

const Study= styled.div`
    width: 50%;
    height: auto;
    content:url("../static/study.jpg");
    flex-basis: 50%;
    @media (max-width: 900px) {
      width: 100%;
      order: 2;
    }
`;

const Teach= styled.div`
    width: 50%;
    height: auto;
    content:url("../static/school.jpg");
    flex-basis: 50%;
    @media (max-width: 900px) {
      width: 100%;
      order: 2;
    }
`;

const Career= styled.div`
    width: 50%;
    height: auto;
    content:url("../static/workplace.jpg");
    flex-basis: 50%;
    @media (max-width: 900px) {
      width: 100%;
      order: 2;
    }
`;

const Offer = styled.div`
    font-size: 2rem;
    display: flex;
    flex-direction: row;
    text-align: center;
    align-items: center;
    width: 100%;
    padding: 3%;
    @media (max-width: 900px) {
      flex-direction: column;
    }
`;

const Solution = styled.div`
    font-size: 2rem;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
`;

const Button = styled.div`
    font-size: 2.4rem;
    padding: 1% 2%;
    background: #02B3E4;
    color: white;
    border-radius: 10px;
    width: 300px;
    cursor: pointer;
    &:hover {
      background: #1D7CF8;
    }
    &:active{
      padding: 0.85% 1.5%;
      width: 298px;
    }
    @media (max-width: 900px) {
      font-size: 1.8rem;
      width: 250px;
    }
`;

const Box = styled.p`
    background: #F0F8FF;
    padding: 2%;
    width: 50%;
    @media (max-width: 900px) {
      width: 80%;
    }
`;

class LandingPage extends Component {
    state = {
        active: 1
    }
    onOne = () => this.setState({ active: 1 });
    onTwo = () => this.setState({ active: 2 });
    onThree = () => this.setState({ active: 3 });
    
    render() {
        const { me } = this.props
        return (
            <>
                <Level1>
                    <IntroText>
                        <Header>Savvvy.app</Header>
                        <Text>Все, что нужно для онлайн-образования юриста</Text>
                        {/* <Text>Экосистема для онлайн образования юристов</Text>*/}
                    </IntroText>  
                    <IntroPicture/>
                </Level1>
                <Introduction>
                        <Ask>
                            Расскажите о себе и мы настроим систему под вас
                        </Ask>
                        <Options>
                            <Option active={this.state.active === 1} onClick={this.onOne}> 1.  Я хочу развивать свои юридические навыки онлайн </Option>
                            <Option active={this.state.active === 2} onClick={this.onTwo}> 2.  Я хочу учить праву онлайн </Option>
                            <Option active={this.state.active === 3} onClick={this.onThree}> 3.  Я хочу найти классную работу / талантливых сотрудников </Option>
                        </Options>
                        <Solution>
                            {this.state.active === 1 && 
                            <Offer>
                                <Study/>
                                <Pool>
                                    <p>Выберите свой карьерный трек и развивайтесь с помощью коротких 
                                    алгоритмизированных онлайн курсов.</p>
                                    { !me && me === null && <Link href={{
                                            pathname: '/signup'
                                        }}>
                                        <a>
                                            <Button>Начать учиться!</Button>

                                        </a>
                                    </Link> }
                                {/* </Pool>
                                <Pool> */}
                                    { me && me !== null && me.careerTrackID !== null && 
                                    <Link href={{
                                            pathname: '/courses'
                                        }}>
                                        <a>
                                            <Button>Начать учиться!</Button>

                                        </a>
                                    </Link> }
                                {/* </Pool>
                                <Pool> */}
                                    { me && me !== null && me.careerTrackID === null 
                                    && 
                                    <Link href={{
                                            pathname: '/chooseCareer',
                                            // query: { id: me.id}
                                        }}>
                                        <a>
                                            <Button>Начать учиться!</Button>

                                        </a>
                                    </Link> }
                                </Pool>
                            </Offer>}
                            {this.state.active === 2 && 
                              <Offer>
                                  <Teach/> 
                                  <Pool> 
                                    <p>Создавайте онлайн курсы для своих студентов, используя все возможности веб-технологий.</p>

                                    <Box>Скоро запуск</Box>
                            
                                    {/* { !me && me === null && <Link href={{
                                            pathname: '/signup'
                                        }}>
                                        <a>
                                            <Button onClick={this.onClicked}>Начать преподавать!</Button> 

                                        </a>
                                    </Link> }

                                    { me && me !== null && 
                                    <Link href={{
                                            pathname: '/teach',
                                            // query: { id: me.id}
                                        }}>
                                        <a>
                                            <Button onClick={this.onClicked}>Начать преподавать!</Button>

                                        </a>
                                    </Link> } */}
                                  </Pool>
                              </Offer>}
                            {this.state.active === 3 && <Offer>
                                <Career/> 
                                <Pool>
                                    <p>Прокачайте резюме и покажите себя рекрутерам. </p>
                                    {/* <Button onClick={this.onClicked}>Начать искать!</Button> */}
                                    <Box>Скоро запуск</Box>
                                </Pool>
                            </Offer>}
                        </Solution>
                    </Introduction>
            </>
        )
    }}

export default LandingPage;