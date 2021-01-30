import { useState } from "react";
import styled from "styled-components";
import { Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import moment from "moment";
import LessonData from "./LessonData";
import Journey from "./Journey";

const UPDATE_COURSE_VISIT_MUTATION = gql`
  mutation UPDATE_COURSE_VISIT_MUTATION($id: String!, $reminders: [DateTime]) {
    remind(id: $id, reminders: $reminders) {
      id
    }
  }
`;

const UPDATE_COURSE_VISIT_MUTATION2 = gql`
  mutation UPDATE_COURSE_VISIT_MUTATION2($id: String!, $reminders: [DateTime]) {
    newWeek(id: $id, reminders: $reminders) {
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
  grid-template-columns: 2fr 1fr 1fr 2fr;
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
    color: #edefed;
  }
  &:hover {
    color: #112a62;
    border-color: #112a62;
  }
  @media (max-width: 800px) {
    font-size: 1.4rem;
  }
`;

const StyledCV = styled.div`
  margin-bottom: 2%;
  a {
    color: #112b62;
    font-weight: bold;
    &:hover {
      text-decoration: underline;
    }
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
  const [page, setPage] = useState("results");
  const { student, lessons, courseVisit, coursePageID, results } = props;

  moment.locale("ru");
  let mail = `mailto:${student.email}`;

  //check how the student is progressing throught the course
  let color;
  let total = 0;
  results.map((l) => {
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

  // find recent students
  let two_months_ago = new Date();
  two_months_ago.setMonth(two_months_ago.getMonth() - 2);
  return (
    <Styles>
      <Header>
        <Name className="div1">
          <div>
            {student.surname
              ? `${student.name} ${student.surname}`
              : student.name}
          </div>
          <div className="email">{student.email}</div>
        </Name>
        <Square className="div2" inputColor={color}>
          <div>
            {total}/{lessons.length}
          </div>
        </Square>
        <ButtonBox>
          <StyledButton className="div3" onClick={(e) => setSecret(!secret)}>
            {secret ? "Открыть" : "Закрыть"}
          </StyledButton>
        </ButtonBox>
        <RegDate
          className="div4"
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
          <SendButton onClick={(e) => setPage("results")}>
            Результаты
          </SendButton>
          {courseVisit && (
            <Mutation
              mutation={UPDATE_COURSE_VISIT_MUTATION}
              variables={{
                id: courseVisit.id,
                reminders: [...courseVisit.reminders, new Date()],
              }}
            >
              {(updateReminder, { loading, error }) => {
                return (
                  <SendButton
                    onClick={(e) => {
                      const data = updateReminder();
                      alert("Отправлено!");
                    }}
                    name="CV"
                  >
                    Напомнить
                  </SendButton>
                );
              }}
            </Mutation>
          )}
          {courseVisit && (
            <Mutation
              mutation={UPDATE_COURSE_VISIT_MUTATION2}
              variables={{
                id: courseVisit.id,
                reminders: [...courseVisit.reminders, new Date()],
              }}
            >
              {(newWeek, { loading, error }) => {
                return (
                  <SendButton
                    onClick={(e) => {
                      const data = newWeek();
                      alert("Отправлено!");
                    }}
                    name="CV"
                  >
                    Новая неделя
                  </SendButton>
                );
              }}
            </Mutation>
          )}
        </Buttons>
        <Journey student={student} results={results} />
        {courseVisit &&
          courseVisit.reminders.map((r) => <li>{moment(r).format("LLL")}</li>)}
        {page === "results" &&
          [...lessons]
            .sort((a, b) => (a.number > b.number ? 1 : -1))
            .map((lesson, index) => {
              let res = results.filter((r) => r.lesson.id === lesson.id);
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
