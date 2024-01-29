import { useState } from "react";
import { useMutation, useQuery, gql } from "@apollo/client";
import styled from "styled-components";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import parse from "html-react-parser";
import calculateSum from "../../functions.js";

const UPDATE_PUBLISHED_MUTATION = gql`
  mutation UPDATE_PUBLISHED_MUTATION($id: String!, $published: Boolean) {
    updatePublished(id: $id, published: $published) {
      id
    }
  }
`;

const UPDATE_LESSON_MUTATION = gql`
  mutation UPDATE_LESSON_MUTATION(
    $id: String!
    $number: Int
    $description: String
  ) {
    updateLesson(id: $id, number: $number, description: $description) {
      id
    }
  }
`;

const CREATE_LESSONRESULT_MUTATION = gql`
  mutation CREATE_LESSONRESULT_MUTATION($visitsNumber: Int, $lessonID: String) {
    createLessonResult(visitsNumber: $visitsNumber, lessonID: $lessonID) {
      id
      visitsNumber
      progress
      createdAt
      updatedAt
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
      progress
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
  position: relative;
  box-shadow: 0 4px 6px -7px rgb(0 0 0 / 5%), 0 4px 30px -9px rgb(0 0 0 / 10%);
  .open {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    background: #2e4057;
    border-radius: 50%;
    position: absolute;
    top: -15px;
    left: 290px;
    img {
      width: 50px;
      height: 50px;
    }
  }
  .emoji {
    position: absolute;
    font-size: 2.4rem;
    top: 2%;
    left: 86%;
    animation: spin 3s infinite linear;
  }
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes twist-up {
    to {
      transform: rotateX(360deg);
    }
  }
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
    input {
      border: none;
      background: none;
      font-family: Montserrat;
      outline: 0;
      width: 45px;
      font-size: 1.9rem;
      font-weight: bold;
      line-height: 1.5;
    }
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

const Frame = styled.div`
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  width: 100%;
  padding: 0 1%;
  .com {
    border-top: 1px solid #c4c4c4;
  }
`;

const DynamicLoadedEditor = dynamic(import("../editor/HoverEditor"), {
  loading: () => <p>...</p>,
  ssr: false,
});

const LessonHeader = (props) => {
  const [published, setPublished] = useState(props.lesson.published);
  const [number, setNumber] = useState(props.lesson.number);
  const [description, setDescription] = useState(props.lesson.description);

  const { t } = useTranslation("course");

  const [createLessonResult, { create_data }] = useMutation(
    CREATE_LESSONRESULT_MUTATION
  );

  const [updateLessonResult, { update_data }] = useMutation(
    UPDATE_LESSONRESULT_MUTATION
  );

  const [updateLesson, { lesson_data }] = useMutation(UPDATE_LESSON_MUTATION);

  const [updatePublished, { published_data }] = useMutation(
    UPDATE_PUBLISHED_MUTATION
  );

  const {
    lesson,
    name,
    author,
    lessonResult,
    coursePage,
    lessonLength,
    coursePageId,
    me,
    i_am_author,
  } = props;
  let color;
  let progress;
  let visit;
  if (me) {
    visit = lessonResult;
    if (visit && lesson.structure && lesson.structure.lessonItems) {
      progress = visit.progress / lesson.structure.lessonItems.length;
    } else {
      progress = 0;
    }
    if (visit && progress < 0.8) {
      color = "#FFD836";
    } else if (visit && progress >= 0.8) {
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

  let time;

  if (lesson.structure && lesson.structure.lessonItems) {
    time = calculateSum(lesson.structure.lessonItems);
  } else {
    time = 40;
  }

  const slide2 = () => {
    var my_element = document.getElementById("info_box");
    my_element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  const myCallback = (data) => {
    setDescription(parseInt(data));
    return updateLesson({
      variables: {
        id: lesson.id,
        number: number,
        description: data,
      },
    });
  };
  const handleButtonClick = async () => {
    const isRegisteredUser =
      me &&
      lesson &&
      me.id !== lesson.user.id &&
      !lesson.authors?.includes(me.id);
    const isAdmin = me.permissions.includes("ADMIN");
    const isFirstVisit = visit === undefined;
    const isSubscribedToCourse =
      me.new_subjects.filter((s) => s.id === coursePageId).length > 0;
    const isAuthorOrAdmin = me.id && (isAdmin || i_am_author);
    const isLessonFinished =
      visit?.progress == lessonLength && lessonLength !== undefined && visit
        ? true
        : false;

    const createVisit = () => {
      createLessonResult({
        variables: {
          lessonID: lesson.id,
          visitsNumber: 1,
        },
      });
    };

    const updateVisit = () => {
      updateLessonResult({
        variables: {
          id: visit.id,
          visitsNumber: visit.visitsNumber + 1,
        },
      });
    };

    // A student is visiting the lesson for the first time
    if (published) {
      if (
        isRegisteredUser &&
        isFirstVisit &&
        isSubscribedToCourse &&
        !isAuthorOrAdmin &&
        !isLessonFinished
        //&& !lesson.open
      ) {
        createVisit();
        // console.log(1);
      }

      // A student continues the unfinished lesson

      if (
        isRegisteredUser &&
        !isFirstVisit &&
        isSubscribedToCourse &&
        !isLessonFinished &&
        !isAuthorOrAdmin
      ) {
        updateVisit();
        // console.log(2);
      }

      // A student is revisiting the finished lesson

      if (
        isRegisteredUser &&
        !isFirstVisit &&
        isSubscribedToCourse &&
        isLessonFinished &&
        !isAuthorOrAdmin
      ) {
        createVisit();
        // console.log(3);
      }

      // An author visits the lesson for the first time

      if (isFirstVisit && isAuthorOrAdmin) {
        createVisit();
        // console.log(4);
      }

      // An author visits the lesson for second or more time

      if (!isFirstVisit && isAuthorOrAdmin) {
        updateVisit();
        // console.log(5);
      }

      // An unsubscribed  student is visiting an open lesson for the first time

      if (
        lesson.open &&
        isFirstVisit &&
        !isAuthorOrAdmin &&
        !isLessonFinished &&
        !isSubscribedToCourse
      ) {
        createVisit();
        // console.log(6);
      }

      // An unsubscribed student continues the open lesson

      if (
        lesson.open &&
        !isFirstVisit &&
        !isAuthorOrAdmin &&
        !isLessonFinished &&
        !isSubscribedToCourse
      ) {
        updateVisit();
        // console.log(7);
      }

      // An unsubscribed student revisits the open lesson that they have already finished

      if (
        lesson.open &&
        !isFirstVisit &&
        !isAuthorOrAdmin &&
        isLessonFinished &&
        !isSubscribedToCourse
      ) {
        createVisit();
        // console.log(8);
      }
    }
  };

  return (
    <>
      <TextBar color={color} id={"simulator_" + lesson.id}>
        <div>
          <Text>
            <div className="lesson_name">
              {me &&
              (me.id === author ||
                me.permissions.includes("ADMIN") ||
                i_am_author) ? (
                <input
                  name="number"
                  type="number"
                  defaultValue={number}
                  onChange={async (e) => {
                    setNumber(parseInt(e.target.value));
                    return updateLesson({
                      variables: {
                        id: lesson.id,
                        number: parseInt(e.target.value),
                      },
                    });
                  }}
                />
              ) : (
                `${lesson.number}. `
              )}
              {name}{" "}
            </div>
            <div className="lesson_description">
              {me &&
              (me.id === author ||
                me.permissions.includes("ADMIN") ||
                i_am_author) ? (
                <Frame>
                  <DynamicLoadedEditor
                    index={0}
                    name="description"
                    getEditorText={myCallback}
                    value={lesson.description}
                  />
                </Frame>
              ) : (
                lesson.description &&
                parse(lesson.description.substring(0, 300))
              )}
            </div>
          </Text>
        </div>
        <div>
          <Time>
            {time} {t("minutes")}
          </Time>
          <Buttons>
            {/* Case 2. Admin or course author publishes the course */}

            {me &&
            (me.id === author ||
              me.permissions.includes("ADMIN") ||
              i_am_author) ? (
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

            {/* Case 3. Admin or course opens the lesson */}

            {me &&
              (me.id === author ||
                me.permissions.includes("ADMIN") ||
                i_am_author) && (
                <Link
                  legacyBehavior
                  href={{
                    pathname: "/lesson",
                    query: {
                      id: lesson.id,
                      type: lesson.type.toLowerCase(),
                    },
                  }}
                >
                  <A>
                    <Button>{t("open")} </Button>
                  </A>
                </Link>
              )}

            {/* {lesson.type.toLowerCase()} */}

            {/* Case 4. Web site user opens the lesson */}
            {/* First check if the lesson is not under development and i am not the developer */}

            {lesson.type.toLowerCase() !== "regular" &&
            me &&
            me.id !== author &&
            !me.permissions.includes("ADMIN") &&
            !i_am_author ? (
              lesson.open ? (
                <Link
                  legacyBehavior
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
                    // onClick={handleButtonClick}
                    >
                      {t("open")}
                    </Button>
                  </A>
                </Link>
              ) : me.new_subjects.filter((s) => s.id == coursePageId).length >
                0 ? (
                <Link
                  legacyBehavior
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
                    // onClick={handleButtonClick}
                    >
                      {t("open")}
                    </Button>
                  </A>
                </Link>
              ) : null
            ) : null}

            {/* Case 5. Open lesson */}

            {!me && lesson.open && lesson.type.toLowerCase() !== "regular" && (
              <Link
                legacyBehavior
                href={{
                  pathname: "/lesson",
                  query: {
                    id: lesson.id,
                    type: lesson.type.toLowerCase(),
                  },
                }}
              >
                <A>
                  <Button>{t("open")}</Button>
                </A>
              </Link>
            )}
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
