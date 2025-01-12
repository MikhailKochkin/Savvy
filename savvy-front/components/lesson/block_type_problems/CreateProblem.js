import { useState } from "react";
import styled from "styled-components";
import { useMutation, gql } from "@apollo/client";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { SINGLE_LESSON_QUERY } from "../SingleLesson";
import CanvasProblemBuilder from "./functions/CanvasProblemBuilder";
import { Row, ActionButton, SettingsBlock } from "../styles/DevPageStyles";
import { autoResizeTextarea } from "../SimulatorDevelopmentFunctions";
import Loading from "../../layout/Loading";

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

const CREATE_PROBLEM_MUTATION = gql`
  mutation CREATE_PROBLEM_MUTATION(
    $name: String
    $text: String!
    $lessonId: String!
    $steps: ProblemStructureInput # $nodeType: String #$nodeID: String!
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
      user {
        id
      }
      steps {
        problemItems {
          id
          type
          next {
            true {
              value
              type
            }
            false {
              value
              type
            }
          }
        }
      }
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

let exit_strategy_sample_result = {
  introductory_text:
    '<h2><p>Exit Strategy Planning</p></h2><p>I think we should start with a general brainstorm session. Let\'s map out all the options Alex and QuickNourish could consider.</p><div className="question"><p><b>Your task:</b> please add the explanation to the below considerations.</p></div>',
  steps: [
    {
      question:
        "Shouldn't we first think about what shareholders typically consider when planning an exit? Before we jump into specific strategies, let's outline the key considerations shareholders face in situations like this. What in your opinion should QuickNourish do in relation to this aspect? ❓ Use the hint option if you don't know where to start.",
      answers: [
        "Go over your main contracts and, if necessary, work out new terms so they can be easily handed over.",
        "Review and, if necessary, renegotiate key contracts and agreements to ensure they are transferable.",
        "Review and renegotiate key documents, contracts, and agreements.",
        "Check the contracts for change of control provisions.",
        "Confirm if the agreements survive the planned transaction/exit.",
      ],
      explanations: [
        "Ensuring contracts are transferable is a key step in exit planning.",
        "Change of control provisions may impose restrictions or obligations in a transaction.",
        "Survivability of agreements affects the continuity of operations post-exit.",
      ],
      whichAnswersAreCorrect: [true, true, true, true, true],
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
        "The company might also need to conduct due diligence. But for what reason?",
      answers: [
        "To ensure that the company is in a healthy state with limited red flags and unresolved matters which could have an impact on the appeal of the company as a target.",
        "Check that the company is in good health with no big problems or loose ends that could make it less appealing to buyers.",
      ],
      explanations: [
        "Due diligence identifies risks and ensures the company is attractive to buyers.",
        "Resolving red flags in advance can significantly enhance the company's appeal.",
      ],
      whichAnswersAreCorrect: [true, true],
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
        "Could you list some of the types of legal issues that need to be considered as part of a due diligence? Make every idea really brief (2-4 words). Put every idea in a separate form. To create more forms press +1 button.",
      answers: [
        "Intellectual property (IP)",
        "IP and IT",
        "Environment",
        "Pending court claims, litigation",
        "Compliance",
        "Real estate",
        "Pensions",
        "Contracts",
      ],
      explanations: [
        "Each item ensures a comprehensive review of legal risks and obligations.",
        "Brief answers help focus on key areas during due diligence.",
      ],
      whichAnswersAreCorrect: [true, true, true, true, true, true, true, true],
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
      type: "Quiz",
    },
  ],
};

const CreateProblem = (props) => {
  const {
    lessonID,
    lesson,
    simulationStory,
    previousStories,
    jsonCharactersString,
    jsonStoryString,
  } = props;
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

  const updateQuestions = async (e, questions) => {
    e.preventDefault();
    let updateQuestionsPrompt = `
        You are given the following questions: """${JSON.stringify(
          questions
        )}""".
        These questions are part of a case study designed to teach students how to solve a problem effectively. There are three types of guiding questions:

        NewTest: A guiding question that has answers like "yes" or "no" or requires the student to choose from a closed list of options. For these questions, include an array whichAnswersAreCorrect (e.g., [true, false]) to indicate which option(s) are correct.
        Quiz: An open-ended question that allows students to think critically and come up with their answers. Use this question type for most scenarios.
        Chat: A collection of mentor-like messages. These provide hints, explanations, or insights before or after answering other questions. They may also summarise insights from previously answered questions.
        Your task is to:

        Ensure Socratic Method: Make the questions follow the Socratic method by encouraging critical thinking and exploration of concepts.
        Add Mentor Personality: Frame the questions as if presented by a mentor. Include relevant backstory, examples, or analogies to make the interaction more engaging and relatable.
        Improve Accuracy Checking: Add multiple diverse sample answers to improve the accuracy of the system when evaluating responses.

        Instructions:

        Update the given questions to be more engaging, follow the Socratic method, and include a mentor-like narrative.
        Add diverse sample answers for each question to enhance accuracy.
        Return the updated questions in JSON format.

        Output Example: Provide the updated questions in the JSON format. Example:

        steps: [
          {
            question:
              "Shouldn't we first think about what shareholders typically consider when planning an exit? Before we jump into specific strategies, let's outline the key considerations shareholders face in situations like this. What in your opinion should QuickNourish do in relation to this aspect? ❓ Use the hint option if you don't know where to start.",
            answers: [
              "Go over your main contracts and, if necessary, work out new terms so they can be easily handed over.",
              "Review and, if necessary, renegotiate key contracts and agreements to ensure they are transferable.",
              "Review and renegotiate key documents, contracts, and agreements.",
              "Check the contracts for change of control provisions.",
              "Confirm if the agreements survive the planned transaction/exit.",
            ],
            explanations: [
              "Ensuring contracts are transferable is a key step in exit planning.",
              "Change of control provisions may impose restrictions or obligations in a transaction.",
              "Survivability of agreements affects the continuity of operations post-exit.",
            ],
            whichAnswersAreCorrect: [true, true, true, true, true],
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
              "The company might also need to conduct due diligence. But for what reason?",
            answers: [
              "To ensure that the company is in a healthy state with limited red flags and unresolved matters which could have an impact on the appeal of the company as a target.",
              "Check that the company is in good health with no big problems or loose ends that could make it less appealing to buyers.",
            ],
            explanations: [
              "Due diligence identifies risks and ensures the company is attractive to buyers.",
              "Resolving red flags in advance can significantly enhance the company's appeal.",
            ],
            whichAnswersAreCorrect: [true, true],
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
              "Could you list some of the types of legal issues that need to be considered as part of a due diligence? Make every idea really brief (2-4 words). Put every idea in a separate form. To create more forms press +1 button.",
            answers: [
              "Intellectual property (IP)",
              "IP and IT",
              "Environment",
              "Pending court claims, litigation",
              "Compliance",
              "Real estate",
              "Pensions",
              "Contracts",
            ],
            explanations: [
              "Each item ensures a comprehensive review of legal risks and obligations.",
              "Brief answers help focus on key areas during due diligence.",
            ],
            whichAnswersAreCorrect: [true, true, true, true, true, true, true, true],
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
            type: "Quiz",
          },
        ],
    `;

    try {
      const response = await fetch("/api/generateJson", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: updateQuestionsPrompt }),
      });
      const data = await response.json();
      if (response.ok) {
        let updated_questions = JSON.parse(data.result.content);
        return updated_questions?.steps;
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

  const generateProblem = async (e) => {
    e.preventDefault();

    let chatPrompt = `
        You are building a block of a simulator that has the following background: """${previousStories.join(
          "\n"
        )}""", 
        and the following current story: """${jsonStoryString}"""
        The main character of the simulator are: """${jsonCharactersString}"""

        This block type is a Case Study, presenting a complex problem accompanied by a series of interconnected questions designed in a Socratic style to guide students toward solving the problem.
        You receive this instructions that are used to make an interactive case study: """${prompt}"""
        Develop the case study based on the simualtor story and the data provided that will consist of 2 parts: the introduction to the problem and the questions to solve it.
        There are 3 types of quiding questions:

        1. NewTest: a guiding question that has answers "yes" or "no" or the studnet needs to choose from a closed list of options. (indicate which option is correct  in the whichAnswersAreCorrect array: [true, false])
        2. Quiz: open-ended question that should be used in most cases.
        3. Chat: a colection of messages that either provide hints and explanations to student s before answering them questions or sums up the insights from the previously answered questions.
        
        Return the result in a JSON that looks like this: 
        
        Example 1. """${JSON.stringify(gdpr_sample_result, null, 2)}"""
        Example 2. """ ${JSON.stringify(
          exit_strategy_sample_result,
          null,
          2
        )}"""

        The total number of questions should be between 3 and 7.
    `;

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
        let updatedQuestions = await updateQuestions(e, new_case_study.steps);
        setGeneratedSteps(
          updatedQuestions ? updatedQuestions : new_case_study.steps
        );
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
            <textarea
              onChange={(e) => {
                setPrompt(e.target.value), autoResizeTextarea(e);
              }}
            />
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
      ) : (
        <Loading />
      )}
      {!generating ? (
        <div className="canvas_container">
          <DndProvider backend={HTML5Backend}>
            <CanvasProblemBuilder
              lesson={props.lesson}
              me={props.me}
              lessonID={lesson.id}
              getSteps={getSteps}
              characters={props.characters}
              items={generatedSteps.length > 0 ? generatedSteps : []}
            />
          </DndProvider>
        </div>
      ) : null}
      <ActionButton
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
      </ActionButton>
      {error ? error.message : null}
    </Styles>
  );
};

export default CreateProblem;
