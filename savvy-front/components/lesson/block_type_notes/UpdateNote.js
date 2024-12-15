import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { SINGLE_LESSON_QUERY } from "../SingleLesson";
import { useTranslation } from "next-i18next";
import { Textarea } from "../styles/GenerationBlockStyles";
import {
  Row,
  ActionButton,
  SecondaryButton,
  MicroButton,
} from "../styles/DevPageStyles";
import parse from "html-react-parser";

const UPDATE_NOTE_MUTATION = gql`
  mutation UPDATE_NOTE_MUTATION(
    $id: String!
    $text: String
    $name: String
    $complexity: Int
    $isSecret: Boolean
    $type: String
    $horizontal_image: String
    $vertical_image: String
  ) {
    updateNote(
      id: $id
      text: $text
      name: $name
      complexity: $complexity
      isSecret: $isSecret
      type: $type
      horizontal_image: $horizontal_image
      vertical_image: $vertical_image
    ) {
      id
      text
      name
      next
      type
      complexity
      isSecret
      horizontal_image
      vertical_image
    }
  }
`;

const Container = styled.div`
  width: 600px;
  margin: 1% 0 0 0;
  margin: 5% 0;
  display: flex;
  flex-direction: column;
  .switch_button {
    width: 100px;
    margin-bottom: 10px;
  }
  h4 {
    padding: 0% 5%;
  }
  p > a {
    font-weight: 700;
  }
  p > a:hover {
    text-decoration: underline;
  }
  select {
    margin-bottom: 20px;
    width: 250px;
  }

  @media (max-width: 600px) {
    width: 100%;
  }

  input {
  }
`;

const BreakRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin: 15px 0;
  .description {
    width: 25%;
    min-height: 40px;
    line-height: 1.4;
    font-weight: 600;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .recommended_type {
    margin-top: 15px;
  }
  .action_area {
    width: 75%;
    .element_info {
      font-size: 1.4rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      margin-bottom: 10px;
      p {
        margin: 0;
        margin-bottom: 5px;
      }
    }
    .explainer {
      font-size: 1.2rem;
      color: #b0b0b0;
      margin-top: 5px;
    }
  }
`;

const DynamicLoadedEditor = dynamic(import("../../editor/Editor"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const UpdateNote = (props) => {
  const { id, lessonID } = props;
  const { t } = useTranslation("lesson");

  const [text, setText] = useState(props.text);
  const [name, setName] = useState(props.name);
  const [openEditor, setOpenEditor] = useState(false);
  const [openHTML, setOpenHTML] = useState(false);
  const [isSecret, setIsSecret] = useState(props.isSecret);
  const [type, setType] = useState(props.type ? props.type : "longread");
  const [complexity, setComplexity] = useState(
    props.complexity ? props.complexity : 0
  );
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [breakBlocks, setBreakBlocks] = useState([]);
  const [horizontalImage, setHorizontalImage] = useState(
    props.horizontal_image ? props.horizontal_image : ""
  );
  const [verticalImage, setVerticalImage] = useState(
    props.vertical_image ? props.vertical_image : ""
  );
  const [horizontalImageUploading, setHorizontalImageUploading] =
    useState(false);
  const [verticalImageUploading, setVerticalImageUploading] = useState(false);

  const [updateNote, { loading, error }] = useMutation(UPDATE_NOTE_MUTATION, {
    refetchQueries: [
      {
        query: SINGLE_LESSON_QUERY,
        variables: { id: lessonID },
      },
    ],
  });

  const getText = (d) => setText(d);

  const element_types = {
    elements: [
      {
        name: "Introduction to Bonds",
        data: "Bonds are debt securities issued by governments or corporations to raise capital. They are a form of borrowing, where the issuer promises to pay back the principal amount plus interest to the bondholder at a specified date in the future. Bonds are considered a safer investment compared to stocks, as they offer fixed returns and are less volatile. They are commonly used by governments to finance public projects and by corporations to fund expansion or operations.",
        recommendedType: "Chat",
      },
      {
        name: "Types of Bonds",
        data: "There are several types of bonds, including government bonds, corporate bonds, municipal bonds, and convertible bonds. Government bonds are issued by national governments to finance public spending and are considered the safest type of bond. Corporate bonds are issued by companies to raise capital for various purposes, such as expansion or acquisitions. Municipal bonds are issued by local governments to fund infrastructure projects or public services. Convertible bonds allow bondholders to convert their bonds into company stock at a predetermined price.",
        recommendedType: "Note",
      },
    ],
  };
  // const block_types = {
  //   blocks: [
  //     {
  //       id: undefined,
  //       type: "Chat",
  //       content:
  //         "Explain how capital markets transactions play a crucial role in raising funds for businesses and governments, and highlight their importance in the global economy.",
  //       background: "",
  //     },
  //     {
  //       id: undefined,
  //       type: "Note",
  //       content:
  //         "Provide key information on the topic in a short and concise manner. For instance, describe the types of capital market transactions, such as IPOs, secondary offerings, and bond issuances, and their respective roles in financial markets.",
  //       background: "",
  //     },
  //     {
  //       id: undefined,
  //       type: "Shot",
  //       comment:
  //         "The startup client needs a well-crafted privacy notice that aligns with GDPR, but they're unsure of what needs to be included. You’re tasked with drafting the notice, ensuring that it clearly informs users about their data rights and the company’s data processing activities. This block will guide you through the process of crafting an effective privacy notice, taking you step-by-step through the necessary legal language, structure, and practical considerations. It's vital that you not only follow the legal requirements but also write in a way that is understandable to the average user.",
  //       background: "",
  //     },
  //   ],
  // };

  const HTMLRules = `
        Follow these rules when generating HTML:

        quote: Converts to a blockquote. Use it to mark definitions and quote people or sources.
        Example: <blockquote>{children}</blockquote>

        flag: Make a part of the text stand out. Use it in every longread to highlight the core idea.
        Example: <div className="flag">{children}</div>

        header: Converts to a second-level header or third-level header.
        Example: <h2>{children}</h2> or <h3>{children}</h3>

        paragraph: Converts to a paragraph.
        Example: <p>{children}</p>

        numbered-list: Generates an ordered list, with an optional type attribute.
        Example: <ol type="{listType || '1'}">{children}</ol>

        bulleted-list: Converts to an unordered list.
        Example: <ul>{children}</ul>

        list-item: Wraps content in a list item.
        Example: <li>{children}</li>

        right: Aligns content to the right.
        Example: <div className="align-right" style="text-align:right">{children}</div>

        center: Centers content.
        Example: <div className="align-center" style="text-align:center">{children}</div>

        image: Generates an image tag with an escaped source.
        Example: <img src="{src}" alt="caption_goes_here" />

        video: Embeds a video iframe.
        Example: <iframe src="{escaped_src}">{children}</iframe>

        link: Creates a hyperlink, opening in a new tab.
        Example: <a href="{escaped_url}" target="_blank">{children}</a>

        table: Wraps content in a table.
        Example: <table>{children}</table>

        table-body: Generates a tbody.
        Example: <tbody>{children}</tbody>

        table-row: Wraps content in a table row.
        Example: <tr>{children}</tr>

        table-head: Generates a thead.
        Example: <thead>{children}</thead>

        table-header: Converts to a table header cell.
        Example: <th>{children}</th>

        table-cell: Converts to a table data cell.
        Example: <td>{children}</td>
  `;

  const Example = `
        <h2><p>🔬 What are proteins?</p></h2><p>Today I would like to speak with you about proteins.</p><blockquote><p><em><b>Proteins</b></em><em> are large, complex molecules made up of amino acids that play crucial roles in the structure, function, and regulation of the body’s cells, tissues, and organs. They are essential for processes such as enzyme activity, cell signaling, immune responses, and muscle contraction.</em></p></blockquote><p>Every cell in the human body contains protein, and it is essential for growth, repair, and maintaining the body&#39;s overall health.</p><div className="flag"><p>Proteins are the building blocks of life. </p></div><h3><p>👨🏻‍🔬 Who Came Up with the Idea of Proteins?</p></h3><p>The concept of proteins was first introduced <b>by the Dutch chemist Gerardus Johannes Mulder in 1838.</b> He identified and named &quot;protein&quot; from the Greek word &quot;protos,&quot; meaning &quot;primary&quot; or &quot;of first importance,&quot; based on suggestions by Jöns Jakob Berzelius.</p><p>📋 Key Ideas about Proteins:</p><ul><li>Composed of chains of amino acids.</li><li>Perform a wide variety of functions in organisms (e.g., enzymes, hormones, structural components).</li><li>Essential for muscle repair and growth.</li><li>Can be obtained through diet from sources such as meat, dairy, beans, and nuts.</li><li>Have different levels of structure: primary, secondary, tertiary, and quaternary.</li><li>Denaturation (loss of structure) can occur due to changes in temperature, pH, or exposure to chemicals.</li><li>Vital for metabolic processes and immune defense.</li></ul>
  `;

  const updateNoteWithAI = async (e, rule) => {
    e.preventDefault();
    let chatPrompt = `
        You receive this data that is used to make a longread block: """${text}"""
        Use these instructions to update the data: """${prompt}"""
        Return the data in the following JSON format:
           result: {
                "content": {
                  text: "Your text here",}
              }
       """${HTMLRules}"""
        `;

    let typesettingPrompt = `
          You receive data used to create a longread block: """${text}""" 

          Rewrite the longread to match the structure of this one: """${Example}""" 

          Instructions:  
          - Use the same language as the original.  
          - Preserve all ideas and content—do not omit any parts.  
          - Focus on providing clear definitions, highlighting core ideas, and breaking the text into concise paragraphs.  
          - Add appropriate headers (h2 and h3) and use emojis to improve navigation.  

          Return the rewritten content in the following JSON format:  
          {
            "result": {
              "content": {
                "text": "Your text here"
              }
            }
          }
      `;

    try {
      const response = await fetch("/api/generateJson", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: rule == "typesetting" ? typesettingPrompt : chatPrompt,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        let updated_text = JSON.parse(data.result.content);
        setText(
          updated_text?.result?.content?.text
            ? updated_text.result.content.text
            : text
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

  const breakNoteWithAI = async (e, rule) => {
    e.preventDefault();
    let chatPrompt = `
    You receive this data that is used to make a longread block: """${text}"""
    Break this text into several key elements or topics. Maximum number of elements – 4.
    Return the data in the following JSON format: """${element_types}"""
    Every element should have:

      - data property with DIRECT quotes from the text. All text must be included as data in one of the elements. Return as HTML with ONLY <p> tags. Use the same language as the text.
      - name property with the title of the element which will help navigate through the elements. Use the same language as the text.
      - recommendedType property with the type of the element that this text should be turned into. Choose one of 3 types:

      1.  Chat: Explain complex problems or concepts in a conversational style. (most recommended type)
      2.  Note: Deliver background knowledge, enhanced with multimedia support such as videos or infographics.
      3.  Shots: Guide students step-by-step through drafting documents or performing specific processes.
    `;

    //  let chatPrompt = `
    // You receive this data that is used to make a longread block: """${text}"""
    // Break this longread block into several blocks of the following types:

    // - Chat: Explain complex problems or concepts in a conversational style.
    // - Longread: Deliver background knowledge, enhanced with multimedia support such as videos or infographics.
    // - Shots: Guide students step-by-step through drafting documents or performing specific processes.

    // Return the data in the following JSON format: """${block_types}"""
    // `;

    try {
      const response = await fetch("/api/generateJson", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: chatPrompt,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        let ideas = JSON.parse(data.result.content);
        setBreakBlocks(ideas.elements);
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

  const handleUpdateNote = async (e) => {
    e.preventDefault();
    console.log({
      id,
      text,
      complexity,
      isSecret,
      type,
      name,
      horizontal_image: horizontalImage,
      vertical_image: verticalImage,
    });
    try {
      const res = await updateNote({
        variables: {
          id,
          text,
          complexity,
          isSecret,
          type,
          name,
          horizontal_image: horizontalImage,
          vertical_image: verticalImage,
        },
      });
      props.getResult(res);
      props.switchUpdate();
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const uploadHorizontalImage = async (e) => {
    setHorizontalImageUploading(true);
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
    setHorizontalImage(file.secure_url);
    setHorizontalImageUploading(false);
  };

  const uploadVerticalImage = async (e) => {
    setVerticalImageUploading(true);
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
    setVerticalImage(file.secure_url);
    setVerticalImageUploading(false);
  };

  return (
    <Container>
      <Row>
        <div className="description">Id</div>
        <div className="action_area">
          <div className="element_info">{props.id}</div>
        </div>
      </Row>
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
        <div className="description">{t("type")}</div>
        <div className="action_area">
          <select defaultValue={type} onChange={(e) => setType(e.target.value)}>
            <option value={"longread"}>Choose type</option>
            <option value={"longread"}>Longread</option>
            <option value={"email"}>Email</option>
            <option value={"mininote"}>Mini Note</option>
            <option value={"library"}>Library</option>
            <option value={"picture"}>Picture</option>
          </select>
        </div>
      </Row>
      {type == "picture" && (
        <>
          <Row>
            <div className="description">Horizontal Image</div>
            <div className="action_area">
              <input
                onChange={(e) => setHorizontalImage(e.target.value)}
                defaultValue={horizontalImage}
                placeholder=""
              />
              <input
                type="file"
                onChange={(e) => uploadHorizontalImage(e)}
                style={{ display: "none" }}
                id="horizontalImageUpload"
              />
              <label htmlFor="horizontalImageUpload">
                <MicroButton as="span">
                  {horizontalImageUploading ? "Uploading..." : "Upload"}
                </MicroButton>
              </label>
            </div>
          </Row>
          <Row>
            <div className="description">Vertical Image</div>
            <div className="action_area">
              <input
                onChange={(e) => setVerticalImage(e.target.value)}
                defaultValue={verticalImage}
                placeholder=""
              />
              <input
                type="file"
                onChange={(e) => uploadVerticalImage(e)}
                style={{ display: "none" }}
                id="verticalImageUpload"
              />
              <label htmlFor="verticalImageUpload">
                <MicroButton as="span">
                  {verticalImageUploading ? "Uploading..." : "Upload"}
                </MicroButton>
              </label>
            </div>
          </Row>
        </>
      )}
      <Row>
        <div className="description">Prompt</div>
        <div className="action_area">
          <textarea onChange={(e) => setPrompt(e.target.value)} />
          <ActionButton
            onClick={async (e) => {
              setGenerating(true);
              const res = await updateNoteWithAI(e, "regular");
              setGenerating(false);
            }}
          >
            {!generating ? "Update with AI" : "..."}
          </ActionButton>
          <ActionButton
            onClick={async (e) => {
              setGenerating(true);
              const res = await updateNoteWithAI(e, "typesetting");
              setGenerating(false);
            }}
          >
            {!generating ? "Improve Typesetting" : "..."}
          </ActionButton>
          <ActionButton
            onClick={async (e) => {
              setGenerating(true);
              const res = await breakNoteWithAI(e);
              setGenerating(false);
            }}
          >
            {!generating ? "Break apart" : "..."}
          </ActionButton>
        </div>
      </Row>
      {breakBlocks.length > 0 &&
        breakBlocks.map((block, index) => (
          <BreakRow key={index}>
            <div className="description">
              <div>{block.name}</div>
              <div className="recommended_type">{block.recommendedType}</div>
            </div>
            <div className="action_area">
              <div className="element_info">{parse(block.data)}</div>
              <SecondaryButton
                onClick={(e) =>
                  props.passGeneratedData({
                    name: block.name,
                    text: block.data,
                    type: block.recommendedType,
                  })
                }
              >
                Pass
              </SecondaryButton>
            </div>
          </BreakRow>
        ))}
      <Row>
        <SecondaryButton onClick={(e) => setOpenEditor(!openEditor)}>
          {openEditor ? "Close Editor" : "Open Editor"}
        </SecondaryButton>
        <SecondaryButton onClick={(e) => setOpenHTML(!openHTML)}>
          {openHTML ? "Close HTML" : "Open HTML"}
        </SecondaryButton>
      </Row>
      {!generating && openEditor && (
        <DynamicLoadedEditor getEditorText={getText} value={text} />
      )}
      {!generating && openHTML && (
        <Textarea onChange={(e) => setText(e.target.value)}>{text}</Textarea>
      )}

      <Row>
        <ActionButton
          onClick={async (e) => {
            e.preventDefault();
            setGenerating(true);
            const res = await handleUpdateNote(e);
            setGenerating(false);
          }}
        >
          {loading ? t("saving") : t("save")}
        </ActionButton>
      </Row>

      {error && <p>Error: {error.message}</p>}
    </Container>
  );
};

export default UpdateNote;
