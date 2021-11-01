import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import Link from "next/link";
import renderHTML from "react-render-html";
import { SINGLE_COURSEPAGE_QUERY } from "../course/CoursePage";

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
  flex-direction: column;
  justify-content: space-between;
  background: #fff;
  width: 320px;
  max-height: 430px;
  border-radius: 2rem;
  font-size: 1.6rem;
  margin-bottom: 35px;
  margin-right: 55px;
  border-left: 2px solid;
  border-color: ${(props) => props.color};
  padding: 2%;
  padding-left: 2%;
  .image {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  img {
    max-height: 150px;
  }
  span {
    cursor: pointer;
    &:hover {
      color: red;
    }
  }
  transition: 0.3s;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 6px -7px rgb(0 0 0 / 10%),
      0 4px 30px -9px rgb(0 0 0 / 20%);
  }
  @media (max-width: 1000px) {
    display: flex;
    width: 95%;
    margin: 20px 0;
    flex-direction: column;
    justify-content: center;
    padding: 0 3%;
    padding-bottom: 5%;
  }
`;

const A = styled.a`
  /* justify-self: center;
  align-self: center; */
  width: 100%;
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 15px;
  /* padding-right: 25px; */
  .comments {
    width: 40px;
    height: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }
  .lesson_name {
    font-size: 1.9rem;
    font-weight: bold;
    line-height: 1.5;
  }
  .lesson_description {
    font-size: 1.4rem;
    line-height: 1.6;
    p {
      margin: 4px 0;
    }
  }
  div {
    padding: 2% 0% 2% 0%;
  }
  .arrow {
    cursor: pointer;
  }
`;

const Button = styled.button`
  font-size: 1.6rem;
  margin-top: 20px;
  background: #f0f5f7;
  border: 1px solid #f0f5f7;
  color: #000;
  box-sizing: border-box;
  border-radius: 5px;
  width: 100%;
  height: 40px;
  cursor: pointer;
  font-family: Montserrat;
  outline: 0;
  transition: all 0.6s;
  &:hover {
    border: 1px solid #666666;
    background: #666666;
    color: #fff;
  }
  @media (max-width: 800px) {
    font-size: 1.4rem;
  }
`;

const Time = styled.div`
  color: #666666;
  font-size: 1.4rem;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  align-self: flex-start;
  /* margin-right: 45%; */
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

  const { lesson, name, author, new_students, coursePageId, statements, me } =
    props;

  let color;
  let progress;
  let visit;

  if (me) {
    visit = lesson.lessonResults.find((l) => l.student.id === me.id);
    if (visit && lesson.structure && lesson.structure.lessonItems) {
      progress = visit.progress / lesson.structure.lessonItems.length;
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

  let forums = [];
  let ratings = [];
  let average;
  // if (lesson) {
  //   if (lesson.forum && lesson.forum.rating) {
  //     lesson.forum.rating.map((r) => ratings.push(r.rating));
  //   }
  //   average = (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(2);

  //   // lesson.map((l) => forums.push(l.forum ? l.forum.rating : null));
  //   // forums = forums.filter((f) => f !== null).filter((f) => f.length !== 0);
  //   // forums.map((f) => f.map((r) => ratings.push(r.rating)));
  //   // average = (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(2);
  // }

  let time;
  if (lesson.structure && lesson.structure.lessonItems) {
    time = lesson.structure.lessonItems.length * 5;
  } else {
    time = 30;
  }

  let need_response;
  if (statements) {
    need_response = statements.filter((s) => s.comments.length === 0);
  } else {
    need_response = [];
  }

  return (
    <>
      <TextBar color={color}>
        <div>
          <Text>
            <div className="lesson_name">
              {lesson.number}. {name} – {need_response.length}
            </div>
            <div className="lesson_description">
              {lesson.description &&
                renderHTML(lesson.description.substring(0, 300))}
            </div>
          </Text>
        </div>
        <div>
          <Time>{time} мин.</Time>
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
            {me &&
              !lesson.published &&
              (me.id === author || me.permissions.includes("ADMIN")) && (
                <Link
                  // author or admin or openLesson if the lesson is not published.
                  href={{
                    pathname: "/lesson",
                    query: {
                      id: lesson.id,
                      type: lesson.type.toLowerCase(),
                    },
                  }}
                >
                  <A>
                    <Button>Начать</Button>
                  </A>
                </Link>
              )}
            {me &&
              lesson.published &&
              (me.permissions.includes("ADMIN") ||
                new_students.includes(me.id) ||
                me.id === lesson.user.id ||
                lesson.open) && (
                <Link
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
                        // 0. admin / open lesson / lesson author visit open lesson for the first time
                        if (
                          me &&
                          lesson &&
                          visit == undefined &&
                          (me.id === author ||
                            me.permissions.includes("ADMIN") ||
                            lesson.open)
                        ) {
                          createLessonResult({
                            variables: {
                              lessonID: lesson.id,
                              visitsNumber: 1,
                            },
                          });
                          console.log(0);
                        }
                        // 1. registered user visits the lesson for the first time
                        if (
                          me &&
                          lesson &&
                          visit == undefined &&
                          me.id !== lesson.user.id &&
                          new_students.includes(me.id) &&
                          !me.permissions.includes("ADMIN") &&
                          !lesson.open &&
                          published
                        ) {
                          createLessonResult({
                            variables: {
                              lessonID: lesson.id,
                              visitsNumber: 1,
                            },
                          });
                          console.log(1);
                        }

                        // 2. registered user visits the lesson one more time
                        if (
                          me &&
                          lesson &&
                          visit !== undefined &&
                          me.id !== lesson.user.id &&
                          !me.permissions.includes("ADMIN") &&
                          new_students.includes(me.id) &&
                          published
                        ) {
                          updateLessonResult({
                            variables: {
                              id: visit.id,
                              visitsNumber: visit.visitsNumber + 1,
                            },
                          });
                          console.log(2);
                        }

                        // 3. author or admin visits the lesson for the first time
                        if (
                          me &&
                          lesson &&
                          visit == undefined &&
                          (me.id === author || me.permissions.includes("ADMIN"))
                        ) {
                          createLessonResult({
                            variables: {
                              lessonID: lesson.id,
                              visitsNumber: 1,
                            },
                          });
                          console.log(3);
                        }

                        // 4. author or admin visits the lesson one more time
                        if (
                          me &&
                          lesson &&
                          visit !== undefined &&
                          (me.id === author || me.permissions.includes("ADMIN"))
                        ) {
                          updateLessonResult({
                            variables: {
                              id: visit.id,
                              visitsNumber: visit.visitsNumber + 1,
                            },
                          });
                          console.log(4);
                        }

                        // 5. unregistered user visits the open lesson for the first time
                        if (
                          lesson &&
                          lesson.open &&
                          visit == undefined &&
                          me.id !== lesson.user.id &&
                          !me.permissions.includes("ADMIN") &&
                          !new_students.includes(me.id) &&
                          published
                        ) {
                          createLessonResult({
                            variables: {
                              lessonID: lesson.id,
                              visitsNumber: 1,
                            },
                          });
                          console.log(5);
                        }
                        // 6. unregistered user visits the open lesson one more time
                        if (
                          lesson &&
                          lesson.open &&
                          me.id !== lesson.user.id &&
                          visit !== undefined &&
                          !me.permissions.includes("ADMIN") &&
                          !new_students.includes(me.id) &&
                          published
                        ) {
                          updateLessonResult({
                            variables: {
                              id: visit.id,
                              visitsNumber: visit.visitsNumber + 1,
                            },
                          });
                          console.log(6);
                        }
                      }}
                    >
                      {/* {props.t("start")} */}
                      Начать
                    </Button>
                  </A>
                </Link>
              )}

            {/* {me &&
            lesson &&
            me.id !== lesson.user.id &&
            new_students.includes(me.id) &&
            !me.permissions.includes("ADMIN") &&
            !published ? (
              <InProgress>В разработке</InProgress>
            ) : null} */}
          </Buttons>
        </div>
      </TextBar>
    </>
  );
};

// export default withTranslation("course")(LessonHeader);
export default LessonHeader;

export { CREATE_LESSONRESULT_MUTATION };
export { UPDATE_LESSONRESULT_MUTATION };
