import React, { Component } from 'react';
import styled from 'styled-components';

const P = styled.p`
    font-size: 2rem;
    flex: 1 30%;
`;

const Tip = styled.div`
    display: flex;
    flex-direction: row;
    @media (max-width: 1000px) {
        flex-direction: column;
        align-items: center;
        P {
            margin-top: 0;
        }
    }
`;

const Img = styled.img`
    flex: 2 70%;
    width: 70%;
    height: 30%;
    @media (max-width: 800px) {
        width: 100%;
    }
`;

const ChooseButtons = styled.div`
    display: flex;
    flex-direction: row;
    @media (max-width: 800px) {
        flex-direction: column;
        align-items: center;
    }
`;

const ChooseButton = styled.button`
    font-size: 0.8rem;
    border: ${props => props.active ? "2px solid #0E78C6" : "2px solid #fff"};
    color: ${props => props.active ? "#008CBA" : "white"};
    background-color: ${props => props.active ? "white" : "#008CBA"};
    margin: 0 0.5%;
    width: 150px;
    cursor: pointer;
    @media (max-width: 800px) {
        margin: 1% 0;
        padding: 2% 1%;
    }
`;

const Nav = styled.div`
    border-bottom: 2px solid #0A2342;
    padding-bottom: 1%;
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

const Nav2 = styled.div`
    border-top: 2px solid #0A2342;
    margin-top: 1%;
    padding-top: 1%;
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

class Training extends Component {
    constructor(props) {
        super(props);

    this.state = {
        page: 'step1',
        step1: true,
        step2: false,
        step3: false,
        step4: false
        }
    this.pageView = ''
  }
    onStep1 = () => {this.setState({page: "step1", step1: true, step2: false, step3: false, step4: false})}
    onStep2 = () => {this.setState({page: "step2", step1: false, step2: true, step3: false, step4: false})}
    onStep3 = () => {this.setState({page: "step3", step1: false, step2: false, step3: true, step4: false})}
    onStep4 = () => {this.setState({page: "step4", step1: false, step2: false, step3: false, step4: true})}

    render() {
        switch(this.state.page) {
            case "step1":
            this.pageView = (
                <>
                    <h1>Что такое Savvy?</h1>
                    <Tip>
                        <P>
                            Savvy – это место, где удобно и эффективно изучать право. Savvy строится из двух больших частей: курсов и песочниц.
                            <br/>Курсы и песочницы вы можете найти на главной странице, нажав, как на картинке, на одну из кнопок.
                            <br/>Больше узнать об особенностях курсов и песочниц вы сможете на шаге 2 и 3.
                        </P>
                        <Img src="../static/Тр1.png" height="auto" width="50%"/>
                    </Tip>
                </>
                )
                break;
            case "step2":
            this.pageView = (
                <>
                    <h1>В чем особенность курсов на Savvy?</h1>
                    <Tip>
                        <P>
                        Мы хотим решить проблему курсов, добавив в них как можно больше возможностей для тестирования своих знаний и оттачивания навыков.
                        <br/>Курсы сейчас состоят из трех основных частей. Уроков, в которых могут содержаться текстовые и видео материалы, тестовых заданий и задач. 
                        <br/>Впоследствии мы добавим другие формы тестирования знаний: возможность составления документов онлайн, 
                        поиск логических связей о ошибок в документах и так далее.
                        </P>
                        <Img src="../static/Tr2.png" height="auto" width="50%"/>
                    </Tip>
                </>
                )
                break;
            case "step3":
            this.pageView = (
                <>
                  <h1>Что такое песочницы и как ими пользоваться?</h1>
                    <P>
                    Песочницы  - это страницы, на которых юристы смогут совместно разрабатывать различные правовые вопросы. 
                    Приведу пример. Вы в своей рабочей или учебной деятельности сталкиваетесь со сложным вопросом, который вы не можете решить самостоятельно или вы просто хотите услышать мнение других юристов. 
                    Например, таким вопросом может быть "признание и исполнение иностранных арбитражных решений российскими судами". 
                    Или “основные вопросы для прохождения собеседований в корпоративной практику крупных российских и иностранных юридических фирм”. 
                    Или “Вопросы к экзамену по гражданскому праву в МГУ”. В результате вместо того, чтобы решать эти вопросы в одиночку, 
                    вы подключите все сообщество студентов и юристов к разработке актуальной проблемы. Каждый сможет написать свое мнение или поддержать понравившуюся ему позицию лайком. 
                    В результате в песочнице будет много позиций по заданному вопросу, но самые популярные ответы вы всегда сможете найти по наибольшему количеству лайков напротив них. 
                    </P>
                    <Img src="../static/Tr3.png" height="auto" width="50%"/>
                </>
                )
                break;
            case "step4":
            this.pageView = (
                <>
                    <h1>Как создать свой собственный курс?</h1>
                    <Tip>
                        <P>
                        Это очень просто. В левом верхнем углу экрана вы можете найти кнопку “Создать”. 
                        Нажмите на нее и выберете раздел, посвященный курсам. 
                        Заполните базовую информацию о курсе, выберите, будет ли ваш курс открытым для всех или закрытым.
                        В последнем случае вам придется самим одобрять каждую заявку на обучение на вашем курсе. 
                        После этого нажмите “Создать”. 
                        После этого вы попадете на страницу курса, где вы уже сможете перейти к созданию материалов: 
                        уроков, тестов и задач. 
                        </P>
                        <Img src="../static/Tr4.png" height="auto" width="50%"/>
                    </Tip>
                </>
                )
                break;
            default:
            this.pageView = (
                <>
                    <h1>Что такое Savvy?</h1>
                </>
                )
                break;
            }
        return (
            <div>
                  <h1>Краткий гайд по использованию Savvy</h1>
                  <Nav>
                    <ChooseButtons>
                        <ChooseButton
                            onClick = {this.onStep1}
                            active={this.state.step1}
                        >
                            <h1>Шаг 1</h1>
                        </ChooseButton>
                        <ChooseButton
                            onClick = {this.onStep2}
                            active={this.state.step2}
                        >
                            <h1>Шаг 2</h1>
                        </ChooseButton>
                        <ChooseButton
                            onClick = {this.onStep3}
                            active={this.state.step3}
                        >
                            <h1>Шаг 3</h1>
                        </ChooseButton>
                        <ChooseButton
                            onClick = {this.onStep4}
                            active={this.state.step4}
                        >
                            <h1>Шаг 4</h1>
                        </ChooseButton>
                    </ChooseButtons>
                  </Nav>
                  {this.pageView}
                <Nav2>
                    <ChooseButtons>
                        <ChooseButton
                            onClick = {this.onStep1}
                            active={this.state.step1}
                        >
                            <h1>Шаг 1</h1>
                        </ChooseButton>
                        <ChooseButton
                            onClick = {this.onStep2}
                            active={this.state.step2}
                        >
                            <h1>Шаг 2</h1>
                        </ChooseButton>
                        <ChooseButton
                            onClick = {this.onStep3}
                            active={this.state.step3}
                        >
                            <h1>Шаг 3</h1>
                        </ChooseButton>
                        <ChooseButton
                            onClick = {this.onStep4}
                            active={this.state.step4}
                        >
                            <h1>Шаг 4</h1>
                        </ChooseButton>
                    </ChooseButtons>
                  </Nav2>
            </div>
        );
    }
}

export default Training;