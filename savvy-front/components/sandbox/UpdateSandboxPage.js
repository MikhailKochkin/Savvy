import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Link from 'next/link';
import User from '../User';

const SINGLE_SANDBOXPAGE_QUERY = gql`
  query SINGLE_SANDBOXPAGE_QUERY($id: ID!) {
    sandboxPage(where: { id: $id }) {
      title
      description
      image
      user {
        id
      }
    }
  }
`;

const UPDATE_SANDBOXPAGE_MUTATION = gql`
  mutation UPDATE_SANDBOXPAGE_MUTATION($id: ID!, $title: String, $description: String, $image: String) {
    updateSandboxPage(id: $id, title: $title, description: $description, image: $image) {
      id
      title
      description
      image
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

class UpdateSandboxPage extends Component {
  state = {};
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  updateSandboxPage = async (e, updateSandboxPage) => {
    e.preventDefault();
    console.log('Updating Sandbox Page!!');
    console.log(this.state);
    const res = await updateSandboxPage({
      variables: {
        id: this.props.id,
        ...this.state,
      },
    });
    console.log('Updated!!');
  };

  uploadFile = async e => {
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
      // largeImage: file.eager[0].secure_url,
    })
  };

  render() {
    return (
        <>
          <Link href={{
                pathname: '/sandboxPage',
                query: { id: this.props.id }
              }}>
              <a>
                  <button>Вернуться на страницу песочницы!</button>
              </a>
          </Link>
          <Query
            query={SINGLE_SANDBOXPAGE_QUERY}
            variables={{
              id: this.props.id,
            }}
          >
            {({ data, loading }) => {
              if (loading) return <p>Loading...</p>;
              if (!data.sandboxPage) return <p>No Sandbox Page Found for ID {this.props.id}</p>;
              return (
                <User>
                {({data: {me}}) => ( 
                <>
                {me !== null && me.id === data.sandboxPage.user.id ?
                <Mutation 
                mutation={UPDATE_SANDBOXPAGE_MUTATION} variables={this.state}>
                  {(updateSandboxPage, { loading, error }) => (
                    <Form onSubmit={e => this.updateSandboxPage(e, updateSandboxPage)}>
                      {/* <Error error={error} /> */}
                      <fieldset disabled={loading} aria-busy={loading}>
                        <label htmlFor="title">
                          Наименование песочницы
                          <input
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Новое название курса..."
                            required
                            defaultValue={data.sandboxPage.title}
                            onChange={this.handleChange}
                          />
                        </label>
                        <br/>
                        <label htmlFor="description">
                          Описание песочницы
                          <textarea
                            id="description"
                            name="description"
                            placeholder="Его новое краткое описание..."
                            required
                            defaultValue={data.sandboxPage.description}
                            onChange={this.handleChange}
                          />
                        </label>
                        <br/>
                        <label htmlFor="file">
                          Логотип песочницы
                          <input
                            type="file"
                            id="file"
                            name="file"
                            placeholder="Загрузите новый логотип песочницы..."
                            onChange={this.uploadFile}
                          />
                          {this.state.image && (
                            <img width="300" height="auto" src={this.state.image} alt="Upload Preview" />
                          )}
                        </label>
                        <button type="submit">{loading ? 'Вносим' : 'Внесите'} изменения</button>
                      </fieldset>
                    </Form>
                  )}
                </Mutation>
                :
                "У вас нет полномочий для работы с этой страницей."
                }
              </>
              )}
            </User>
          )}}
        </Query>
      </>
    )
  }
}

export default UpdateSandboxPage;
