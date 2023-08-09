import { useState } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import moment from "moment";
import Loading from "../Loading";
import { useLazyQuery, gql } from "@apollo/client";
import LessonData from "./LessonData";

const GET_RESULTS = gql`
  query stats($lessonId: String!, $userId: String!) {
    stats(lessonId: $lessonId, userId: $userId) {
      testResults {
        id
        answer
        test {
          id
          question
        }
        student {
          id
          name
          surname
        }
        createdAt
      }
      quizResults {
        id
        correct
        student {
          id
          name
          surname
        }
        quiz {
          id
        }
        answer
        createdAt
      }
      textEditorResults {
        id
        wrong
        correct
        guess
        attempts
        student {
          id
        }
        textEditor {
          id
        }
        createdAt
      }
      problemResults {
        id
        answer
        lesson {
          id
        }
        problem {
          id
        }
        student {
          id
          name
          surname
        }
        revealed
        createdAt
      }
      constructionResults {
        id
        answer
        inputs
        attempts
        construction {
          id
        }
        student {
          id
          name
          surname
        }
        construction {
          id
        }
      }
      documentResults {
        id
        user {
          id
        }
        document {
          id
        }
        answers
        drafts
        createdAt
      }
      feedbacks {
        id
        text
        teacher {
          id
          name
          surname
        }
        lesson {
          id
        }
        createdAt
      }
    }
  }
`;

const Data = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px 0;
`;

const Name = styled.div`
  font-size: 1.6rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 4%;
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

const Box = styled.div`
  border: 1px solid #edefed;
  border-radius: 5px;
  display: grid;
  grid-template-columns: 1fr 2fr repeat(2, 4fr) 0;
  grid-template-rows: 0 1fr repeat(3, 0);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  margin-bottom: 35px;
  padding: 0.5%;
  div {
    padding: 0 15px;
  }
  .div1 {
    grid-area: 2 / 1 / 3 / 2;
  }
  .div2 {
    grid-area: 2 / 2 / 3 / 3;
    border-left: 1px solid #edefed;
  }
  .div3 {
    grid-area: 2 / 3 / 3 / 4;
    border-left: 1px solid #edefed;
  }
  .div4 {
    grid-area: 2 / 4 / 3 / 5;
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

const StyledButton = withStyles({
  root: {
    margin: "1% 0",
    marginRight: "2%",
    fontSize: "1.6rem",
    textTransform: "none",
  },
})(Button);

const CourseData = (props) => {
  const [show, setShow] = useState(false);
  const { index, course, lessonResults } = props;

  // 1. get all lesson results of a user
  // 2. filter only lessonResults for a particular course
  let n = lessonResults.filter((l) => l.lesson.coursePage.id === course.id);
  // 3. delete repeating lessonResults (with the same lesson id)
  let new_arr = [];
  n.map((x) => {
    if (!new_arr.find((el) => el.lesson.id == x.lesson.id)) new_arr.push(x);
  });

  // 4. display final lesson results;

  return (
    <>
      <Data>
        <Name>
          {index + 1}. {course.title}
        </Name>
        <Square
          className="div2"
          inputColor={new_arr && new_arr.length ? "#84BC9C" : "#e97573"}
        >
          <div>
            {new_arr ? new_arr.length : 0} / {course.lessons.length}
          </div>
        </Square>
        <StyledButton
          onClick={(e) => {
            // getData({
            //   variables: { lessonId: lesson.id, userId: student.id },
            // }),
            setShow(!show);
          }}
        >
          {/* {show ? "Скрыть" : "Подробнее"} */}
          {show ? "Close" : "Open"}
        </StyledButton>
      </Data>

      {show &&
        [...course.lessons]
          .sort((a, b) => (a.number > b.number ? 1 : -1))
          .map((l, i) => (
            <LessonData lesson={l} index={i} lessonResults={lessonResults} />
          ))}
    </>
  );
};

export default CourseData;
export { GET_RESULTS };
