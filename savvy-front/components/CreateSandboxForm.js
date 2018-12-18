import React, {Component} from 'react';
import  { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Error from './ErrorMessage';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const CREATE_SANDBOX_MUTATION = gql`
  mutation CREATE_SANDBOX_MUTATION(
    $text: String!
    $sandboxPageID: ID!
  ) {
    createSandbox(
      text: $text 
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
  import('./Editor/Editor'),
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
      };
      // this.handleChange = e => {
      //   const { name, type, value } = e.target;
      //   // const val = type === 'number' ? parseFloat(value) : value;
      //   this.setState({[name]: value});
      // };

    }

    myCallback = (dataFromChild) => {
      this.setState({ text: dataFromChild });
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
                        <button>Вернуться на страницу курса!</button>
                    </a>
            </Link>
            <DynamicLoadedEditor getEditorText={this.myCallback}/>
            <Mutation mutation={CREATE_SANDBOX_MUTATION} 
              variables={{
                    sandboxPageID: id,
                    ...this.state
            }}>
              {(createSandbox, {loading, error}) => (
                <button onClick={ async e => {
                    // Stop the form from submitting
                    e.preventDefault();
                    console.log('test')
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
