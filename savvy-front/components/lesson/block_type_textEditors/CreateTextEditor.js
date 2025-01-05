import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { BiCommentAdd, BiCommentError, BiCommentCheck } from "react-icons/bi";

import { SINGLE_LESSON_QUERY } from "../SingleLesson";
import { Row, ActionButton, SettingsBlock } from "../styles/DevPageStyles";

const CREATE_TEXTEDITOR_MUTATION = gql`
  mutation CREATE_TEXTEDITOR_MUTATION(
    $name: String!
    $text: String!
    $totalMistakes: Int
    $lessonId: String!
  ) {
    createTextEditor(
      name: $name
      text: $text
      totalMistakes: $totalMistakes
      lessonId: $lessonId
    ) {
      id
      name
      complexity
      text
      totalMistakes
      user {
        id
      }
    }
  }
`;

const Width = styled.div`
  width: 650px;
  margin-bottom: 3%;
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
  max-width: 180px;
  &:hover {
    background: #2e3b83;
    border: 2px solid #2e3b83;
  }
`;

const Title = styled.p`
  font-size: 2.2rem;
  font-weight: 600;
  margin-top: 2%;
`;

const Explainer = styled.div`
  .icon {
    width: 30px;
    height: 20px;
  }
  #green {
    color: #81b29a;
  }
  #red {
    color: #e07a5f;
  }
  #orange {
    color: #f2cc8f;
  }
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

let document_sample_result = {
  document_text: `<p><em>Look through this document, find any errors or typos, and answer the questions from Eric.</em></p><p><em>After you find all the errors, press the "Show Mistakes" button to check yourself.</em></p><p>For the sake of the demo, <u><b>we highlighted errors with emoji.</b></u></p><p>Company No 1234567</p><div className="align-center" style="text-align: center"><h2><p><b>PropCo Premier Estates Ltd</b></p></h2></div><div className="align-center" style="text-align: center"><p><b>(Company)</b></p></div><p>Minutes of a meeting of the board of directors of the Company held at 3/4 Diagon Alley, London on [1 December 2023] at [11 am].</p><p><b>PRESENT: </b>Ms. Bianca Benedict (Chair)</p><p><b>IN ATTENDANCE: </b>Mr. James Hillton</p><p>Ms. Carole Smith</p><p><b>1. Quorum</b></p><p>1.1. The Chair reported that notice of the meeting had been given to all those persons entitled to receive notice and, a quorum being present, the Chair declared the meeting open.</p><p><b>2. Purpose</b></p><p>2.1. The Chair reported that the meeting had been kicked off due to some chat topics arising from the proposed offer for subscription of ordinary shares of £10 each in the capital of the Company (Offer), comprising 500 new ordinary shares to be issued by the Company (Subscription Shares).</p><p>2.2. The Chair reminded the directors of the need to consider their general duties as directors of the Company, including those contained in the Companies Act 1985 (Act), in considering the matters to be dealt with at the meeting.</p><p>6. Close</p><p>There being no further business, they wrapped this meeting up.</p><div className="align-right" style="text-align: right"><p>......................................</p><p>Chair</p></div><p></p>`,
  embedded_data: [
    {
      comment:
        "A more formal and appropriate to the style of the document alternative could be: convened to address specific matters.",
      type: "comment",
      document_source:
        "The Chair reported that the meeting had been kicked off due to some chat topics",
    },
    {
      comment:
        "Question: Should it be first checked that the number of new ordinary shares not exceed the authorized share capital of the Company? Answer yes or no. Why? Answer: No, the Company was incorporated in 2013, i.e. after the concept of the authorized share capital being abolished.However, the charter may include provision on the maximum amount of shares that can be allotted.",
      type: "error",
      document_source:
        "comprising 500 new ordinary shares to be issued by the Company (Subscription Shares).",
    },
    {
      comment:
        "This wording includes an error. The latest edition of Companies Act was in 2006. Make changes accordingly.",
      type: "error",
      document_source: "in the Companies Act 1985 (Act)",
    },
  ],
};

const DynamicLoadedEditor = dynamic(import("../../editor/Editor"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const CreateTextEditor = (props) => {
  const { lessonID, simulationStory } = props;

  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [generatedEmbeddedData, setGeneratedEmbeddedData] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);

  const [totalMistakes, setTotalMistakes] = useState(1);
  const { t } = useTranslation("lesson");
  const router = useRouter();

  const myCallback = (dataFromChild) => {
    setText(dataFromChild);
  };

  // const rus_placeholder = `<h2><div className="align-center" style="text-align:center"><p>Доверенность</p></div></h2><div className="align-right" style="text-align:right"><p>21 июня 2022</p><p>г. Москва</p></div><p><b>ООО АККИО</b> , <span className="editor_error" type="error" id="id" error_text="юридическое" error_data="юридическое">физическое</span> лицо, созданное и осуществляющее свою деятельность в соответствии с законодательством Российской Федерации, зарегистрированное за основным государственным регистрационным номером (<span className="editor_note" type="note" text="ОГРН — государственный регистрационный номер записи о создании юридического лица либо записи о первом представлении в соответствии с федеральным законом Российской Федерации «О государственной регистрации юридических лиц» сведений о юридическом лице, зарегистрированном до введения в действие указанного Закона.">ОГРН</span>)  ...</p>`;
  // const eng_placeholder = `<h2><div className="align-center" style="text-align:center"><p>POWER OF ATTORNEY AUTHORIZATION LETTER</p></div></h2><div className="align-right" style="text-align:right"><p>Jennifer B. Campfield</p><p>3160 Ingram Road</p></div><p>...</p>`;

  const [createTextEditor, { loading, error }] = useMutation(
    CREATE_TEXTEDITOR_MUTATION,
    {
      refetchQueries: [
        {
          query: SINGLE_LESSON_QUERY,
          variables: { id: lessonID },
        },
      ],
      awaitRefetchQueries: true,
    }
  );

  const generateTextEditor = async (e) => {
    e.preventDefault();
    let chatPrompt = `
        You are building a block of a simulator that has the following story: """${simulationStory}"""
        This block type is a Document Editor Block, it provides an extract from a legal document that includes:
        1. Comments to the most important/complicated clauses of a document.
        2. Errors in the document that the student needs to fix.
        You receive this data that os the foundation of this block: """${prompt}"""
        Draft the Document Editor Block  based on the simualtor story and the data provided that will consist of 2 parts: 
        1. The text of the document styled as documents with styles, headers, paragraphs, and lists.
        2. A list of comments and errors that need to be added to the document.
        
        Return the result in a JSON that looks like this: 
        
        Example 1. """${JSON.stringify(document_sample_result, null, 2)}"""

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
        let new_case_editor = JSON.parse(data.result.content);
        setText(new_case_editor.document_text);
        setGeneratedEmbeddedData(new_case_editor.embedded_data);
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
    <Width>
      <Title>{t("TextEditor")}</Title>
      {/* <Explainer>
        {router.locale == "ru" ? (
          <>
            <p>
              Задача редактора – воссоздать опыт работы над реальным документом
              вместе с наставником. Для этого мы создали разные инструменты.
              Сейчас покажем, как они работают:
            </p>
            <p>
              <BiCommentAdd
                className="icon"
                value={{ className: "react-icons" }}
              />
              Позволит вам добавить{" "}
              <span id="green">скрытый комментарий в текст</span>. Предложите
              студенту найти пункт в документе, который нужно разобрать. При
              нажатии на правильный пункт студент увидит ваш комментарий.
            </p>
            <p>
              <BiCommentError
                className="icon"
                value={{ className: "react-icons" }}
              />
              Позволит вам добавить <span id="red">ошибку в текст</span> и
              исправленный вариант. Предложите студенту найти пункт в документе,
              в котором содержится ошибка. При нажатии на правильный пункт
              студент получит возможность отредактировать текст, автоматически
              проверить свой ответ и увидеть ваш вариант.
            </p>
            <p>
              <BiCommentCheck
                className="icon"
                value={{ className: "react-icons" }}
              />
              Позволит вам <span id="orange">задать вопрос</span> к
              определенному фрагменту текста. Задайте вопрос, ответ, а также
              комментарии на случай правильного и неправильного ответов.
            </p>
            <p>
              Если вы захотите внести правки, просто нажмите на текст,
              выделенный цветом, и появится окно для редактирования.
            </p>
          </>
        ) : (
          <>
            <p>
              The task of the Doc Editor is to recreate the experience of
              working on a real document together with a mentor. To do this, we
              have created different tools. We will now show you how they work:{" "}
            </p>
            <p>
              <BiCommentAdd
                className="icon"
                value={{ className: "react-icons" }}
              />
              Allows you to add{" "}
              <span id="green">a hidden comment to the text</span>. Ask the
              student to find a paragraph in the document concerning a
              particualr problem. When the student clicks on the correct
              paragraph they will see your comment.
            </p>
            <p>
              <BiCommentError
                className="icon"
                value={{ className: "react-icons" }}
              />
              Allows you to add <span id="red">an error to the text</span> and a
              corrected version. Ask the student to find the paragraph in the
              document that contains the error. When they click on the correct
              paragraph, the student will have the opportunity to edit the text,
              automatically check their answer and see your comment.
            </p>
            <p>
              <BiCommentCheck
                className="icon"
                value={{ className: "react-icons" }}
              />
              Allows you<span id="orange"> to ask a question</span> to a
              specific piece of text. Write a question, an answer, and comments
              for correct and incorrect answers.
            </p>
            <p>
              If you want to make edits, just click on the highlighted text and
              an edit box will appear.
            </p>
          </>
        )}
      </Explainer> */}
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
                const res = await generateTextEditor(e);
                setGenerating(false);
              }}
            >
              {!generating ? "Generate with AI" : "..."}
            </ActionButton>
          </div>
        </Row>
      </SettingsBlock>

      {generatedEmbeddedData && generatedEmbeddedData.length > 0 && (
        <div>
          <h3>Generated Embedded Data</h3>
          {generatedEmbeddedData.map((data, index) => {
            return (
              <div key={index}>
                <h4>{data.type}</h4>
                <p>{data.comment}</p>
                <p>
                  <i>{data.document_source}</i>
                </p>
              </div>
            );
          })}
        </div>
      )}
      {!generating ? (
        <DynamicLoadedEditor
          getEditorText={myCallback}
          complex={true}
          value={text}
          // value={router.locale == "ru" ? rus_placeholder : eng_placeholder}
          lessonId={lessonID}
        />
      ) : (
        "..."
      )}
      <ButtonTwo
        onClick={async (e) => {
          e.preventDefault();
          const res = await createTextEditor({
            variables: {
              lessonId: lessonID,
              totalMistakes: parseInt(totalMistakes),
              text: text,
              name: name,
            },
          });
          props.getResult(res);
        }}
      >
        {loading ? t("saving") : t("save")}
      </ButtonTwo>
      {error && <p>Error: {error.message}</p>}
    </Width>
  );
};

export default CreateTextEditor;
