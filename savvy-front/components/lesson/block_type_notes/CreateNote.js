import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { SINGLE_LESSON_QUERY } from "../SingleLesson";
import { useTranslation } from "next-i18next";
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

const Editor = styled.div`
  margin-top: 1%;
`;

const DynamicLoadedEditor = dynamic(import("../../editor/Editor"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const CreateSingleNote = (props) => {
  const { lessonID, simulationStory } = props;

  const [name, setName] = useState("");
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
      name,
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
              const res = await generateNote(e);
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
