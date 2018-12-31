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
`;

const Form = styled.form`
  /* box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05); */
  background: rgba(0, 0, 0, 0.02);
  /* border: 5px solid white; */
  font-size: 1.5rem;
  /* line-height: 1.5; */
  /* font-weight: 600; */
  textarea, input {
    font-size: 1.7rem;
    width: 90%;
    font-family: "Gill Sans", serif;
  }
  input{
    margin: 0.2% 0;
  }
`;

const Button = styled.button`
    border: none;
    color: white;
    padding: 5px 11px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
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
        console.log('Running the function!')
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
        console.log(data);
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
                                {sandboxPageGoals.map(goal => 
                                    <p key={goal.id}>{goal.goal}</p>
                                )}
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
                                            // Stop the form from submitting
                                            e.preventDefault();
                                            // call the mutation
                                            const res = await createSandboxPageGoal();
                                            // change the page to the single item page
                                            console.log(res);
                                            this.setState({goal: ""})
                                            }}
                                        >
                                            <Error error={error}/>
                                            <User>
                                                {({data: {me}}) => (
                                                    <>
                                                    { me !== null && sandboxPageGoals[0] &&
                                                    sandboxPageGoals[0].user.id === me.id &&
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
                                                    }
                                                  </>
                                                )}
                                            </User>
                                        </Form>
                                        )}
                                    </Mutation>
                                {/* :
                                null } */}
                            </>
                    )
               }}
              </Query>
            </Goals>
        )
    }
}
