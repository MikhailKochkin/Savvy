import { useState } from "react";
import styled from "styled-components";
import { useMutation, useLazyQuery, gql } from "@apollo/client";
import { Mutation } from "@apollo/client/react/components";
import dynamic from "next/dynamic";
import moment from "moment";
import SingleStudentInDepthStats from "./SingleStudentInDepthStats";
import StudentSimulatorJourney from "./StudentSimulatorJourney";

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
  font-size: 1.8rem;
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

const SimpleButton = styled.button`
  width: 100px;
  height: 35px;
  background: none;
  padding: 5px 0;
  border: 2px solid #69696a;
  border-radius: 5px;
  margin-right: 15px;
  font-family: Montserrat;
  font-size: 1.4rem;
  font-weight: 500;
  color: #323334;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background: #f4f4f4;
  }
`;

const SendEmailButton = styled.button`
  width: 140px;
  height: 35px;
  background: #f4f4f4;
  padding: 5px 0;
  border: 2px solid #f4f4f4;
  border-radius: 5px;
  margin-right: 15px;
  font-family: Montserrat;
  font-size: 1.4rem;
  font-weight: 500;
  color: #323334;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background: #f4f4f4;
  }
`;

const EmailBlock = styled.div`
  margin-top: 20px;
  border: 3px solid #f2f6f9;
  border-radius: 20px;
  padding: 20px;
  h2 {
    margin: 20px 0;
  }
`;

const Block = styled.div`
  margin-top: 20px;
  border: 3px solid #f2f6f9;
  border-radius: 20px;
  h2 {
    margin: 20px 10px;
  }
`;

const Header = styled.div`
  width: 100%;
  min-height: 50px;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 2fr;
  /* grid-template-rows: 40px; */
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
  padding: 15px 25px;
  border-bottom: 3px solid #f2f6f9;
  img {
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  margin: 2% 0;
  margin-bottom: 3%;
  h3 {
    margin: 10px 0;
  }
`;

const RegDate = styled.div`
  /* background: ${(props) => (props.date ? "#ade8f4" : null)}; */
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

const TopBox = styled.div`
  border-bottom: 3px solid #f2f6f9;
  border-top: 3px solid #f2f6f9;
  background: #f2f6f9;
  min-height: 55px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px;
  div {
    padding: 0 5px;
    font-size: 1.6rem;
    font-weight: 600;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .div1 {
    width: 20%;
  }
  .div2 {
    width: 9%;
  }
  .div3 {
    width: 9%;
  }
  .div4 {
    width: 9%;
  }
  .div5 {
    width: 20%;
  }
  .div6 {
    width: 20%;
  }
  .div7 {
    width: 13%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
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

const Tags = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
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
  min-height: 15px;
  border-radius: 5px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const DynamicLoadedEditor = dynamic(import("../../editor/HoverEditor"), {
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

// Helper functions
const checkPhoneNumber = (phoneNumber) => {
  phoneNumber = phoneNumber.replace(/[\D\s\-\(\)]/g, "");
  if (phoneNumber.length < 9) return;
  if (phoneNumber.startsWith("8")) {
    phoneNumber = "+7" + phoneNumber.substring(1);
  } else if (phoneNumber.startsWith("7")) {
    phoneNumber = "+" + phoneNumber;
  } else if (!phoneNumber.startsWith("+")) {
    phoneNumber = "+7" + phoneNumber;
  }
  return phoneNumber;
};

const calculateLessonStats = (
  lessons,
  results,
  student,
  coursePage,
  grouped_results,
  maxes
) => {
  const lesResults = maxes.map((lr) => ({
    progress: lr.progress,
    lesson_number: lr.lesson.number,
    lesson_size: lr.lesson.structure?.lessonItems?.length || 1,
    lesson_name: lr.lesson.name,
    visits: lr.visitsNumber,
  }));

  const active_lessons = lessons.filter((l) => l.published);
  const total = maxes.reduce((acc, l) => {
    let s =
      l.lesson.type === "STORY"
        ? l.progress / l.lesson.structure.lessonItems.length
        : l.lesson.type === "CHALLENGE"
        ? student.challengeResults.some((cr) => cr.lesson.id === l.lesson.id)
          ? 1
          : 0
        : 0;
    return acc + (s < 0.3 ? 0 : s >= 0.75 ? 1 : 0.5);
  }, 0);

  const color =
    total / active_lessons.length <= 0.2
      ? "#e97573"
      : total / active_lessons.length < 0.75
      ? "#FDF3C8"
      : "#84BC9C";

  const emailInfo = {
    course_name: coursePage,
    student_name: student.name,
    lessons_number: lessons.length,
    completed_lessons_number: Math.round(total),
    lesResultsList: { lesResults },
  };

  return { active_lessons, total, color, lesResults, emailInfo, maxes }; // Added maxes here
};

const SingleStudentDataRow = ({
  student,
  lessons,
  courseVisit,
  coursePageID,
  coursePage,
  results,
  type,
  passSelectedStudent,
}) => {
  const [secret, setSecret] = useState(true);
  const [tags, setTags] = useState(student.tags);
  const [tag, setTag] = useState("");
  const [message, setMessage] = useState("");
  const [isSelected, setIsSelected] = useState(false);

  const [sendMessage, { loading: sendMessageLoading }] = useMutation(
    SEND_MESSAGE_MUTATION
  );
  const [updateUser] = useMutation(UPDATE_USER_MUTATION);
  const [sendEmailToStudent] = useMutation(UPDATE_COURSE_VISIT_MUTATION);

  moment.locale("ru");

  const sorted_lessons = results
    .slice()
    .sort((a, b) => a.lesson.number - b.lesson.number);
  const grouped_results = sorted_lessons.reduce((acc, l) => {
    const existingGroup = acc.find((x) => x.lessonId === l.lesson.id);
    if (existingGroup) {
      existingGroup.results.push(l);
    } else {
      acc.push({ lessonId: l.lesson.id, results: [l] });
    }
    return acc;
  }, []);

  const maxes = grouped_results.map((el) =>
    el.results.reduce((prev, current) =>
      prev.progress > current.progress ? prev : current
    )
  );

  const handleDoubleClick = (val) => {
    const newTags = tags.filter((nt) => nt !== val);
    setTags(newTags);
    updateUser({ variables: { id: student.id, tags: newTags } });
  };

  const handleAddTag = async (e) => {
    e.preventDefault();
    const newTags = [...tags, tag];
    setTags(newTags);
    setTag("");
    await updateUser({ variables: { id: student.id, tags: newTags } });
  };

  const { active_lessons, total, color, lesResults, emailInfo } =
    calculateLessonStats(
      lessons,
      results,
      student,
      coursePage,
      grouped_results,
      maxes
    );

  const handleSendMessage = async () => {
    await sendMessage({ variables: { userId: student.id, text: message } });
  };

  const handleSendEmail = async (comment) => {
    const newReminders = courseVisit.reminders
      ? [...courseVisit.reminders, new Date()]
      : [new Date()];
    await sendEmailToStudent({
      variables: {
        id: courseVisit.id,
        reminders: newReminders,
        comment,
        info: emailInfo,
      },
    });
    alert("Email has been sent!");
  };

  return (
    <Styles>
      <Header>
        <Name className="div1">
          <div className="name">
            {" "}
            {passSelectedStudent && (
              <input
                type="checkbox"
                checked={isSelected}
                onChange={(e) => {
                  passSelectedStudent(student.id);
                  setIsSelected(e.target.checked);
                }}
              />
            )}
            {`${student.name} ${student.surname || ""}`}
          </div>
          <div className="email">{student.email}</div>
        </Name>
        <Tags className="div2">
          {tags.slice(0, 3).map((t) => (
            <Tag key={t} onDoubleClick={() => handleDoubleClick(t)}>
              {t}
            </Tag>
          ))}
          <form onSubmit={handleAddTag}>
            <input
              type="text"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              placeholder="..."
            />
          </form>
        </Tags>
        <Square className="div3" inputColor={color}>
          <div>
            {type !== "lesson_analytics"
              ? `${total} / ${active_lessons.length}`
              : `${Math.min(
                  (maxes[0].progress /
                    maxes[0].lesson.structure.lessonItems.length) *
                    100,
                  100
                ).toFixed(0)}%`}
          </div>
        </Square>
        <ButtonBox>
          {type !== "all_users_page" ? (
            <SimpleButton className="div4" onClick={() => setSecret(!secret)}>
              {secret ? "Open" : "Close"}
            </SimpleButton>
          ) : null}
        </ButtonBox>
        <RegDate
          className="div5"
          date={
            courseVisit &&
            courseVisit.createdAt > moment().subtract(2, "months").format()
          }
        >
          {type === "lesson_analytics"
            ? results.length > 0
              ? moment(results[0].createdAt).format("Do MMMM YYYY")
              : "Undefined"
            : courseVisit
            ? moment(courseVisit.createdAt).format("Do MMMM YYYY")
            : "Undefined"}
        </RegDate>
      </Header>
      {type !== "all_users_page" ? (
        <Open secret={secret}>
          {type !== "lesson_analytics" && (
            <EmailBlock>
              <h2>Connect</h2>
              <Editor className="editor">
                <DynamicLoadedEditor
                  getEditorText={setMessage}
                  value={""}
                  name="text"
                />
              </Editor>
              <SendEmailButton onClick={handleSendMessage}>
                {sendMessageLoading ? "Sending..." : "Send Email"}
              </SendEmailButton>
              <Buttons>
                {student.number && (
                  <>
                    <SendButton>
                      <a
                        target="_blank"
                        href={`https://wa.me/${checkPhoneNumber(
                          student.number
                        )}?text=Добрый!`}
                      >
                        WhatsApp
                      </a>
                    </SendButton>
                    <SendButton>
                      <a
                        target="_blank"
                        href={`https://t.me/${checkPhoneNumber(
                          student.number
                        )}`}
                      >
                        Telegram
                      </a>
                    </SendButton>
                  </>
                )}
                {courseVisit && (
                  <>
                    <SendButton onClick={() => handleSendEmail("hello")}>
                      Welcome Email
                    </SendButton>
                    <SendButton onClick={() => handleSendEmail("problem")}>
                      Problem Email
                    </SendButton>
                    <SendButton onClick={() => handleSendEmail("motivation")}>
                      Motivation Email
                    </SendButton>
                  </>
                )}
              </Buttons>
              {courseVisit &&
                courseVisit.reminders &&
                courseVisit.reminders.map((r) => (
                  <li key={r}>{moment(r).format("LLL")}</li>
                ))}
            </EmailBlock>
          )}
          <Block>
            {type !== "lesson_analytics" && (
              <Journey
                student={student}
                maxes={maxes}
                results={results}
                lessons={lessons}
              />
            )}
            <TopBox>
              <div className="div1">Simulator Name</div>
              <div className="div2">Progress</div>
              <div className="div3">Result</div>
              <div className="div4">Visits</div>
              <div className="div5">First action</div>
              <div className="div6">Last action</div>
              <div className="div7"></div>
            </TopBox>
            {lessons
              // .filter((l) => l.published)
              .sort((a, b) => a.number - b.number)
              .map((lesson, index) => {
                let res = maxes.filter((r) => r.lesson.id === lesson.id);
                return (
                  <SingleStudentInDepthStats
                    key={lesson.id}
                    lesson={lesson}
                    index={index}
                    coursePageID={coursePageID}
                    student={student}
                    type={type}
                    res={res}
                    date={
                      type !== "lesson_analytics"
                        ? courseVisit
                          ? moment(courseVisit.createdAt).format("Do MMMM YYYY")
                          : "Undefined"
                        : results.length > 0
                        ? moment(results[0].createdAt).format("Do MMMM YYYY")
                        : "Undefined"
                    }
                  />
                );
              })}
          </Block>
        </Open>
      ) : null}
    </Styles>
  );
};

export default SingleStudentDataRow;
