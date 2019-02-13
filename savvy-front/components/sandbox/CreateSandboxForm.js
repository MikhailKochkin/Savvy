import React, {Component} from 'react';
import  { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import styled from 'styled-components';
import { NavButton, SubmitButton } from '../styles/Button';
import { PAGE_SANDBOXES_QUERY } from './SandboxPage';

const CREATE_SANDBOX_MUTATION = gql`
  mutation CREATE_SANDBOX_MUTATION(
    $text: String!
    $video: String
    $link: String
    $sandboxPageID: ID!
  ) {
    createSandbox(
      text: $text
      video: $video
      link: $link
      sandboxPageID: $sandboxPageID
    ) {
      id
    }
  }
`;

const DynamicLoadedEditor = dynamic(
  import('../editor/Editor'),
  {
    loading: () => (<p>loading...</p>),
    ssr: false
  }
)

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

export default class CreateSandboxForm extends Component {
    constructor(props) {
      super(props)
      this.state = {
        text: '',
        video: '',
        link: '',
      };
      this.handleChange = e => {
        const { value } = e.target;
        if(value.includes('embed')) {
          this.setState({video: value});
        } else {
          const newUrl = 'https://www.youtube.com/embed/' + value.slice(value.indexOf("=") + 1)
          this.setState({video: newUrl});
        }
      };
      this.handleLink = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
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
                pathname: '/sandboxPage',
                query: { id }
              }}>
              <a>
                  <NavButton>Вернуться на страницу песочницы</NavButton>
              </a>
            </Link>
            <DynamicLoadedEditor getEditorText={this.myCallback}/>
            <Width>
            <Container>
              <h4 className="explain"> Добавьте ссылки на дополнительные материалы, если в этом есть необходимость:</h4>
              <Label className="link" htmlFor="link">
              <p className="first">Книга</p>
                <input
                  type="text"
                  id="link"
                  name="link"
                  placeholder="Вставьте ссылку на текст..."
                  value={this.state.link}
                  onChange={this.handleLink}
                />
              </Label>
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
                Для этого скопируйте ссылку в пустое поле выше. Она автоматически преобразуется в тот вид, который может отображаться на сайте.
                Пожалуйста, не пытайтесь исправить ссылку после преобразования.
              </p>
            </Container>
            <Mutation 
              mutation={CREATE_SANDBOX_MUTATION} 
              variables={{
                    sandboxPageID: id,
                    ...this.state
              }}
              refetchQueries={() =>[{  
                  query: PAGE_SANDBOXES_QUERY,
                  variables: { id},
              }]}
            >
              {(createSandbox, {loading, error}) => (
                <SubmitButton onClick={ async e => {
                    // Stop the form from submitting
                    e.preventDefault();
                    // call the mutation
                    const res = await createSandbox();
                    // change the page to the single case page
                    Router.push({
                      pathname: '/sandboxPage',
                      query: {id: id}
                    })
                  }}
                >
                Отправить в песочницу
                </SubmitButton>
              )}
            </Mutation>
            </Width>
          </>
        )
    }
}
