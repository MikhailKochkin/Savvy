import React, {Component} from 'react';
import  { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import Link from 'next/link';
// import { PAGE_LESSONS_QUERY } from '../course/CoursePage';
import { MaterialPerPage } from '../../config';
import { NavButton, SubmitButton } from '../styles/Button';

const CREATE_LESSON_MUTATION = gql`
  mutation CREATE_LESSON_MUTATION(
    $text: String!
    $video: String
    $coursePageID: ID!
  ) {
    createLesson(
      text: $text 
      video: $video
      coursePageID: $coursePageID
    ) {
      id
    }
  }
`;

const PAGE_LESSONS_QUERY = gql`
  query PAGE_LESSONS_QUERY($id: ID!, $skip: Int = 0, $first: Int = ${MaterialPerPage}) {
    lessons(where: {coursePageID: $id}, skip: $skip, orderBy: createdAt_DESC, first: $first) {
      id
      text
      user {
          id
      }
    }
  }
`;

const Width = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
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
    loading: () => (<p>loading...</p>),
    ssr: false
  }
)

export default class CreateLesson extends Component {
    constructor(props) {
      super(props)
      this.state = {
        text: '',
        video: ''
      };
      this.handleChange = e => {
        const { name, type, value } = e.target;
        if(value.includes('embed')) {
          this.setState({video: value});
        } else {
          const newUrl = 'https://www.youtube.com/embed/' + value.slice(value.indexOf("=") + 1)
          this.setState({video: newUrl});
        }
      };
      
    }

    myCallback = (dataFromChild) => {
      this.setState({ 
        text: dataFromChild
      });
    }
  
    render() {
        const {id} = this.props
        return (
            <>
              <Link href={{
                  pathname: '/coursePage',
                  query: { id }
                }}>
                <a>
                    <NavButton>Вернуться на страницу курса</NavButton>
                </a>
              </Link>
              <DynamicLoadedEditor getEditorText={this.myCallback}/>
            <Width>
              <Container>
                <h4 className="explain"> Добавьте видео, если в этом есть необходимость:</h4>
                <Label className="video" htmlFor="video">
                  <p className="first">Видео</p>
                    <input
                      type="text"
                      id="video"
                      name="video"
                      placeholder="Вставьте ссылку на видео..."
                      value={this.state.video}
                      onChange={this.handleChange}
                    />
                </Label>
                  <p>Обратите внимание. Пока на сайт можно добавлять только видео с Youtube. 
                    Для этого скопируйте ссылку в пустое поле выше. Она автоматически преобразуется в тот вид, в котором она сможет использоваться на сайте.
                    Пожалуйста, не пытайтесь исправить ссылку после преобразования.</p>
              </Container>
              <Mutation 
                mutation={CREATE_LESSON_MUTATION} 
                variables={{
                      coursePageID: id,
                      ...this.state
                }}
                refetchQueries={() => [{
                  query: PAGE_LESSONS_QUERY,
                  variables: { id},
                }]}
              >
                {(createLesson, {loading, error}) => (
                  <SubmitButton onClick={ async e => {
                      // Stop the form from submitting
                      e.preventDefault();
                      // call the mutation
                      const res = await createLesson();
                      // change the page to the single case page
                      Router.push({
                        pathname: '/coursePage',
                        query: {id: id}
                      })
                    }}
                  >
                  Отправить на страницу курса
                  </SubmitButton>
                )}
              </Mutation>
            </Width>
            </>
        )
    }
}
