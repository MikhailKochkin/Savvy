import { useState } from "react";
import styled from "styled-components";
import { useMutation, gql } from "@apollo/client";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { SINGLE_LESSON_QUERY } from "../SingleLesson";
import CanvasProblemBuilder from "./CanvasProblemBuilder";
import { Row, ActionButton, SettingsBlock } from "../styles/DevPageStyles";

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  .editor_container {
    width: 600px;
  }
  .canvas_container {
    width: 100%;
  }
`;

const ButtonTwo = styled.button`
  border: none;
  background: #3f51b5;
  padding: 10px 20px;
  border: 2px solid #3f51b5;
  border-radius: 5px;
  font-family: Montserrat;
  font-size: 1.4rem;
  font-weight: 500;
  color: #fff;
  cursor: pointer;
  margin-top: 20px;
  margin-right: 10px;
  transition: 0.3s;
  width: 250px;
  &:hover {
    background: #2e3b83;
    border: 2px solid #2e3b83;
  }
`;

const CREATE_PROBLEM_MUTATION = gql`
  mutation CREATE_PROBLEM_MUTATION(
    $name: String
    $text: String!
    $lessonId: String!
    $steps: ProblemStructure # $nodeType: String #$nodeID: String!
  ) {
    createProblem(
      name: $name
      text: $text
      lessonId: $lessonId
      steps: $steps # nodeType: $nodeType # nodeID: $nodeID
    ) {
      id
      name
      text
      lessonId
      steps
    }
  }
`;

const DynamicLoadedEditor = dynamic(import("../../editor/Editor"), {
  loading: () => <p>Загрузка редактора...</p>,
  ssr: false,
});

let sample_result = {
  introductory_text:
    "<h2><p>Transaction structure</p></h2><p>As negotiations with the sellers progressed, Eiffel Capital Investments agreed to structure the transaction as a share deal, ensuring the sellers remain actively involved by retaining a minority stake. The decision was primarily driven by the sellers&#39; vast expertise and in-depth market knowledge for managing and repairing the building.</p><p>Eiffel Capital Investments asks you for a roadmap of the transaction. Please answer the questions in relation to the general steps of the transaction</p>",
  steps: [
    {
      content:
        "You've mentioned that in our case a share deal is generally easier to structure than an asset deal. Could you explain why? What will be transferred in a share deal and what will be transferred in an asset deal?",
      id: 1,
      next: {
        true: {
          value: 2,
          type: "Quiz",
        },
        false: {
          value: 2,
          type: "Quiz",
        },
      },
      position: {
        x: 25,
        y: 25,
      },
      type: "Quiz",
    },
    {
      content:
        "On the other hand, you've written that the asset deal may help to avoid historical risk associated with the target company. How does it work? What kind of risks can be found?",
      id: 2,
      next: {
        true: {
          value: 3,
          type: "NewTest",
        },
        false: {
          value: 3,
          type: null,
        },
      },
      position: {
        x: 325,
        y: 25,
      },
      type: "Quiz",
    },
    {
      content:
        "We believe that we might want Eric and Olivia to remain the minority owners of the building. We might need their expertise during the restructuring process. In this case, which deal type will be better for us? Share deal ot asset deal?",
      id: 3,
      next: {
        true: {
          value: null,
          type: null,
        },
        false: {
          value: null,
          type: null,
        },
      },
      position: {
        x: 625,
        y: 25,
      },
      type: "NewTest",
    },
  ],
};

let gdpr_sample_result = {
  introductory_text:
    '<h2><p>GDPR Compliance</p></h2><p>Your client, TechNova Solutions, is preparing to launch a new online service that will collect and process personal data from users in the EU. As their legal advisor, you have been asked to ensure full compliance with GDPR regulations. Your task is to develop a roadmap for GDPR compliance. Please answer the following questions to outline the necessary steps.</p><div className="question"><p><b>Your task:</b> please add the explanation to the below considerations.</p></div>',
  steps: [
    {
      question:
        "Why is it important to identify personal data under GDPR correctly?",
      answers: [
        "It ensures compliance with legal obligations, protects individuals' privacy, and helps organisations avoid fines.",
      ],
      explanations: [
        "Proper identification enables the application of data protection principles, such as lawful processing, data minimisation, and safeguarding rights like access, rectification, and erasure.",
      ],
      whichAnswersAreCorrect: [true],
      id: 1,
      next: {
        true: {
          value: 2,
          type: "Quiz",
        },
        false: {
          value: 2,
          type: "Quiz",
        },
      },
      position: {
        x: 25,
        y: 25,
      },
      type: "Quiz",
    },
    {
      question:
        "Given the importance of correctly identifying personal data, what steps should TechNova take to conduct a thorough data audit?",
      answers: [
        "Identify all data: Catalogue personal data collected, stored, and processed.",
        "Map data flows: Understand how data moves internally and externally.",
        "Assess data processing: Review legal bases, purposes, and retention periods.",
        "Check security measures: Ensure data protection policies are in place.",
        "Document findings: Maintain records for accountability.",
      ],
      explanations: [
        "This is a key step to ensure all data is accounted for.",
        "Understanding data flows helps identify potential risks.",
        "This step is essential to assess compliance with GDPR requirements.",
        "Security measures are crucial to protect personal data.",
        "Documentation is necessary to demonstrate compliance.",
      ],
      whichAnswersAreCorrect: [true, true, true, true, true],
      id: 2,
      next: {
        true: {
          value: 3,
          type: "Quiz",
        },
        false: {
          value: 3,
          type: "Quiz",
        },
      },
      position: {
        x: 325,
        y: 25,
      },
      type: "Quiz",
    },
    {
      question:
        "After completing the data audit, TechNova identified that some personal data is being processed without clear user consent. What constitutes valid consent under GDPR?",
      answers: [
        "Freely given, no coercion or undue pressure.",
        "Clearly state the purposes of data processing.",
        "Informed: Provide users with full information about how their data will be used.",
        "Unambiguous: Use clear affirmative action (e.g., ticking a box)",
      ],
      whichAnswersAreCorrect: [true, true, true, true],
      explanations: [
        "This requirement is set out in Article 7 of the GDPR.",
        "This is a key transparency requirement under the GDPR.",
        "Users must be aware of what they are consenting to.",
        "Silence, pre-ticked boxes, or inactivity do not constitute valid consent.",
      ],
      id: 3,
      next: {
        true: {
          value: 4,
          type: "Quiz",
        },
        false: {
          value: 4,
          type: "Quiz",
        },
      },
      position: {
        x: 625,
        y: 25,
      },
      type: "Quiz",
    },
    {
      question: "And how should TechNova obtain this consent?",
      answers: [
        "TechNova should obtain consent through transparent, user-friendly forms, ensuring users can easily withdraw consent at any time.",
      ],
      explanantions: [
        "This is a key requirement under the GDPR to ensure users have control over their data.",
      ],
      whichAnswersAreCorrect: [true],
      id: 4,
      next: {
        true: {
          value: null,
          type: null,
        },
        false: {
          value: null,
          type: null,
        },
      },
      position: {
        x: 925,
        y: 25,
      },
      type: "Quiz",
    },
  ],
};

const CreateProblem = (props) => {
  const { lessonID, lesson, simulationStory } = props;
  const [name, setName] = useState();
  const [text, setText] = useState();
  const [steps, setSteps] = useState([]);
  const [generatedSteps, setGeneratedSteps] = useState([]);

  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const { t } = useTranslation("lesson");
  const router = useRouter();

  const myCallback = (dataFromChild) => {
    setText(dataFromChild);
  };

  const getSteps = (val) => {
    setSteps([...val]);
  };

  const rus_placeholder = `<h2><p>План задачи</p></h2><p>1. Заголовок: название задачи. Сделайте его заголовком, нажав на кнопку <b>H</b>.</p><p>2. Опишите условия кейса</p><p>3. Запишите вопрос к задаче. Визуально выделите его, нажав на кнопку с двумя точками.</p><p>4. Ответ к задаче. Его нужно будет скрыть от студента, нажав на кнопку с минусом по центру диалогового окна. В появившемся окне напишите слово "Ответ". Ответ станет доступен только после решения задачи студентом.</p>`;
  const eng_placeholder = `<h2><p>Case Study plan</p></h2><p>1. Title: the name of the case study. Add title styles by pressing <b>the H button </b>.</p><p>2. Explain the case</p><p>3. Write down the question to the case. Highlight it visually by clicking on the button with two dots.</p><p>4. Write down the solution to case study. You can hide it from the student by clicking on the button with a minus in the middle of the dialog box. In the window that appears, type the word "Answer". The answer will be available only after the student has solved the problem.</p>`;

  const [createProblem, { loading, error }] = useMutation(
    CREATE_PROBLEM_MUTATION,
    {
      variables: {
        lessonId: lessonID,
        text: text,
        name: name,
        steps: {
          problemItems: [...steps].map(
            ({
              position,
              content,
              whichAnswersAreCorrect,
              question,
              answers,
              ...keepAttrs
            }) => keepAttrs
          ),
        },
      },
      refetchQueries: [
        {
          query: SINGLE_LESSON_QUERY,
          variables: { id: lessonID },
        },
      ],
      awaitRefetchQueries: true,
    }
  );

  const generateProblem = async (e) => {
    e.preventDefault();
    let chatPrompt = `
        You are building a block of a simulator that has the following story: """${simulationStory}"""
        This block type is a Case Study, presenting a complex problem accompanied by a series of interconnected questions designed in a Socratic style to guide students toward solving the problem.
        You receive this data that is used to make an interactive case study: """${prompt}"""
        Develop the case study based on the simualtor story and the data provided that will consist of 2 parts: the introduction to the problem and the questions to solve it.
        There are 3 types of quiding questions:

        1. NewTest: a guiding question that has answers "yes" or "no" or the studnet needs to choose from a closed list of options. (indicate which option is correct  in the whichAnswersAreCorrect array: [true, false])
        2. Quiz: open-ended question that should be used in most cases.
        3. Chat: a colection of messages that either provide hints and explanations to student s before answering them questions or sums up the insights from the previously answered questions.
        
        Return the result in a JSON that looks like this: 
        
        Example 1. """${JSON.stringify(gdpr_sample_result, null, 2)}"""

        The total number of questions should be between 3 and 7.
    `;

    console.log(chatPrompt);

    try {
      const response = await fetch("/api/generateJson", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: chatPrompt }),
      });
      const data = await response.json();
      if (response.ok) {
        let new_case_study = JSON.parse(data.result.content);
        setText(new_case_study.introductory_text);
        setGeneratedSteps(new_case_study.steps);
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

  return (
    <Styles>
      <SettingsBlock>
        <Row>
          <div className="description">Name</div>
          <div className="action_area">
            <input
              onChange={(e) => setName(e.target.value)}
              defaultValue={name}
              placeholder="Untitled"
            />
          </div>
        </Row>
        <Row>
          <div className="description">Prompt</div>
          <div className="action_area">
            <textarea onChange={(e) => setPrompt(e.target.value)} />
            <ActionButton
              onClick={async (e) => {
                setGenerating(true);
                const res = await generateProblem(e);
                setGenerating(false);
              }}
            >
              {!generating ? "Generate with AI" : "..."}
            </ActionButton>
          </div>
        </Row>
      </SettingsBlock>

      {!generating ? (
        <div className="editor_container">
          <DynamicLoadedEditor
            getEditorText={myCallback}
            problem={true}
            value={text}
          />
        </div>
      ) : null}
      {!generating ? (
        <div className="canvas_container">
          <DndProvider backend={HTML5Backend}>
            <CanvasProblemBuilder
              lesson={props.lesson}
              me={props.me}
              lessonID={lesson.id}
              getSteps={getSteps}
              items={generatedSteps.length > 0 ? generatedSteps : []}
            />
          </DndProvider>
        </div>
      ) : null}
      <ButtonTwo
        type="submit"
        variant="contained"
        color="primary"
        onClick={async (e) => {
          e.preventDefault();
          const res = await createProblem();
          props.getResult(res);
        }}
      >
        {loading ? t("saving") : t("save")}
      </ButtonTwo>
      {error ? error.message : null}
    </Styles>
  );
};

export default CreateProblem;
