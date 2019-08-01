import React, {Component} from 'react';
import  { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Error from '../ErrorMessage';
import Router from 'next/router';
import User from '../User';

const CREATE_COURSE_MUTATION = gql`
  mutation CREATE_COURSE_MUTATION(
    $title: String!
    $description: String! 
    $image: String
    $courseType: CourseType
    $published: Boolean
    $uniID: ID
  ) {
    createCoursePage(
      title: $title 
      description: $description
      image: $image
      courseType: $courseType
      published: $published
      uniID: $uniID
    ) {
      id
    }
  }
`;

const UPDATE_UNI_MUTATION = gql`
  mutation UPDATE_UNI_MUTATION(
    $id: ID!,
    $capacity: Int!
  ) {
    updateUni(
      id: $id,
      capacity: $capacity 
    ) {
      id
    }
  }
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
    cursor: pointer;
    &:hover {
        background: #0B3954;
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
    .type {
        grid-area: third;
    }
    .file {
        grid-area: fourth;
    }
    grid-template-areas:
        "first   "
        "second   "
        "third   "
        "fourth   ";
`;

const Label = styled.label`
    display: grid;
    grid-template-columns: 35% 65%;
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

const Buttons = styled.div`
    display: flex;
    flex-direction: row;
    align-items: left;
    margin-top: 2%;
    padding: 3%;
    border-top: solid 1px #F0F0F0;
`;

const P = styled.p`
  font-size: 1.8rem;
  font-weight: 600;
`;


export default class CreateCourse extends Component {
    state = {
      title: '',
      description: '',
      image: '',
      courseType: 'PUBLIC',
      uniID: '',
      published: false, 
      upload: false
    };
    handleChange = e => {
      const { name, value } = e.target;
      this.setState({[name]: value});
    };
    handleTagChange = (e) => {
      const checkbox = e.target;
      // take a copy of the current permissions
      let updatedTags = [...this.state.tags];
      // figure out if we need to remove or add this permission
      if (checkbox.checked) {
        // add it in!
        updatedTags.push(checkbox.value);
      } 
      else {
        updatedTags = updatedTags.filter(tag => tag !== checkbox.value);
      }
      this.setState({ tags: updatedTags });
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
          <User>
            {({data: {me}}) => ( 
            <>
            <h1>Создайте страницу нового курса!</h1>
            <Mutation 
              mutation={CREATE_COURSE_MUTATION} 
              variables={this.state}
            >
              {(createCoursePage, {loading, error}) => (
                <Mutation 
                  mutation={UPDATE_UNI_MUTATION} 
                  variables={{ 
                      id: me.uni.id,
                      capacity:  me.uni.capacity - 1,
                    }}
                >
                  {(updateUni, {loading, error}) => (
                <Form onSubmit={ async e => {
                    // Stop the form from submitting
                    e.preventDefault();
                    const res = await me.uni.title !== "Savvvy App" ? this.setState({courseType: "PRIVATE"}) : this.setState({courseType: "PUBLIC"})
                    const res1 = await this.setState({uniID: me.uni.id})
                    const res2 = await createCoursePage();
                    const res3 = await updateUni();
                    Router.push({
                      pathname: '/coursePage',
                      query: {id: res2.data.createCoursePage.id}
                    })
                  }}
                >
                <Error error={error}/>
                <Fieldset disabled={loading} aria-busy={loading}>
                <Container>
                  <Label className="title" htmlFor="title">
                        <P className="first">Название курса</P>
                        <input
                          className="second"
                          type="text"
                          id="title"
                          name="title"
                          placeholder="Название курса"
                          value={this.state.title}
                          required
                          onChange={this.handleChange}
                        />
                  </Label>
                  <Label className="description" htmlFor="description">
                        <P className="first">Описание курса</P>
                        <input
                          className="second"
                          type="text"
                          id="description"
                          name="description"
                          placeholder="Его краткое описание"
                          required
                          value={this.state.description}
                          onChange={this.handleChange}
                        />
                  </Label>
                  <Label className="file" htmlFor="file">
                    <P className="first">Логотип курса</P>
                    <input
                      className="second"
                      type="file"
                      id="file"
                      name="file"
                      placeholder="Загрузите логотип курса..."
                      onChange={this.uploadFile}
                    />
                    </Label>
                  </Container>
                  {this.state.upload && <p>Идет загрузка изображения...</p> }
                  {this.state.image && (
                    <>
                      <img width="200" height="auto" src={this.state.image} alt="Upload Preview" />
                      <p>Загрузка прошла успешно!</p>
                    </>
                  )}
                  <Buttons>
                    <SubmitButton type="submit">Создать</SubmitButton>
                  </Buttons>
                </Fieldset>
              </Form>
              )}
            </Mutation>
            )}
            </Mutation>
          </>
          )}
        </User>  
        )
    }
}
