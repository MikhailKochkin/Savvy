import { useState, useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";

import {
  Row,
  ActionButton,
  Frame,
  MicroButton,
  NanoButton,
  Buttons,
} from "../styles/DevPageStyles";
import {
  autoResizeTextarea,
  adjustTextareaHeight,
} from "../SimulatorDevelopmentFunctions";

const UPDATE_QUIZ_MUTATION = gql`
  mutation UPDATE_QUIZ_MUTATION(
    $id: String!
    $question: String
    $answer: String
    $answers: ComplexAnswerInput
    $check: String
    $complexity: Int
    $type: String
    $goalType: String
    $ifRight: String
    $ifWrong: String
    $instructorName: String
    $isScoringShown: Boolean
    $name: String
    $image: String
    $isOrderOfAnswersImportant: Boolean
    $shouldAnswerSizeMatchSample: Boolean
  ) {
    updateQuiz(
      id: $id
      question: $question
      answer: $answer
      check: $check
      complexity: $complexity
      type: $type
      goalType: $goalType
      ifRight: $ifRight
      ifWrong: $ifWrong
      answers: $answers
      name: $name
      instructorName: $instructorName
      isScoringShown: $isScoringShown
      image: $image
      isOrderOfAnswersImportant: $isOrderOfAnswersImportant
      shouldAnswerSizeMatchSample: $shouldAnswerSizeMatchSample
    ) {
      id
      question
      type
      complexity
      check
      ifRight
      ifWrong
      answer
      answers {
        answerElements {
          answer
          index
          relatedAnswers
          feedback
        }
      }
      goalType
      createdAt
      name
      image
      isOrderOfAnswersImportant
      shouldAnswerSizeMatchSample
      isScoringShown
      user {
        id
        name
        surname
      }
    }
  }
`;

const Container = styled.div`
  width: 100%;
  margin: 5% 0;
  h4 {
    padding: 0% 5%;
  }
  p > a {
    font-weight: 700;
  }
  p > a:hover {
    text-decoration: underline;
  }
  @media (max-width: 600px) {
    width: 100%;
  }
`;

const DynamicLoadedEditor = dynamic(import("../../editor/HoverEditor"), {
  loading: () => <p>...</p>,
  ssr: false,
});

const UpdateQuiz = (props) => {
  const { lessonID, quizId, lesson } = props;
  const [answer, setAnswer] = useState(props.answer);
  const [question, setQuestion] = useState(props.question);
  const [name, setName] = useState(props.name);
  const [instructorName, setInstructorName] = useState(props.instructorName);
  const [image, setImage] = useState(props.image);
  const [ifRight, setIfRight] = useState(props.ifRight);
  const [ifWrong, setIfWrong] = useState(props.ifWrong);
  const [type, setType] = useState(props.type);
  const [goalType, setGoalType] = useState(props.goalType);
  const [answers, setAnswers] = useState(
    props.answers && props.answers.answerElements
      ? props.answers.answerElements
      : []
  );
  const [isOrderOfAnswersImportant, setIsOrderOfAnswersImportant] = useState(
    props.isOrderOfAnswersImportant
  );
  const [shouldAnswerSizeMatchSample, setShouldAnswerSizeMatchSample] =
    useState(props.shouldAnswerSizeMatchSample);
  const [complexity, setComplexity] = useState(
    props.complexity ? props.complexity : 0
  );
  const [isScoringShown, setIsScoringShown] = useState(props.isScoringShown);
  const [generating, setGenerating] = useState(false);
  const [check, setCheck] = useState(props.check);

  const { t } = useTranslation("lesson");

  // Adjust textarea heights on mount
  useEffect(() => {
    const textareas = document.querySelectorAll(".dynamic-textarea");
    textareas.forEach((textarea) => adjustTextareaHeight(textarea));
  }, [answers]); // Run this effect whenever answers change

  const [updateQuiz, { loading, error }] = useMutation(UPDATE_QUIZ_MUTATION, {
    variables: {
      id: quizId,
      question: question,
      answer: answer,
      ifRight: ifRight,
      ifWrong: ifWrong,
      complexity,
      check: check,
      type: type,
      instructorName: instructorName,
      name: name,
      image: image,
      goalType: goalType,
      shouldAnswerSizeMatchSample: shouldAnswerSizeMatchSample,
      isOrderOfAnswersImportant: isOrderOfAnswersImportant,
      isScoringShown: isScoringShown,
      answers: {
        answerElements: answers?.map((answer) => ({
          answer: answer.answer,
          index: answer.index,
          relatedAnswers: answer.relatedAnswers,
          feedback: answer.feedback,
        })),
      },
    },
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await updateQuiz();
      props.getResult(res);
      props.switchUpdate();
    } catch (err) {
      console.error(err);
    }
  };

  const upgradeSampleAnswer = async (e, answer_to_upgrade) => {
    e.preventDefault();
    let prompt = `
    You are tasked with improving the clarity and completeness of a sample answer to make it suitable for accurate semantic comparison and assessment.

    Task:
    1. Ensure the sentence structure follows this pattern: subject – predicate – object.
    2. Replace all pronouns with specific nouns for clarity and precision.
    3. Expand on incomplete ideas to ensure every thought is fully developed and well-articulated.
    4. Use plain and simple language, similar to oral speech.
    5. Do not increase the size of the answer by more than 5 words.

    Input:
    – Question: "${question}"
    - Initial Answer: "${answer_to_upgrade}"

    Output:
    Provide the upgraded answer in JSON format with clear, accurate, and complete sentences. Example format:
    {
      "upgraded_answer": "Improved and fully developed version of the input answer."
    }

    Example Input:
    - Initial Answer: "The first course of action is to understand its worth and set realistic expectations."

    Example Output:
    {
      "upgraded_answer": "First evaluation is needed to understand the company's worth and set realistic expectations for the future sale of the company."
    }
    `;

    try {
      const response = await fetch("/api/generateJson", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: prompt }),
      });
      const data = await response.json();
      if (response.ok) {
        let upgraded_answer = JSON.parse(data.result.content).upgraded_answer;
        return upgraded_answer;
      } else {
        throw new Error(
          data.error.message || "An error occurred during your request."
        );
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const generateSemanticCloud = async (e) => {
    e.preventDefault();
    let semanticCloudPrompt = `
      You are generating a semantic cloud to help compare student answers with a correct answer semantically.

          Task:
          1. Given a question and correct answer:
            - Generate three alternative correct answers:
              a. A very short answer with key terms only.
              b. A colloquial answer that could be given by a junior lawyer.
              c. A detailed answer, written in simple and plain language.

          2. Avoid using the exact words from the correct answer. Use the same language as the correct answer.

          Input:
          - Question: "${question}"
          - Correct Answer: "${answer}"

          Output:
          Return the results as JSON in this format:
          {
            "semantic_cloud": [
              {"answer": "A very short answer", "index": 0},
              {"answer": "A colloquial answer", "index": 1},
              {"answer": "A more detailed answer", "index": 2}
            ]
          }    
      `;

    try {
      const response = await fetch("/api/generateJson", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: semanticCloudPrompt }),
      });
      const data = await response.json();
      if (response.ok) {
        let newAnswers = JSON.parse(data.result.content).semantic_cloud;
        setAnswers((prev) => [...prev, ...newAnswers]);
        return data;
      } else {
        throw new Error(
          data.error.message || "An error occurred during your request."
        );
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const generateDifferentAnswers = async (e) => {
    e.preventDefault();
    let semanticCloudPrompt = `
      I am designing a practice question to help junior lawyers.
        Task:
        1. Given a question and its correct answer:
          - Generate three alternative answers that are correct but phrased differently from the original correct answer.

        2. Requirements:
          - Ensure the generated answers are semantically accurate.
          - Use the same language style as the provided correct answer.
          - Avoid repeating the exact words from the original correct answer.

        Input:
        - Question: "${question}"
        - Correct Answer: "${answer}"

        Output:
        Provide the alternative answers in JSON format as follows:
        {
          "semantic_cloud": [
            {
              "answer": "Alternative correct answer 1",
              "next_id": "",
              "next_type": "",
              "index": 0
            },
            {
              "answer": "Alternative correct answer 2",
              "next_id": "",
              "next_type": "",
              "index": 1
            },
            {
              "answer": "Alternative correct answer 3",
              "next_id": "",
              "next_type": "",
              "index": 2
            }
          ]
        }
    `;
    try {
      const response = await fetch("/api/generateJson", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: semanticCloudPrompt }),
      });
      const data = await response.json();
      if (response.ok) {
        let newAnswers = JSON.parse(data.result.content).semantic_cloud;
        setAnswers((prev) => [...prev, ...newAnswers]);
        return data;
      } else {
        throw new Error(
          data.error.message || "An error occurred during your request."
        );
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const extendSemanticCloud = async (e) => {
    e.preventDefault();
    let semanticCloudPrompt = `
      I am designing a practice question to help junior lawyers. These question has several correct answers.
        Task:
        1. Given a question and its correct answers:
          - Generate three alternative answers for every correct answer that mean the same but phrased differently from the original correct answer.
          - These alternative answers must be:
              a. A very short answer with key terms only.
              b. A colloquial answer that could be given by a junior lawyer.
              c. A detailed answer, written in simple and plain language.

        2. Requirements:
          - Ensure the generated answers are semantically accurate.
          - Use the same language style as the provided correct answer.
          - Avoid repeating the exact words from the original correct answer.
          – Important! Leave the original correct answer unchanged!!! Only add alternative answers


        Input:
        - Question: "${question}"
        - Correct Answers: "${answers}"

        Output:
        Provide the alternative answers in JSON format as follows:
        {
          "semantic_cloud": [
            {
              "answer": "Correct answer 1", // do not make any changes to the original correct answer!!!
              "relatedAnswers": [] // generated three similar answers
              "next_id": "",
              "next_type": "",
              "index": 0
            },
            {
              "answer": "Correct answer 2",
              "relatedAnswers": [] // generated three similar answers
              "next_id": "",
              "next_type": "",
              "index": 1
            },
          ]
        }
    `;
    try {
      const response = await fetch("/api/generateJson", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: semanticCloudPrompt }),
      });
      const data = await response.json();
      if (response.ok) {
        let newAnswers = JSON.parse(data.result.content).semantic_cloud;
        newAnswers.map((na, i) => (na.answer = answers[i].answer));
        return newAnswers;
      } else {
        throw new Error(
          data.error.message || "An error occurred during your request."
        );
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const addRelatedAnswer = async (i) => {
    let updatedAnswers = [...answers];
    let updatedAnswer = { ...answers[i] }; // Create a new object for updatedAnswer
    if (updatedAnswer.relatedAnswers) {
      updatedAnswer.relatedAnswers = [...updatedAnswer.relatedAnswers, ""];
    } else {
      updatedAnswer.relatedAnswers = [""]; // Directly assign the new array
    }
    updatedAnswers[i] = updatedAnswer;

    setAnswers(updatedAnswers);
  };

  const removeRelatedAnswer = async (i) => {
    // Validate the main answer index
    // if (typeof i === "undefined" || !answers[i]?.relatedAnswers) {
    //   console.error("Invalid index or no related answers found", { i });
    //   return;
    // }

    // Get the related answers for the specific answer
    const relatedAnswers = answers[i].relatedAnswers;

    // Ensure there is at least one related answer to remove
    // if (relatedAnswers.length === 0) {
    //   console.error("No related answers to remove for answer at index:", i);
    //   return;
    // }

    // Remove the last item
    let updatedAnswers = answers.map((answer, index) =>
      index === i
        ? {
            ...answer,
            relatedAnswers: relatedAnswers.slice(0, -1), // Remove the last item
          }
        : answer
    );

    // Update the state with the modified answers
    setAnswers(updatedAnswers);
  };

  return (
    <Container>
      <Row>
        <div className="description">Id</div>
        <div className="action_area">
          <div className="element_info">{quizId}</div>
        </div>
      </Row>
      <Row>
        <div className="description">Name</div>
        <div className="action_area">
          <input
            onChange={(e) => setName(e.target.value)}
            valuelue={name}
            placeholder="Untitled"
          />
        </div>
      </Row>
      <Row>
        <div className="description">Checking mode</div>
        <div className="action_area">
          <select valuelue={check} onChange={(e) => setCheck(e.target.value)}>
            <option value={undefined}>Not chosen</option>
            <option value={"WORD"}>Literally</option>
            <option value={"IDEA"}>By implication</option>
          </select>
          <div className="explainer">
            This determines how the answer of the student is checked
          </div>
        </div>
      </Row>
      <Row>
        <div className="description">{t("type")}</div>
        <div className="action_area">
          <select
            name="types"
            id="types"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value={null}>Undefined</option>
            <option value="TEST">Question</option>
            <option value="FINDALL">Find All</option>
            <option value="COMPLEX">Complex</option>
            <option value="FORM">Form</option>
            <option value="GENERATE">Generate Ideas</option>
            <option value="PROMPT">Check with AI</option>
            {/* <option value="CALL">Call Simulation</option> */}
          </select>
          <div className="explainer">Choose the type of the question</div>
        </div>
      </Row>
      <Row>
        <div className="description">Format</div>
        <div className="action_area">
          <select
            name="types"
            id="types"
            valuelue={goalType}
            onChange={(e) => setGoalType(e.target.value)}
          >
            <option value="EDUCATE">Educate</option>
            <option value="ASSESS">Assess</option>
          </select>
          <div className="explainer">Determine the format of assessment</div>
        </div>
      </Row>
      <Row>
        <div className="description">Is Scoring Shown</div>
        <div className="action_area">
          <select
            valuelue={isScoringShown ? "true" : "false"}
            onChange={(e) => setIsScoringShown(e.target.value == "true")}
          >
            <option value={"true"}>True</option>
            <option value={"false"}>False</option>
          </select>
          <div className="explainer">Is the scoring show to the student?</div>
        </div>
      </Row>
      {type === "COMPLEX" && (
        <Row>
          <div className="description">Order of ideas</div>
          <div className="action_area">
            <select
              name="types"
              id="types"
              valuelue={isOrderOfAnswersImportant}
              onChange={(e) =>
                setIsOrderOfAnswersImportant(e.target.value === "true")
              }
            >
              <option value={"false"}>No</option>
              <option value={"true"}>Yes</option>
            </select>
            <div className="explainer">
              {" "}
              Is order of ideas in the answer important?
            </div>
          </div>
        </Row>
      )}
      <Row>
        <div className="description">Size of answer</div>
        <div className="action_area">
          <select
            name="types"
            id="types"
            valuelue={shouldAnswerSizeMatchSample}
            onChange={(e) => setShouldAnswerSizeMatchSample(e.target.value)}
          >
            <option value={false}>No</option>
            <option value={true}>Yes</option>
          </select>
          <div className="explainer">
            {" "}
            Should the size of the answer match the sample answer?
          </div>
        </div>
      </Row>
      <Row>
        <div className="description">Instructor Name</div>
        <div className="action_area">
          <input
            valuelue={instructorName}
            onChange={(e) => setInstructorName(e.target.value)}
          />
          <div className="explainer"></div>
        </div>
      </Row>
      <Row>
        <div className="description">Instructor Image</div>
        <div className="action_area">
          <input valuelue={image} onChange={(e) => setImage(e.target.value)} />
          <div className="explainer"></div>
        </div>
      </Row>
      <Row>
        <div className="description">Question</div>
        <div className="action_area">
          <Frame>
            <DynamicLoadedEditor
              id="question"
              name="question"
              placeholder={"Question"}
              value={question}
              getEditorText={setQuestion}
            />
          </Frame>
          <div className="explainer"></div>
        </div>
      </Row>
      <Row>
        <div className="description">Sample Answer</div>
        <div className="action_area">
          <textarea
            className="dynamic-textarea"
            name="answer"
            placeholder={"Answer"}
            value={answer}
            onChange={(e) => {
              setAnswer(e.target.value);
              autoResizeTextarea(e);
            }}
            onInput={autoResizeTextarea}
          />
          <MicroButton
            onClick={async (e) => {
              e.preventDefault();
              setGenerating(true);
              const res = await upgradeSampleAnswer(e, answer);
              setAnswer(res);
              setGenerating(false);
            }}
          >
            {generating ? "Upgrading..." : "Upgrade"}
          </MicroButton>
          <div className="explainer">
            This sample answer is used to check student answers and generate
            semantic cloud
          </div>
        </div>
      </Row>
      <Row>
        <div className="description">Semantic Cloud</div>
        <div className="action_area">
          {answers.map((an, i) => (
            <div className="multilevel_fields">
              <div className="mainfield">
                <textarea
                  className="dynamic-textarea"
                  value={an.answer}
                  placeholder={`Answer`}
                  onChange={(e) => {
                    const newAnswers = [...answers];
                    newAnswers[i] = {
                      ...newAnswers[i],
                      answer: e.target.value,
                    }; // Create a new object for the specific element and update its property
                    setAnswers(newAnswers);
                    autoResizeTextarea(e);
                  }}
                  onInput={autoResizeTextarea}
                  onLoad={(e) => autoResizeTextarea(e)}
                />
                <Buttons direction={"column"} gap={"5px"} margin={"0"}>
                  <NanoButton onClick={() => removeRelatedAnswer(i)}>
                    -1
                  </NanoButton>
                  <NanoButton onClick={() => addRelatedAnswer(i)}>
                    +1
                  </NanoButton>
                </Buttons>
              </div>
              <div className="mainfield">
                <textarea
                  className="dynamic-textarea"
                  value={an.feedback}
                  placeholder={`Feedback`}
                  onChange={(e) => {
                    const newAnswers = [...answers];
                    newAnswers[i] = {
                      ...newAnswers[i],
                      feedback: e.target.value,
                    }; // Create a new object for the specific element and update its property
                    setAnswers(newAnswers);
                    autoResizeTextarea(e);
                  }}
                  onInput={autoResizeTextarea}
                  onLoad={(e) => autoResizeTextarea(e)}
                />
              </div>
              <div className="subfield">
                {an.relatedAnswers &&
                  an.relatedAnswers?.map((rel, j) => (
                    <textarea
                      className="dynamic-textarea"
                      value={rel}
                      onChange={(e) => {
                        const newAnswers = [...answers];
                        const newAn = { ...newAnswers[i] };
                        const newRelAns = [...newAnswers[i].relatedAnswers];
                        newRelAns[j] = e.target.value;
                        newAn.relatedAnswers = newRelAns;
                        newAnswers[i] = newAn;
                        setAnswers(newAnswers);
                        autoResizeTextarea(e);
                      }}
                      onInput={autoResizeTextarea}
                      onLoad={(e) => autoResizeTextarea(e)}
                    />
                  ))}
              </div>
            </div>
          ))}
          <MicroButton
            onClick={(e) => {
              e.preventDefault();
              if (answers.length > 0) {
                const newAnswers = answers.slice(0, -1);
                setAnswers(newAnswers);
              }
            }}
          >
            -1
          </MicroButton>
          <MicroButton
            onClick={(e) => {
              e.preventDefault();
              return setAnswers([
                ...answers,
                {
                  answer: ``,
                  next_id: "",
                  next_type: "",
                  index: answers.length,
                },
              ]);
            }}
          >
            +1
          </MicroButton>
          {type !== "GENERATE" && type !== "FINDALL" && (
            <MicroButton
              onClick={async (e) => {
                e.preventDefault();
                setGenerating(true);
                await generateSemanticCloud(e);
                setGenerating(false);
              }}
            >
              {generating ? "Generating..." : "Generate similar"}
            </MicroButton>
          )}
          {type == "GENERATE" || type == "FINDALL" ? (
            <MicroButton
              onClick={async (e) => {
                e.preventDefault();
                setGenerating(true);
                await generateDifferentAnswers(e);
                setGenerating(false);
              }}
            >
              {generating ? "Generating..." : "Generate different"}
            </MicroButton>
          ) : null}

          <MicroButton
            onClick={async (e) => {
              e.preventDefault();
              setGenerating(true);
              let newAnswers = await Promise.all(
                answers.map(async (an) => {
                  let new_an = { ...an }; // Make a copy of the object
                  new_an.answer = await upgradeSampleAnswer(e, an);
                  return new_an;
                })
              );
              setAnswers(newAnswers); // Logs the resolved values
              setGenerating(false);
            }}
          >
            {generating ? "Upgrading..." : "Upgrade Cloud"}
          </MicroButton>

          <MicroButton
            onClick={async (e) => {
              e.preventDefault();
              setGenerating(true);
              const res = await extendSemanticCloud(e);
              setAnswers(res);
              setGenerating(false);
            }}
          >
            {generating ? "Adding..." : "Add subanswers"}
          </MicroButton>
          <div className="explainer">
            These answers are used to make the answer assessment more accurate
          </div>
        </div>
      </Row>
      {/* )} */}
      <Row>
        <div className="description">Correct answer comments</div>
        <div className="action_area">
          <Frame>
            <DynamicLoadedEditor
              id="answer"
              name="answer"
              value={ifRight}
              placeholder="This text helps provide feedback if the answer is correct"
              getEditorText={setIfRight}
            />
          </Frame>
          <div className="explainer">
            This info is used to provide improvement advice to students if the
            answer is partially correct
          </div>
        </div>
      </Row>
      <Row>
        <div className="description">Incorrect answer comments </div>
        <div className="action_area">
          <Frame>
            <DynamicLoadedEditor
              id="answer"
              name="answer"
              value={ifWrong}
              placeholder="This text helps provide feedback if the answer is incorrect"
              getEditorText={setIfWrong}
            />
          </Frame>
          <div className="explainer">
            This info is used to explain what the answer is missing if the
            student answer is incorrect
          </div>
        </div>
      </Row>
      <ActionButton onClick={handleUpdate}>
        {loading ? t("saving") : t("save")}
      </ActionButton>
    </Container>
  );
};

export default UpdateQuiz;
