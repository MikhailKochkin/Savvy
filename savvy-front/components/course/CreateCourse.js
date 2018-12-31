import React, {Component} from 'react';
import  { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Error from '../ErrorMessage';
import Router from 'next/router';
import { Tags } from '../../config';

const CREATE_COURSE_MUTATION = gql`
  mutation CREATE_COURSE_MUTATION(
    $title: String!
    $description: String! 
    $image: String
    $tags: [String!]!
  ) {
    createCoursePage(
      title: $title 
      description: $description
      image: $image
      tags: $tags
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
  #Bike {
    width: 25%;
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

const Grid = styled.label`
  display: grid;
  grid-template-columns: 50px 10px;
  grid-template-rows: repeat(5, 20px);
`;

export default class CreateCourse extends Component {
    state = {
      title: '',
      description: '',
      image: '',
      tags: ''
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
      console.log(file.secure_url)
      console.log(file.secure_url)
      this.setState({
        image: file.secure_url,
        // largeImage: file.eager[0].secure_url,
      })
    };

    render() {
        return (
          <>
            <h1>Создайте страницу нового курса!</h1>
            <Mutation mutation={CREATE_COURSE_MUTATION} 
              variables={this.state}>
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
                <fieldset disabled={loading} aria-busy={loading}>
                  <label htmlFor="title">
                        <input
                          type="text"
                          id="title"
                          name="title"
                          placeholder="Название курса"
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
                          placeholder="Его краткое описание"
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
                      placeholder="Загрузите логотип курса..."
                      onChange={this.uploadFile}
                    />
                    {this.state.image && (
                      <img width="300" height="auto" src={this.state.image} alt="Upload Preview" />
                    )}
                  </label>
                  <br/>
                  {Tags.map(tag => (
                      <label key={tag + "label"} htmlFor="label">
                        <p>{tag}</p>
                        <input
                          key={tag}
                          id="Bike"
                          type="checkbox"
                          checked={this.state.tags.includes(tag)}
                          value={tag}
                          onChange={this.handleTagChange}
                        />
                      </label>
                    ))}
                  <br/>
                  <Button type="submit">Submit</Button>
                </fieldset>
              </Form>
              )}
            </Mutation>
          </>
        )
    }
}
