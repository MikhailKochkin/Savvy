import React, { Component } from "react";
import styled from "styled-components";
import { Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import moment from "moment";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import LessonData from "./LessonData";

const UPDATE_COURSE_VISIT_MUTATION = gql`
  mutation UPDATE_COURSE_VISIT_MUTATION($id: ID!, $reminders: [DateTime]) {
    updateReminder(id: $id, reminders: $reminders) {
      id
    }
  }
`;

const UPDATE_COURSE_VISIT_MUTATION2 = gql`
  mutation UPDATE_COURSE_VISIT_MUTATION2($id: ID!, $reminders: [DateTime]) {
    newWeek(id: $id, reminders: $reminders) {
      id
    }
  }
`;

const UPDATE_FINISH_MUTATION = gql`
  mutation UPDATE_FINISH_MUTATION($id: ID!, $finish: DateTime) {
    updateFinish(id: $id, finish: $finish) {
      id
    }
  }
`;

const Name = styled.div`
  font-size: 1.6rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 4%;
`;

const Square = styled.div`
  text-align: center;
  width: 70px;
  height: 30px;
  background: ${(props) => props.inputColor || "palevioletred"};
`;

const Open = styled.div`
  display: ${(props) => (props.secret ? "none" : "block")};
`;

const Header = styled.div`
  width: 100%;
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
`;

const SendButton = styled.div`
  font-size: 1.6rem;
  text-align: center;
  background: #ffffff;
  border: 1px solid;
  border-color: ${(props) => (props.green ? "#84BC9C" : "#112a62")};
  box-sizing: border-box;
  border-radius: 5px;
  cursor: pointer;
  outline: 0;
  margin-right: 20px;
  width: 130px;
  color: #112a62;
  a {
    color: #112a62;
  }
  @media (max-width: 800px) {
    font-size: 1.4rem;
  }
`;

const Box = styled.div`
  display: grid;
  border: 1px solid #edefed;
  border-radius: 5px;
  grid-template-columns: 0.6fr 1.2fr 1.2fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  margin: 10px 0;
  padding: 0.5%;
  div {
    padding: 0 15px;
  }
  .div1 {
    grid-area: 1 / 1 / 2 / 2;
  }
  .div2 {
    grid-area: 1 / 2 / 2 / 3;
    border-left: 1px solid #edefed;
  }
  .div3 {
    grid-area: 1 / 3 / 2 / 4;
    border-left: 1px solid #edefed;
  }
  @media (max-width: 850px) {
    display: flex;
    flex-direction: column;
    margin-bottom: 5%;
    div {
      padding: 8px 15px;
    }
    .div2 {
      border-left: 1px solid white;
      border-top: 1px solid #edefed;
    }
    .div3 {
      border-left: 1px solid white;
      border-top: 1px solid #edefed;
    }
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

class Person extends Component {
  state = {
    secret: true,
    page: "results",
  };
  onShow = () => {
    this.setState((prevState) => ({
      secret: !prevState.secret,
    }));
  };

  onSwitch = (e) => {
    this.setState({ page: e.target.getAttribute("name") });
  };
  render() {
    const { student, lessons, courseVisit, coursePageID } = this.props;
    let mail = `mailto:${student.email}`;
    let color;
    // Step 1. We filter the lessons to see if the lessons have been
    // visited by the student. For that we check if the lesson results of the student include the
    // results of the lessons of this course
    let lesson_list = [];
    lessons.map((l) => lesson_list.push(l.id));
    let lesson_results = student.lessonResults.filter((l) =>
      lesson_list.includes(l.lesson.id)
    );
    moment.locale("ru");

    // Step 2. We create a "completed" array. We will push to this array the lessons which
    // have been visited and whose prooblems have been completed.
    // let completed = [];
    // // Step 3. We map through the lessons and check a. if the number of problems of this lesson
    // // is equal to the number of completed problems for this lesson of the student
    // lessons.map(les =>
    //   les.problems.length ===
    //     student.problemResults.filter(pr => pr.lesson.id === les.id).length &&
    //   // Step 4. b. to see if the number of lessons is equal to the number of visited lessons by the student.
    //   lessons.length === lesson_results.length
    //     ? // Step 5. if the lesson meets the criteria it is pushed to the completed array.
    //       completed.push(les)
    //     : null
    // );
    // Step 6. Based on the number of completed lessons we determone the color of the student
    if (lesson_results.length / lessons.length <= 0.2) {
      color = "#e97573";
    } else if (
      lesson_results.length / lessons.length > 0.2 &&
      lesson_results.length / lessons.length < 0.85
    ) {
      color = "#FDF3C8";
    } else if (lesson_results.length / lessons.length >= 0.85) {
      color = "#84BC9C";
    }

    let two_months_ago = new Date();
    two_months_ago.setMonth(two_months_ago.getMonth() - 2);
    return (
      <>
        <Styles>
          <Header>
            <Name className="div1">
              {student.surname
                ? `${student.name} ${student.surname}`
                : student.name}
            </Name>
            <Square className="div2" inputColor={color}>
              {lesson_results.length}/{lessons.length}
            </Square>
            <StyledButton className="div3" onClick={this.onShow}>
              {this.state.secret ? "Открыть" : "Закрыть"}
            </StyledButton>
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
          <Open secret={this.state.secret}>
            <Buttons>
              <SendButton onClick={this.onSwitch} name="results">
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
              <SendButton name="mail">
                <a href={mail}>Написать</a>
              </SendButton>
            </Buttons>
            {courseVisit && courseVisit.reminders.map((r) => <li>{r}</li>)}
            {this.state.page === "results" &&
              lessons
                .sort((a, b) => (a.number > b.number ? 1 : -1))
                .map((lesson, index) => (
                  <LessonData
                    lesson={lesson}
                    index={index}
                    coursePageID={coursePageID}
                    student={student}
                  />
                ))}
            {this.state.page === "CV" && (
              <StyledCV>
                {student.coverLetter ? (
                  <div>
                    Скачайте сопроводительное письмо{" "}
                    <a href={student.coverLetter} target="_blank">
                      по ссылке.
                    </a>
                  </div>
                ) : (
                  <div>Сопроводительное письмо не загружено.</div>
                )}
              </StyledCV>
            )}
            {this.state.page === "resume" && (
              <StyledCV>
                {student.resume ? (
                  <div>
                    Скачайте резюме{" "}
                    <a href={student.resume} target="_blank">
                      по ссылке.
                    </a>
                  </div>
                ) : (
                  <div>Резюме не загружено.</div>
                )}
              </StyledCV>
            )}
          </Open>
        </Styles>
      </>
    );
  }
}

// UserAnalytics.Person = {
//   student: PropTypes.object.isRequired,
//   lessons: PropTypes.object.isRequired,
//   courseVisit: PropTypes.object.isRequired,
// };

export default Person;
