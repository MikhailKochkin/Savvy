import React, {Component} from 'react';
import  { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { MaterialPerPage } from '../../config';
import { NavButton, SubmitButton } from '../styles/Button';
import AreYouATeacher from '../AreYouATeacher';
import PleaseSignIn from '../PleaseSignIn';

const CREATE_TEXTEDITOR_MUTATION = gql`
  mutation CREATE_TEXTEDITOR_MUTATION(
    $name: String!
    $text: String!
    $totalMistakes: Int
    $lessonID: ID!
  ) {
    createTextEditor(
      name: $name
      text: $text
      totalMistakes: $totalMistakes 
      lessonID: $lessonID
    ) {
      id
    }
  }
`;

// const PAGE_LESSONS_QUERY = gql`
//   query PAGE_LESSONS_QUERY($id: ID!, $skip: Int = 0, $first: Int = ${MaterialPerPage}) {
//     lessons(where: {coursePageID: $id}, skip: $skip, orderBy: createdAt_DESC, first: $first) {
//       id
//       name
//       number
//       text
//       user {
//           id
//       }
//     }
//   }
// `;

const Width = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 3%;
  ${SubmitButton} {
    margin-top: 3%;
  }
`;

const Container = styled.div`
    border: 1px solid #F0F0F0;
    border-radius: 5px;
    box-shadow: 0 15px 30px 0 rgba(0,0,0,0.11),
                0 5px 15px 0 rgba(0,0,0,0.08);
    width: 60%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(3 70px);
    .video {
        grid-area: first;
    }
    grid-template-areas:
        "explain"
        "first   ";
    p, h4 {
      padding: 0% 5%;
    }
    p > a {
        font-weight: 700;
    }
    p > a:hover {
        text-decoration: underline;
    }
    @media (max-width: 600px) {
      width: 100%;
    }

`;

const Label = styled.label`
    display: grid;
    grid-template-columns: 20% 80%;
    grid-template-rows: 100%;
    justify-items: center;
    align-items: center;
    .first {
        grid-area: first;
    }

    grid-template-areas:
        "first second";
    input {
        height: 50%;
        width: 80%;
        border: 1px solid #ccc;
        box-shadow: 0 1px 2px rgba(0, 0, 0, .1);
        border-radius: 3.5px;
        padding: 2%;
        font-size: 1.4rem;

    }
    @media (max-width: 600px) {
        display: flex;
        flex-direction: column;
    }
`;

const DynamicLoadedEditor = dynamic(
  import('../editor/Editor'),
  {
    loading: () => (<p>Загрузка...</p>),
    ssr: false
  }
)

export default class CreateTextEditor extends Component {
    state = {
        name: "Test",
        text: '',
    }

    myCallback = (dataFromChild) => {
      this.setState({ 
        text: dataFromChild
      });
    }
    handleChange = e => {
      const { name, value } = e.target;
      this.setState({[name]: value})
    };
  
    render() {
        const {id} = this.props
        return (
        <PleaseSignIn>
          <AreYouATeacher
              subject={this.props.id}
          >
              {/* <Link href={{
                  pathname: '/coursePage',
                  query: { id }
                }}>
                <a>
                    <NavButton>Вернуться на страницу курса</NavButton>
                </a>
              </Link> */}
              <label htmlFor="text">
                        <textarea
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
            {/* <Width>
              <Container>
              <h4 className="explain"> Напишите название и номер урока</h4>
              <Label className="name" htmlFor="name">
                  <p className="first">Название урока</p>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Название урока"
                      value={this.state.name}
                      onChange={this.handleName}
                    />
                </Label>
                <Label className="name" htmlFor="name">
                  <p className="first">Номер урока</p>
                    <input
                      type="text"
                      id="number"
                      name="number"
                      placeholder="Номер урока"
                      value={this.state.number}
                      onChange={this.handleNumber}
                    />
                </Label>
              </Container>
              </Width> */}
              <Width>
              <Mutation 
                mutation={CREATE_TEXTEDITOR_MUTATION} 
                variables={{
                    lessonID: id,
                    ...this.state
                }}
                // refetchQueries={() => [{
                //   query: PAGE_LESSONS_QUERY,
                //   variables: { id},
                // }]}
              >
                {(createTextEditor, {loading, error}) => (
                  <SubmitButton onClick={ async e => {
                      // Stop the form from submitting
                      e.preventDefault();
                      // call the mutation
                      const res = await createTextEditor();
                      console.log("Вроде бы получилось");
                      
                      // change the page to the single case page
                      // Router.push({
                      //   pathname: '/coursePage',
                      //   query: {id: id}
                      // })
                    }}
                  >
                  Отправить на страницу курса
                  </SubmitButton>
                )}
              </Mutation>
            </Width>
          </AreYouATeacher>
        </PleaseSignIn>
        )
    }
}
