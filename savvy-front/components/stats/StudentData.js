import { useState } from "react";
import styled from "styled-components";
import { useMutation, useLazyQuery, gql } from "@apollo/client";
import { Mutation } from "@apollo/client/react/components";
import Button from "@material-ui/core/Button";
import dynamic from "next/dynamic";

import { withStyles } from "@material-ui/core/styles";
import moment from "moment";
import LessonData from "./LessonData";
import Journey from "./Journey";

const SEND_MESSAGE_MUTATION = gql`
  mutation SEND_MESSAGE_MUTATION($userId: String!, $text: String!) {
    sendMessage(userId: $userId, text: $text) {
      id
    }
  }
`;

const UPDATE_COURSE_VISIT_MUTATION = gql`
  mutation UPDATE_COURSE_VISIT_MUTATION(
    $id: String!
    $reminders: [DateTime]
    $comment: String
    $info: EmailInfo
  ) {
    sendEmailToStudent(
      id: $id
      reminders: $reminders
      comment: $comment
      info: $info
    ) {
      id
    }
  }
`;

const UPDATE_FINISH_MUTATION = gql`
  mutation UPDATE_FINISH_MUTATION($id: String!, $finish: DateTime) {
    updateFinish(id: $id, finish: $finish) {
      id
    }
  }
`;

const UPDATE_USER_MUTATION = gql`
  mutation UPDATE_USER_MUTATION($id: String!, $tags: [String]) {
    updateUser(id: $id, tags: $tags) {
      id
    }
  }
`;

const Name = styled.div`
  font-size: 1.6rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 4%;
  .email {
    font-size: 1.3rem;
    color: grey;
  }
`;

const Square = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50px;
  div {
    text-align: center;
    width: 70px;
    height: 30px;
    background: ${(props) => props.inputColor || "palevioletred"};
  }
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50px;
  /* div {
    text-align: center;
    width: 70px;
    height: 30px;
    background: ${(props) => props.inputColor || "palevioletred"};
  } */
`;

const Open = styled.div`
  display: ${(props) => (props.secret ? "none" : "block")};
`;

const Header = styled.div`
  width: 100%;
  height: 50px;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 2fr;
  grid-template-rows: 40px;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  .div1 {
    grid-area: 1 / 1 / 2 / 2;
  }
  .div2 {
    grid-area: 1 / 2 / 2 / 3;
  }
  .div3 {
    grid-area: 1 / 3 / 2 / 4;
  }
  .div4 {
  }
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const Styles = styled.div`
  margin-bottom: 0;
  padding: 0.5% 2%;
  img {
    max-width: 200px;
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  margin: 2% 0;
  margin-bottom: 3%;
`;

const RegDate = styled.div`
  background: ${(props) => (props.date ? "#ade8f4" : null)};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 50px;
`;

const SendButton = styled.div`
  font-size: 1.3rem;
  text-align: center;
  background: #ffffff;
  border: 1px solid;
  color: grey;
  border-color: #edefed;
  box-sizing: border-box;
  border-radius: 5px;
  cursor: pointer;
  outline: 0;
  margin-right: 20px;
  width: 130px;
  transition: all 0.4s;
  a {
    color: grey;
  }
  &:hover {
    color: #112a62;
    border-color: #112a62;
  }
  @media (max-width: 800px) {
    font-size: 1.4rem;
  }
`;

const Tags = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  form {
    input {
      width: 50px;
      background: none;
      border: none;
      outline: 0;
      font-family: Montserrat;
      font-size: 1rem;
    }
  }
`;

const Tag = styled.div`
  font-size: 1rem;
  margin-bottom: 2%;
  background: #f8eed7;
  padding: 2px 6px;
  margin: 2px;
  height: 22px;
  border-radius: 5px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const DynamicLoadedEditor = dynamic(import("../editor/HoverEditor"), {
  loading: () => <p>...</p>,
  ssr: false,
});

const Editor = styled.div`
  font-size: 1.6rem;
  width: 75%;
  border: 1px solid #c4c4c4;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  outline: 0;
  padding: 0.5%;
  font-size: 1.6rem;
  margin: 15px 0;
  @media (max-width: 800px) {
    width: 350px;
  }
`;

const StyledButton = withStyles({
  root: {
    margin: "1% 0",
    marginRight: "2%",
    fontSize: "1.6rem",
    textTransform: "none",
  },
})(Button);

const Person = (props) => {
  const [secret, setSecret] = useState(true);
  const [tags, setTags] = useState(props.student.tags);
  const [tag, setTag] = useState("");
  const [message, setMessage] = useState("");

  const [page, setPage] = useState("results");
  const [sendMessage, { data: data1, loading: loading1, error: error1 }] =
    useMutation(SEND_MESSAGE_MUTATION);
  const { student, lessons, courseVisit, coursePageID, coursePage, results } =
    props;

  moment.locale("ru");
  let mail = `mailto:${student.email}`;

  // let feedback_num = student.studentFeedback.filter(
  //   (f) => f.lesson.coursePage.id == coursePageID
  // ).length;

  // find recent students
  let two_months_ago = new Date();
  two_months_ago.setMonth(two_months_ago.getMonth() - 2);

  // 1. Get all lesson results
  const sorted_lessons = results
    .slice()
    .sort((a, b) => a.lesson.number - b.lesson.number);

  // 2. group all lesson results by lesson
  let new_array = [];
  sorted_lessons.forEach((l) => {
    let lessonId = l.lesson.id;
    if (new_array.find((x) => x.lessonId === lessonId)) {
      let obj = new_array.find((x) => x.lessonId === lessonId);
      let new_results_list = [...obj.results, l];
      return (obj.results = new_results_list);
    } else {
      let new_obj = {
        lessonId: lessonId,
        results: [l],
      };
      return new_array.push(new_obj);
    }
  });

  // 3. leave only lesson results with the highest progress

  let new_array_2 = new_array.map((el) => {
    const max = el.results.reduce((prev, current) =>
      prev.progress > current.progress ? prev : current
    );
    el["max"] = max;
    return el;
  });

  // 4. Leave only maxes

  let maxes = [];
  new_array_2.forEach((el) => maxes.push(el.max));

  let lesResults = [];
  maxes.forEach((lr) => {
    let new_obj = {
      progress: lr.progress,
      lesson_number: lr.lesson.number,
      lesson_size: lr.lesson.structure
        ? lr.lesson.structure.lessonItems.length
        : 1,
      lesson_name: lr.lesson.name,
      visits: lr.visitsNumber,
    };
    lesResults.push(new_obj);
  });

  let color;
  let total = 0;
  maxes.map((l) => {
    let s;
    if (l.lesson.type === "STORY") {
      s = l.progress / l.lesson.structure.lessonItems.length;
    } else {
      s = 0;
    }
    if (s < 0.3) {
      total += 0;
    } else if (s >= 0.3 && s <= 0.8) {
      total += 0.5;
    } else if (s > 0.8) {
      total += 1;
    }
  });

  if (total / lessons.length <= 0.2) {
    color = "#e97573";
  } else if (total / lessons.length > 0.2 && total / lessons.length < 0.85) {
    color = "#FDF3C8";
  } else if (total / lessons.length >= 0.85) {
    color = "#84BC9C";
  }

  let emailInfo = {
    course_name: coursePage,
    student_name: student.name,
    lessons_number: lessons.length,
    completed_lessons_number: Math.round(total),
    lesResultsList: { lesResults: lesResults },
  };

  const myCallback = (dataFromChild) => {
    setMessage(dataFromChild);
  };

  return (
    <Styles>
      <Header>
        <Name className="div1">
          <div className="name">
            {student.surname
              ? `${student.name} ${student.surname}`
              : student.name}{" "}
            {/* – <span> {feedback_num}</span> */}
          </div>
          <div className="email">{student.email}</div>
        </Name>
        <Tags className="div2">
          {" "}
          {tags.map((t) => (
            <Tag>{t}</Tag>
          ))}
          <Mutation
            mutation={UPDATE_USER_MUTATION}
            variables={{
              id: student.id,
              tags: [...tags, tag],
            }}
          >
            {(updateUser, { loading, error }) => {
              return (
                <form
                  method="POST"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    let new_arr = [...tags, tag];
                    setTags(new_arr);
                    setTag("");
                    const res = await updateUser();
                  }}
                >
                  <input
                    type="text"
                    name=""
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    placeholder="..."
                  />
                </form>
              );
            }}
          </Mutation>
        </Tags>
        <Square className="div3" inputColor={color}>
          <div>
            {total}/{lessons.length}
          </div>
        </Square>
        <ButtonBox>
          <StyledButton className="div4" onClick={(e) => setSecret(!secret)}>
            {secret ? "Открыть" : "Закрыть"}
          </StyledButton>
        </ButtonBox>
        <RegDate
          className="div5"
          date={
            courseVisit
              ? courseVisit.createdAt > moment(two_months_ago).format()
              : false
          }
        >
          {courseVisit
            ? moment(courseVisit.createdAt).format("Do MMMM YYYY")
            : "Не определен"}
        </RegDate>
      </Header>
      <Open secret={secret}>
        <Buttons>
          {student.number && (
            <SendButton>
              <a
                target="_blank"
                href={`https://wa.me/${student.number}?text=Добрый!`}
              >
                Написать в Wh
              </a>
            </SendButton>
          )}
          {student.number && (
            <SendButton>
              <a target="_blank" href={`https://t.me/${student.number}`}>
                Написать в Tg
              </a>
            </SendButton>
          )}
          {courseVisit && (
            <Mutation
              mutation={UPDATE_COURSE_VISIT_MUTATION}
              variables={{
                id: courseVisit.id,
                reminders: courseVisit.reminders
                  ? [...courseVisit.reminders, new Date()]
                  : [new Date()],
                comment: "hello",
                info: emailInfo,
              }}
            >
              {(sendEmailToStudent, { loading, error }) => {
                return (
                  <SendButton
                    onClick={(e) => {
                      const data = sendEmailToStudent();
                      alert("Отправлено!");
                    }}
                    name="CV"
                  >
                    Приветствие
                  </SendButton>
                );
              }}
            </Mutation>
          )}
          {courseVisit && (
            <Mutation
              mutation={UPDATE_COURSE_VISIT_MUTATION}
              variables={{
                id: courseVisit.id,
                reminders: courseVisit.reminders
                  ? [...courseVisit.reminders, new Date()]
                  : [new Date()],
                comment: "problem",
                info: emailInfo,
              }}
            >
              {(sendEmailToStudent, { loading, error }) => {
                return (
                  <SendButton
                    onClick={(e) => {
                      const data = sendEmailToStudent();
                      alert("Отправлено!");
                    }}
                    name="CV"
                  >
                    Проблемное
                  </SendButton>
                );
              }}
            </Mutation>
          )}
          {courseVisit && (
            <Mutation
              mutation={UPDATE_COURSE_VISIT_MUTATION}
              variables={{
                id: courseVisit.id,
                reminders: courseVisit.reminders
                  ? [...courseVisit.reminders, new Date()]
                  : [new Date()],
                comment: "motivation",
                info: emailInfo,
              }}
            >
              {(sendEmailToStudent, { loading, error }) => {
                return (
                  <SendButton
                    onClick={(e) => {
                      const data = sendEmailToStudent();
                      alert("Отправлено!");
                    }}
                    name="CV"
                  >
                    Мотивационнное
                  </SendButton>
                );
              }}
            </Mutation>
          )}
        </Buttons>
        <Editor className="editor">
          <DynamicLoadedEditor
            getEditorText={myCallback}
            value={""}
            name="text"
          />
        </Editor>
        <button
          onClick={async (e) => {
            const res = await sendMessage({
              variables: {
                userId: student.id,
                text: message,
              },
            });
          }}
        >
          {loading1 ? "Sending..." : "Send"}
        </button>
        <Journey
          student={student}
          maxes={maxes}
          results={results}
          lessons={lessons}
        />
        {courseVisit &&
          courseVisit.reminders &&
          courseVisit.reminders.map((r) => <li>{moment(r).format("LLL")}</li>)}
        {page === "results" &&
          [...lessons]
            .sort((a, b) => (a.number > b.number ? 1 : -1))
            .map((lesson, index) => {
              let res = maxes.filter((r) => r.lesson.id === lesson.id);
              return (
                <LessonData
                  lesson={lesson}
                  index={index}
                  coursePageID={coursePageID}
                  student={student}
                  res={res}
                />
              );
            })}
      </Open>
    </Styles>
  );
};

export default Person;
