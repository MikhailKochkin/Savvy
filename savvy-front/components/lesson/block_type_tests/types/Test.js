import React, { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "next-i18next";
import parse from "html-react-parser";
import { TailSpin } from "react-loader-spinner";
import { v4 as uuidv4 } from "uuid";

import {
  Options,
  TextBar,
  Group,
  OptionsGroup,
  Option,
  MiniButton,
  Question,
} from "../styles/testStyles";

import IconBlockElement from "../../styles/commonElements/IconBlockElement";
import AnswerOption from "../functions/AnswerOption";

const removePTags = (str) => str.replace(/<\/?p>/g, "");

const Styles = styled.div`
  width: 570px;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const Progress2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 570px;
  margin: 10px;
`;

const Test = (props) => {
  const [isAnswerShown, setIsAnswerShown] = useState(false); // is the answer shown?
  const [generatingHint, setGeneratingHint] = useState(false); // is the AI generating a hint?
  const [hints, setHints] = useState([]);

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
    inputColor,
    commentsList,
    ifRight,
    ifWrong,
    correctAnswers,
    answerOptions,
    context,
    characters,
  } = props;
  return (
    <Styles>
      <TextBar className="Test" story={story}>
        <div className="question_box">
          <div className="question_text">{parse(props.question[0])}</div>
          <IconBlockElement
            instructorId={instructorId}
            author={author}
            characters={characters}
          />
        </div>
        {/* 2 AI hints */}
        {hints.length > 0 &&
          hints.map((hint, index) => {
            return (
              <div key={index + "_test_hint"} className="question_box">
                <div className="question_text">
                  <p>{parse(hint)}</p>
                </div>
                <IconBlockElement
                  instructorId={instructorId}
                  author={author}
                  characters={characters}
                />
              </div>
            );
          })}
        <div className="answer">
          <IconBlockElement me={me} />
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
              instructorId={instructorId}
              author={author}
              characters={characters}
            />
          </div>
        )}
        {/* 3. Кнопка ответа  */}
        <Group>
          {!isAnswerShown && answerState !== "right" && (
            <>
              <MiniButton
                className="button"
                id="but1"
                onClick={async (e) => {
                  // Stop the form from submitting
                  e.preventDefault();
                  props.passTestData("TEST");
                }}
              >
                {t("check")}
              </MiniButton>
              <MiniButton
                onClick={async (e) => {
                  e.preventDefault();
                  setGeneratingHint(true);
                  let res = await props.provideHint();
                  setHints([...hints, res.newHint]);
                  setGeneratingHint(false);
                }}
                // correct={correct}
              >
                {hints.length > 0
                  ? t("i_need_another_hint")
                  : t("i_need_a_hint")}
              </MiniButton>
            </>
          )}
        </Group>
        {generatingHint && (
          <Progress2>
            <TailSpin width="50" color="#2E80EC" />
          </Progress2>
        )}
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
              instructorId={instructorId}
              author={author}
              characters={characters}
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
              instructorId={instructorId}
              author={author}
              characters={characters}
            />
          </Question>
        )}
        {/* 7. Неправильный ответ. Спрашиваем показать ли правильный вариант?*/}
        {!props.challenge && answerState == "wrong" && (
          <>
            <div className="question_box">
              <div className="question_text">{t("show_correct")}</div>
              <IconBlockElement
                instructorId={instructorId}
                author={author}
                characters={characters}
              />
            </div>

            <div className="answer">
              <IconBlockElement me={me} />
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
                  instructorId={instructorId}
                  author={author}
                  characters={characters}
                />
              </div>
            )}
          </>
        )}
      </TextBar>
    </Styles>
  );
};

export default Test;
