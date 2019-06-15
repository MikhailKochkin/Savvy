import React, { Component } from 'react';
import styled from 'styled-components';
import  { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { SubmitButton } from '../styles/Button';
import AreYouATeacher from '../auth/AreYouATeacher';
import PleaseSignIn from '../auth/PleaseSignIn';

const MaterialPerPage = 5;

const CREATE_PROBLEM_MUTATION = gql`
  mutation CREATE_PROBLEM_MUTATION(
    $text: String!
    $lessonID: ID!
  ) {
    createProblem(
        text: $text
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

const Img = styled.img`
    border: 1px solid black;
`;

const DynamicLoadedEditor = dynamic(
    import('../editor/ProblemEditor'),
    {
      loading: () => (<p>Загрузка...</p>),
      ssr: false
    }
  )

class CreateProblem extends Component {

    state = {
            text: localStorage.getItem('text') || '',
        }
        puzzleStage = ''

    myCallback = (dataFromChild) => {
        this.setState({ 
          text: dataFromChild
        });
      }
    
    render() {
        const {id} = this.props.query
        return (
            <PleaseSignIn>
                <AreYouATeacher
                    subject={id}
                >
                <h1>Создайте новую задачу для вашего урока</h1>  
                <DynamicLoadedEditor getEditorText={this.myCallback}/>
                <Mutation 
                        mutation={CREATE_PROBLEM_MUTATION} 
                        variables={{
                            lessonID: id,
                            ...this.state
                        }}
                        refetchQueries={() =>[{  
                            query: PAGE_PROBLEMS_QUERY,
                            variables: { id}
                        }]}   
                    >
                    {(createProblem, {loading, error}) => (
                      <>
                        <SubmitButton onClick={ async e => {
                            e.preventDefault()
                            const res = await createProblem()
                            document.getElementById("Message").style.display ='block'
                        }}
                        >
                            Создать задачу
                        </SubmitButton>
                        <Message id="Message">Вы создали новую задачу!</Message>
                      </>
                    )}
                  </Mutation>
            </AreYouATeacher>
        </PleaseSignIn>
      );
    }
}

export default CreateProblem;