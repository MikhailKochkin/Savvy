import React, { useState } from "react";
import { Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";

import { Message } from "../styles/Button";
import { SINGLE_LESSON_QUERY } from "../lesson/SingleLesson";

import {
  BiCommentAdd,
  BiCommentError,
  BiCommentCheck,
  BiCommentMinus,
} from "react-icons/bi";

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

const Label = styled.label`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 40%;
  margin-bottom: 1%;
  @media (max-width: 800px) {
    width: 70%;
  }
  input {
    width: 60px;
    border: 1px solid #ccc;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    border-radius: 3.5px;
    padding: 1%;
    font-size: 1.4rem;
    margin: 4% 2%;
    text-align: center;
    @media (max-width: 800px) {
    }
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

const DynamicLoadedEditor = dynamic(import("../editor/Editor"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const CreateTextEditor = (props) => {
  const [name, setName] = useState("Editor");
  const [text, setText] = useState("");

  const [totalMistakes, setTotalMistakes] = useState(1);
  const { t } = useTranslation("lesson");

  const myCallback = (dataFromChild) => {
    setText(dataFromChild);
  };

  const placeholder = `<h2><div className="align-center" style="text-align:center"><p>Доверенность</p></div></h2><div className="align-right" style="text-align:right"><p>21 июня 2022</p><p>г. Москва</p></div><p><b>ООО АККИО</b> , юридическое лицо, созданное и осуществляющее свою деятельность в соответствии с законодательством Российской Федерации, зарегистрированное за основным государственным регистрационным номером (ОГРН)  ...</p>`;

  const { lessonID } = props;
  return (
    <Width>
      <Title>Редактор</Title>
      <Explainer>
        <p>
          Задача редактора – воссоздать опыт работы над реальным документом
          вместе с наставником. Для этого мы создали разные инструменты. Сейчас
          покажем, как они работают:
        </p>
        <p>
          <BiCommentAdd className="icon" value={{ className: "react-icons" }} />
          Позволит вам добавить{" "}
          <span id="green">скрытый комментарий в текст</span>. Предложите
          студенту найти пункт в документе, который нужно разобрать. При нажатии
          на правильный пункт студент увидит ваш комментарий.
        </p>
        <p>
          <BiCommentError
            className="icon"
            value={{ className: "react-icons" }}
          />
          Позволит вам добавить <span id="red">ошибку в текст</span> и
          исправленный вариант. Предложите студенту найти пункт в документе, в
          котором содержится ошибка. При нажатии на правильный пункт студент
          получит возможность отредактировать текст, автоматически проверить
          свой ответ и увидеть ваш вариант.
        </p>
        <p>
          <BiCommentCheck
            className="icon"
            value={{ className: "react-icons" }}
          />
          Позволит вам <span id="orange">задать вопрос</span> к определенному
          фрагменту текста. Задайте вопрос, ответ, а также комментарии на случай
          правильного и неправильного ответов.
        </p>
      </Explainer>

      <DynamicLoadedEditor
        getEditorText={myCallback}
        complex={true}
        value={placeholder}
      />

      <Mutation
        mutation={CREATE_TEXTEDITOR_MUTATION}
        variables={{
          lessonId: lessonID,
          totalMistakes: parseInt(totalMistakes),
          text: text,
          name: name,
        }}
        refetchQueries={() => [
          {
            query: SINGLE_LESSON_QUERY,
            variables: { id: lessonID },
          },
        ]}
        awaitRefetchQueries={true}
      >
        {(createTextEditor, { loading, error }) => (
          <ButtonTwo
            onClick={async (e) => {
              e.preventDefault();
              // document.getElementById("Message").style.display = "block";
              const res = await createTextEditor();
              props.getResult(res);
            }}
          >
            {loading ? t("saving") : t("save")}
          </ButtonTwo>
        )}
      </Mutation>
      {/* <Message id="Message">Вы создали новый редактор!</Message> */}
    </Width>
  );
};

export default CreateTextEditor;
