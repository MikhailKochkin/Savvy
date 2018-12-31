import React, {Component} from 'react';
import  { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Error from '../ErrorMessage';
import Router from 'next/router';


const CREATE_SANDBOXPAGE_MUTATION = gql`
  mutation CREATE_SANDBOXPAGE_MUTATION(
    $title: String!
    $description: String! 
    $image: String 
  ) {
    createSandboxPage(
      title: $title 
      description: $description
      image: $image 
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

export default class CreateSandbox extends Component {
    state = {
        title: '',
        description: '',
        image: '',
      };
    handleChange = e => {
        const { name, value } = e.target;
        this.setState({[name]: value});
      };
    uploadFile = async e => {
      console.log("uploading files...")
      const files = e.target.files;
      const data = new FormData();
      console.log(files[0]);
      data.append('file', files[0]);
      data.append('upload_preset', 'savvy-app');
      console.log(data);
  
      const res = await fetch('https://api.cloudinary.com/v1_1/mkpictureonlinebase/image/upload', {
        method: 'POST',
        body: data,
      });
      const file = await res.json();
      console.log(file)
      this.setState({
        image: file.secure_url,
        // largeImage: file.eager[0].secure_url,
      })
    };
    render() {
        return (
          <>
          <h1>Создайте страницу новой песочницы!</h1>
          <Mutation 
            mutation={CREATE_SANDBOXPAGE_MUTATION } 
            variables={this.state}
            >
            {(createSandboxPage, {loading, error}) => (
              <Form onSubmit={ async e => {
                  // Stop the form from submitting
                  e.preventDefault();
                  // call the mutation
                  const res = await createSandboxPage();
                  // change the page to the single item page
                  console.log(res);
                  Router.push({
                    pathname: '/sandboxPage',
                    query: {id: res.data.createSandboxPage.id}
                  })
                }}
              >
              <Error error={error}/>
              <fieldset disabled={loading} aria-busy={loading}>
                <label htmlFor="title">
                      <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Название песочницы"
                        value={this.state.title}
                        required
                        onChange={this.handleChange}
                      />
                </label>
                <br/>
                <label htmlFor="description">
                      <input
                        type="text"
                        id="description"
                        name="description"
                        placeholder="Ее краткое описание"
                        required
                        value={this.state.description}
                        onChange={this.handleChange}
                      />
                </label>
                <br/>
                <label htmlFor="file">
                      <input
                        type="file"
                        id="file"
                        name="file"
                        placeholder="Загрузите логотип песочницы..."
                        onChange={this.uploadFile}
                      />
                      {this.state.image && (
                        <img width="300" height="auto" src={this.state.image} alt="Upload Preview" />
                      )}
                </label>
                <br/>
                  <Button type="submit">Создать</Button>
                </fieldset>
              </Form>
            )}
          </Mutation>
          </>
        )
    }
}
