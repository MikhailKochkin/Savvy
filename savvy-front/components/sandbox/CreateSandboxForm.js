import React, {Component} from 'react';
import  { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { PAGE_SANDBOXES_QUERY } from './SandboxPage';

const CREATE_SANDBOX_MUTATION = gql`
  mutation CREATE_SANDBOX_MUTATION(
    $text: String!
    $video: String
    $sandboxPageID: ID!
  ) {
    createSandbox(
      text: $text
      video: $video
      sandboxPageID: $sandboxPageID
    ) {
      id
    }
  }
`;

const Form = styled.form`
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
  background: rgba(0, 0, 0, 0.02);
  border: 5px solid white;
  padding: 20px;
  font-size: 1.5rem;
  line-height: 1.5;
  font-weight: 600;
  textarea, input {
    font-size: 1.7rem;
    width: 100%;
    font-family: "Gill Sans", serif;
  }
  input{
    margin: 0.4% 0;
  }
`;

const Button = styled.button`
    background-color: #008CBA;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
`

const DynamicLoadedEditor = dynamic(
  import('../editor/Editor'),
  {
    loading: () => (<p>loading...</p>),
    ssr: false
  }
)

export default class CreateSandboxForm extends Component {
    constructor(props) {
      super(props)
      this.state = {
        text: '',
        video: ''
      };
      this.handleChange = e => {
        const { name, type, value } = e.target;
        this.setState({[name]: value});
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
                  <button>Вернуться на страницу песочницы!</button>
              </a>
            </Link>
            <DynamicLoadedEditor getEditorText={this.myCallback}/>
            <label htmlFor="video">
                      <input
                        type="text"
                        id="video"
                        name="video"
                        placeholder="Вставьте ссылку на видео..."
                        value={this.state.video}
                        onChange={this.handleChange}
                      />
                </label>
                <h4>Обратите внимание. Добавить видо на сайт с Youtube, можно только со специальной ссылкой. 
                  О том, как ее получить, смотрите здесь: <a>https://support.google.com/youtube/answer/171780?hl=ru</a> </h4>
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
                <button onClick={ async e => {
                    // Stop the form from submitting
                    e.preventDefault();
                    // call the mutation
                    const res = await createSandbox();
                    // change the page to the single case page
                    // console.log(res);
                    Router.push({
                      pathname: '/sandboxPage',
                      query: {id: id}
                    })
                  }}
                >
                Отправить в песочницу
                </button>
              )}
            </Mutation>
          </>
        )
    }
}
