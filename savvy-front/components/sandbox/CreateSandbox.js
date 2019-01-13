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
    width: 85%;
    margin: 50%;
    margin: 0 auto;
    font-size: 1.6rem;
    @media (max-width: 800px) {
        width: 80%;
    }
`;

const Fieldset = styled.fieldset`
    display: flex;
    flex-direction: column;
    border: 1px solid #F0F0F0;
    border-radius: 5px;
    box-shadow: 0 15px 30px 0 rgba(0,0,0,0.11),
                0 5px 15px 0 rgba(0,0,0,0.08);
    /* min-height: 400px; */
    select {
      width: 30%;
      font-size: 1.6rem;
    }
`;

const Container = styled.div`
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: repeat(3 70px);
    .title {
        grid-area: first;
    }
    .description {
        grid-area: second;
    }
    .file {
        grid-area: fourth;
    }
    grid-template-areas:
        "first   "
        "second   "
        "third   ";
`;

const Label = styled.label`
    display: grid;
    grid-template-columns: 25% 75%;
    grid-template-rows: 100%;
    justify-items: center;
    align-items: center;
    input {
        height: 60%;
        width: 100%;
        border: 1px solid #ccc;
        box-shadow: 0 1px 2px rgba(0, 0, 0, .1);
        border-radius: 3.5px;
        padding: 1%;
        font-size: 1.4rem;       
    }
    @media (max-width: 600px) {
        display: flex;
        flex-direction: column;
    }
`;

const P = styled.p`
  font-size: 1.8rem;
  font-weight: 600;
`;

const SubmitButton = styled.button`
    background-color: #008CBA;
    border: none;
    border-radius: 6px;
    color: white;
    padding: 1%;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 1.4rem;
    font-weight: 600;
    width: 30%;
    margin-top: 3%;
    cursor: pointer;
    &:hover {
        background: #0B3954;
    }
`;

export default class CreateSandbox extends Component {
    state = {
        title: '',
        description: '',
        image: '',
        upload: false,
      };
    handleChange = e => {
        const { name, value } = e.target;
        this.setState({[name]: value});
      };
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
                  Router.push({
                    pathname: '/sandboxPage',
                    query: {id: res.data.createSandboxPage.id}
                  })
                }}
              >
              <Error error={error}/>
              <Fieldset disabled={loading} aria-busy={loading}>
                <Container>
                <Label htmlFor="title">
                  <P className="first">Название песочницы</P>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Название песочницы"
                        value={this.state.title}
                        required
                        onChange={this.handleChange}
                      />
                </Label>
                <Label htmlFor="description">
                  <P className="first">Описание песочницы</P>
                      <input
                        type="text"
                        id="description"
                        name="description"
                        placeholder="Ее краткое описание"
                        required
                        value={this.state.description}
                        onChange={this.handleChange}
                      />
                </Label>
                <Label htmlFor="file">
                  <P className="first">Логотип песочницы</P>
                      <input
                        type="file"
                        id="file"
                        name="file"
                        placeholder="Загрузите логотип песочницы..."
                        onChange={this.uploadFile}
                      />
                </Label>
                {this.state.upload && <p>Идет загрузка изображения...</p> }
                {this.state.image && (
                  <>
                    <img width="200" height="auto" src={this.state.image} alt="Upload Preview" />
                    <p>Загрузка прошла успешно!</p>
                  </>
                )}
                </Container>
                  <SubmitButton type="submit">Создать</SubmitButton>
                </Fieldset>
              </Form>
            )}
          </Mutation>
          </>
        )
    }
}
