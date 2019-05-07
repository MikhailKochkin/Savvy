import React, { Component } from 'react';
import styled from 'styled-components';
import  { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Link from 'next/link';
import { NavButton, SubmitButton } from '../styles/Button';
import AreYouATeacher from '../auth/AreYouATeacher';
import PleaseSignIn from '../auth/PleaseSignIn';

const MaterialPerPage = 5;

const CREATE_PROBLEM_MUTATION = gql`
  mutation CREATE_PROBLEM_MUTATION(
    $text: String!
    $hintsList: [String]
    $solutionList: [String]
    $answer: String!
    $lessonID: ID!
  ) {
    createProblem(
        text: $text
        hintsList: $hintsList
        solutionList: $solutionList
        answer: $answer
        lessonID: $lessonID
    ) {
      id
    }
  }
`;

const PAGE_PROBLEMS_QUERY = gql`
  query PAGE_PROBLEMS_QUERY($id: ID!, $skip: Int = 0, $first: Int = ${MaterialPerPage}) {
    problems(where: {lessonID: $id}, skip: $skip, orderBy: createdAt_ASC, first: $first) {
      id
      user {
          id
      }
    }
  }
`;

const Message = styled.p`
    background-color: #00FF7F;
    font-size: 1.8rem;
    padding: 1% 2%;
    border-radius: 10px;
    width: 30%;
    display: none;
`;

const Textarea = styled.textarea`
    font-size: 1.6rem;
    font-family: Georgia, 'Times New Roman', Times, serif;
    line-height: 2.5rem;
    padding: 10px;
    @media (max-width: 800px) {
        width: 400px;
    }
`;

const Block = styled.h1`
    width: 59%;
    
`

const CustomSelect = styled.div`

`;

const P = styled.p`
    font-size: 1.8rem;
`;

const Img = styled.img`
    border: 1px solid black;
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
    font-size: 1.6rem;
    border: ${props => props.active ? "2px solid #0E78C6" : "2px solid #fff"};
    color: ${props => props.active ? "#0E78C6" : "white"};
    background-color: ${props => props.active ? "white" : "#0E78C6"};
    padding: 1% 1%;
    margin: 0 0.5%;
    width: 200px;
    @media (max-width: 800px) {
        margin: 1% 0;
        padding: 2% 1%;
    }
`;

class CreateProblem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            button: 'text',
            button1: true,
            button2: false,
            button3: false,
            button4: false,
            stepsNumber: 1,
            text: localStorage.getItem('text') || '',
            hint: localStorage.getItem('hints') || '',
            image: '',
            upload: false,
            solution1: localStorage.getItem('solution1') || '',
            solution2: localStorage.getItem('solution2') || '',
            solution3: localStorage.getItem('solution3') || '',
            solution4: localStorage.getItem('solution4') || '',
            solution5: localStorage.getItem('solution5') || '',
            solution6: localStorage.getItem('solution6') || '',
            solution7: localStorage.getItem('solution7') || '',
            solutionList: [],
            hintsList: [],
            answer: localStorage.getItem('answer') || '',
            // revealSolution: false,
            // revealHints: false,
            // revealAnswer: false,
        }
        this.puzzleStage = ''
    }

    onText = () => this.setState({ button: 'text', button1: true, button2: false, button3: false, button4: false })
    onHints = () => this.setState({ button: 'hints', button1: false, button2: true, button3: false, button4: false})
    onSolution = () => this.setState({ button: 'solution', button1: false, button2: false, button3: true, button4: false})
    onAnswer = () => this.setState({ button: 'answer', button1: false, button2: false, button3: false, button4: true})

    onToggleHints = () => {
        this.setState(prevState => ({
            revealHints: !prevState.revealHints
        }))
    }

    onToggleSolution = () => {
        this.setState(prevState => ({
            revealSolution: !prevState.revealSolution
        }))
    }

    onToggleAnswer = () => {
        this.setState(prevState => ({
            revealAnswer: !prevState.revealAnswer
        }))
    }

    uploadFile = async e => {
        this.setState({
          upload: true,
          image: ''
        })
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'savvy-app');
        const res = await fetch('https://api.cloudinary.com/v1_1/mkpictureonlinebase/image/upload', {
          method: 'POST',
          body: data,
        });
        const file = await res.json();
        this.setState({
          image: file.secure_url,
          upload: false
        })
      };

    onUpload = e => {
        e.preventDefault();
        this.state.hint !== '' ? this.setState((prevState) => ({ hintsList: prevState.hintsList.concat(this.state.hint)})) : null
        this.state.image !== '' ? this.setState((prevState) => ({ hintsList: prevState.hintsList.concat(this.state.image)})) : null
        // console.log(this.state.hints);
    }

    onGenerate = e => {
        e.preventDefault();
        this.state.solution1 !== '' ? this.setState((prevState) => ({ solutionList: prevState.solutionList.concat(this.state.solution1)})) : null
        this.state.solution2 !== '' ? this.setState((prevState) => ({ solutionList: prevState.solutionList.concat(this.state.solution2)})) : null
        this.state.solution3 !== '' ? this.setState((prevState) => ({ solutionList: prevState.solutionList.concat(this.state.solution3)})) : null
        this.state.solution4 !== '' ? this.setState((prevState) => ({ solutionList: prevState.solutionList.concat(this.state.solution4)})) : null
        this.state.solution5 !== '' ? this.setState((prevState) => ({ solutionList: prevState.solutionList.concat(this.state.solution5)})) : null
        this.state.solution6 !== '' ? this.setState((prevState) => ({ solutionList: prevState.solutionList.concat(this.state.solution6)})) : null
        this.state.solution7 !== '' ? this.setState((prevState) => ({ solutionList: prevState.solutionList.concat(this.state.solution7)})) : null
        // console.log(this.state.solution);
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({[name]: value})
        localStorage.setItem(name, value)
      };

    handleSteps = e => {
        e.preventDefault();
        const { name, value } = e.target;
        const val = parseInt(value)
        this.setState({[name]: val});
      };
    
    render() {
        const {id} = this.props.query
        switch(this.state.button) {
            case "text":
            this.puzzleStage = 
                <>
                  <P>Составьте задачу, используя наш пошаговый алгоритм. Обратите внимание на подсказки на шагах 2 и 3. 
                      Кнопку "Создать задачу" вы можете найти на последнем этапе "Ответ".
                  </P>
                  <label htmlFor="text">
                    <Textarea
                        id="text"
                        name="text"
                        placeholder="Условие задачи..."
                        cols={80}
                        rows={10}
                        spellcheck={true}
                        autoFocus
                        required
                        value={this.state.text}
                        onChange={this.handleChange}
                    />
                  </label>
                </>
                break;
            case "hints":
                this.puzzleStage = 
                    <>
                        <P>После того, как вы добавили текст и / или фото подсказку, нажмите на кнопку "Собрать" внизу страницы и 
                            переходите к следующему этапу создания задачи.</P>
                        <label htmlFor="hint">
                            <Textarea
                                id="hint"
                                name="hint"
                                placeholder="1. Текстовая подсказка..."
                                cols={80}
                                rows={10}
                                spellcheck={true}
                                autoFocus
                                value={this.state.hint}
                                onChange={this.handleChange}
                            />
                        </label>
                        <label className="file" htmlFor="file">
                            <P className="first">2. Визуальная подсказка</P>
                            <input
                                className="second"
                                type="file"
                                id="file"
                                name="file"
                                placeholder="Загрузите фото..."
                                onChange={this.uploadFile}
                            />
                        </label>
                        {this.state.upload && <P>Идет загрузка изображения...</P> }
                        {this.state.image && (
                            <>
                                <br/>
                                <Img width="625" height="400" src={this.state.image} alt="Upload Preview" />
                                <P>Загрузка прошла успешно!</P>
                            </>
                        )}
                        <br/>
                        <NavButton onClick={this.onUpload}>
                            Собрать все подсказки
                        </NavButton>
                        {this.state.hintsList && this.state.hintsList.length > 0 ? <p>Можете переходить к следующему этапу!</p> : null}
                  </>
                break;
            case "solution":
                this.puzzleStage = (
                    <>
                        <P>Выберите количество этапов решения вашей задачи. После того, как вы описали все этапы решения задачи, нажмите на кнопку "Собрать" внизу страницы и 
                            переходите к следующему этапу создания задачи.</P>
                        <CustomSelect>
                            <select name="stepsNumber" value={this.state.stepsNumber} onChange={this.handleSteps}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                            </select>
                        </CustomSelect>
                        {this.state.stepsNumber >= 1 && 
                        <label htmlFor="solution">
                            <Textarea
                                id="solution"
                                name="solution1"
                                placeholder="Шаг 1"
                                cols={80}
                                rows={5}
                                spellcheck={true}
                                autoFocus
                                value={this.state.solution1}
                                onChange={this.handleChange}
                            />
                        </label> }
                        {this.state.stepsNumber >= 2 && 
                        <label htmlFor="solution">
                            <Textarea
                                id="solution"
                                name="solution2"
                                placeholder="Шаг 2"
                                cols={80}
                                rows={5}
                                spellcheck={true}
                                autoFocus
                                value={this.state.solution2}
                                onChange={this.handleChange}
                            />
                        </label> }
                        {this.state.stepsNumber >= 3 && 
                        <label htmlFor="solution">
                            <Textarea
                                id="solution"
                                name="solution3"
                                placeholder="Шаг 3"
                                cols={80}
                                rows={5}
                                spellcheck={true}
                                autoFocus
                                value={this.state.solution3}
                                onChange={this.handleChange}
                            />
                        </label> }
                        {this.state.stepsNumber >= 4 && 
                        <label htmlFor="solution">
                            <Textarea
                                id="solution"
                                name="solution4"
                                placeholder="Шаг 4"
                                cols={80}
                                rows={5}
                                spellcheck={true}
                                autoFocus
                                value={this.state.solution4}
                                onChange={this.handleChange}
                            />
                        </label> }
                        {this.state.stepsNumber >= 5 && 
                        <label htmlFor="solution">
                            <Textarea
                                id="solution"
                                name="solution5"
                                placeholder="Шаг 5"
                                cols={80}
                                rows={5}
                                spellcheck={true}
                                autoFocus
                                value={this.state.solution5}
                                onChange={this.handleChange}
                            />
                        </label> }
                        {this.state.stepsNumber >= 6 && 
                        <label htmlFor="solution">
                            <Textarea
                                id="solution"
                                name="solution6"
                                placeholder="Шаг 6"
                                cols={80}
                                rows={5}
                                spellcheck={true}
                                autoFocus
                                value={this.state.solution6}
                                onChange={this.handleChange}
                            />
                        </label> }
                        {this.state.stepsNumber >= 7 && 
                        <label htmlFor="solution">
                            <Textarea
                                id="solution"
                                name="solution7"
                                placeholder="Шаг 7"
                                cols={80}
                                rows={5}
                                spellcheck={true}
                                autoFocus
                                value={this.state.solution7}
                                onChange={this.handleChange}
                            />
                        </label> }
                        <br/>
                        <NavButton onClick={this.onGenerate}>
                            Собрать все шаги
                        </NavButton>
                        {this.state.solutionList && this.state.solutionList.length > 0 ? <p>Можете переходить к следующему этапу!</p> : null}
                    </>
                )
                break;
            case "answer":
                this.puzzleStage = 
                <>
                    <label htmlFor="answer">
                        <Textarea
                            id="answer"
                            name="answer"
                            placeholder="Ответ на задачу..."
                            cols={80}
                            rows={10}
                            spellcheck={true}
                            autoFocus
                            required
                            value={this.state.answer}
                            onChange={this.handleChange}
                        />
                    </label>
                    <Mutation 
                        mutation={CREATE_PROBLEM_MUTATION} 
                        variables={{
                            lessonID: id,
                            solution: this.state.solution,
                            ...this.state
                        }}
                        refetchQueries={() =>[{  
                            query: PAGE_PROBLEMS_QUERY,
                            variables: { id}
                        }]}   
                    >
                    {(createProblem, {loading, error}) => (
                        <SubmitButton onClick={ async e => {
                            e.preventDefault()
                            const res = await createProblem()
                            document.getElementById("Message").style.display ='block'
                            setTimeout(function(){
                                document.getElementById("Message") ? document.getElementById("Message").style.display = 'none' : none
                            }, 3000);
                            localStorage.removeItem('text')
                            localStorage.removeItem('hint')
                            localStorage.removeItem('solution1')
                            localStorage.removeItem('solution2')
                            localStorage.removeItem('solution3')
                            localStorage.removeItem('solution4')
                            localStorage.removeItem('solution5')
                            localStorage.removeItem('solution6')
                            localStorage.removeItem('solution7')
                            localStorage.removeItem('answer')
                            this.setState({"solution1": ''});
                            this.setState({"solution2": ''});
                            this.setState({"solution3": ''});
                            this.setState({"solution4": ''});
                            this.setState({"solution5": ''});
                            this.setState({"solution6": ''});
                            this.setState({"solution7": ''});
                        }}
                        >
                            Создать задачу
                        </SubmitButton>
                    )}
                  </Mutation>
                </>
                break;
            default:
                this.puzzleStage = 
                    <label htmlFor="text">
                        <Textarea
                            id="text"
                            name="text"
                            placeholder="Текст задачи..."
                            cols={80}
                            rows={10}
                            spellcheck={true}
                            autoFocus
                            required
                            value={this.state.text}
                            onChange={this.handleChange}
                        />
                    </label>
                break;
            }

        return (
            <PleaseSignIn>
                <AreYouATeacher
                    subject={id}
                >
                <h1>Создайте новую задачу для вашего урока</h1>
                <Message id="Message">Вы создали новую задачу!</Message>  
                <ChooseButtons>
                    <ChooseButton onClick={this.onText} active={this.state.button1}>
                        Шаг 1. Условия
                    </ChooseButton>
                    <ChooseButton onClick={this.onHints} active={this.state.button2}>
                        Шаг 2. Подсказки
                    </ChooseButton>
                    <ChooseButton onClick={this.onSolution} active={this.state.button3}>
                        Шаг 3. Решение
                    </ChooseButton>
                    <ChooseButton onClick={this.onAnswer} active={this.state.button4}>
                        Шаг 4. Ответ
                    </ChooseButton>
                </ChooseButtons>
                <Block>{this.puzzleStage}</Block>
            </AreYouATeacher>
        </PleaseSignIn>
      );
    }
}

export default CreateProblem;