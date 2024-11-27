import { useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import styled from "styled-components";
import { TailSpin } from "react-loader-spinner";
import dynamic from "next/dynamic";
import { Title, ActionButton, Row, Frame } from "./styles/DevPageStyles";

const UPDATE_LESSON_MUTATION = gql`
  mutation UPDATE_LESSON_MUTATION($id: String!, $story: String) {
    updateLesson(id: $id, story: $story) {
      id
      story
    }
  }
`;

const DynamicHoverEditor = dynamic(import("../editor/HoverEditor"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const Styles = styled.div`
  width: 660px;
  border: 2px solid #f1f1f1;
  background: #ffffff;
  border-radius: 20px;
  margin: 40px 0;
  padding: 20px;
  h2 {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 20px;
  }
`;

const Progress2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  margin: 10px;
`;

let simulatorStructureExample = {
  lessonItems: [
    {
      id: undefined,
      type: "Chat",
      comment:
        "You're a junior privacy lawyer at a global tech company that's rapidly expanding into new markets. Your first major task is to get up to speed with GDPR compliance, a critical part of the company's global operations. Your mentor, a senior partner at the firm, explains that GDPR is not just about following rules—it's about creating trust with clients and users. The goal of this simulator is to help you understand how GDPR applies to real-world business scenarios, ensuring you can protect personal data and maintain compliance. Ready to start your journey?",
    },
    {
      id: undefined,
      type: "Note",
      comment:
        "The startup you’re working with collects vast amounts of personal data from users across the EU. In your first meeting with the company's management, they make it clear: they need to understand GDPR compliance inside and out to continue expanding internationally. You’re given access to internal materials and research, including a primer on the foundational principles of GDPR. In this longread, dive deep into the key principles like data minimisation, purpose limitation, and transparency. Understanding these principles is crucial for advising clients on practical GDPR applications and ensuring that their operations are aligned with the law.",
    },
    {
      id: undefined,
      type: "Problem",
      comment:
        "During your review of the startup’s data collection practices, you come across a request for consent to send marketing materials. Your manager asks you to assess whether this practice aligns with GDPR’s legal bases for data processing. Using a practical case involving a customer who wants to receive targeted marketing emails, you'll need to identify which of the six legal bases for processing personal data applies in this scenario. Understanding the legal bases is a cornerstone of GDPR compliance, and it's your job to ensure the company processes personal data lawfully.",
    },
    {
      id: undefined,
      type: "TextEditor",
      comment:
        "Your team has drafted a Data Protection Impact Assessment (DPIA) for a new project involving the processing of sensitive personal data. The DPIA is crucial for assessing the risks to individuals’ privacy rights and ensuring that the company’s processing activities are compliant. However, you notice some discrepancies in the draft. The risk assessment section is incomplete, and certain mitigation strategies are missing. This exercise tasks you with identifying and correcting these gaps, ensuring that the DPIA meets GDPR's requirement for thorough and proactive data protection measures. Think of this as a crucial part of your role in advising clients and mitigating potential data privacy risks.",
    },
    {
      id: undefined,
      type: "Shot",
      comment:
        "The startup client needs a well-crafted privacy notice that aligns with GDPR, but they're unsure of what needs to be included. You’re tasked with drafting the notice, ensuring that it clearly informs users about their data rights and the company’s data processing activities. This block will guide you through the process of crafting an effective privacy notice, taking you step-by-step through the necessary legal language, structure, and practical considerations. It's vital that you not only follow the legal requirements but also write in a way that is understandable to the average user.",
    },
    {
      id: undefined,
      type: "Problem",
      comment:
        "The company receives a data subject access request (DSAR) from an individual asking for access to their personal data. The clock is ticking, as the company has only one month to respond. This is a real-world scenario where time-sensitive action is critical. In this task, you need to draft an appropriate response, ensuring that the request is handled in compliance with GDPR’s data subject rights provisions. This exercise will help you gain practical experience in managing requests, including verifying the identity of the requester and identifying the relevant data sets to share.",
    },
    {
      id: undefined,
      type: "Construction",
      comment:
        "You’ve just received an urgent email from a potential client—an e-commerce platform that has experienced a data breach involving customer payment information. The client is concerned about the impact on their brand and legal liabilities. Your job is to provide clear, GDPR-compliant advice on how to proceed. In this block, you’ll draft an email outlining the steps the client needs to take to notify affected individuals and the relevant authorities. You’ll also need to explain how the company can prevent similar incidents in the future, reinforcing the importance of strong data protection measures.",
    },
    {
      id: undefined,
      type: "Chat",
      comment:
        "You’ve completed the GDPR compliance training simulator. Your manager gathers the team for a final reflection. How will you apply the knowledge you’ve gained about data protection principles, legal bases, and GDPR documentation in your upcoming cases? In this chat, you’ll reflect on key takeaways from the simulator and discuss how these lessons will shape your work moving forward. This final step is important to solidify your understanding and prepare you for real-world challenges.",
    },
  ],
};

let lessonStructureExample = {
  lessonItems: [
    [
      {
        id: undefined,
        type: "Chat",
        comment:
          "Introduce the goal of the lesson, explain why this topic is important, remind to ask questions at the end of the lesson. For example, explain how capital markets transactions play a crucial role in raising funds for businesses and governments, and highlight their importance in the global economy.",
      },
      {
        id: undefined,
        type: "Note",
        comment:
          "Provide key information on the topic in a short and concise manner. For instance, describe the types of capital market transactions, such as IPOs, secondary offerings, and bond issuances, and their respective roles in financial markets.",
      },
      {
        id: undefined,
        type: "Note",
        comment:
          "The second longread delves more into the topic of the lesson. For example, explain the process of conducting an IPO, including preparation, regulatory requirements, and pricing mechanisms.",
      },
      {
        id: undefined,
        type: "Chat",
        comment:
          "The chat sums up core ideas and answers the questions that the student might have after reading 2 longreads. For example, clarify the differences between primary and secondary markets or discuss the role of underwriters in capital markets transactions.",
      },
      {
        id: undefined,
        type: "Problem",
        comment:
          "The first problem helps the student remember the core ideas from the lesson. For example, 'Match the following types of capital market transactions to their definitions.'",
      },
      {
        id: undefined,
        type: "Problem",
        comment:
          "The second problem helps the student understand how to apply the knowledge in real life. For example, 'Evaluate the potential risks and benefits for a company considering an IPO versus a private equity round.'",
      },
      {
        id: undefined,
        type: "TextEditor",
        comment:
          "The text editor helps the student practice working with real documents: laws, contracts, etc. For example, 'Review and edit a draft underwriting agreement for a bond issuance, ensuring compliance with applicable regulations.'",
      },
      {
        id: undefined,
        type: "Chat",
        comment:
          "The time for a final reflection. For example, ask the student, 'How can the knowledge of capital markets transactions help you in your future legal practice or career in finance?'",
      },
    ],
  ],
};

let upgradedSimulatorStructureExample = {
  lessonItems: [
    {
      id: undefined,
      type: "Note",
      comment:
        "This longread expands the previous longread on GDPR principles, focusing on the practical implications of data protection principles in real-world scenarios. For example, explain how the principles of data minimisation and purpose limitation apply to specific data processing activities, such as targeted advertising or data analytics.",
    },
    {
      id: undefined,
      type: "Problem",
      comment:
        "This problem provides students another opportunity to apply their knowledge of GDPR legal bases in a new context. For example, 'Assess the legal basis for processing personal data in a scenario involving the use of biometric data for employee access control.'",
    },
    {
      id: "cm38qc2wt000qd1aa4d3zi0yr",
      type: "TextEditor",
      comment:
        "Current simulator structure missess a TextEditor block. This block provides students with a practical exercise in drafting GDPR-compliant documents, such as privacy policies or data processing agreements. For example, 'Draft a data processing agreement for a company outsourcing data processing activities to a third-party service provider.'",
    },
  ],
};

const GenerateLesson = (props) => {
  const { lesson } = props;
  const populateLessonStructure = (items) => {
    const updatedItems = items.map((item) => {
      let comment;
      if (item.type === "Chat") {
        comment = lesson.chats
          .find((chat) => chat.id === item.id)
          ?.messages.messagesList.map((message) => message.text)
          .join(" ");
      } else if (item.type === "Note") {
        comment = lesson.notes.find((note) => note.id === item.id)?.text;
      } else if (item.type === "Problem") {
        comment = lesson.problems.find(
          (problem) => problem.id === item.id
        ).text;
      } else if (item.type === "TextEditor") {
        comment = lesson.texteditors.find(
          (textEditor) => textEditor.id === item.id
        ).text;
      } else if (item.type === "Shot") {
        comment = "";
      } else if (item.type === "Construction") {
        comment = "";
      } else if (item.type === "Forum") {
        comment = lesson.forum.text;
      } else if (item.type === "Quiz") {
        comment = lesson.quizes.find((quiz) => quiz.id === item.id).question;
      } else if (item.type === "NewTest") {
        comment = lesson.newTests.find((newTest) => newTest.id === item.id)
          .question[0];
      }
      return {
        id: item.id,
        type: item.type,
        content: comment,
      };
    });
    console.log("updatedItems", updatedItems);
    return updatedItems;
  };
  const [source, setSource] = useState("");
  const [simulatorStory, setSimulatorStory] = useState(props.story || "");
  const [generating, setGenerating] = useState(false);
  const [blocks, setBlocks] = useState([]);
  const [simulatorType, setSimulatorType] = useState("Simulator");
  const [structure, setStructure] = useState();

  useEffect(() => {
    if (props.structure) {
      setStructure(populateLessonStructure(props.structure.lessonItems));
    }
  }, [props.structure]);

  const passData = (blocks) => {
    props.passData(blocks);
  };

  const [updateLesson, { loading }] = useMutation(UPDATE_LESSON_MUTATION);

  const myCallback = (dataFromChild) => {
    setSimulatorStory(dataFromChild);
  };

  const generateSimStory = async (e) => {
    let storyPrompt = `
      Create a realistic legal scenario for this simulator.
      ${source}
      Set the scene in a specific location with key stakeholders facing a time-sensitive situation. 
      Introduce the main characters, their roles, and their immediate legal challenge. 
      Include relevant background details about the business/property/situation.
      Present the scenario from the perspective of a lawyer who needs to provide advice. End with a clear indication of the task at hand.
      Provide prompts for generating realistic portrait images of the main characters.
      Return the result only with p, h2, and b tags.
    `;

    e.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: storyPrompt }),
      });
      const data = await response.json();
      console.log("data.result.content", data.result.content);
      setSimulatorStory(data.result.content);
      return data.result.content;
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const generateSimStructure = async (e, simStory) => {
    let structurePrompt = `
      Generate a JSON structure for an interactive simulator aimed at junior lawyers. 
      The simulator should follow a structured training loop and include the following elements:
      ${source}.

      Structure Requirements: JSON Formatting:
      - Provide lesson items in JSON format using proper key-value pairs and nested structures where appropriate.
      - Include the following attributes:
        - id: Equal to undefined.
        - type: Block type ('Chat', 'Longread', 'Shot', 'Problem', 'Editor', 'Construction', 'Forum').
        - comment: Brief description of the block's purpose.

      Training Loop Structure:

      Ensure the simulator includes the following sequence for optimal learning:

      1. Learning Phase (Explanatory Blocks):

      - Chat: Initiate discussions, introduce goals, and provide feedback on key concepts.
      - Longread: Deliver background knowledge, enhanced with multimedia support such as videos or infographics.
      - Shots: Guide students step-by-step through drafting documents or performing specific GDPR-related processes.

      2. Practice Phase (Practice Blocks):

      - Problem: Present real-world scenarios where students apply their knowledge to practical challenges.
      - TextEditor: Provide draft GDPR documents for students to review, analyse, and correct.
      - Construction: Assign document drafting tasks (e.g., drafting a privacy notice or compliance email).
    
      3. Reflection Phase (Reflection Blocks):

      Reflection blocks encourage students to think critically about what they have learned and how to apply it in real-world settings.

      – Forum: A space for students to ask questions and engage with their peers or instructors. 
      – Chat: Summarise key takeaways, ask students to reflect on their learning, and discuss how the knowledge can be applied in practice.
      – Problem: Pose reflective scenarios where students assess how their newfound knowledge can be implemented in a real legal context.

      Build the simulator, its theory and practice blocks around this story: ${simStory}.

      Sample Structure to Emulate: ${JSON.stringify(
        simulatorStructureExample,
        null,
        2
      )}

        Leverage this format to ensure clarity, engagement, and comprehensive learning outcomes. Ensure all descriptions are concise and written in British English.
    `;

    e.preventDefault();
    try {
      const response = await fetch("/api/generateJson", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: structurePrompt }),
      });
      const data = await response.json();
      const jsonData = JSON.parse(data.result.content);
      setBlocks(jsonData.lessonItems);
      console.log("jsonData", jsonData.lessonItems);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const generateLessonStructure = async (e, story) => {
    e.preventDefault();
    let structurePrompt = `
      Generate a JSON structure for an interactive lesson aimed at junior lawyers. 
      The lesson should follow a structured training loop and include the following elements:
      ${source} – the prompt.

      Training Loop Structure:

      Ensure the simulator includes the following sequence for optimal learning:

      1. Learning Phase (Explanatory Blocks):

      - Chat: Initiate discussions, introduce goals, and provide feedback on key concepts.
      - Longread: Deliver background knowledge, enhanced with multimedia support such as videos or infographics.
      - Shots: Guide students step-by-step through drafting documents or performing specific GDPR-related processes.

      2. Practice Phase (Practice Blocks):

      - Problem: Present real-world scenarios where students apply their knowledge to practical challenges.
      - TextEditor: Provide draft GDPR documents for students to review, analyse, and correct.
      - Construction: Assign document drafting tasks (e.g., drafting a privacy notice or compliance email).
    
      3. Reflection Phase (Reflection Blocks):

      Reflection blocks encourage students to think critically about what they have learned and how to apply it in real-world settings.

      – Forum: A space for students to ask questions and engage with their peers or instructors. 
      – Chat: Summarise key takeaways, ask students to reflect on their learning, and discuss how the knowledge can be applied in practice.
      – Problem: Pose reflective scenarios where students assess how their newfound knowledge can be implemented in a real legal context.

      Sample Structure to Emulate: ${JSON.stringify(
        lessonStructureExample,
        null,
        2
      )}

      Leverage this format to ensure clarity, engagement, and comprehensive learning outcomes. Ensure all comments are concise and written in Russian.

      Structure Requirements: JSON Formatting:
      - Provide lesson items in JSON format using proper key-value pairs and nested structures where appropriate.
      - Include the following attributes:
        - id: Equal to undefined.
        - type: Block type ('Chat', 'Longread', 'Shot', 'Problem', 'Editor', 'Construction', 'Forum').
        - comment: Brief description of the block's purpose.
    `;

    e.preventDefault();
    try {
      const response = await fetch("/api/generateJson", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: structurePrompt }),
      });
      const data = await response.json();
      const jsonData = JSON.parse(data.result.content);
      setBlocks(jsonData.lessonItems);
      console.log("jsonData", jsonData.lessonItems);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const generateUpdatedSimStructure = async (e, structure) => {
    e.preventDefault();
    console.log(0, structure);

    let structurePrompt = `
      Add new items to the JSON structure for an interactive simulator aimed at junior lawyers using these recommendations: ${source}.
      Current structure looks like that: ${JSON.stringify(structure, null, 2)}.
      Add comments to new items explaining their purpose and content.
      
      Training Loop Structure:

      Ensure the simulator includes the following sequence for optimal learning:

      1. Learning Phase (Explanatory Blocks):

      - Chat: Initiate discussions, introduce goals, and provide feedback on key concepts.
      - Longread: Deliver background knowledge, enhanced with multimedia support such as videos or infographics.
      - Shots: Guide students step-by-step through drafting documents or performing specific GDPR-related processes.

      2. Practice Phase (Practice Blocks):

      - Problem: Present real-world scenarios where students apply their knowledge to practical challenges.
      - TextEditor: Provide draft GDPR documents for students to review, analyse, and correct.
      - Construction: Assign document drafting tasks (e.g., drafting a privacy notice or compliance email).
    
      3. Reflection Phase (Reflection Blocks):
      Reflection blocks encourage students to think critically about what they have learned and how to apply it in real-world settings.

      – Forum: A space for students to ask questions and engage with their peers or instructors. 
      – Chat: Summarise key takeaways, ask students to reflect on their learning, and discuss how the knowledge can be applied in practice.
      – Problem: Pose reflective scenarios where students assess how their newfound knowledge can be implemented in a real legal context.

      Sample Structure to Emulate: ${JSON.stringify(
        upgradedSimulatorStructureExample,
        null,
        2
      )}

      Leverage this format to ensure clarity, engagement, and comprehensive learning outcomes. Ensure all descriptions are concise and written in British English.

      Return new elements in JSON format.
      Structure Requirements: JSON Formatting:
      - Provide lesson items in JSON format using proper key-value pairs and nested structures where appropriate.
      - Include the following attributes:
        - id: Equal to undefined.
        - type: Block type ('Chat', 'Longread', 'Shot', 'Problem', 'Editor', 'Construction', 'Forum').
        - comment: Brief description of the block's purpose.

    `;

    try {
      const response = await fetch("/api/generateJson", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: structurePrompt }),
      });
      const data = await response.json();
      const jsonData = JSON.parse(data.result.content);
      setBlocks([
        ...structure,
        ...jsonData.lessonItems.map((item) => {
          return {
            id: undefined,
            type: item.type,
            comment: item.comment,
          };
        }),
      ]);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <Styles>
      <Title>Generate Changes to Simulator</Title>
      <Row>
        <div className="description">Simulator type</div>
        <div className="action_area">
          <select onChange={(e) => setSimulatorType(e.target.value)}>
            <option value="Simulator">Simulator</option>
            <option value="Classic Lesson">Classic Lesson</option>
          </select>
        </div>
      </Row>
      {simulatorStory && (
        <Row>
          <div className="description">Simulator story</div>
          <div className="action_area">
            <Frame>
              <DynamicHoverEditor
                name="story"
                getEditorText={myCallback}
                value={simulatorStory}
              />
            </Frame>
          </div>
        </Row>
      )}
      <Row>
        <div className="description">Simulator prompt</div>
        <div className="action_area">
          <textarea onChange={(e) => setSource(e.target.value)} />
        </div>
      </Row>
      {/* <div>Characters used: {source.length} / 2500</div> */}
      {generating && (
        <Progress2>
          <TailSpin width="50" color="#2E80EC" />
        </Progress2>
      )}
      <ActionButton
        onClick={async (e) => {
          setGenerating(true);
          const simStory = await generateSimStory(e);
          setSimulatorStory(simStory);
          setGenerating(false);
        }}
      >
        Generate Story
      </ActionButton>
      <ActionButton
        onClick={async (e) => {
          e.preventDefault();
          try {
            await updateLesson({
              variables: {
                id: props.lessonId,
                story: simulatorStory,
              },
            });
          } catch (error) {
            console.error(error);
          }
        }}
      >
        {loading ? "..." : "Save Story"}
      </ActionButton>
      <ActionButton
        onClick={async (e) => {
          setGenerating(true);
          if (simulatorType === "Simulator") {
            await generateSimStructure(e, simulatorStory);
          } else {
            await generateLessonStructure(e);
          }
          setGenerating(false);
        }}
      >
        Generate Sim Structure
      </ActionButton>
      {props.structure && (
        <ActionButton
          onClick={async (e) => {
            setGenerating(true);
            const res = await generateUpdatedSimStructure(e, structure);
            setGenerating(false);
          }}
        >
          Upgrade Sim Structure
        </ActionButton>
      )}
      <ActionButton onClick={(e) => passData(blocks, simulatorStory)}>
        Pass Blocks
      </ActionButton>
    </Styles>
  );
};

export default GenerateLesson;
