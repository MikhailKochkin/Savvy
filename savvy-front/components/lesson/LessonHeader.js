import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';
import Link from 'next/link';
import DeleteSingleLesson from '../delete/DeleteSingleLesson';
import User from '../User';

const SINGLE_LESSON_QUERY = gql`
  query SINGLE_LESSON_QUERY($id: ID!) {
    lesson(where: { id: $id }) {
        id
        text
        number
        published
        createdAt
        user {
          id
        }
    }
  }
`;

const UPDATE_PUBLISHED_MUTATION = gql`
  mutation UPDATE_PUBLISHED_MUTATION($id: ID!, $published: Boolean) {
    updatePublished(id: $id, published: $published) {
      id
      number
      name
      text
    }
  }
`;

const TextBar = styled.div`
  display: grid;
  grid-template-columns: 50% 15% 20% 15%;
  width: 100%;
  font-size: 1.8rem;
  border-top: 1px solid #112A62;
  padding: 0 2%;
  @media (max-width: 800px) {
      grid-template-columns: 50% 20% 18% 12%;
    }
`;

const A = styled.a`
  justify-self: center;
  align-self: center;
`

const Button = styled.button`
    font-size: 1.4rem;
    font-weight: 600;
    padding: 5% ;
    /* margin: 2%; */
    color: #FFFDF7;
    background-color: #84BC9C;
    border: solid 1px white;
    cursor: pointer;
    &:hover{
        background-color: #294D4A;
    }
    @media (max-width: 800px) {
      font-size: 1.4rem;
    }
    
`;

const InProgress = styled.p`
    justify-self: center;
    align-self: center;
    text-align: center;
    font-size: 1.4rem;
    font-weight: 600;
    padding: 5% ;
    color: #FFFDF7;
    background-color: #84BC9C;
    border: solid 1px white;
    @media (max-width: 800px) {
      font-size: 1.4rem;
    }
`;

const ToggleQuestion = styled.div`
  /* The switch - the box around the slider */
  justify-self: center;
  align-self: center;
  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  }

  /* Hide default HTML checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
  }

  input:checked + .slider {
    background-color: #092242;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #092242;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
`;

class LessonHeader extends Component {
    state = {
      published: this.props.lesson.published
    }
    handleInputChange = (event) => {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
  
      this.setState({ [name]: value });
    } 
    render() {
      const { lesson, name, students, coursePageId } = this.props;
      return (
        <>
        <User>
          {({data: {me}}) => (
                <>
                    <TextBar>
                      <h4>Урок {lesson.number}. {name}</h4>
                      { me && me.id === lesson.user.id ?
                      <>
                      <Mutation 
                        mutation={UPDATE_PUBLISHED_MUTATION} 
                        variables={{
                          id: lesson.id,
                          published: !this.state.published
                        }}
                        refetchQueries={() => [{
                          query: SINGLE_LESSON_QUERY ,
                          variables: { id: lesson.id },
                        }]}
                      >
                        {(updatePublished, {loading, error}) => (

                          <ToggleQuestion>
                            <label class="switch">
                              <input 
                              name="published"
                              type="checkbox"
                              checked={this.state.published}
                              onChange={ async e => {
                                updatePublished();
                                this.handleInputChange(e);
                              }}
                              />
                              <span class="slider"></span>
                          </label>
                        </ToggleQuestion>
                          )}
                        </Mutation>
                        <DeleteSingleLesson 
                            id={lesson.id}
                            coursePageId={coursePageId}
                        />
                         </>
                          :
                        null
                        }
                        { me && lesson && me.id === lesson.user.id ?
                        <Link href={{
                            pathname: '/lesson',
                            query: {id: lesson.id}
                            }}>
                            <A>
                            <Button>Перейти к уроку</Button>
                            </A>
                        </Link> : null
                      }
                      { me && lesson && students.includes(me.id) && this.state.published ?
                        <Link href={{
                            pathname: '/lesson',
                            query: {id: lesson.id}
                            }}>
                            <A>
                            <Button>Перейти к уроку</Button>
                            </A>
                        </Link> : null
                      }
                      { me && lesson && students.includes(me.id) && !this.state.published ?
                        <InProgress>Урок в разработке</InProgress> : null
                      }
                     
                      
                    </TextBar>
                  </>
              )}
          </User>
        </>
      );
    }
  }
  
export default LessonHeader;

