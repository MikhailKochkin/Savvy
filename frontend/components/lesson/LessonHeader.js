import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import Link from "next/link";
import renderHTML from "react-render-html";
import { SINGLE_COURSEPAGE_QUERY } from "../course/CoursePage";
import { withTranslation } from "../../i18n";

const UPDATE_PUBLISHED_MUTATION = gql`
  mutation UPDATE_PUBLISHED_MUTATION($id: String!, $published: Boolean) {
    updatePublished(id: $id, published: $published) {
      id
    }
  }
`;

const CREATE_LESSONRESULT_MUTATION = gql`
  mutation CREATE_LESSONRESULT_MUTATION($visitsNumber: Int, $lessonID: String) {
    createLessonResult(visitsNumber: $visitsNumber, lessonID: $lessonID) {
      id
    }
  }
`;

const UPDATE_LESSONRESULT_MUTATION = gql`
  mutation UPDATE_LESSONRESULT_MUTATION(
    $id: String!
    $visitsNumber: Int
    $progress: Int
  ) {
    updateLessonResult(
      id: $id
      visitsNumber: $visitsNumber
      progress: $progress
    ) {
      id
    }
  }
`;

const TextBar = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  font-size: 1.6rem;
  margin-bottom: 15px;
  border-left: 2px solid;
  border-color: ${(props) => props.color};
  padding: 2%;
  padding-left: 2%;
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
  flex-basis: 65%;
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
  background: #fff;
  border: 1px solid #112a62;
  color: #112a62;
  box-sizing: border-box;
  border-radius: 5px;
  width: 100px;
  height: 40px;
  cursor: pointer;
  outline: 0;
  transition: all 0.4s;
  &:hover {
    border: 1px solid #f6511d;
    color: #f6511d;
  }
  @media (max-width: 800px) {
    font-size: 1.4rem;
  }
`;

const Buttons = styled.div`
  flex-basis: 35%;
  /* background: yellow; */
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
  @media (max-width: 800px) {
    justify-content: flex-start;
  }
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
  margin-right: 45%;
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

const LessonHeader = (props) => {
  const [published, setPublished] = useState(props.lesson.published);
  const [reveal, setReveal] = useState(false);

  const [createLessonResult, { create_data }] = useMutation(
    CREATE_LESSONRESULT_MUTATION
  );

  const [updateLessonResult, { update_data }] = useMutation(
    UPDATE_LESSONRESULT_MUTATION
  );

  const [updatePublished, { published_data }] = useMutation(
    UPDATE_PUBLISHED_MUTATION
  );

  const {
    lesson,
    name,
    author,
    new_students,
    coursePageId,
    students,
    me,
  } = props;

  let color;

  if (me) {
    let visit = lesson.lessonResults.find((l) => l.student.id === me.id);
    let progress;
    if (visit && lesson.structure) {
      progress = visit.progress / lesson.structure.length;
    } else {
      progress = 0;
    }
    if (visit && progress < 0.9) {
      color = "#FFD836";
    } else if (visit && progress > 0.9) {
      color = "#32AC66";
    } else {
      color = "white";
    }
  } else {
    color = "white";
  }
  return (
    <>
      <TextBar color={color}>
        <Text>
          <div>
            {lesson.number}. {name}{" "}
            <span className="arrow" onClick={(e) => setRevea(!reveal)}>
              {reveal ? `🔽` : `🔼`}
            </span>
          </div>
        </Text>
        <Buttons>
          {me && (me.id === author || me.permissions.includes("ADMIN")) ? (
            <>
              <ToggleQuestion>
                <label className="switch">
                  <input
                    name="published"
                    type="checkbox"
                    checked={published}
                    onChange={async (e) => {
                      updatePublished({
                        variables: {
                          id: lesson.id,
                          published: !published,
                        },
                        // refetchQueries: [
                        //   {
                        //     query: SINGLE_COURSEPAGE_QUERY,
                        //     variables: { id: coursePageId },
                        //   },
                        // ],
                      });
                      setPublished(
                        e.target.type === "checkbox"
                          ? e.target.checked
                          : e.target.value
                      );
                    }}
                  />
                  <span className="slider" />
                </label>
              </ToggleQuestion>
            </>
          ) : null}

          {me && (
            <>
              {lesson.lessonResults.filter((l) => l.student.id === me.id)
                .length === 0 && (
                <>
                  {me &&
                  lesson &&
                  (me.id === author ||
                    me.permissions.includes("ADMIN") ||
                    lesson.open) ? (
                    <Link
                      // The user is the teacher or the admin or it is an openLesson.
                      href={{
                        pathname: "/lesson",
                        query: {
                          id: lesson.id,
                          type: lesson.type.toLowerCase(),
                        },
                      }}
                    >
                      <A>
                        <Button
                          onClick={async (e) => {
                            createLessonResult({
                              variables: {
                                lessonID: lesson.id,
                                visitsNumber: 1,
                              },
                            });
                            console.log(0);
                          }}
                        >
                          {props.t("start")}
                        </Button>
                      </A>
                    </Link>
                  ) : null}
                  {me &&
                    lesson &&
                    me.id !== lesson.user.id &&
                    new_students.includes(me.id) &&
                    !me.permissions.includes("ADMIN") &&
                    !lesson.open &&
                    published && (
                      <Link
                        // The user hasn't visited the lesson page before. Create the lesson visit node.
                        href={{
                          pathname: "/lesson",
                          query: {
                            id: lesson.id,
                            type: lesson.type.toLowerCase(),
                          },
                        }}
                      >
                        <A>
                          <Button
                            onClick={async (e) => {
                              createLessonResult({
                                variables: {
                                  lessonID: lesson.id,
                                  visitsNumber: 1,
                                },
                              });
                              console.log(1);
                            }}
                          >
                            {props.t("start")}
                          </Button>
                        </A>
                      </Link>
                    )}
                </>
              )}
              {lesson.lessonResults.filter((l) => l.student.id === me.id)
                .length > 0 && (
                <>
                  {/* 1. Button for the teacher (if admin / course owner) */}
                  {me &&
                  lesson &&
                  (me.id === author || me.permissions.includes("ADMIN")) ? (
                    <Link
                      // The user is the teacher or the admin or it is an openLesson.
                      href={{
                        pathname: "/lesson",
                        query: {
                          id: lesson.id,
                          type: lesson.type.toLowerCase(),
                        },
                      }}
                    >
                      <A>
                        <Button
                          onClick={() => {
                            updateLessonResult({
                              variables: {
                                id: lesson.lessonResults[0].id,
                                visitsNumber:
                                  lesson.lessonResults[0].visitsNumber + 1,
                              },
                            });
                            console.log(3);
                          }}
                        >
                          {props.t("start")}
                        </Button>
                      </A>
                    </Link>
                  ) : null}

                  {/* 2. Button for the student (if registered not admin course owner)  */}
                  {me &&
                    lesson &&
                    me.id !== lesson.user.id &&
                    !me.permissions.includes("ADMIN") &&
                    new_students.includes(me.id) &&
                    published && (
                      <Link
                        // The user HAS visited the lesson page and we update it now
                        href={{
                          pathname: "/lesson",
                          query: {
                            id: lesson.id,
                            type: lesson.type.toLowerCase(),
                          },
                        }}
                      >
                        <A>
                          <Button
                            onClick={() => {
                              updateLessonResult({
                                variables: {
                                  id: lesson.lessonResults[0].id,
                                  visitsNumber:
                                    lesson.lessonResults[0].visitsNumber + 1,
                                },
                              });
                              console.log(4);
                            }}
                          >
                            {props.t("start")}
                          </Button>
                        </A>
                      </Link>
                    )}
                  {/* 3. Button for the open lesson ( if open and not registered / admin) */}
                  {me &&
                    lesson &&
                    lesson.open &&
                    me.id !== lesson.user.id &&
                    !me.permissions.includes("ADMIN") &&
                    !new_students.includes(me.id) &&
                    published && (
                      <Link
                        // The user HAS visited the lesson page and we update it now
                        href={{
                          pathname: "/lesson",
                          query: {
                            id: lesson.id,
                            type: lesson.type.toLowerCase(),
                          },
                        }}
                      >
                        <A>
                          {console.log(new_students.includes(me.id))}
                          <Button
                            onClick={() => {
                              updateLessonResult({
                                variables: {
                                  id: lesson.lessonResults[0].id,
                                  visitsNumber:
                                    lesson.lessonResults[0].visitsNumber + 1,
                                },
                              });
                              console.log(5);
                            }}
                          >
                            {props.t("start")}
                          </Button>
                        </A>
                      </Link>
                    )}
                </>
              )}
            </>
          )}

          {me &&
          lesson &&
          me.id !== lesson.user.id &&
          new_students.includes(me.id) &&
          !me.permissions.includes("ADMIN") &&
          !published ? (
            <InProgress>В разработке</InProgress>
          ) : null}
        </Buttons>
      </TextBar>
      {lesson.description && reveal && (
        <Info>{renderHTML(lesson.description)}</Info>
      )}
    </>
  );
};

export default withTranslation("course")(LessonHeader);

export { CREATE_LESSONRESULT_MUTATION };
export { UPDATE_LESSONRESULT_MUTATION };
