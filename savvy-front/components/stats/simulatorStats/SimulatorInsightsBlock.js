import { useState, useEffect } from "react";
import styled from "styled-components";
import parse from "html-react-parser";
import Loading from "../../layout/Loading";
import moment from "moment";

const Styles = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  max-height: 600px;
`;

const QuestionBlock = styled.div`
  border-bottom: 3px solid #f2f6f9;
  padding: 10px 15px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 10px;
  width: 100%;
  line-height: 1.6;
  .cell1 {
    font-weight: bold;
    border-right: 3px solid #f2f6f9;
    width: 20%;
    padding-right: 20px;
  }
  .cell2 {
    width: 80%;
    padding-left: 20px;
    p {
      margin: 0;
    }
  }
`;

const ButtonsBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-top: 15px;
  button {
    background-color: #f2f6f9;
    border: none;
    border-radius: 5px;
    color: #000;
    cursor: pointer;
    font-size: 1.4rem;
    font-family: Montserrat;
    font-weight: 500;
    margin: 0 10px;
    padding: 10px 20px;
    transition: all 0.3s;
    &:hover {
      background: #e1e5e7;
    }
  }
`;

const InsightsBlock = styled.div`
  padding: 10px 15px;
  .ideasElement {
    margin-bottom: 10px;
    border: 2px solid #f2f6f9;
    div {
      margin: 15px 10px;
    }
  }
`;

const SimulatorInsightsBlock = ({ item, quizResults }) => {
  const [commonQuizMistakes, setCommonQuizMistakes] = useState([]);
  const [commonQuizCorrectAnswers, setCommonQuizCorrectAnswers] = useState([]);
  const [
    commonQuizPartiallyCorrectAnswers,
    setCommonQuizPartiallyCorrectAnswers,
  ] = useState([]);
  const [loading, setLoading] = useState(false);

  // const AiGenerationFunction = async (prompt) => {
  //   const AItype = "openai";
  //   const url = AItype === "claude" ? "/api/generate2" : "/api/generateJson";

  //   try {
  //     // Make a POST request to the API endpoint
  //     const response = await fetch(url, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         prompt: prompt,
  //       }),
  //     });

  //     // Check if the response status is not 200 (OK)
  //     if (response.status !== 200) {
  //       throw (
  //         (await response.json()).error ||
  //         new Error(`Request failed with status ${response.status}`)
  //       );
  //     }
  //     // Parse the response data
  //     const data = await response.json();
  //     const result =
  //       AItype === "claude" ? data.result.content[0].text : data.result.content;

  //     setGroupedMistakes(JSON.parse(result));
  //     // Return the generated hint if it exists, otherwise return a default message

  //     return result;
  //   } catch (error) {
  //     // Return an error message if the request fails

  //     return error;
  //   }
  // };

  const generateMostCommonQuizMistakes = async (e) => {
    setCommonQuizMistakes([
      ...quizResults.filter(
        (quizR) =>
          quizR.result !== null &&
          parseFloat(quizR.result) <= 58 &&
          quizR.answer.length > 5 &&
          quizR.student.id !== "cjqy9i57l000k0821rj0oo8l4"
      ),
      ...quizResults.filter(
        (quizR) =>
          quizR?.ideasList?.quizIdeas?.filter(
            (idea) => parseFloat(idea.result) > 58
          ).length == 0 && quizR.student.id !== "cjqy9i57l000k0821rj0oo8l4"
      ),
    ]);
    setCommonQuizCorrectAnswers([]);
    setCommonQuizPartiallyCorrectAnswers([]);
  };

  const generateMostCommonQuizCorrectAnswers = async (e) => {
    setCommonQuizCorrectAnswers([
      ...quizResults.filter(
        (quizR) =>
          quizR.result !== null &&
          parseFloat(quizR.result) >= 65 &&
          quizR.student.id !== "cjqy9i57l000k0821rj0oo8l4"
      ),
      ...quizResults.filter(
        (quizR) =>
          quizR?.ideasList?.quizIdeas?.filter(
            (idea) => parseFloat(idea.result) >= 58
          ).length > 0 && quizR.student.id !== "cjqy9i57l000k0821rj0oo8l4"
      ),
    ]);
    setCommonQuizMistakes([]);
    setCommonQuizPartiallyCorrectAnswers([]);
  };

  const generateMostCommonQuizPartiallyCorrectAnswers = async (e) => {
    setCommonQuizPartiallyCorrectAnswers(
      quizResults.filter(
        (quizR) =>
          quizR.result !== null &&
          parseFloat(quizR.result) >= 58 &&
          parseFloat(quizR.result) < 65 &&
          quizR.student.id !== "cjqy9i57l000k0821rj0oo8l4"
      )
    );
    setCommonQuizMistakes([]);
    setCommonQuizCorrectAnswers([]);
  };

  return (
    <Styles>
      <QuestionBlock>
        <Row>
          <div className="cell1">Name</div>
          <div className="cell2">{item.name}</div>
        </Row>
        <Row>
          <div className="cell1">Question</div>
          <div className="cell2">{parse(item.question)}</div>
        </Row>
        <Row>
          <div className="cell1">Sample Answers</div>
          <div className="cell2">
            <div>{item.answer}</div>
          </div>
        </Row>
        <Row>
          <div className="cell1">Semantic Cloud</div>
          <div className="cell2">
            {item?.answers?.answerElements.map((el) => {
              if (el.answer.length > 2) {
                return <li>{el.answer}</li>;
              }
            })}
          </div>
        </Row>
      </QuestionBlock>
      <ButtonsBlock>
        <button onClick={(e) => generateMostCommonQuizMistakes()}>
          Show incorrect answers
        </button>
        <button
          onClick={(e) => generateMostCommonQuizPartiallyCorrectAnswers()}
        >
          Show partially correct answers
        </button>
        <button onClick={(e) => generateMostCommonQuizCorrectAnswers()}>
          Show correct answers
        </button>
      </ButtonsBlock>
      <InsightsBlock>
        {loading ? <Loading /> : null}
        {commonQuizMistakes.length > 0 ? (
          <div>
            <h3>Common mistakes:</h3>
            <div>
              {commonQuizMistakes.map((quizRes) => (
                <>
                  {quizRes?.ideasList?.quizIdeas ? (
                    <div className="ideasElement">
                      <ol>
                        {quizRes?.ideasList?.quizIdeas.map((el) => (
                          <li>{el.idea}</li>
                        ))}
                      </ol>
                    </div>
                  ) : (
                    <div className="ideasElement">
                      <div>
                        <div>
                          <b>Answer:</b> {quizRes.answer}
                        </div>
                        <div>
                          <b>Result:</b> {quizRes.result}%
                        </div>
                        <div>
                          <b>Date:</b>{" "}
                          {moment(quizRes.createdAt).format("DD/MM/YYYY")}
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ))}
            </div>
          </div>
        ) : null}
        {commonQuizCorrectAnswers.length > 0 ? (
          <div>
            <h3>Common correct answers:</h3>
            <div>
              {commonQuizCorrectAnswers.map((quizRes) => (
                <>
                  {quizRes?.ideasList?.quizIdeas ? (
                    <div className="ideasElement">
                      <ol>
                        {quizRes?.ideasList?.quizIdeas.map((el) => (
                          <li>
                            {el.idea} - {el.result}%
                          </li>
                        ))}
                      </ol>
                    </div>
                  ) : (
                    <div className="ideasElement">
                      <div>
                        <div>
                          <b>Answer:</b> {quizRes.answer}
                        </div>
                        <div>
                          <b>Result:</b> {quizRes.result}%
                        </div>
                        <div>
                          <b>Date:</b>{" "}
                          {moment(quizRes.createdAt).format("DD/MM/YYYY")}
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ))}
            </div>
          </div>
        ) : null}
        {commonQuizPartiallyCorrectAnswers.length > 0 ? (
          <div>
            <h3>Common partially correct answers:</h3>
            <div>
              {commonQuizPartiallyCorrectAnswers.map((quizRes) => (
                <div className="ideasElement">
                  <div>
                    <div>
                      <b>Answer:</b> {quizRes.answer}
                    </div>
                    <div>
                      <b>Result:</b> {quizRes.result}%
                    </div>
                    <div>
                      <b>Date:</b>{" "}
                      {moment(quizRes.createdAt).format("DD/MM/YYYY")}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </InsightsBlock>
    </Styles>
  );
};

export default SimulatorInsightsBlock;
