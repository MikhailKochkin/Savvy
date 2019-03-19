import React, { Component } from 'react';
import styled from 'styled-components';
// import ConstructorElem from './ConstructorElem';
import  { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import { NavButton, SubmitButton } from '../styles/Button';
import AreYouATeacher from '../AreYouATeacher';
import PleaseSignIn from '../PleaseSignIn';

const CREATE_CONSTRUCTION_MUTATION = gql`
  mutation CREATE_CONSTRUCION_MUTATION(
    $name: String!
    $dbPart1: Json!
    $dbPart2: Json!
    $dbPart3: Json!
    $dbPart4: Json!
    $dbPart5: Json
    $dbPart6: Json 
    $dbPart7: Json
    $dbPart8: Json
    $lessonID: ID!
  ) {
    createConstruction(
      name: $name 
      dbPart1: $dbPart1
      dbPart2: $dbPart2
      dbPart3: $dbPart3 
      dbPart4: $dbPart4
      dbPart5: $dbPart5
      dbPart6: $dbPart6
      dbPart7: $dbPart7 
      dbPart8: $dbPart8
      lessonID: $lessonID
    ) {
      id
    }
  }
`;

const CustomSelect = styled.div`

`;

const Center = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Textarea = styled.textarea`
    margin: 1%;
    outline: none;
    padding: 1%;
    font-size: 1.6rem;
    @media (max-width: 800px) {
        width: 350px;
    }
`;

const ChooseTag = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    select {
        width: 30%;
        font-size: 1.4rem;
        margin-top: 5%;
        margin: 3%;
    }
    ${CustomSelect} {
        width: 30%;
        border-radius: 3px;
    }
    ${CustomSelect} select {
        width: 100%;
        border: none;
        box-shadow: none;
        background: #0878C6;
        color: white;
    }
    ${CustomSelect} select:focus {
        outline: none;
    }
    @media (max-width: 800px) {
        select {
            width: 100%;
        }
        ${CustomSelect} {
            width: 70%;
            border-radius: 3px;
        }
    }
`;

const Label = styled.label`
    text-align: center;
`;

const Label1 = styled.label`
    text-align: center;
    width: 40%;
`;

const Input = styled.input`
    width: 100%;
    border: 1px solid #ccc;
    box-shadow: 0 1px 2px rgba(0, 0, 0, .1);
    border-radius: 3.5px;
    padding: 2%;
    font-size: 1.4rem;
`;

class CreateConstructor extends Component {
    state ={
        name: '',
        partsNumber: 4,
        lessonID: this.props.id,
        right1: "", wrong11: "", wrong12: "", tip1: "",
        right2: "", wrong21: "", wrong22: "", tip2: "",
        right3: "", wrong31: "", wrong32: "", tip3: "",
        right4: "", wrong41: "", wrong42: "", tip4: "",
        right5: "", wrong51: "", wrong52: "", tip5: "",
        right6: "", wrong61: "", wrong62: "", tip6: "",
        right7: "", wrong71: "", wrong72: "", tip7: "",
        right8: "", wrong81: "", wrong82: "", tip8: "",
        dbPart1: "", dbPart2: "", dbPart3: "", dbPart4: "",
        dbPart5: "", dbPart6: "", dbPart7: "", dbPart8: "",
        save: false
    }
    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        const val = parseInt(value)
        this.setState({[name]: val});
      };
    handleAnswer = e => {
        e.preventDefault();
        const { name, value, id } = e.target;
        this.setState({[name]: value});
      };

    handleName = e => {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({[name]: value});
    }
    generate = e => {
        e.preventDefault()
        const dbPart1 = {
            right1: this.state.right1,
            wrong11: this.state.wrong11,
            wrong12: this.state.wrong12,
            tip1: this.state.tip1,
            pos: 1
        }
        const dbPart2 = {
            right1: this.state.right2,
            wrong11: this.state.wrong21,
            wrong12: this.state.wrong22,
            tip1: this.state.tip2,
            pos: 2
        }
        const dbPart3 = {
            right1: this.state.right3,
            wrong11: this.state.wrong31,
            wrong12: this.state.wrong32,
            tip1: this.state.tip3,
            pos: 3
        }
        const dbPart4 = {
            right1: this.state.right4,
            wrong11: this.state.wrong41,
            wrong12: this.state.wrong42,
            tip1: this.state.tip4,
            pos: 4
        }
        const dbPart5 = {
            right1: this.state.right5,
            wrong11: this.state.wrong51,
            wrong12: this.state.wrong52,
            tip1: this.state.tip5,
            pos: 5
        }
        const dbPart6 = {
            right1: this.state.right6,
            wrong11: this.state.wrong61,
            wrong12: this.state.wrong62,
            tip1: this.state.tip6,
            pos: 6
        }
        const dbPart7 = {
            right1: this.state.right7,
            wrong11: this.state.wrong71,
            wrong12: this.state.wrong72,
            tip1: this.state.tip7,
            pos: 7
        }
        const dbPart8 = {
            right1: this.state.right8,
            wrong11: this.state.wrong81,
            wrong12: this.state.wrong82,
            tip1: this.state.tip8,
            pos: 8
        }

        this.setState({
            dbPart1: dbPart1,
            dbPart2: dbPart2, 
            dbPart3: dbPart3, 
            dbPart4: dbPart4,
            dbPart5: dbPart5, 
            dbPart6: dbPart6, 
            dbPart7: dbPart7, 
            dbPart8: dbPart8,
            save: true,
        })
    }
    render() {
        const {id} = this.props
        return (
            <PleaseSignIn>
                <AreYouATeacher
                    subject={id}
                >
            <Center>
                <h2>Создаем конструктор!</h2>
                    <Label1 className="name" htmlFor="name">
                    <h3 className="first">Название урока</h3>
                        <Input
                        type="text"
                        id="name"
                        name="name"
                        required
                        placeholder="Название документа"
                        value={this.state.name}
                        onChange={this.handleName}
                        />
                    </Label1>
                <ChooseTag>
                    <h3> Сколько будет частей в вашем документе: {this.state.partsNumber} </h3>
                    <CustomSelect>
                        <select name="partsNumber" value={this.state.partsNumber} onChange={this.handleChange}>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                        </select>
                    </CustomSelect>
                   </ChooseTag>
                    <Label htmlFor="answer">
                        <h4>Часть 1</h4>
                        <Textarea
                            id="1"
                            name="right1"
                            placeholder="Правильный ответ"
                            cols={50}
                            rows={10}
                            spellCheck={true}
                            required
                            value={this.state.right1}
                            onChange={this.handleAnswer}
                        />
                        <Textarea
                            id="1"
                            name="wrong11"
                            placeholder="Неправильный ответ 1"
                            cols={50}
                            rows={10}
                            spellCheck={true}
                            required
                            value={this.state.wrong11}
                            onChange={this.handleAnswer}
                        />
                        <Textarea
                            id="1"
                            name="wrong12"
                            placeholder="Неправильный ответ 2"
                            cols={50}
                            rows={10}
                            spellCheck={true}
                            value={this.state.wrong12}
                            onChange={this.handleAnswer}
                        />
                        <Textarea
                            id="1"
                            name="tip1"
                            placeholder="Подсказка"
                            cols={50}
                            rows={10}
                            spellCheck={true}
                            value={this.state.tip1}
                            onChange={this.handleAnswer}
                        />
                    </Label>
                    <Label htmlFor="answer">
                        <h4>Часть 2</h4>
                        <Textarea
                            id="1"
                            name="right2"
                            placeholder="Правильный ответ"
                            cols={50}
                            rows={10}
                            spellCheck={true}
                            required
                            value={this.state.right2}
                            onChange={this.handleAnswer}
                        />
                        <Textarea
                            id="1"
                            name="wrong21"
                            placeholder="Неправильный ответ 1"
                            cols={50}
                            rows={10}
                            spellCheck={true}
                            required
                            value={this.state.wrong21}
                            onChange={this.handleAnswer}
                        />
                        <Textarea
                            id="1"
                            name="wrong22"
                            placeholder="Неправильный ответ 2"
                            cols={50}
                            rows={10}
                            spellCheck={true}
                            value={this.state.wrong22}
                            onChange={this.handleAnswer}
                        />
                        <Textarea
                            id="1"
                            name="tip2"
                            placeholder="Подсказка"
                            cols={50}
                            rows={10}
                            spellCheck={true}
                            value={this.state.tip2}
                            onChange={this.handleAnswer}
                        />
                    </Label>
                    <Label htmlFor="answer">
                        <h4>Часть 3</h4>
                        <Textarea
                            id="1"
                            name="right3"
                            placeholder="Правильный ответ"
                            cols={50}
                            rows={10}
                            spellCheck={true}
                            required
                            value={this.state.right3}
                            onChange={this.handleAnswer}
                        />
                        <Textarea
                            id="1"
                            name="wrong31"
                            placeholder="Неправильный ответ 1"
                            cols={50}
                            rows={10}
                            spellCheck={true}
                            required
                            value={this.state.wrong31}
                            onChange={this.handleAnswer}
                        />
                        <Textarea
                            id="1"
                            name="wrong32"
                            placeholder="Неправильный ответ 2"
                            cols={50}
                            rows={10}
                            spellCheck={true}
                            value={this.state.wrong32}
                            onChange={this.handleAnswer}
                        />
                        <Textarea
                            id="1"
                            name="tip3"
                            placeholder="Подсказка"
                            cols={50}
                            rows={10}
                            spellCheck={true}
                            value={this.state.tip3}
                            onChange={this.handleAnswer}
                        />
                    </Label>
                    <Label htmlFor="answer">
                        <h4>Часть 4</h4>
                        <Textarea
                            id="1"
                            name="right4"
                            placeholder="Правильный ответ"
                            cols={50}
                            rows={10}
                            spellCheck={true}
                            required
                            value={this.state.right4}
                            onChange={this.handleAnswer}
                        />
                        <Textarea
                            id="1"
                            name="wrong41"
                            placeholder="Неправильный ответ 1"
                            cols={50}
                            rows={10}
                            spellCheck={true}
                            required
                            value={this.state.wrong41}
                            onChange={this.handleAnswer}
                        />
                        <Textarea
                            id="1"
                            name="wrong42"
                            placeholder="Неправильный ответ 2"
                            cols={50}
                            rows={10}
                            spellCheck={true}
                            value={this.state.wrong42}
                            onChange={this.handleAnswer}
                        />
                        <Textarea
                            id="1"
                            name="tip4"
                            placeholder="Подсказка"
                            cols={50}
                            rows={10}
                            spellCheck={true}
                            value={this.state.tip4}
                            onChange={this.handleAnswer}
                        />
                    </Label>
                    {this.state.partsNumber >= 5 && 
                    <Label htmlFor="answer">
                    <h4>Часть 5</h4>
                    <Textarea
                        id="1"
                        name="right5"
                        placeholder="Правильный ответ"
                        cols={50}
                        rows={10}
                        spellCheck={true}
                        required
                        value={this.state.right5}
                        onChange={this.handleAnswer}
                    />
                    <Textarea
                        id="1"
                        name="wrong51"
                        placeholder="Неправильный ответ 1"
                        cols={50}
                        rows={10}
                        spellCheck={true}
                        required
                        value={this.state.wrong51}
                        onChange={this.handleAnswer}
                    />
                    <Textarea
                        id="1"
                        name="wrong52"
                        placeholder="Неправильный ответ 2"
                        cols={50}
                        rows={10}
                        spellCheck={true}
                        value={this.state.wrong52}
                        onChange={this.handleAnswer}
                    />
                    <Textarea
                        id="1"
                        name="tip5"
                        placeholder="Подсказка"
                        cols={50}
                        rows={10}
                        spellCheck={true}
                        value={this.state.tip5}
                        onChange={this.handleAnswer}
                    />
                </Label>}
                    {this.state.partsNumber >= 6 && 
                   <Label htmlFor="answer">
                   <h4>Часть 6</h4>
                   <Textarea
                       id="1"
                       name="right6"
                       placeholder="Правильный ответ"
                       cols={50}
                       rows={10}
                       spellCheck={true}
                       required
                       value={this.state.right6}
                       onChange={this.handleAnswer}
                   />
                   <Textarea
                       id="1"
                       name="wrong61"
                       placeholder="Неправильный ответ 1"
                       cols={50}
                       rows={10}
                       spellCheck={true}
                       required
                       value={this.state.wrong61}
                       onChange={this.handleAnswer}
                   />
                   <Textarea
                       id="1"
                       name="wrong62"
                       placeholder="Неправильный ответ 2"
                       cols={50}
                       rows={10}
                       spellCheck={true}
                       value={this.state.wrong62}
                       onChange={this.handleAnswer}
                   />
                   <Textarea
                       id="1"
                       name="tip6"
                       placeholder="Подсказка"
                       cols={50}
                       rows={10}
                       spellCheck={true}
                       value={this.state.tip6}
                       onChange={this.handleAnswer}
                   />
               </Label>}
                    {this.state.partsNumber >= 7 && 
                    <Label htmlFor="answer">
                    <h4>Часть 7</h4>
                    <Textarea
                        id="1"
                        name="right7"
                        placeholder="Правильный ответ"
                        cols={50}
                        rows={10}
                        spellCheck={true}
                        required
                        value={this.state.right7}
                        onChange={this.handleAnswer}
                    />
                    <Textarea
                        id="1"
                        name="wrong71"
                        placeholder="Неправильный ответ 1"
                        cols={50}
                        rows={10}
                        spellCheck={true}
                        required
                        value={this.state.wrong71}
                        onChange={this.handleAnswer}
                    />
                    <Textarea
                        id="1"
                        name="wrong72"
                        placeholder="Неправильный ответ 2"
                        cols={50}
                        rows={10}
                        spellCheck={true}
                        value={this.state.wrong72}
                        onChange={this.handleAnswer}
                    />
                    <Textarea
                        id="1"
                        name="tip7"
                        placeholder="Подсказка"
                        cols={50}
                        rows={10}
                        spellCheck={true}
                        value={this.state.tip7}
                        onChange={this.handleAnswer}
                    />
                </Label>}
                {this.state.partsNumber >= 8 && 
                    <Label htmlFor="answer">
                    <h4>Часть 8</h4>
                    <Textarea
                        id="1"
                        name="right8"
                        placeholder="Правильный ответ"
                        cols={50}
                        rows={10}
                        spellCheck={true}
                        required
                        value={this.state.right8}
                        onChange={this.handleAnswer}
                    />
                    <Textarea
                        id="1"
                        name="wrong81"
                        placeholder="Неправильный ответ 1"
                        cols={50}
                        rows={10}
                        spellCheck={true}
                        required
                        value={this.state.wrong81}
                        onChange={this.handleAnswer}
                    />
                    <Textarea
                        id="1"
                        name="wrong82"
                        placeholder="Неправильный ответ 2"
                        cols={50}
                        rows={10}
                        spellCheck={true}
                        value={this.state.wrong82}
                        onChange={this.handleAnswer}
                    />
                    <Textarea
                        id="1"
                        name="tip8"
                        placeholder="Подсказка"
                        cols={50}
                        rows={10}
                        spellCheck={true}
                        value={this.state.tip8}
                        onChange={this.handleAnswer}
                    />
                </Label>}
                    {!this.state.save ?
                    <SubmitButton onClick={this.generate}>
                        Сгенерировать документ
                    </SubmitButton>
                    :
                    null
                    }
                    {this.state.save ?
                        <Mutation 
                            mutation={CREATE_CONSTRUCTION_MUTATION} 
                            variables={{
                                lessonID: id,
                                name: this.state.name,
                                dbPart1: this.state.dbPart1,
                                dbPart2: this.state.dbPart2,
                                dbPart3: this.state.dbPart3,
                                dbPart4: this.state.dbPart4,
                                dbPart5: this.state.dbPart5,
                                dbPart6: this.state.dbPart6,
                                dbPart7: this.state.dbPart7,
                                dbPart8: this.state.dbPart8,
                            }}
                            // refetchQueries={() =>[{  
                            //     query: PAGE_PROBLEMS_QUERY,
                            //     variables: { id: id }
                            // }]}   
                        >
                        {(createConstruction, {loading, error}) => (
                        <SubmitButton
                            onClick={ async e => {
                                e.preventDefault()
                                const res = await createConstruction()
                                Router.push({
                                    pathname: '/lesson',
                                    query: {id : id}
                                  })
                                }}
                            >
                        Сохранить документ
                        </SubmitButton>
                        )}
                        </Mutation>
                        :
                        null
                      }
                    </Center>
                </AreYouATeacher>
            </PleaseSignIn>
        );
    }
}

export default CreateConstructor;