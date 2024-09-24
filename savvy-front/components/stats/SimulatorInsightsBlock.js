import { useState, useEffect } from "react";
import styled from "styled-components";
import parse from "html-react-parser";
import Loading from "../Loading";

const QuestionBlock = styled.div`
  border-bottom: 3px solid #f2f6f9;
  padding: 10px 15px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
  width: 100%;
  .cell1 {
    font-weight: bold;
    border-right: 3px solid #f2f6f9;
    width: 30%;
    padding-right: 20px;
  }
  .cell2 {
    width: 70%;
    padding-left: 20px;
    p {
      margin: 0;
    }
  }
`;

const MistakeGroup = styled.div`
  margin: 15px 0;
  .mistakeGroupHeader {
    font-weight: bold;
    font-size: 1.8rem;
  }
  li {
    padding-left: 20px;
  }
`;

const SimulatorInsightsBlock = ({ item, lesson }) => {
  const [groupedMistakes, setGroupedMistakes] = useState(null);
  const [areErrorGroupsBeingGenerated, setAreErrorGroupsBeingGenerated] =
    useState(false);
  const [source, setSource] = useState(null);

  useEffect(() => {
    questionSourceCheck(item.quiz.id);
  }, []);
  const generateMostCommonMistakes = async (e) => {
    let incorrectAnswers = item.quizzesWithSameId.filter(
      (quiz) => quiz.result !== null && parseFloat(quiz.result) < 58
    );
    let incorrectAnswersArray = [];
    incorrectAnswers.map((quiz) => {
      incorrectAnswersArray.push(quiz.answer);
    });
    incorrectAnswersArray = incorrectAnswersArray.filter((item) => item !== "");
    console.log("incorrectAnswersArray", incorrectAnswersArray);
    const AItype = "openai";
    const url = AItype === "claude" ? "/api/generate2" : "/api/generateJson";

    try {
      // Make a POST request to the API endpoint
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `You will be given the list of incorrect answers for the question: ${
            item.quiz.question
          }. The list: ${incorrectAnswersArray.join(
            ", "
          )}. Group them by similarity and return a json in the following format: 
           { "result": [ 
                { "header": "financial problems",
                  "answers": ["lack of financing", "need for investments" ]
                }, 
                { "header": "technical problems",
                  "answers": ["lack of technical knowledge", "lack of technical skills" ]
                } 
                ] }
          `,
        }),
      });

      // Check if the response status is not 200 (OK)
      if (response.status !== 200) {
        throw (
          (await response.json()).error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }
      console.log("response");

      // Parse the response data
      const data = await response.json();
      const result =
        AItype === "claude" ? data.result.content[0].text : data.result.content;

      console.log("result", JSON.parse(result));
      setGroupedMistakes(JSON.parse(result));
      // Return the generated hint if it exists, otherwise return a default message
      return result;
    } catch (error) {
      // Return an error message if the request fails
      return error;
    }
  };

  const questionSourceCheck = (id) => {
    let source;
    if (
      lesson.problems.filter(
        (pr) => pr.steps.problemItems.filter((pi) => pi.id == id).length > 0
      ).length > 0
    ) {
      source = lesson.problems.find(
        (pr) => pr.steps.problemItems.filter((pi) => pi.id == id).length > 0
      );
    } else if (
      (source =
        lesson.texteditors.filter((t) => t.text.includes(id)).length > 0)
    ) {
      source = lesson.texteditors.find((t) => t.text.includes(id));
    } else {
      source = lesson.quizes.find((q) => q.id == id);
    }
    setSource(source);
    return source;
  };

  return (
    <QuestionBlock>
      <Row>
        <div className="cell1">Question</div>
        <div className="cell2">{parse(item.quiz.question)}</div>
      </Row>
      <Row>
        <div className="cell1">Total number of student answers:</div>
        <div className="cell2">{item.totalNumberOfQuizzes}</div>
      </Row>
      <Row>
        <div className="cell1">Source:</div>
        <div className="cell2">
          {source ? (
            <div>
              <p>
                {source.__typename === "Problem" &&
                  `This question is a part of a Case Study "${source.name}"`}
                {source.__typename === "TextEditor" &&
                  `This question is a part of a Document Editor "${source.name}"`}
                {source.__typename === "Quiz" &&
                  "This question is not a part of anything"}
              </p>
            </div>
          ) : null}
        </div>
      </Row>
      <Row>
        <div className="cell1">Number of wrong answers:</div>
        <div className="cell2">{item.numberOfWrongAnswers}</div>
      </Row>
      <Row>
        <div className="cell1">Percent of wrong answers:</div>
        <div className="cell2">
          {(item.numberOfWrongAnswers / item.totalNumberOfQuizzes).toFixed(2) *
            100}
          %
        </div>
      </Row>
      <Row>
        <div className="cell1">Most common incorrect answers:</div>
        <div className="cell2">
          <button
            onClick={async (e) => {
              setAreErrorGroupsBeingGenerated(true);
              const res = await generateMostCommonMistakes();
              setAreErrorGroupsBeingGenerated(false);
            }}
          >
            Find
          </button>
          {areErrorGroupsBeingGenerated ? <Loading /> : null}
          {groupedMistakes ? (
            <div>
              {groupedMistakes?.result?.map((group) => (
                <MistakeGroup>
                  <div className="mistakeGroupHeader">{group.header}</div>
                  <div>
                    {group.answers.map((answer) => (
                      <li>{answer}</li>
                    ))}
                  </div>
                </MistakeGroup>
              ))}
            </div>
          ) : null}
        </div>
      </Row>
    </QuestionBlock>
  );
};

export default SimulatorInsightsBlock;
