import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Link from 'next/link';
import User from '../User';
import { NavButton, SubmitButton } from '../styles/Button';

const SINGLE_COURSEPAGE_QUERY = gql`
  query SINGLE_COURSEPAGE_QUERY($id: ID!) {
    coursePage(where: { id: $id }) {
      title
      description
      image
      user {
        id
      }
    }
  }
`;

const UPDATE_COURSEPAGE_MUTATION = gql`
  mutation UPDATE_COURSEPAGE_MUTATION($id: ID!, $title: String, $description: String, $image: String) {
    updateCoursePage(id: $id, title: $title, description: $description, image: $image) {
      id
      title
      description
      image
    }
  }
`;

const Form = styled.form`
    width: 85%;
    margin: 50%;
    margin: 0 auto;
    font-size: 1.6rem;
    @media (max-width: 800px) {
        width: 100%;
    }
`;

const Fieldset = styled.fieldset`
    display: flex;
    flex-direction: column;
    border: 1px solid #F0F0F0;
    border-radius: 5px;
    box-shadow: 0 15px 30px 0 rgba(0,0,0,0.11),
                0 5px 15px 0 rgba(0,0,0,0.08);
    select {
      width: 30%;
      font-size: 1.6rem;
    }
`;

const Label = styled.label`
    display: grid;
    grid-template-columns: 35% 65%;
    grid-template-rows: 100%;
    justify-items: center;
    align-items: center;
    input, textarea {
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

const Buttons = styled.div`
    display: flex;
    flex-direction: row;
    align-items: left;
    padding: 4%;
    border-top: solid 1px #F0F0F0;
`;

const P = styled.p`
  font-size: 1.8rem;
  font-weight: 600;
`;


class UpdateCoursePage extends Component {
  state = {
    upload: false
  };
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  updateCoursePage = async (e, updateCoursePage) => {
    e.preventDefault();
    const res = await updateCoursePage({
      variables: {
        id: this.props.id,
        ...this.state,
      },
    });
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
          <Link href={{
                pathname: '/coursePage',
                query: { id: this.props.id }
              }}>
              <a>
                  <NavButton>Вернуться на страницу курса!</NavButton>
              </a>
          </Link>
          <Query
            query={SINGLE_COURSEPAGE_QUERY}
            variables={{
              id: this.props.id,
            }}
          >
            {({ data, loading }) => {
              if (loading) return <p>Loading...</p>;
              if (!data.coursePage) return <p>No Course Page Found for ID {this.props.id}</p>;
              return (
                <User>
                {({data: {me}}) => ( 
                <>
                {me !== null && me.id === data.coursePage.user.id ?
                <Mutation 
                  mutation={UPDATE_COURSEPAGE_MUTATION} 
                  variables={this.state}
                >
                  {(updateCoursePage, { loading, error }) => (
                    <Form 
                      onSubmit={e => this.updateCoursePage(e, updateCoursePage)}
                    >
                      {/* <Error error={error} /> */}
                      <Fieldset disabled={loading} aria-busy={loading}>
                        <Label htmlFor="title">
                          <P className="first">Название курса</P>
                          <input
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Новое название курса..."
                            required
                            defaultValue={data.coursePage.title}
                            onChange={this.handleChange}
                          />
                        </Label>
                        <br/>
                        <Label htmlFor="description">
                          <P className="first">Описание курса</P>
                          <textarea
                            id="description"
                            name="description"
                            placeholder="Его новое краткое описание..."
                            required
                            defaultValue={data.coursePage.description}
                            onChange={this.handleChange}
                          />
                        </Label>
                        <br/>
                        <Label htmlFor="file">
                          <P className="first">Логотип курса</P>
                          <input
                            type="file"
                            id="file"
                            name="file"
                            placeholder="Загрузите новый логотип песочницы..."
                            onChange={this.uploadFile}
                          />
                        </Label>
                      </Fieldset>
                      {this.state.upload && <p>Идет загрузка изображения...</p> }
                      {this.state.image && (
                        <>
                          <img width="200" height="auto" src={this.state.image} alt="Upload Preview" />
                          <p>Загрузка прошла успешно!</p>
                        </>
                      )}
                      <Buttons>
                         <SubmitButton type="submit">{loading ? 'Вносим' : 'Внесите'} изменения</SubmitButton>
                      </Buttons>
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

export default UpdateCoursePage;

