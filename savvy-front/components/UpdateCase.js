import React, {Component} from 'react';
import  { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Error from './ErrorMessage';
import Router from 'next/router';

const SINGLE_CASE_QUERY = gql`
    query SINGLE_CASE_QUERY($id: ID!) {
        case(where: {id: $id}){
            id
            title
            description
            price
            mainText
            issue
            rule
            analysis
            conclusion
        }
    }
`;

// updateCase(id: ID!, title: String, description: String,  
//     mainText: String, price: Int, issue: String, rule: String, 
//     analysis: String, conclusion: String): Case!

const UPDATE_CASE_MUTATION = gql`
  mutation UPDATE_CASE_MUTATION(
    $id: ID!,
    $title: String
    $description: String 
    $price: Int
    $issue: String
    $rule: String
    $analysis: String 
    $conclusion: String
  ) {
    updateCase(
      id: $id
      title: $title 
      description: $description  
      price: $price
      issue: $issue
      rule: $rule
      analysis: $analysis 
      conclusion: $conclusion
    ) {
      id
      title 
      description  
      price
      issue
      rule
      analysis 
      conclusion
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

export default class UpdateCase extends Component {
      state = {};
      handleChange = e => {
        const { name, type, value } = e.target;
        const val = type === 'number' ? parseFloat(value) : value;
        this.setState({[name]: val});
      };
      updateCase = async (e, updateCaseMutation) => {
          e.preventDefault();
        //   console.log('Updating case!!');
        //   console.log(this.state);
        //   console.log(this.props.id);
          const res = await updateCaseMutation({
              variables: {
                  id: this.props.id,
                  ...this.state,
              }
          })
      }
  
    render() {
        return (
          <Query 
            query={SINGLE_CASE_QUERY} 
            variables={{id: this.props.id
            }}
          >
            {({data, loading}) => {
            if(loading) return <p>Loading...</p>
            if(!data.case) return <p>No case found!</p>
            return (
                <Mutation 
                  mutation={UPDATE_CASE_MUTATION} 
                  variables={this.state}>
                    {(updateCase, {loading, error}) => (
                    <Form onSubmit={e => this.updateCase(e, 
                    updateCase)}>
                    <Error error={error}/>
                    <fieldset disabled={loading} aria-busy={loading}>
                        <label htmlFor="title">
                            <input
                                type="text"
                                id="title"
                                name="title"
                                placeholder="title"
                                defaultValue={data.case.title}
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
                                defaultValue={data.case.description}
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
                                defaultValue={data.case.price}
                                onChange={this.handleChange}
                            />
                        </label>
                        <br/>
                        <label htmlFor="mainText">
                            <textarea
                                type="number"
                                id="mainText"
                                name="mainText"
                                placeholder="mainText"
                                defaultValue={data.case.mainText}
                                onChange={this.handleChange}
                            />
                        </label>
                        <br/>
                        <label htmlFor="issue">
                            <textarea
                                type="text"
                                id="issue"
                                name="issue"
                                placeholder="issue"
                                required
                                defaultValue={data.case.issue}
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
                                defaultValue={data.case.rule}
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
                                defaultValue={data.case.analysis}
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
                                defaultValue={data.case.conclusion}
                                onChange={this.handleChange}
                            />
                        </label>
                        <br/>
                        <Button type="submit">Sav{loading ? "ing" : "e"} Changes</Button>
                    </fieldset>
                    </Form>
                    )}
                </Mutation>
            )}}
        </Query>
    )}
}

export { UPDATE_CASE_MUTATION };
