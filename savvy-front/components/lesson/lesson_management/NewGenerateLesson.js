import { useState, useEffect } from "react";
import styled from "styled-components";
import { useMutation, gql } from "@apollo/client";
import { TailSpin } from "react-loader-spinner";
import dynamic from "next/dynamic";

import ChangePositions from "./ChangePositions";
import {
  Title,
  ActionButton,
  SecondaryButton,
  MicroButton,
  Row,
  Frame,
} from "./../styles/DevPageStyles";
import { autoResizeTextarea } from "../SimulatorDevelopmentFunctions";
import { SINGLE_LESSON_QUERY } from "../SingleLesson";

const DynamicHoverEditor = dynamic(import("../../editor/HoverEditor"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const UPDATE_LESSON_MUTATION = gql`
  mutation UPDATE_LESSON_MUTATION(
    $id: String!
    $story: String
    $structure: LessonStructureInput
    $characters: [CharacterInput]
  ) {
    updateLesson(
      id: $id
      story: $story
      structure: $structure
      characters: $characters
    ) {
      id
      story
      structure {
        lessonItems {
          id
          type
          comment
        }
      }
      characters {
        name
        description
        image
      }
    }
  }
`;

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

const Break = styled.div`
  margin-bottom: 30px;
`;

const SingleCharatcerStyles = styled.div`
  border-bottom: 2px solid #f1f1f1;
  padding-bottom: 20px;
  margin-bottom: 30px;
  .character_image_icon {
    width: 50px;
    height: 50px;
    border-radius: 50px;
  }
`;

let updatedStructureExample = {
  lessonItems: [
    {
      id: undefined,
      type: "",
      comment: "",
    },
    {
      id: undefined,
      type: "",
      comment: "",
    },
  ],
};

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

const GenerateLesson = (props) => {
  const { lesson, elements } = props; //   const updatedItems = items.map((item) => {
  const [source, setSource] = useState("");
  const [updatePrompt, setUpdatePrompt] = useState(""); // the background story for this simulator
  const [generating, setGenerating] = useState(false); // loading indicator
  const [blocks, setBlocks] = useState(elements || []); //

  // Story Info
  const [storyPrompt, setStoryPrompt] = useState();
  const [isStoryBeingGenerated, setIsStoryBeingGenerated] = useState(false);
  const [backgroundStory, setBackgroundStory] = useState(props.story || "");
  const [conflict, setConflict] = useState(null);
  const [language, setLanguage] = useState("English");
  const [country, setCountry] = useState("");

  //characters

  const [characters, setCharacters] = useState(
    props.characters || [
      {
        name: "",
        description: "",
        image: "",
      },
    ]
  );

  const [updateLesson, { data, loading }] = useMutation(
    UPDATE_LESSON_MUTATION,
    {
      refetchQueries: [
        { query: SINGLE_LESSON_QUERY, variables: { id: props.lesson.id } }, // DocumentNode object parsed with gql
        "SINGLE_LESSON_QUERY", // Query name
      ],
    }
  );

  // 1. DEVELOP THE SIMULATOR STORY

  // 1.1 GENERATE THE BACKGROUND STORY
  // 1.2 GENERATE THE CHARACTERS
  // 1.3 GENERATE THE CONFLICT

  const generateBackgroundStory = async (e) => {
    e.preventDefault();

    const backgroundStoryPrompt = `
      Create a background story for a training simulator with the following parameters:

      Intro information about the simulator: """${storyPrompt}"""

      Story Format:
        – Language:  ${language}
        – Length: 3 paragraphs maximum
        – Setting:  ${country}
        – Cultural Context: Include relevant local customs, social norms, regulations, and laws
    
      Required Story Elements:
        – 3 challenegs or conflicts that can be later used to develop training elements
        – Key stakeholders/characters
        – Setting description (time, place, environment)
        – Realistic constraints based on local customs, social norms, regulations, and laws
        – The story must avoid any links to simualtor creationa dn should generate new stories, unrelated to simualtors
        – The story must be written in a plain and concise way
    
      Return the result in the following JSON format:
        { background_story: "<p>Story</p>" }

      Example:
        <p>Sarah Chen, a senior associate at Morton & Price LLP in London's Canary Wharf, receives an urgent call at 9 AM. 
        Her client, TechFusion Ltd., a British technology company valued at £70 million, has just signed a preliminary agreement to 
        merge with their German competitor. Under UK Competition and Markets Authority (CMA) regulations, they have only five working days to 
        determine if the merger requires mandatory notification under the Enterprise Act 2002.</p>
        <p>The situation is complicated by TechFusion's recent acquisition of a small AI startup, which altered their market share calculations. 
        Sarah must navigate both the UK merger control thresholds and the National Security and Investment Act 2021, while considering 
        the implications of post-Brexit regulatory requirements. She needs to coordinate with German counsel and manage her client's expectations 
        about timing and costs.</p>
        <p>Working against the clock, Sarah must:
        <li>gather detailed market share data,</li> 
        <li>assess the merger's impact on UK competition, and</li>
        <li>prepare preliminary documentation.</li> 
        Her decisions will determine whether the merger requires CMA notification, 
        NSI mandatory notification, or can proceed without regulatory review. Any miscalculation could result 
        in significant fines, void transactions, or criminal penalties under UK law.</p>
      `;

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: backgroundStoryPrompt,
      }),
    });

    if (response.status !== 200) {
      throw (
        (await response.json()).error ||
        new Error(`Request failed with status ${response.status}`)
      );
    }
    const data = await response.json();

    const jsonData = JSON.parse(data.result.content);

    return jsonData.background_story;
  };

  const generateCharacters = async (e, backgroundStory) => {};
  const generateConflict = async (e, backgroundStory, characters) => {};
  const generateSimulatorStructure = async (e, simulatorStory) => {};

  const generateSimulatorStory = async (e, storyPrompt) => {
    e.preventDefault();
    const backgroundStory = await generateBackgroundStory(e, storyPrompt);
    setBackgroundStory(backgroundStory);
    // const characters = await generateCharacters(e, backgroundStory);
    // setCharacters(characters);
    // const conflict = await generateConflict(e, backgroundStory, characters);
    // setConflict(conflict);
    // const structure = await generateSimulatorStructure(e);
    // setBlocks(structure);
  };

  const generateSimStructure = async (e, simStory) => {
    let structurePrompt = `
      Generate a JSON structure for an interactive simulator aimed at junior lawyers. 
      The story behind the simulator is: ${simulatorStory}.
      The simulator should follow a structured training loop and include the following instructions and elements:
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

        Leverage this format to ensure clarity, engagement, and comprehensive learning outcomes. 
        
        Ensure all descriptions are concise and written in RUSSIAN.


      Structure Requirements: JSON Formatting:
      - RETURN COMMENTS IN RUSSIAN!!!
      - Provide lesson items in JSON format using proper key-value pairs and nested structures where appropriate.
      - Include the following attributes:
        - id: Equal to undefined.
        - type: Block type ('Chat', 'Longread', 'Shot', 'Problem', 'Editor', 'Construction', 'Forum').
        - comment: Brief description of the block's purpose in RUSSIAN.
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
      const cleanedData = jsonData.lessonItems.map((item, index) => {
        return {
          id: `temp_${index}`,
          type: item.type,
          comment: item.comment,
        };
      });
      setBlocks(cleanedData);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const generateUpdatedSimStructure = async (e, structure) => {
    e.preventDefault();

    let structurePrompt = `
      You are updating the structure of the interactive simulator.
        The story behind the simulator is: ${simulatorStory}.
      Current structure looks like this: """${JSON.stringify(
        blocks,
        null,
        2
      )}""".
      Update this structure according to these rules: """${updatePrompt}""".

      These block types are available in simulator development:

       1. Learning Blocks:

      - Chat: Initiate discussions, introduce goals, and provide feedback on key concepts.
      - Longread: Deliver background knowledge, enhanced with multimedia support such as videos or infographics.
      - Shots: Guide students step-by-step through drafting documents or performing specific GDPR-related processes.

      2. Practice Blocks:

      - Problem: Present real-world scenarios where students apply their knowledge to practical challenges.
      - TextEditor: Provide draft documents for students to review, analyse, and correct.
      - Construction: Assign document drafting tasks (e.g., drafting a privacy notice or compliance email).
    
      Return the updated structure in JSON format. 
      Use these formatting rules:
      - Provide  items in JSON format using proper key-value pairs and nested structures where appropriate.
      - Include the following attributes:
        - id: Equal to undefined.
        - type: Block type ('Chat', 'Longread', 'Shot', 'Problem', 'Editor', 'Construction', 'Forum').
        - comment: Brief description of the block's purpose.

      Sample Structure to Emulate: ${JSON.stringify(
        updatedStructureExample,
        null,
        2
      )}
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

      const cleanedData = jsonData.lessonItems.map((item, index) => {
        return {
          id: `temp_${index}`,
          type: item.type,
          comment: item.comment,
        };
      });

      setBlocks(cleanedData);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  // OTHER FUNCTIONS
  const passData = (blocks) => {
    props.passData(blocks);
  };

  const handleItemsUpdate = (newItems) => {
    props.onItemsUpdate(newItems);
  };

  const passNewBlockInfo = (newItems) => {
    setBlocks(newItems);
  };

  const myCallback = (dataFromChild) => {
    setStoryPrompt(dataFromChild);
  };

  const myCallback2 = (dataFromChild) => {
    setBackgroundStory(dataFromChild);
  };

  // Add a new character
  const addCharacter = () => {
    const newCharacter = {
      name: "",
      description: "",
      image: "",
    };
    setCharacters([...characters, newCharacter]);
  };

  const updateCharacters = (character, index) => {
    const updatedCharacters = [...characters];
    updatedCharacters[index] = character;
    setCharacters(updatedCharacters);
  };

  const removeCharacter = (index) => {
    const updatedCharacters = [...characters];
    updatedCharacters.splice(index, 1);
    setCharacters(updatedCharacters);
  };

  return (
    <Styles>
      <Title>Simulator Structure</Title>
      <Row>
        <div className="description">Story Prompt</div>
        <div className="action_area">
          <textarea
            value={storyPrompt}
            onChange={(e) => {
              setStoryPrompt(e.target.value);
              autoResizeTextarea(e);
            }}
            onInput={autoResizeTextarea}
          />
        </div>
      </Row>
      <Row>
        <div className="description">Language</div>
        <div className="action_area">
          <select
            onChange={(e) => {
              setLanguage(e.target.value);
            }}
          >
            <option value="English">English</option>
            <option value="Russian">Russian</option>
          </select>
        </div>
      </Row>
      <Row>
        <div className="description">Country</div>
        <div className="action_area">
          <input
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
            }}
          />
        </div>
      </Row>
      {isStoryBeingGenerated && (
        <Progress2>
          <TailSpin width="50" color="#2E80EC" />
        </Progress2>
      )}
      {!isStoryBeingGenerated && (
        <Row>
          <div className="description">Background Story</div>
          <div className="action_area">
            <Frame>
              <DynamicHoverEditor
                name="story"
                getEditorText={myCallback2}
                value={backgroundStory}
              />
            </Frame>
          </div>
        </Row>
      )}

      <ActionButton
        onClick={async (e) => {
          setIsStoryBeingGenerated(true);
          await generateSimulatorStory(e, blocks);
          setIsStoryBeingGenerated(false);
        }}
      >
        Generate Story
      </ActionButton>
      <ActionButton
        onClick={async (e) => {
          setIsStoryBeingGenerated(true);

          const res = await updateLesson({
            variables: {
              id: props.lessonId,
              story: backgroundStory,
            },
          });
          setIsStoryBeingGenerated(false);
        }}
      >
        Save Story
      </ActionButton>
      <ActionButton onClick={async (e) => {}}>Summarize</ActionButton>
      <Break />
      <Title>Characters</Title>
      {[...characters].map((ch, index) => (
        <CharacterData
          character={ch}
          index={index}
          key={`${index}_character_index`}
          updateCharacters={updateCharacters}
          removeCharacter={removeCharacter}
        />
      ))}
      <SecondaryButton onClick={addCharacter}>Add Character</SecondaryButton>
      <ActionButton
        onClick={async (e) => {
          await updateLesson({
            variables: {
              id: props.lessonId,
              characters: characters.map(
                ({ __typename, ...character }) => character
              ),
            },
          });
        }}
      >
        Save Characters
      </ActionButton>

      <Break />

      <Row>
        <div className="description">Simulator prompt</div>
        <div className="action_area">
          <textarea
            onChange={(e) => {
              setSource(e.target.value);
              autoResizeTextarea(e);
            }}
            onInput={autoResizeTextarea}
          />
        </div>
      </Row>
      <Row>
        <div className="description">Update prompt</div>
        <div className="action_area">
          <textarea onChange={(e) => setUpdatePrompt(e.target.value)} />
        </div>
      </Row>
      {generating && (
        <Progress2>
          <TailSpin width="50" color="#2E80EC" />
        </Progress2>
      )}
      <ActionButton
        onClick={async (e) => {
          setGenerating(true);
          await generateSimStructure(e);
          setGenerating(false);
        }}
      >
        Generate Sim Structure
      </ActionButton>
      <ActionButton
        onClick={async (e) => {
          setGenerating(true);
          await generateUpdatedSimStructure(e, blocks);
          setGenerating(false);
        }}
      >
        Update Sim Structure
      </ActionButton>
      <ActionButton
        onClick={async (e) => {
          setGenerating(true);
          await updateLesson({
            variables: {
              id: props.lessonId,
              // story: simulatorStory,
              structure: {
                lessonItems: blocks,
              },
            },
          });
          setGenerating(false);
        }}
      >
        Save Lesson Structure
      </ActionButton>

      <ActionButton onClick={(e) => passData(blocks, simulatorStory)}>
        Pass Blocks
      </ActionButton>
      {!generating && (
        <ChangePositions
          initialItems={blocks}
          onItemsUpdate={handleItemsUpdate}
          lessonId={lesson.id}
          lesson={lesson}
          passNewBlockInfo={passNewBlockInfo}
        />
      )}
    </Styles>
  );
};

const CharacterData = ({
  character,
  index,
  updateCharacters,
  removeCharacter,
}) => {
  const [image, setImage] = useState("");
  const [imageUploading, setImageUploading] = useState(false);
  // Update an existing character's field
  const updateCharacter = (field, value) => {
    const updatedCharacter = { ...character }; // Clone the current character
    updatedCharacter[field] = value; // Update the specific field
    // Use the explicit index
    updateCharacters(updatedCharacter, index);
  };
  // Remove a character
  const deleteCharacter = (index) => {
    removeCharacter(index);
  };

  const uploadImage = async (e, characterIndex) => {
    setImageUploading(true);
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "savvy-app");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/mkpictureonlinebase/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    setImage(file.secure_url);

    // Pass the explicit characterIndex instead of relying on the closure
    updateCharacter("image", file.secure_url, characterIndex);
    setImageUploading(false);
  };

  return (
    <SingleCharatcerStyles>
      <Row>
        <div className="description">Name</div>
        <div className="action_area">
          <input
            name={`character_name_${index}`}
            onChange={(e) => updateCharacter("name", e.target.value)}
            value={character.name}
          />
          <MicroButton onClick={() => deleteCharacter(index)}>
            Remove Character
          </MicroButton>
        </div>
      </Row>
      <Row>
        <div className="description">Description</div>
        <div className="action_area">
          <input
            name={`character_desc_${index}`}
            onChange={(e) => updateCharacter("description", e.target.value)}
            value={character.description}
          />
        </div>
      </Row>
      <Row>
        <div className="description">
          <div>Image</div>
          <div>
            {character.image ? (
              <img className="character_image_icon" src={character.image} />
            ) : null}
          </div>
        </div>
        <div className="action_area">
          <input
            // onChange={(e) => setHorizontalImage(e.target.value)}
            value={character.image}
            placeholder=""
          />
          <input
            type="file"
            onChange={(e) => {
              uploadImage(e, index);
            }}
            style={{ display: "none" }}
            id={`characterImageUpload_${index}`}
          />
          <label htmlFor={`characterImageUpload_${index}`}>
            <MicroButton as="span">
              {imageUploading ? "Uploading..." : "Upload"}
            </MicroButton>
          </label>
        </div>
      </Row>
    </SingleCharatcerStyles>
  );
};

export default GenerateLesson;
