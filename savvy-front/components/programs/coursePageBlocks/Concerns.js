import React from "react";
import styled from "styled-components";
import renderHTML from "react-render-html";

const Styles = styled.div`
  min-height: 100vh;
  width: 100vw;
  /* padding: 50px 0; */
  background: #f4f8fc;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.6rem;
  padding-bottom: 50px;
  .question_block {
    flex-basis: 40%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding-top: 4%;
    line-height: 1.4;
    /* justify-content: center; */
    .question_box {
      width: 70%;
      /* min-height: 150px; */
      background: #fff;
      border-radius: 5px;
      padding: 3%;
      font-size: 2rem;
      -webkit-box-shadow: 0px 0px 8px 5px rgba(186, 186, 186, 0.31);
      box-shadow: 0px 0px 8px 5px rgba(186, 186, 186, 0.31);
    }
  }
  .answer_block {
    flex-basis: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 4%;
    /* justify-content: center; */
    .answer_box {
      width: 70%;
      -webkit-box-shadow: 0px 0px 8px 5px rgba(186, 186, 186, 0.31);
      box-shadow: 0px 0px 8px 5px rgba(186, 186, 186, 0.31);
      background-color: #fff;
      min-height: 150px;
      border-radius: 5px;
      padding: 3%;
      span {
        padding-bottom: 2px;
        border-bottom: 2px solid #3175f3;
      }
      /* display: flex;
      flex-direction: column;
      align-items: center; */
    }
  }
  .header {
    font-size: 2.4rem;
    line-height: 1.4;
    margin-bottom: 10px;
  }
  @media (max-width: 800px) {
    flex-direction: column;
    .question_block {
      flex-basis: 40%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .question_box {
        width: 80%;
        margin-bottom: 20px;
      }
    }
    .answer_block {
      .answer_box {
        width: 80%;
        margin-bottom: 20px;
      }
    }
  }
`;

const Level = styled.div`
  min-height: 40vh;
  width: 100%;
  display: flex;
  flex-direction: row;
  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const Concerns = (props) => {
  console.log(props.data.refusals);
  return (
    <>
      <Styles>
        {props.data.refusals.map((r) => (
          <Level>
            <div className="question_block">
              <div className="question_box">{r.q}</div>
            </div>
            <div className="answer_block">
              <div className="answer_box">
                <div className="header">{r.h}</div>
                {renderHTML(r.a)}
              </div>
            </div>
          </Level>
        ))}

        {/* <Level>
          <div className="question_block">
            <div className="question_box">
              ⏰ У меня сейчас нет времени на занятия
            </div>
          </div>
          <div className="answer_block">
            <div className="answer_box">
              <div className="header">Нужен уровень от A2</div>А дальше уже
              можно приступать к юридическому английскому. Лучший способ поднять
              знание лексики и грамматики – 
              <span>начать работать с языком, читать, писать, переводить</span>.
              А именно этим мы и занимаемся на курсе. Если же что-то не будет
              получаться, мы всегда подключимся и поможем.
            </div>
          </div>
        </Level>
        <Level>
          <div className="question_block">
            <div className="question_box">
              🤨 А вы точно сможете мне помочь?
            </div>
          </div>
          <div className="answer_block">
            <div className="answer_box">
              <div className="header">Я смогу вам помочь</div>У меня есть опыт
              преподавания как General English, так и Legal English. Я учился в
              МГИМО и работал в американских юр фирмах. Я прекрасно понимаю, и
              как нужно обучать основам языка, и как{" "}
              <span>подготовить вас к работе юриста на английском</span>.
            </div>
          </div>
        </Level> */}
      </Styles>
    </>
  );
};

export default Concerns;
