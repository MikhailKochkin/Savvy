import { useState } from "react";
import styled from "styled-components";
// import Button from "@material-ui/core/Button";
// import { withStyles } from "@material-ui/core/styles";
import moment from "moment";
import Loading from "../../layout/Loading";
import { useLazyQuery, gql } from "@apollo/client";

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
  flex-direction: column;
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

// const StyledButton = withStyles({
//   root: {
//     margin: "1% 0",
//     marginRight: "2%",
//     fontSize: "1.6rem",
//     textTransform: "none",
//   },
// })(Button);

const LessonData = (props) => {
  const [show, setShow] = useState(false);
  const { index, lesson, student, lessonResults } = props;
  moment.locale("ru");
  let res =
    lessonResults.filter((l) => l.lesson.id == lesson.id).length > 0
      ? lessonResults.filter((l) => l.lesson.id == lesson.id)[0]
      : null;
  return (
    <>
      <Data>
        <Name>
          {lesson.number}. {lesson.name}
        </Name>
        {res ? (
          <Box>
            <div className="div1">
              {lesson.structure &&
                lesson.structure.lessonItems &&
                (
                  res.progress / res.lesson.structure.lessonItems.length
                ).toFixed(2) * 100}
              %{" "}
            </div>
            <div className="div2">
              {/* Заходов:  */}
              Visits:
              {res.visitsNumber}{" "}
            </div>
            <div className="div3">
              {/* Первый заход:  */}
              First visit: {moment(res.createdAt).format("LLL")}
            </div>
            <div className="div4">
              Last visit: {/* Последний заход:{" "} */}
              {moment(res.updatedAt).format("LLL")}
              {"–"}
              {moment(res.updatedAt).fromNow()}
            </div>
          </Box>
        ) : (
          <div className="time">No lesson visit data</div>
        )}
      </Data>

      {show && data !== undefined && <></>}
    </>
  );
};

export default LessonData;
export { GET_RESULTS };
