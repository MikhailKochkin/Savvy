import React, { useState } from "react";
import { useTranslation } from "next-i18next";
import parse from "html-react-parser";

import {
  IconBlock,
  Options,
  TextBar,
  Group,
  MiniButton,
  Question,
} from "../styles/testStyles";
import IconBlockElement from "../../styles/commonElements/IconBlockElement";
import AnswerOption from "../functions/AnswerOption";

const Branch = (props) => {
  const { t } = useTranslation("lesson");
  const {
    me,
    image,
    instructorId,
    author,
    story,
    question,
    mes,
    showAnswer,
    getTestData,
    zero,
    answerState,
    commentsList,
    answerOptions,
  } = props;
  return (
    <TextBar className="Test" story={story}>
      <div className="question_box">
        <div className="question_text">{parse(props.question[0])}</div>
        <IconBlockElement
          image={image}
          instructorId={instructorId}
          author={author}
        />
      </div>
      <div className="answer">
        <IconBlock>
          <div className="icon2">
            {me &&
              (me.image ? (
                <img className="icon" src={me.image} />
              ) : me.surname ? (
                `${me.name[0]}${me.surname[0]}`
              ) : (
                `${me.name[0]}${me.name[1]}`
              ))}
          </div>
          <div className="name">{me?.name}</div>
        </IconBlock>
        <Options>
          {mes.map((answer, index) => (
            <>
              <AnswerOption
                stop={false}
                answerOption={answerOptions[index]}
                true={props.true[index]}
                hidden={!showAnswer}
                key={index}
                answer={answer[0]}
                correct={answer[1]}
                number={index}
                onAnswerSelected={getTestData}
                sourceId={answer[3]}
                type="BRANCH"
              />
            </>
          ))}
        </Options>
      </div>
      {/* 2. Студент не выбрал ни одного из вариантов. Просим дать ответ  */}

      {zero && (
        <div className="question_box">
          <div className="question_text">{t("choose_option")}</div>
          <IconBlockElement
            image={image}
            instructorId={instructorId}
            author={author}
          />
        </div>
      )}

      {/* 3. Кнопка ответа  */}
      <Group>
        {answerState == "think" && (
          <MiniButton
            className="button"
            id="but1"
            onClick={async (e) => {
              // Stop the form from submitting
              e.preventDefault();
              props.passTestData("BRANCH");
            }}
          >
            {t("check")}
          </MiniButton>
        )}
      </Group>
      {/* 6. Работаем с формами */}
      {commentsList.filter((com) => com !== "").length > 0 && (
        <Question inputColor="#F3F3F3">
          <div className="question_text">
            {commentsList.length > 0 &&
              commentsList.map((com, i) => {
                return com ? parse(com) : null;
              })}
          </div>
          <IconBlockElement
            image={image}
            instructorId={instructorId}
            author={author}
          />
        </Question>
      )}
    </TextBar>
  );
};

export default Branch;
