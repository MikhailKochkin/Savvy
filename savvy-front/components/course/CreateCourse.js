import React, {Component} from 'react';
import  { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Error from '../ErrorMessage';
import Router from 'next/router';
import { Tags } from '../../config';
import { ALL_COURSE_PAGES_QUERY } from './Courses';

const CREATE_COURSE_MUTATION = gql`
  mutation CREATE_COURSE_MUTATION(
    $title: String!
    $description: String! 
    $image: String
    $tags: [String!]!
    $courseType: CourseType
  ) {
    createCoursePage(
      title: $title 
      description: $description
      image: $image
      tags: $tags
      courseType: $courseType
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

const Container2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  @media (max-width: 600px) {
        display: flex;
        flex-direction: column;
    }
  
`;

const TagLabel = styled.label`
  width: 100%;
  display: grid;
  grid-template-columns: 70% 30%;
  justify-items: center;
  align-items: center; 
  /* @media (max-width: 600px) {
        display: flex;
        flex-direction: column;
    } */
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
      tags: '',
      courseType: 'PUBLIC',
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
          <>
            <h1>Создайте страницу нового курса!</h1>
            <Mutation 
              mutation={CREATE_COURSE_MUTATION} 
              variables={this.state}
              refetchQueries={() => [{
                query: ALL_COURSE_PAGES_QUERY,
              }]}
              >
              {(createCoursePage, {loading, error}) => (
                <Form onSubmit={ async e => {
                    // Stop the form from submitting
                    e.preventDefault();
                    this.state.tags.length === 0 ? alert("Пожалуйста выберите хотя бы один тег!") : null;
                    // call the mutation
                    const res = await createCoursePage();
                    // change the page to the coursePage page
                    Router.push({
                      pathname: '/coursePage',
                      query: {id: res.data.createCoursePage.id}
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
                  <Label className="type" htmlFor="CourseType">
                      <P className="first">Тип курса</P>
                      <select name="courseType" value={this.state.CourseType} onChange={this.handleChange}>
                        <option value="PUBLIC">Открытый</option>
                        <option value="PRIVATE">Закрытый</option>
                      </select>
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
                  <P>Выберите тэги, которые наиболее точно описывают ваш курс:</P>
                    <Container2>
                    {Tags.map(tag => (
                      <TagLabel key={tag + "label"} htmlFor="label">
                        <p>{tag}</p>
                        <input
                          key={tag}
                          id="Bike"
                          type="checkbox"
                          checked={this.state.tags.includes(tag)}
                          value={tag}
                          onChange={this.handleTagChange}
                        />
                      </TagLabel>
                      ))}
                    </Container2>
                  <Buttons>
                    <SubmitButton type="submit">Создать</SubmitButton>
                  </Buttons>
                </Fieldset>
              </Form>
              )}
            </Mutation>
          </>
        )
    }
}
