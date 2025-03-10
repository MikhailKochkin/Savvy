import { useState, useEffect } from "react";
import styled from "styled-components";
import { gql, useLazyQuery } from "@apollo/client";
import Loading from "../../layout/Loading";
import { Tooltip } from "react-tooltip";
import Modal from "styled-react-modal";
import SimulatorInsightsBlock from "./SimulatorInsightsBlock";

const QUIZZES_RESULTS_QUERY = gql`
  query QUIZZES_RESULTS_QUERY($lessonId: String!) {
    quizResults(lessonId: $lessonId) {
      id
      correct
      result
      comment
      type
      ideasList {
        quizIdeas {
          idea
          result
        }
      }
      student {
        id
      }
      quiz {
        id
        name
        type
        goal
      }
      answer
      createdAt
    }
  }
`;

const TEST_RESULTS_QUERY = gql`
  query TEST_RESULTS_QUERY_RESULTS_QUERY($lessonId: String!) {
    testResults(lessonId: $lessonId) {
      id
      answer
      answerArray
      test {
        id
        question
        correct
        answers
        # answer
        goal
      }
      student {
        id
      }
      createdAt
    }
  }
`;

const CONSTRUCTION_RESULTS_QUERY = gql`
  query CONSTRUCTION_RESULTS_QUERY($lessonId: String!) {
    constructionResults(lessonId: $lessonId) {
      id
      answer
      inputs
      attempts
      construction {
        id
      }
      student {
        id
      }
      construction {
        id
      }
    }
  }
`;

const TESTPRACTICE_RESULTS_QUERY = gql`
  query TESTPRACTICE_RESULTS_QUERY($lessonId: String!) {
    testPracticeResults(lessonId: $lessonId) {
      id
      testPractice {
        id
      }
      correct
      tasks
      createdAt
      updatedAt
      student {
        id
      }
    }
  }
`;

const Styles = styled.div`
  width: 100%;
  background-color: #fff;
  border-bottom: 3px solid #f2f6f9;
  padding: 1% 2%;
`;

const HeatMap = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  overflow-x: auto;
  .section {
    min-width: 200px;
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-right: 4px;
    line-height: 1.6;
  }
  .sectionElement {
    padding: 10px;
    border: 2px solid #f2f6f9;
    margin-bottom: 4px;
    font-size: 1.4rem;
  }
`;

const TopSectionElement = styled.div`
  padding: 10px;
  background-color: #f2f6f9;
  margin-bottom: 4px;
  font-size: 1.4rem;
  border: 2px solid #8d99ae;
`;

const SectionElement = styled.div`
  padding: 10px;
  border: 2px solid #f2f6f9;
  margin-bottom: 4px;
  font-size: 1.4rem;
  background-color: ${(props) => {
    // https://coolors.co/palette/f94144-f3722c-f8961e-f9844a-f9c74f-90be6d-43aa8b-4d908e-577590-277da1
    if (
      props.sectionType?.toLowerCase() == "chat" ||
      props.sectionType?.toLowerCase() == "longread" ||
      props.sectionType?.toLowerCase() == "branch"
    )
      return "#77C37C";
    if (props.ratio) {
      if (props.ratio > 90) {
        return "#77C37C";
      } else if (props.ratio > 75) {
        return "#95CC7D";
      } else if (props.ratio > 60) {
        return "#D3DE81";
      } else if (props.ratio > 45) {
        return "#F2E783";
      } else if (props.ratio > 30) {
        return "#FFDC81";
      } else if (props.ratio > 20) {
        return "#FDC37D";
      } else {
        return "#FDBC7B";
      }
    } else {
      return "#fff";
    }
  }};
  .circle {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f2f6f9;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    border: 1px solid #8d99ae;
    text-align: center;
    line-height: 40px;
    font-size: 1rem;
    font-weight: bold;
    margin-top: 5px;
    cursor: pointer;
  }
`;

const lesson = {
  id: "due_diligence_simulator",
  name: "Due Diligence in an M&A Transaction",
  text: "This lesson teaches you how to conduct due diligence in an M&A transaction. It covers legal reviews, strategic risk assessments, and the preparation required to complete a transaction.",
  goal: "To understand the key legal, strategic, and operational aspects of due diligence in an M&A context.",
  context: "M&A Transaction case study",
  story:
    "A fictional case study where a company is preparing to acquire another business.",
  openSize: 2,
  coursePageID: "course_1",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  number: 1,
  banner: "banner_image.jpg",
  tags: ["M&A", "Due Diligence", "Legal"],
  published: true,
  open: true,
  type: "REGULAR",
  description:
    "This lesson covers the comprehensive process of due diligence in an M&A transaction, including legal reviews, risk evaluation, and transaction readiness.",
  structure: {
    lessonItems: [
      {
        __typename: "LessonItem",
        id: "due_problem_1",
        type: "Problem",
        comment: "Legal Due Diligence",
      },
      {
        __typename: "LessonItem",
        id: "due_problem_2",
        type: "Problem",
        comment: "Identifying Exit Risks",
      },
      {
        __typename: "LessonItem",
        id: "due_texteditor_1",
        type: "TextEditor",
        comment: "Preparing for Transaction Completion (Doc Editor)",
      },
      {
        __typename: "LessonItem",
        id: "due_construction_1",
        type: "Construction",
        comment: "Ensuring Transaction Readiness (Doc Builder)",
      },
    ],
  },
  challenge_num: 10,
  change: "",
  map: [],
  userId: "instructor1",
  coursePageId: "course_1",
  forumId: "forum_1",
  image: "lesson_image.jpg",
  short_structure: {},
  assignment: false,
  totalPoints: 100,
  hasSecret: false,
  characters: {},
  challengeResults: [],
  // -------------------- Chats --------------------
  chats: [
    {
      id: "due_chat_1",
      name: "Why is it crucial to conduct legal due diligence before acquiring a company? AI-powered Chat.",
      type: "fixedchat",
      messages: [
        {
          sender: "instructor",
          content:
            "Welcome to the due diligence session! What comes to your mind when you hear 'due diligence'?",
        },
      ],
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      userId: "instructor1",
      lessonId: "due_diligence_simulator",
      complexity: 1,
      link_clicks: 0,
      isSecret: false,
      chatResults: [],
    },
  ],
  // -------------------- Constructions --------------------
  constructions: [
    {
      id: "due_construction_1",
      name: "Ensuring Transaction Readiness (Doc Builder)",
      text: "Build an outline of the key documents and steps required to ensure a smooth transaction completion.",
      lessonId: "due_diligence_simulator",
      userId: "instructor1",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      complexity: 1,
      constructionResults: [],
    },
  ],
  constructionResults: [],
  // -------------------- New Tests --------------------
  newTests: [
    {
      id: "due_test_1",
      lessonID: "due_diligence_simulator",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      type: "TEST",
      next: null,
      goalType: "EDUCATE",
      goal: "Evaluate your understanding of strategic risks in due diligence.",
      name: "Identify common legal risks that may arise during the due diligence process.",
      instructorName: "Instructor",
      image: "",
      ifRight: "Correct! You understand the risks well.",
      ifWrong: "Review the material on strategic risks.",
      question: [
        "What types of strategic risks should a buyer consider during due diligence?",
      ],
      answers: ["Risk A", "Risk B", "Risk C"],
      complexTestAnswers: null,
      correct: [true, false, false],
      userId: "instructor1",
      lessonId: "due_diligence_simulator",
      complexity: 1,
      comments: [],
      testResults: [],
    },
  ],
  // -------------------- Notes --------------------
  notes: [
    {
      id: "due_note_1",
      text: "Due diligence is the investigation or exercise of care that a reasonable business or person is normally expected to take before entering into an agreement or contract with another party.",
      name: "Introduction to Due Diligence",
      lessonId: "due_diligence_simulator",
      userId: "instructor1",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  offers: [],
  // -------------------- Problems --------------------
  problems: [
    {
      id: "due_problem_1",
      name: "Legal Due Diligence",
      text: "Analyze the provided legal documents and identify key risk areas. Use the quiz and chat for guidance.",
      context: "Legal review of contracts, licenses, and litigation risks.",
      hints: "Focus on material contracts and pending litigation.",
      solution: "Identify red flags in contracts and licenses.",
      answer:
        "Review contracts, licenses, litigation documents, and corporate records.",
      goal: "Ensure all legal risks are identified before the acquisition.",
      type: "BRANCHING_SCENARIO",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lessonID: "due_diligence_simulator",
      lessonId: "due_diligence_simulator",
      nodeType: null,
      nodeID: null,
      hintsList: ["Examine contracts", "Review pending litigation"],
      solutionList: ["Flag unusual terms", "Verify licenses"],
      userId: "instructor1",
      complexity: 1,
      isSecret: false,
      // The steps here connect this problem with a Quiz and a Chat.
      steps: {
        problemItems: [
          { type: "Quiz", id: "due_quiz_1" },
          { type: "Chat", id: "due_chat_1" },
          { type: "Quiz", id: "due_quiz_4" },
        ],
      },
      problemResults: [],
    },
    {
      id: "due_problem_2",
      name: "Identifying Exit Risks",
      text: "Evaluate the due diligence findings to identify potential exit barriers. Use the new test and quiz for assistance.",
      context:
        "Consider both legal and strategic factors that may hinder a future sale.",
      hints: "Think about contractual obligations and market conditions.",
      solution: "Develop strategies to mitigate exit risks.",
      answer:
        "Analyze exit clauses, market trends, and potential contractual hurdles.",
      goal: "Identify and plan for exit risks in an M&A transaction.",
      type: "BRANCHING_SCENARIO",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lessonID: "due_diligence_simulator",
      lessonId: "due_diligence_simulator",
      nodeType: null,
      nodeID: null,
      hintsList: ["Review exit clauses", "Assess market risks"],
      solutionList: ["Prepare mitigation strategies"],
      userId: "instructor1",
      complexity: 1,
      isSecret: false,
      // The steps here connect this problem with a NewTest and a Quiz.
      steps: {
        problemItems: [
          { type: "NewTest", id: "due_test_1" },
          { type: "Quiz", id: "due_quiz_2" },
          { type: "Quiz", id: "due_quiz_3" },
        ],
      },
      problemResults: [],
    },
  ],
  problemResults: [],
  // -------------------- Quizes --------------------
  quizes: [
    {
      id: "due_quiz_1",
      question:
        "What key legal documents should be reviewed during due diligence?",
      answer:
        "Contracts, licenses, litigation documents, and corporate records.",
      answers: JSON.stringify([
        "Contracts",
        "Licenses",
        "Litigation documents",
        "Corporate records",
      ]),
      isOrderOfAnswersImportant: false,
      shouldAnswerSizeMatchSample: false,
      isScoringShown: true,
      goal: "Identify the essential legal documents in due diligence.",
      lessonID: "due_diligence_simulator",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      type: "TEST",
      goalType: "EDUCATE",
      next: null,
      ifRight: "Correct answer!",
      ifWrong: "Review the legal documents carefully.",
      name: "What key legal documents should be reviewed during due diligence in an M&A transaction?",
      instructorName: "Instructor",
      image: "",
      check: "IDEA",
      userId: "instructor1",
      lessonId: "due_diligence_simulator",
      complexity: 1,
      quizResults: [],
    },
    {
      id: "due_quiz_2",
      question:
        "What is the significance of identifying potential exit barriers during due diligence?",
      answer:
        "Contracts, licenses, litigation documents, and corporate records.",
      answers: JSON.stringify([
        "Contracts",
        "Licenses",
        "Litigation documents",
        "Corporate records",
      ]),
      isOrderOfAnswersImportant: false,
      shouldAnswerSizeMatchSample: false,
      isScoringShown: true,
      goal: "Identify the essential legal documents in due diligence.",
      lessonID: "due_diligence_simulator",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      type: "TEST",
      goalType: "EDUCATE",
      next: null,
      ifRight: "Correct answer!",
      ifWrong: "Review the legal documents carefully.",
      name: "What key legal documents should be reviewed during due diligence in an M&A transaction?",
      instructorName: "Instructor",
      image: "",
      check: "IDEA",
      userId: "instructor1",
      lessonId: "due_diligence_simulator",
      complexity: 1,
      quizResults: [],
    },
    {
      id: "due_quiz_3",
      question:
        "Can you name a legal issue that could obstruct a future sale after acquiring a company?",
      answer:
        "Contracts, licenses, litigation documents, and corporate records.",
      answers: JSON.stringify([
        "Contracts",
        "Licenses",
        "Litigation documents",
        "Corporate records",
      ]),
      isOrderOfAnswersImportant: false,
      shouldAnswerSizeMatchSample: false,
      isScoringShown: true,
      goal: "Identify the essential legal documents in due diligence.",
      lessonID: "due_diligence_simulator",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      type: "TEST",
      goalType: "EDUCATE",
      next: null,
      ifRight: "Correct answer!",
      ifWrong: "Review the legal documents carefully.",
      name: "What key legal documents should be reviewed during due diligence in an M&A transaction?",
      instructorName: "Instructor",
      image: "",
      check: "IDEA",
      userId: "instructor1",
      lessonId: "due_diligence_simulator",
      complexity: 1,
      quizResults: [],
    },
    {
      id: "due_quiz_4",
      question:
        "What other exit-related legal concerns might arise from the due diligence findings?",
      answer:
        "Contracts, licenses, litigation documents, and corporate records.",
      answers: JSON.stringify([
        "Contracts",
        "Licenses",
        "Litigation documents",
        "Corporate records",
      ]),
      isOrderOfAnswersImportant: false,
      shouldAnswerSizeMatchSample: false,
      isScoringShown: true,
      goal: "Identify the essential legal documents in due diligence.",
      lessonID: "due_diligence_simulator",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      type: "TEST",
      goalType: "EDUCATE",
      next: null,
      ifRight: "Correct answer!",
      ifWrong: "Review the legal documents carefully.",
      name: "What key legal documents should be reviewed during due diligence in an M&A transaction?",
      instructorName: "Instructor",
      image: "",
      check: "IDEA",
      userId: "instructor1",
      lessonId: "due_diligence_simulator",
      complexity: 1,
      quizResults: [],
    },
    {
      id: "due_quiz_5",
      question: "111",
      answer:
        "Contracts, licenses, litigation documents, and corporate records.",
      answers: JSON.stringify([
        "Contracts",
        "Licenses",
        "Litigation documents",
        "Corporate records",
      ]),
      isOrderOfAnswersImportant: false,
      shouldAnswerSizeMatchSample: false,
      isScoringShown: true,
      goal: "Identify the essential legal documents in due diligence.",
      lessonID: "due_diligence_simulator",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      type: "TEST",
      goalType: "EDUCATE",
      next: null,
      ifRight: "Correct answer!",
      ifWrong: "Review the legal documents carefully.",
      name: "Identify key parties of this transaction",
      instructorName: "Instructor",
      image: "",
      check: "IDEA",
      userId: "instructor1",
      lessonId: "due_diligence_simulator",
      complexity: 1,
      quizResults: [],
    },
    {
      id: "due_quiz_6",
      question: "222",
      answer:
        "Contracts, licenses, litigation documents, and corporate records.",
      answers: JSON.stringify([
        "Contracts",
        "Licenses",
        "Litigation documents",
        "Corporate records",
      ]),
      isOrderOfAnswersImportant: false,
      shouldAnswerSizeMatchSample: false,
      isScoringShown: true,
      goal: "Identify the essential legal documents in due diligence.",
      lessonID: "due_diligence_simulator",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      type: "TEST",
      goalType: "EDUCATE",
      next: null,
      ifRight: "Correct answer!",
      ifWrong: "Review the legal documents carefully.",
      name: "What key legal instruments are used to protect the interests of the buyer?",
      instructorName: "Instructor",
      image: "",
      check: "IDEA",
      userId: "instructor1",
      lessonId: "due_diligence_simulator",
      complexity: 1,
      quizResults: [],
    },
  ],
  quizResults: [],
  shots: [],
  shotResults: [],
  teamQuests: [],
  teamQuestResults: [],
  test: [],
  testPractices: [],
  testPracticeResults: [],
  testResults: [],
  // -------------------- TextEditors --------------------
  texteditors: [
    {
      id: "due_texteditor_1",
      name: "Preparing for Transaction Completion: Reviewing existing legal documents in the transaction and addressing common issues.",
      text: `<p>During the due diligence process, you should identify potential legal issues. Consider the following:</p>
<span className="editor_error" elementId="due_quiz_5">What legal documents are critical?</span>
<p>Furthermore, think about regulatory concerns:</p>
<span className="editor_error" elementId="due_quiz_6">How can compliance risks affect the transaction?</span>
`,
      lessonId: "due_diligence_simulator",
      userId: "instructor1",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      complexity: 1,
      textEditorResults: [],
    },
  ],
  textEditorResults: [],
  chatResults: [],
  comments: [],
  processManagers: [],
};

const SimulatorInsights = (props) => {
  const {
    // lesson,

    selectedStudents,
  } = props;

  const [quizResults, setQuizResults] = useState([]);
  const [testResults, setTestResults] = useState([]);
  const [constructionResults, setConstructionResults] = useState([]);
  // const [testPracticeResults, setTestPracticeResults] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  // GraphQL queries for fetching results
  const [getQuizData, { loading }] = useLazyQuery(QUIZZES_RESULTS_QUERY, {
    variables: { lessonId: props.lesson.id },
  });
  const [getTestData, { loadingTest }] = useLazyQuery(TEST_RESULTS_QUERY, {
    variables: { lessonId: props.lesson.id },
  });
  const [getConstructionData, { loadingConstruction }] = useLazyQuery(
    CONSTRUCTION_RESULTS_QUERY,
    {
      variables: { lessonId: props.lesson.id },
    }
  );
  const [getTestPracticeData] = useLazyQuery(TESTPRACTICE_RESULTS_QUERY, {
    variables: { lessonId: props.lesson.id },
  });

  useEffect(() => {
    // Fetch quiz and test data on component load
    const fetchData = async () => {
      const res = await getQuizData();
      const res2 = await getTestData();
      const res3 = await getConstructionData();
      // const res4 = await getTestPracticeData();
      setQuizResults(res.data.quizResults);
      setTestResults(res2.data.testResults);
      setConstructionResults(res3.data.constructionResults);
      // setTestPracticeResults(res4.data.testPracticeResults);
    };

    fetchData();
  }, [getQuizData, getTestData, getConstructionData, getTestPracticeData]);

  // Helper functions

  const getUniqueQuizResults = (results) => {
    const map = new Map();

    results.forEach((item) => {
      const studentId = item.student.id;
      const currentHighest = map.get(studentId);

      // Compare the current item's result with the stored result, and keep the one with the highest value
      if (
        !currentHighest ||
        parseFloat(item.result) > parseFloat(currentHighest.result)
      ) {
        map.set(studentId, item);
      }
    });

    // Convert the map values back to an array
    return Array.from(map.values());
  };

  const getUniqueTestResults = (results) => {
    let newResults = [];
    results.forEach((item) => {
      let found = newResults.find((r) => r.student.id === item.student.id);
      if (!found) {
        newResults.push(item);
      }
    });
    // Convert the map values back to an array
    return newResults;
  };

  const extractQuizAndProblemIds = (html) => {
    // Arrays to store the quiz and problem IDs
    const quizIds = [];
    const problemIds = [];

    // Regular expression to find problem elements and their IDs
    const problemRegex =
      /<span className="editor_problem"[^>]*elementId="([^"]+)"/g;
    const quizRegex = /<span className="editor_error"[^>]*elementId="([^"]+)"/g;

    // Extract problem IDs
    let match;
    while ((match = problemRegex.exec(html)) !== null) {
      problemIds.push(match[1]);
    }

    // Extract quiz IDs
    while ((match = quizRegex.exec(html)) !== null) {
      quizIds.push(match[1]);
    }

    return {
      quizIds,
      problemIds,
    };
  };

  const groupConstructionResultsByStudentId = (constructionResults) => {
    const groupedResults = {};

    constructionResults.forEach((item) => {
      if (item.student && item.student.id) {
        const studentId = item.student.id;

        // Initialize the array if it doesn't exist yet
        if (!groupedResults[studentId]) {
          groupedResults[studentId] = [];
        }

        // Add the current item to the array for this studentId
        groupedResults[studentId].push(item);
      }
    });

    // Return an array of arrays
    return Object.values(groupedResults);
  };

  const groupQuizResultsByStudent = (quizResults) => {
    // Step 1: Initialize an object to store grouped results
    const groupedResults = {};

    // Step 2: Iterate through the quizResults array
    quizResults.forEach((result) => {
      const studentId = result.student.id;

      // Initialize student group if it doesn't exist
      if (!groupedResults[studentId]) {
        groupedResults[studentId] = [];
      }

      // Add the result to the appropriate student group
      groupedResults[studentId].push(result);
    });

    // Step 3: Convert groupedResults object to an array of objects
    return Object.keys(groupedResults).map((studentId) => {
      return {
        studentId,
        results: groupedResults[studentId],
      };
    });
  };

  const calculateStudentScores = (studentsResults) => {
    // Step 1: Initialize variables
    let minAttempts = 0;
    let maxAttempts = 0;

    // Step 2: Calculate min and max attempts
    studentsResults.forEach((item) => {
      const numAttempts = item.results.length;

      if (minAttempts === 0 || numAttempts < minAttempts) {
        minAttempts = numAttempts;
      }

      if (numAttempts > maxAttempts) {
        maxAttempts = numAttempts;
      }
    });

    // Step 3: Calculate scores
    const scores = studentsResults.map((singleStudentResult) => {
      const studentId = singleStudentResult.studentId;
      let score;
      if (
        singleStudentResult.results.filter(
          (r) =>
            (r.result && r.correct) ||
            r.ideasList?.quizIdeas?.filter(
              (idea) => parseFloat(idea.result) > 58
            ).length > 0
        ).length > 0
      ) {
        score = parseInt(
          (
            1 -
            (singleStudentResult.results.length - minAttempts) /
              (maxAttempts - minAttempts)
          ).toFixed(0)
        );
      } else {
        score = 0;
      }

      return {
        studentId,
        score: score, // Ensure score is between 0 and 100
      };
    });
    return scores;
  };

  const calculateStudentAttemptsAndScores = (constructionResults) => {
    const groupedResults =
      groupConstructionResultsByStudentId(constructionResults);

    // Calculate attempts for each student
    const attemptsByStudent = groupedResults.map((studentResults) => {
      const studentId = studentResults[0].student.id;
      const attempts = studentResults.length;

      return {
        studentId,
        attempts,
        latestAttempt: studentResults[0],
      };
    });

    // Find min and max attempts
    const minAttempts = Math.min(
      ...attemptsByStudent.map((res) => res.attempts)
    );
    const maxAttempts = Math.max(
      ...attemptsByStudent.map((res) => res.attempts)
    );

    // Calculate scores
    const attemptsAndScores = attemptsByStudent.map((result) => {
      let score = 100; // Default to 100 if min and max attempts are the same
      if (minAttempts !== maxAttempts) {
        score =
          (1 - (result.attempts - minAttempts) / (maxAttempts - minAttempts)) *
          100;
      }

      return {
        ...result,
        score: Math.round(score), // Round the score to the nearest whole number
      };
    });

    return attemptsAndScores;
  };

  const calculateAverageScore = (attemptsAndScores) => {
    const totalScore = attemptsAndScores.reduce(
      (sum, student) => sum + student.score,
      0
    );
    const numberOfStudents = attemptsAndScores.length;
    const averageScore = totalScore / numberOfStudents;

    return averageScore;
  };

  const arraysHaveSameItem = (arr1, arr2) => {
    // First, check if both arrays are of the same length
    if (arr1.length !== arr2.length) {
      return false;
    }

    // Sort both arrays
    const sortedArr1 = arr1.slice().sort();
    const sortedArr2 = arr2.slice().sort();

    // Check if every item in the first array is the same as the corresponding item in the second array
    for (let i = 0; i < sortedArr1.length; i++) {
      if (sortedArr1[i] !== sortedArr2[i]) {
        return false;
      }
    }

    return true;
  };

  const filterByTruthiness = (arr1, arr2) => {
    return arr1.filter((item, index) => arr2[index]);
  };

  let isDataBeingLoaded = loading || loadingTest || loadingConstruction;

  // Instructions:
  // 1. The simulator should find the questions that caused most problems for students.
  // 2. The simulator should find the questions that caused least problems for students.
  return (
    <Styles>
      <h2>Simulator Insights</h2>
      <HeatMap>
        {
          // lesson.structure.lessonItems
          lesson.structure.lessonItems.map((task, index) => {
            let type = task.type.toLowerCase();
            let coreElement;
            let elementName;
            let innerElements;
            if (type === "problem") {
              coreElement = lesson.problems.find((p) => p.id === task.id);
              console.log("coreElement", coreElement);
              innerElements = lesson.problems.find((p) => p.id === task.id)
                ?.steps?.problemItems;
              console.log("innerElements", innerElements);

              elementName = "Case Study";
            } else if (type === "chat") {
              coreElement = lesson.chats.find((ch) => ch.id === task.id);
              innerElements = [];
              elementName = "Chat";
            } else if (type === "testpractice") {
              coreElement = lesson.testPractices.find(
                (tp) => tp.id === task.id
              );
              innerElements = [
                {
                  type: "testpractice",
                  id: coreElement.id,
                },
              ];
              elementName = "Mastery Challenge";
            } else if (type === "note") {
              coreElement = lesson.notes.find((n) => n.id === task.id);
              innerElements = [];
              elementName = "Longread";
            } else if (type === "quiz") {
              coreElement = lesson.quizes.find((n) => n.id === task.id);
              innerElements = [
                {
                  type: "quiz",
                  id: coreElement.id,
                },
              ];
              elementName = "Open Question";
            } else if (type === "texteditor") {
              coreElement = lesson.texteditors.find((t) => t.id === task.id);
              let foundProblems = lesson.problems.filter((p) =>
                extractQuizAndProblemIds(coreElement?.text).problemIds.includes(
                  p.id
                )
              );
              let foundQuizes = lesson.quizes.filter((q) =>
                extractQuizAndProblemIds(coreElement?.text).quizIds.includes(
                  q.id
                )
              );

              innerElements = [];
              foundQuizes.forEach((q) => {
                innerElements.push({
                  type: "quiz",
                  id: q.id,
                });
              });

              foundProblems.forEach((p) => {
                innerElements.push(...p.steps?.problemItems);
              });

              elementName = "Doc Editor";
            } else if (type === "forum") {
              coreElement = lesson.forum;
              innerElements = [];
              elementName = "Forum";
            } else if (type === "construction") {
              coreElement = lesson.constructions.find((c) => c.id === task.id);
              innerElements = [
                {
                  type: "construction",
                  id: coreElement?.id,
                },
              ];
              elementName = "Doc Builder";
            } else {
              innerElements = [];
              coreElement = undefined;
              elementName = "";
            }
            return (
              <div key={index} className="section">
                <TopSectionElement key={index}>
                  <b>{elementName}:</b> {coreElement ? coreElement.name : ""}
                </TopSectionElement>
                {isDataBeingLoaded && <Loading />}
                {console.log("innerElements", innerElements)}
                {innerElements &&
                  innerElements.length > 0 &&
                  !isDataBeingLoaded &&
                  innerElements.map((element, index) => {
                    let elementData;
                    let ratio;
                    let taskResult = null;
                    let type;
                    let correctnessRatio = 0;
                    let data;

                    if (element.type.toLowerCase() === "quiz") {
                      elementData = lesson.quizes.find(
                        (q) => q.id === element.id
                      );
                      type = "Open Question";
                      // 1. Calculate the ratio of correct answers to total answers
                      // 1.1 Calculate the total number of quizzes where an answer has been provided
                      let allQuizResults = getUniqueQuizResults(
                        quizResults.filter(
                          (item) =>
                            item.quiz.id === elementData.id &&
                            (selectedStudents && selectedStudents.length > 0
                              ? selectedStudents.includes(item.student.id)
                              : true) &&
                            (item.result ||
                              item.ideasList?.quizIdeas?.length > 0) &&
                            item.student?.id !== "cjqy9i57l000k0821rj0oo8l4" &&
                            item.student?.id !== lesson.user.id
                        )
                      ).length;

                      // 1.2 Calculate the total number of quizzes where the answer was correct / partially correct
                      let allCorrectQuizResults = getUniqueQuizResults(
                        quizResults.filter(
                          (item) =>
                            item.quiz.id === elementData.id &&
                            (selectedStudents && selectedStudents.length > 0
                              ? selectedStudents.includes(item.student.id)
                              : true) &&
                            ((item.result && item.correct) ||
                              item.ideasList?.quizIdeas?.filter(
                                (idea) => parseFloat(idea.result) > 58
                              ).length > 0) &&
                            item.student.id !== "cjqy9i57l000k0821rj0oo8l4" &&
                            item.student.id !== lesson.user.id
                        )
                      ).length;
                      // 1.3 Calculate the ratio of correct answers to total answers
                      correctnessRatio = allCorrectQuizResults / allQuizResults;
                      data = `${allCorrectQuizResults} / ${allQuizResults}`;
                      // 1.4 Set coefficient for the ratio
                      let correctRatioCoefficient = 0.8;

                      // 2. Calculate the attempts ratio
                      // 2.1 Group the quiz results by student
                      let quizResultGroupedByStudent =
                        groupQuizResultsByStudent(
                          quizResults.filter(
                            (qr) =>
                              qr.quiz.id === elementData.id &&
                              qr.student.id !== "cjqy9i57l000k0821rj0oo8l4" &&
                              qr.student.id !== lesson.user.id
                          )
                        );

                      // 2.2 Calculate the average score for each student based on the groups max and min values
                      let studentsScoreDerivedFromNumberOfAttempts =
                        calculateStudentScores(quizResultGroupedByStudent);

                      // 2.3 Calculate the average score for the group
                      let averageAttemptsScoreForTheGroup =
                        calculateAverageScore(
                          studentsScoreDerivedFromNumberOfAttempts
                        );

                      // 2.4 Set the attempts ratio coefficient
                      let attemptsRatioCoefficient = 0.2;

                      // 3. Calculate the final ratio

                      // ratio = (
                      //   (averageAttemptsScoreForTheGroup *
                      //     attemptsRatioCoefficient +
                      //     correctnessRatio * correctRatioCoefficient) *
                      //   100
                      // ).toFixed(0);
                      ratio = (correctnessRatio * 100).toFixed(0);
                    } else if (element.type.toLowerCase() === "chat") {
                      type = "Chat";
                      elementData = lesson.chats.find(
                        (c) => c.id === element.id
                      );
                    } else if (element.type.toLowerCase() === "note") {
                      type = "Longread";
                      elementData = lesson.notes.find(
                        (c) => c.id === element.id
                      );
                    } else if (element.type.toLowerCase() === "newtest") {
                      type = "Quiz";
                      elementData = lesson.newTests.find(
                        (nt) => nt.id === element.id
                      );
                      let allTestResults = getUniqueTestResults(
                        testResults.filter(
                          (tr) => tr.test.id === elementData.id
                        )
                      );
                      let allCorrectTestResults = getUniqueTestResults(
                        testResults.filter(
                          (tr) =>
                            tr.test.id === elementData.id &&
                            arraysHaveSameItem(
                              tr.answerArray,
                              filterByTruthiness(
                                elementData.answers,
                                elementData.correct
                              )
                            )
                        )
                      );

                      ratio = (
                        (allCorrectTestResults.length / allTestResults.length) *
                        100
                      ).toFixed(0);
                    } else if (element.type.toLowerCase() === "construction") {
                      type = "Doc Builder";
                      elementData = lesson.constructions.find(
                        (nt) => nt.id === element.id
                      );

                      ratio = calculateAverageScore(
                        calculateStudentAttemptsAndScores(constructionResults)
                      ).toFixed(0);
                    } else if (element.type.toLowerCase() === "testpractice") {
                      type = "Mastery Challenge";
                      elementData = lesson.testPractices.find(
                        (nt) => nt.id === element.id
                      );

                      let cleanTestPracticeResults = [];
                      // testPracticeResults.filter(
                      //   (tpr) =>
                      //     tpr.testPractice.id === elementData.id &&
                      //     tpr.student.id !== lesson.user.id &&
                      //     tpr.student.id !== "cjqy9i57l000k0821rj0oo8l4"
                      // );

                      // const totalCorrect = cleanTestPracticeResults.reduce(
                      //   (sum, result) => sum + result.correct,
                      //   0
                      // );

                      const totalCorrect = [];

                      const averageCorrect =
                        totalCorrect / cleanTestPracticeResults.length;

                      taskResult = `${averageCorrect.toFixed(1)} / ${
                        cleanTestPracticeResults[0]?.tasks.length
                      }`;

                      // ratio = calculateAverageScore(
                      //   calculateStudentAttemptsAndScores(constructionResults)
                      // ).toFixed(0);
                    }
                    ratio = Math.floor(Math.random() * (90 - 40 + 1)) + 40;
                    if (element.type.toLowerCase() === "chat") {
                      ratio = 88;
                    }

                    return (
                      <SectionElement
                        key={index}
                        className="sectionElement"
                        ratio={ratio}
                        sectionType={
                          elementData?.type == "BRANCH" ? "branch" : type
                        }
                        onClick={(e) => {
                          if (elementData.__typename === "Quiz") {
                            setModalOpen(true);
                            setActiveItem(elementData);
                          }
                        }}
                      >
                        <>
                          <b>{type}: </b>
                          {elementData && elementData.name
                            ? elementData.name
                            : "No name"}
                          <div>
                            {taskResult && (
                              <span>
                                <b>Avg result: </b>
                                {taskResult}
                              </span>
                            )}
                          </div>
                          <div className="circle">
                            <span
                              data-tooltip-id="analytics-tooltip"
                              data-tooltip-html={`<p>This is a task complexity indicator.</p> <p>The higher the number, the easier it is for students to complete this task.</p>`}
                              data-tooltip-place="right"
                            >
                              {ratio}%
                            </span>
                          </div>
                        </>
                      </SectionElement>
                    );
                  })}
              </div>
            );
          })
        }
      </HeatMap>
      <Tooltip id="analytics-tooltip" />
      <StyledModal
        isOpen={modalOpen}
        onBackgroundClick={() => setModalOpen(false)}
        onEscapeKeydown={() => setModalOpen(false)}
      >
        <SimulatorInsightsBlock
          item={activeItem}
          quizResults={
            activeItem
              ? quizResults.filter((qr) => qr.quiz.id == activeItem.id)
              : []
          }
        />
      </StyledModal>
    </Styles>
  );
};

export default SimulatorInsights;

const StyledModal = Modal.styled`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: 1px solid grey;
  border-radius: 10px;
  min-width: 400px;
  max-width: 800px;
  padding: 20px;
      overflow-y: scroll;

  @media (max-width: 1300px) {
    max-width: 70%;
    min-width: 200px;
    margin: 10px;
    max-height: 100vh;
    overflow-y: scroll;
  }
  @media (max-width: 800px) {
    max-width: 90%;
    min-width: 200px;
    margin: 10px;
    max-height: 100vh;
    overflow-y: scroll;
  }
`;
