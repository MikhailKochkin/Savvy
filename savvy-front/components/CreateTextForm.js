import React, {Component} from 'react';
import  { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Error from './ErrorMessage';
import Router from 'next/router';
import Editor from './Editor/Editor';
import dynamic from 'next/dynamic';

const CREATE_CASE_MUTATION = gql`
  mutation CREATE_CASE_MUTATION(
    $title: String!
    $description: String!
    $image: String
    $largeImage: String
    $price: Int
    $issue: String
    $rule: String
    $analysis: String 
    $conclusion: String
    $coursePageID: ID!
  ) {
    createCase(
      title: $title 
      description: $description
      image: $image
      largeImage: $largeImage 
      price: $price
      issue: $issue
      rule: $rule
      analysis: $analysis 
      conclusion: $conclusion
      coursePageID: $coursePageID
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

export default class CreateTextForm extends Component {
    constructor(props) {
      super(props)
      this.state = {
        title: 'IPO Basics for Russian lawyers',
        description: 'A course for you',
        image: 'image.img',
        largeImage: 'largeImg.img',
        price: '20000',
        issue: "State the issue",
        rule: "Describe the rules",
        analysis: "Present the analysis",
        conclusion: "Draw the conclusions",
      };
      this.handleChange = e => {
        const { name, type, value } = e.target;
        // const val = type === 'number' ? parseFloat(value) : value;
        this.setState({[name]: value});
      };

    }
  
    render() {
        const {id} = this.props
        return (
            <>
              <Mutation mutation={CREATE_CASE_MUTATION} 
                variables={{
                      coursePageID: id,
                      ...this.state
              }}>
                {(createCase, {loading, error}) => (
                  <Form onSubmit={ async e => {
                      // Stop the form from submitting
                      e.preventDefault();
                      // call the mutation
                      const res = await createCase();
                      // change the page to the single case page
                      // console.log(res);
                      Router.push({
                        pathname: '/coursePage',
                        query: {id: id}
                      })
                    }}
                  >
                  <Error error={error}/>
                  {id}
                  {this.props.id}
                  <fieldset disabled={loading} aria-busy={loading}>
                    <label htmlFor="title">
                          <input
                            type="text"
                            id="title"
                            name="title"
                            placeholder="title"
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
                            placeholder="description"
                            required
                            value={this.state.description}
                            onChange={this.handleChange}
                          />
                    </label>
                    <br/>
                    <label htmlFor="image">
                          <input
                            type="text"
                            id="image"
                            name="image"
                            placeholder="image"
                            value={this.state.image}
                            onChange={this.handleChange}
                          />
                    </label>
                    <br/>
                    <label htmlFor="largeImage">
                          <input
                            type="text"
                            id="largeImage"
                            name="largeImage"
                            placeholder="largeImage"
                            value={this.state.largeImage}
                            onChange={this.handleChange}
                          />
                    </label>
                    <br/>
                    <label htmlFor="price">
                          <input
                            type="text"
                            id="price"
                            name="price"
                            placeholder="price"
                            value={this.state.price}
                            onChange={this.handleChange}
                          />
                      </label>
                      <br/>
                    <br/>
                      <label htmlFor="issue">
                          <textarea
                            type="text"
                            id="issue"
                            name="issue"
                            placeholder="issue"
                            required
                            value={this.state.issue}
                            onChange={this.handleChange}
                          />
                      </label>
                      <br/>
                      <label htmlFor="rule">
                          <textarea
                            type="text"
                            id="rule"
                            name="rule"
                            placeholder="rule"
                            required
                            value={this.state.rule}
                            onChange={this.handleChange}
                          />
                      </label>
                      <br/>
                      <label htmlFor="analysis">
                          <textarea
                            type="text"
                            id="analysis"
                            name="analysis"
                            placeholder="analysis"
                            required
                            value={this.state.analysis}
                            onChange={this.handleChange}
                          />
                      </label>
                      <br/>
                      <label htmlFor="conclusion">
                          <textarea
                            type="text"
                            id="conclusion"
                            name="conclusion"
                            placeholder="conclusion"
                            required
                            value={this.state.conclusion}
                            onChange={this.handleChange}
                          />
                      </label>
                      <br/>
                      <Button type="submit">Submit</Button>
                    </fieldset>
                  </Form>
                )}
              </Mutation>
              <DynamicLoadedEditor/>
            </>
        )
    }
}
