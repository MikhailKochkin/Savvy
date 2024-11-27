import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { SINGLE_LESSON_QUERY } from "../SingleLesson";
import { useTranslation } from "next-i18next";
import { Textarea, Buttons } from "../styles/GenerationBlockStyles";
import { Row, ActionButton } from "../styles/DevPageStyles";

const CREATE_NOTE_MUTATION = gql`
  mutation CREATE_NOTE_MUTATION(
    $text: String!
    $name: String
    $lessonId: String!
  ) {
    createNote(text: $text, name: $name, lessonId: $lessonId) {
      id
      link_clicks
      complexity
      isSecret
      text
      name
      next
      user {
        id
      }
    }
  }
`;

const Container = styled.div`
  width: 95%;
  margin: 3% 0;
  .image {
  }
  @media (max-width: 850px) {
    width: 85%;
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
  &:hover {
    background: #2e3b83;
    border: 2px solid #2e3b83;
  }
`;

const Title = styled.div`
  font-size: 2.2rem;
  font-weight: 600;
`;

const Editor = styled.div`
  margin-top: 1%;
`;

const NameInput = styled.input`
  width: 100%;
  height: 40px;
  font-weight: 500;
  font-size: 2rem;
  font-family: Montserrat;
  margin-bottom: 20px;
  border: none;
  outline: none;
`;

const DynamicLoadedEditor = dynamic(import("../../editor/Editor"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

function validateAndCorrectHtmlString(htmlString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");

  const VALID_TAGS = {
    blockquote: "quote",
    div: ["flag", "align-right", "align-center"],
    h2: "header",
    p: "paragraph",
    ol: "numbered-list",
    ul: "bulleted-list",
    li: "list-item",
    img: "image",
    iframe: "video",
    a: "link",
    table: "table",
    tbody: "table-body",
    tr: "table-row",
    thead: "table-head",
    th: "table-header",
    td: "table-cell",
  };

  function escapeHtml(input) {
    return input
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function validateElement(element) {
    const tagName = element.tagName.toLowerCase();
    const className = element.className;

    if (!VALID_TAGS[tagName]) {
      console.warn(`Unexpected tag: ${tagName}.`);
      return;
    }

    switch (tagName) {
      case "blockquote":
        if (className !== "quote") {
          console.warn(`Expected "quote" for blockquote.`);
        }
        break;

      case "div":
        if (
          !["flag", "align-right", "align-center"].some((cls) =>
            className.includes(cls)
          )
        ) {
          console.warn(
            `Unexpected div class: ${className}. Expected one of "flag", "align-right", or "align-center".`
          );
        }
        break;

      case "ol":
        if (!["1", "a", "A", "i", "I"].includes(element.getAttribute("type"))) {
          element.setAttribute("type", "1");
          console.warn(
            `ol type is invalid or missing. Defaulting to type="1".`
          );
        }
        break;

      case "img":
        if (!element.hasAttribute("src")) {
          console.warn(`img tag missing "src" attribute.`);
        } else {
          element.setAttribute("src", escapeHtml(element.getAttribute("src")));
        }
        break;

      case "iframe":
        if (!element.hasAttribute("src")) {
          console.warn(`iframe tag missing "src" attribute.`);
        } else {
          element.setAttribute("src", escapeHtml(element.getAttribute("src")));
        }
        break;

      case "a":
        if (!element.hasAttribute("href")) {
          console.warn(`a tag missing "href" attribute.`);
        } else {
          element.setAttribute(
            "href",
            escapeHtml(element.getAttribute("href"))
          );
        }
        element.setAttribute("target", "_blank");
        break;

      // Default check for table and list elements
      default:
        break;
    }
  }

  // Traverse and validate each element
  doc.body.querySelectorAll("*").forEach(validateElement);

  return doc.body.innerHTML;
}

const CreateSingleNote = (props) => {
  const { lessonID, simulationStory } = props;

  const [name, setName] = useState();
  const [text, setText] = useState("");
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const { t } = useTranslation("lesson");

  const myCallback = (dataFromChild) => {
    setText(dataFromChild);
  };

  const [createNote, { loading, error }] = useMutation(CREATE_NOTE_MUTATION, {
    variables: {
      lessonId: lessonID,
      text,
    },
    refetchQueries: [
      {
        query: SINGLE_LESSON_QUERY,
        variables: { id: lessonID },
      },
    ],
    awaitRefetchQueries: true,
  });

  const generateNote = async (e) => {
    e.preventDefault();

    let chatPrompt = `
        You are building a block of a simulator that has the following story: """${simulationStory}"""
        This block type is longread. Longread is a long document that is a collection of different types of media: text, tables, graphs, videos, etc.
              
        The topic and purpose of this longread block are: """${prompt}""".

        Generate and return in JSON format a new longread using the information from the above.
        Each node type in Lingrrad follows specific rendering rules to generate the correct HTML structure. Below is a guide on how each node type is processed:

        quote: Converts to a blockquote.
        Example: <blockquote>{children}</blockquote>

        flag: Make a part of the text stand out.
        Example: <div className="flag">{children}</div>

        header: Converts to a second-level header.
        Example: <h2>{children}</h2>

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

        The result must be returned in one line like this:
              
        {
          text: "<h2><p>Uncountable nouns</p></h2><p>Some nouns in English are uncountable.</p><div className="flag"><p>They are not used with articles &quot;a&quot; or &quot;an&quot; and do not have plural forms.</p></div><p>For example, the word *information*, as in the phrase <em>"I need some information."</em></p><p>If you want to refer to a particular number of uncountable nouns, especially one, you can join the noun to a word that is itself countable or use a countable synonym instead.</p><p>Here are some examples:</p><table><thead><tr><th>Uncountable noun</th><th>One uncountable noun</th></tr></thead><tbody><tr><td><span style="font-weight:normal;" id="docs-internal-guid-aaf19450-7fff-42d6-e0a9-d9462bbcac55"><span>litigation</span></td><td><span style="font-weight:normal;" id="docs-internal-guid-55f8e637-7fff-6f21-7e35-902921a5b743"><span>a litigation matter / a case / a claim</span></td></tr><tr><td><span>equipment</span></td><td><span>a piece of equipment</span></td></tr><tr><td><span>software</span></td><td><span>a piece of software / an application / a program</span></td></tr><tr><td><span>legislation</span></td><td><span>a law</span></td></tr><tr><td><span>real estate</span></td><td><span>a property</span></td></tr><tr><td><span>training</span></td><td><span>a training course</span></td></tr></tbody></table>"
        }
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
        let new_longread = JSON.parse(data.result.content);
        console.log(new_longread);
        setText(new_longread.text);
        //  setMessages(new_messages.content.messagesList);
        // setSimulatorStory(data.result.content);
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
    <Container>
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
              const res = await generateChat(e);
              setGenerating(false);
            }}
          >
            {!generating ? "Generate with AI" : "..."}
          </ActionButton>
        </div>
      </Row>
      {generating && <div>Generating the chat...</div>}
      {!generating && (
        <>
          <Editor>
            <DynamicLoadedEditor
              value={text}
              getEditorText={myCallback}
              simple={true}
            />
          </Editor>
          <ActionButton
            onClick={async (e) => {
              e.preventDefault();
              const res = await createNote();
              props.getResult(res);
            }}
          >
            {loading ? t("saving") : t("save")}
          </ActionButton>
        </>
      )}
    </Container>
  );
};

export default CreateSingleNote;
