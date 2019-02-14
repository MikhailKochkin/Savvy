import React, {Component} from 'react';
import  { Mutation, Query, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Error from '../ErrorMessage';
import User from '../User';

const CREATE_SANDBOXPAGEGOALS_MUTATION = gql`
  mutation CREATE_SANDBOXPAGEGOALS_MUTATION($goal: String!, $sandboxPageID: ID!) {
    createSandboxPageGoal(goal: $goal, sandboxPageID: $sandboxPageID) {
      id
    }
  }
`;

const SANDBOXPAGEGOALS_QUERY = gql`
  query SANDBOXPAGEGOALS_QUERY($id: ID!) {
    sandboxPageGoals(where: {sandboxPageID: $id}) {
      id
      goal
      user {
          id
      }
    }
  }
`;

const Goals = styled.div`
    display: flex;
    flex: 2 60%;
    flex-direction: column;
    background-color: #0A2342;
    color: white;
    h2 {
        margin-top: 6%;
    }
    @media (max-width: 800px) {
        padding: 5%;
        h2 {
            margin-left: 8%;
            margin-top: 0;
        }
    }
`;

const Form = styled.form`
  background: rgba(0, 0, 0, 0.02);
  font-size: 1.6rem;
  margin-top: 2%;
  fieldset {
    border: none;
  }
  textarea, input {
    font-size: 1.7rem;
    width: 80%;
    font-family: "Gill Sans", serif;
    border-radius: 5px;
    padding:8px; 
  }
  
`;

const Button = styled.button`
    border: none;
    color: white;
    padding: 5px 11px;
    border-radius: 5px;
    margin-left: 2%;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    cursor: pointer;
    &:hover {
        background-color: #B8C5D6;
    }
`

export default class CreateSandboxPageGoal extends Component {
    constructor(props) {
      super(props)
      this.state = {
        goal: ''
      };
      this.handleChange = e => {
        const { name, value } = e.target;
        this.setState({[name]: value});
      };

    }
    update = (cache, payload) => {
        const data = cache.readQuery({ 
            query: gql`
                query SANDBOXPAGEGOALS_QUERY($id: ID!) {
                    sandboxPageGoals(where: {sandboxPageID: $id}) {
                        id
                        goal
                    }
                } 
            `, 
            variables: {
                id: this.props.id,
            },
        });
    }
    render() {
        const {id} = this.props
        return (
            <Goals>
                <Query
                    query={SANDBOXPAGEGOALS_QUERY} 
                    variables={{
                        id,
                    }}>
                    {({ data, error, loading }) => {
                        if (loading) return <p>Loading...</p>;
                        if (error) return <p>Error: {error.message}</p>;
                        const sandboxPageGoals = data.sandboxPageGoals
                        return (
                            <>
                                <h2>Задачи песочницы</h2>
                                <ol>
                                {sandboxPageGoals.map(goal => <li key={goal.id}>{goal.goal}</li>)}
                                </ol>
                                    {this.props.me !== null && this.props.me === this.props.author &&
                                    <Mutation 
                                        mutation={CREATE_SANDBOXPAGEGOALS_MUTATION}
                                        variables={{
                                            sandboxPageID: id,
                                            ...this.state
                                        }}
                                        update={this.update}
                                    >
                                        {(createSandboxPageGoal, {loading, error}) => (
                                        <Form onSubmit={ async e => {
                                            e.preventDefault();
                                            const res = await createSandboxPageGoal();
                                            this.setState({goal: ""})
                                            }}
                                        >
                                            <User>
                                                {({data: {me}}) => (
                                                    <>
                                                    {/* { me !== null && sandboxPageGoals[0] && 
                                                    me.sandboxPages.includes(this.props.id) === me.id && */}
                                                    <fieldset disabled={loading} aria-busy={loading}>
                                                        <label htmlFor="goal">
                                                            <input
                                                                type="text"
                                                                id="goal"
                                                                name="goal"
                                                                placeholder="Задача песочницы"
                                                                value={this.state.goal}
                                                                required
                                                                onChange={this.handleChange}
                                                            />
                                                        </label>
                                                        <Button type="submit">✏️</Button>
                                                    </fieldset>
                                                    {/* } */}
                                                  </>
                                                )}
                                            </User>
                                        </Form>
                                        )}
                                    </Mutation>
                                }
                            </>
                    )
               }}
              </Query>
            </Goals>
        )
    }
}
