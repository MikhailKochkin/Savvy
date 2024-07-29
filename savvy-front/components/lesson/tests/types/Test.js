import React, { useState } from "react";
import { useTranslation } from "next-i18next";
import parse from "html-react-parser";

import {
  IconBlock,
  Options,
  TextBar,
  Group,
  OptionsGroup,
  Option,
  MiniButton,
  Question,
} from "../testStyles";
import IconBlockElement from "../IconBlockElement";
import AnswerOption from "../AnswerOption";
const removePTags = (str) => str.replace(/<\/?p>/g, "");

const Test = (props) => {
  const [isAnswerShown, setIsAnswerShown] = useState(false); // is the answer shown?
  const { t } = useTranslation("lesson");
  const {
    me,
    image,
    instructorName,
    author,
    story,
    question,
    mes,
    showAnswer,
    getTestData,
    zero,
    answerState,
    inputColor,
    commentsList,
    ifRight,
    ifWrong,
    correctAnswers,
    answerOptions,
  } = props;
  return (
    <TextBar className="Test" story={story}>
      <div className="question_box">
        <div className="question_text">{parse(props.question[0])}</div>
        <IconBlockElement
          image={image}
          instructorName={instructorName}
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
            <AnswerOption
              stop={answerState === "right"}
              answerOption={answerOptions[index]}
              true={props.true[index]}
              hidden={!showAnswer}
              key={index}
              answer={answer[0]}
              correct={answer[1]}
              number={index}
              answerState={answerState}
              onAnswerSelected={getTestData}
            />
          ))}
        </Options>
      </div>
      {/* 2. Студент не выбрал ни одного из вариантов. Просим дать ответ  */}
      {zero && (
        <div className="question_box">
          <div className="question_text">{t("choose_option")}</div>
          <IconBlockElement
            image={image}
            instructorName={instructorName}
            author={author}
          />
        </div>
      )}
      {/* 3. Кнопка ответа  */}
      <Group>
        {!isAnswerShown && answerState !== "right" && (
          <MiniButton
            className="button"
            id="but1"
            onClick={async (e) => {
              // Stop the form from submitting
              e.preventDefault();
              props.passTestData("TEST");
              // if (answer.length < 1) {
              //   setZero(true);
              // } else {
              //   passTestData();
              // }
            }}
          >
            {t("check")}
          </MiniButton>
        )}
      </Group>
      {/* 4. Верный ответ. Поздравляем студента, даем комментарий к правильному варианту, объясняем, что делать дальше.  */}
      {answerState === "right" && (
        <Question inputColor={inputColor}>
          <div className="question_text">
            {"🎉" + "  " + t("correct") + "!"}
            {commentsList.length > 0 &&
              commentsList.map((com, i) => {
                return com ? parse(com) : null;
              })}
            {ifRight && ifRight !== "<p></p>" && parse(ifRight)}{" "}
          </div>
          <IconBlockElement
            image={image}
            instructorName={instructorName}
            author={author}
          />
        </Question>
      )}
      {/* 5. Неправильный ответ. Говорим об этом, даем комментарии к неправильным вариантам*/}
      {answerState === "wrong" && (
        <Question inputColor={inputColor}>
          <div className="question_text">
            {"🔎 " + "  " + t("wrong") + "..."}
            {commentsList.length > 0 &&
              commentsList.map((com, i) => {
                return com ? parse(com) : null;
              })}
          </div>
          <IconBlockElement
            image={image}
            instructorName={instructorName}
            author={author}
          />
        </Question>
      )}
      {/* 7. Неправильный ответ. Спрашиваем показать ли правильный вариант?*/}
      {!props.challenge && answerState == "wrong" && (
        <>
          <div className="question_box">
            <div className="question_text">{t("show_correct")}</div>
            <IconBlockElement
              image={image}
              instructorName={instructorName}
              author={author}
            />
          </div>

          <div className="answer">
            <IconBlock>
              {/* <img className="icon" src="../../static/flash.svg" /> */}
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
            </IconBlock>{" "}
            <OptionsGroup>
              <Option
                onClick={(e) => {
                  setIsAnswerShown(true);
                  props.revealCorrectAnswer(true);
                  // setAnswerState("think");
                  if (props.problemType === "ONLY_CORRECT") {
                    props.getData(
                      props.next && props.next.true
                        ? [true, props.next.true]
                        : [true, { type: "finish" }],
                      "true"
                    );
                  }
                }}
              >
                {t("yes")}
              </Option>
            </OptionsGroup>
          </div>
          {isAnswerShown && (
            <div className="question_box">
              <div className="question_text">
                {/* {t("outline_color")} */}
                <p>Correct answer is:</p>
                <ul>
                  {correctAnswers.map((answer, index) => (
                    <li key={index}>
                      {index + 1}. {parse(removePTags(answer))}
                    </li>
                  ))}
                </ul>
              </div>
              <IconBlockElement
                image={image}
                instructorName={instructorName}
                author={author}
              />
            </div>
          )}
        </>
      )}
    </TextBar>
  );
};

export default Test;
