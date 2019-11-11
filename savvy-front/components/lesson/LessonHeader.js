import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";
import styled from "styled-components";
import Link from "next/link";
import renderHTML from "react-render-html";
import { SINGLE_COURSEPAGE_QUERY } from "../course/CoursePage";

const SINGLE_LESSON_QUERY = gql`
  query SINGLE_LESSON_QUERY($id: ID!) {
    lesson(where: { id: $id }) {
      id
      text
      number
      type
      published
      createdAt
      user {
        id
      }
    }
  }
`;

const SINGLE_LESSONRESULT_QUERY = gql`
  query SINGLE_LESSONRESULT_QUERY($lessonID: ID!, $id: ID) {
    lessonResults(where: { lessonID: $lessonID, student: { id: $id } }) {
      id
      visitsNumber
      lessonID
      student {
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

const CREATE_LESSONRESULT_MUTATION = gql`
  mutation CREATE_LESSONRESULT_MUTATION($visitsNumber: Int, $lessonID: ID) {
    createLessonResult(visitsNumber: $visitsNumber, lessonID: $lessonID) {
      id
    }
  }
`;

const UPDATE_LESSONRESULT_MUTATION = gql`
  mutation UPDATE_LESSONRESULT_MUTATION($id: ID!, $visitsNumber: Int) {
    updateLessonResult(id: $id, visitsNumber: $visitsNumber) {
      id
    }
  }
`;

const TextBar = styled.div`
  display: grid;
  grid-template-columns: 65% 35%;
  width: 100%;
  font-size: 1.6rem;
  margin-bottom: 15px;
  span {
    cursor: pointer;
    &:hover {
      color: red;
    }
  }
  @media (max-width: 1000px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 3%;
  }
`;

const A = styled.a`
  justify-self: center;
  align-self: center;
`;

const Text = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-right: 25px;
  div {
    padding: 2% 0% 2% 0%;
  }
  .arrow {
    cursor: pointer;
  }
`;

const Button = styled.button`
  font-size: 1.6rem;
  padding: 5%;
  background: #ffffff;
  border: 1px solid #112a62;
  color: #112a62;
  box-sizing: border-box;
  border-radius: 5px;
  width: 100px;
  height: 40px;
  cursor: pointer;
  outline: 0;
  @media (max-width: 800px) {
    font-size: 1.4rem;
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const InProgress = styled.p`
  justify-self: center;
  align-self: center;
  text-align: center;
  font-size: 1.6rem;
  padding: 2% 1%;
  width: 140px;
  border: 1px solid #716d6d;
  color: #716d6d;
  box-sizing: border-box;
  border-radius: 5px;
  @media (max-width: 800px) {
    font-size: 1.4rem;
  }
`;

const Info = styled.div`
  background: rgba(50, 172, 102, 0.05);
  padding: 2% 4%;
  margin: 0 0 4% 0;
  width: 100%;
  @media (max-width: 800px) {
    padding: 2% 8%;
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
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
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
    published: this.props.lesson.published,
    reveal: false,
    info: `
    <p>Привет!</p>
    <p>В уроке разбираются, такие вопросы, как ...</p>
    <p>Вы научитесь, считать, писать или читать!</p>
    <p>Обязателен для тех, кто хочет получить отметку 5.</p>`
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({ [name]: value });
  };

  toggle = () => {
    this.setState(prev => ({ reveal: !prev.reveal }));
  };

  render() {
    const { lesson, name, new_students, students, me, openLesson } = this.props;
    console.log(lesson.description);
    return (
      <>
        <TextBar>
          <Text>
            <div>
              {lesson.number}. {name}{" "}
              <span className="arrow" onClick={this.toggle}>
                {this.state.reveal ? `🔼` : `🔽`}
              </span>
            </div>
          </Text>
          <Buttons>
            {me &&
            (me.id === lesson.user.id || me.permissions.includes("ADMIN")) ? (
              <>
                <Mutation
                  mutation={UPDATE_PUBLISHED_MUTATION}
                  variables={{
                    id: lesson.id,
                    published: !this.state.published
                  }}
                  refetchQueries={() => [
                    {
                      query: SINGLE_LESSON_QUERY,
                      variables: { id: lesson.id }
                    }
                  ]}
                >
                  {(updatePublished, { loading, error }) => (
                    <ToggleQuestion>
                      <label className="switch">
                        <input
                          name="published"
                          type="checkbox"
                          checked={this.state.published}
                          onChange={async e => {
                            updatePublished();
                            this.handleInputChange(e);
                          }}
                        />
                        <span className="slider" />
                      </label>
                    </ToggleQuestion>
                  )}
                </Mutation>
              </>
            ) : null}
            {me && (
              <Query
                query={SINGLE_LESSONRESULT_QUERY}
                variables={{
                  lessonID: lesson.id,
                  id: me.id
                }}
              >
                {({ data, error, loading }) => {
                  if (loading) return <p>Loading...</p>;
                  if (error) return <p>Error: {error.message}</p>;
                  return (
                    <>
                      <Mutation
                        mutation={CREATE_LESSONRESULT_MUTATION}
                        variables={{
                          lessonID: lesson.id,
                          visitsNumber: 1
                        }}
                        refetchQueries={() => [
                          {
                            query: SINGLE_LESSONRESULT_QUERY,
                            variables: { lessonID: lesson.id }
                          }
                        ]}
                      >
                        {(createLessonResult, { loading, error }) => {
                          return (
                            <>
                              {data.lessonResults.length === 0 && (
                                <>
                                  {me &&
                                  lesson &&
                                  (me.id === lesson.user.id ||
                                    me.permissions.includes("ADMIN") ||
                                    lesson.id === openLesson) &&
                                  (!students.includes(me.id) ||
                                    !new_students.includes(me.id)) ? (
                                    <Link
                                      // The user is the teacher or the admin or it is an openLesson.
                                      href={{
                                        pathname: "/lesson",
                                        query: {
                                          id: lesson.id,
                                          type: lesson.type.toLowerCase()
                                        }
                                      }}
                                    >
                                      <A>
                                        <Button
                                          onClick={() => {
                                            createLessonResult();
                                          }}
                                        >
                                          Перейти
                                        </Button>
                                      </A>
                                    </Link>
                                  ) : null}

                                  {me &&
                                    lesson &&
                                    me.id !== lesson.user.id &&
                                    (students.includes(me.id) ||
                                      new_students.includes(me.id)) &&
                                    !me.permissions.includes("ADMIN") &&
                                    this.state.published && (
                                      <Link
                                        // The user hasn't visited the lesson page before. Create the lesson visit node.
                                        href={{
                                          pathname: "/lesson",
                                          query: {
                                            id: lesson.id,
                                            type: lesson.type.toLowerCase()
                                          }
                                        }}
                                      >
                                        <A>
                                          <Button
                                            onClick={() => {
                                              createLessonResult();
                                            }}
                                          >
                                            Перейти
                                          </Button>
                                        </A>
                                      </Link>
                                    )}
                                </>
                              )}
                            </>
                          );
                        }}
                      </Mutation>
                      {data.lessonResults.length > 0 && (
                        <Mutation
                          mutation={UPDATE_LESSONRESULT_MUTATION}
                          variables={{
                            id: data.lessonResults[0].id,
                            visitsNumber: data.lessonResults[0].visitsNumber + 1
                          }}
                          refetchQueries={() => [
                            {
                              query: SINGLE_LESSONRESULT_QUERY,
                              variables: { lessonID: lesson.id }
                            }
                          ]}
                        >
                          {(updateLessonResult, { loading, error }) => {
                            return (
                              <>
                                {me &&
                                lesson &&
                                (me.id === lesson.user.id ||
                                  me.permissions.includes("ADMIN") ||
                                  lesson.id === openLesson) &&
                                (!students.includes(me.id) ||
                                  !new_students.includes(me.id)) ? (
                                  <Link
                                    // The teacher or the admin visit the lesson page for the second time. We do not update anything.
                                    href={{
                                      pathname: "/lesson",
                                      query: {
                                        id: lesson.id,
                                        type: lesson.type.toLowerCase()
                                      }
                                    }}
                                  >
                                    <A>
                                      <Button
                                        onClick={() => {
                                          updateLessonResult();
                                        }}
                                      >
                                        Перейти
                                      </Button>
                                    </A>
                                  </Link>
                                ) : null}

                                {me &&
                                  lesson &&
                                  me.id !== lesson.user.id &&
                                  (students.includes(me.id) ||
                                    new_students.includes(me.id)) &&
                                  this.state.published && (
                                    <Link
                                      // The user HAS visited the lesson page and we update it now
                                      href={{
                                        pathname: "/lesson",
                                        query: {
                                          id: lesson.id,
                                          type: lesson.type.toLowerCase()
                                        }
                                      }}
                                    >
                                      <A>
                                        <Button
                                          onClick={() => {
                                            updateLessonResult();
                                          }}
                                        >
                                          Перейти
                                        </Button>
                                      </A>
                                    </Link>
                                  )}
                              </>
                            );
                          }}
                        </Mutation>
                      )}
                    </>
                  );
                }}
              </Query>
            )}

            {me &&
            lesson &&
            me.id !== lesson.user.id &&
            (students.includes(me.id) || new_students.includes(me.id)) &&
            !me.permissions.includes("ADMIN") &&
            !this.state.published ? (
              <InProgress>В разработке</InProgress>
            ) : null}
          </Buttons>
        </TextBar>

        {lesson.description && this.state.reveal && (
          <Info>{renderHTML(lesson.description)}</Info>
        )}
      </>
    );
  }
}

export default LessonHeader;
