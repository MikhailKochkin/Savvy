import React from "react";
import styled from "styled-components";

const Styles = styled.div`
  min-height: 100vh;
  width: 100vw;
  /* padding: 50px 0; */
  background: #000000;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  font-size: 1.6rem;
  padding-bottom: 50px;
  .custom-shape-divider-top-1626363977 {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
  }

  .custom-shape-divider-top-1626363977 svg {
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    height: 65px;
  }

  .custom-shape-divider-top-1626363977 .shape-fill {
    fill: #ffffff;
  }
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
      background: #353c42;
      border-radius: 20px;
      padding: 3%;
      font-size: 2.4rem;
    }
  }
  .answer_block {
    flex-basis: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0;
    padding-top: 4%;
    /* justify-content: center; */
    .answer_box {
      width: 70%;
      border: 2px solid #fff;
      background: #353c42;
      border-radius: 20px;
      min-height: 150px;
      background: #353c42;
      border-radius: 20px;
      padding: 1% 3%;
      /* display: flex;
      flex-direction: column;
      align-items: center; */
    }
  }
  .header {
    font-size: 2.4rem;
    line-height: 1.4;
    margin-bottom: 5px;
  }
  .description {
    color: #cbcbcb;
    margin-bottom: 5px;
  }
  p {
    margin: 5px 0;
    line-height: 1.4;
  }
  @media (max-width: 800px) {
    flex-direction: column;
    .question_box {
      width: 85%;
    }
    .answer_box {
      width: 85%;
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

const Context = () => {
  return (
    <>
      <Styles>
        <div class="custom-shape-divider-top-1626363977">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              class="shape-fill"
            ></path>
          </svg>
        </div>
        <Level>
          <div className="question_block">
            <div className="question_box">🚀 Как мы придем к результату?</div>
          </div>
          <div className="answer_block">
            <div className="answer_box">
              <div className="header">1. Введение в юридический английский</div>
              <div className="description">
                23 августа – 7 октября 2021 года
              </div>
              <div>
                <p>
                  Мы учимся писать на английском языке и редактировать свои
                  тексты. Этот навык - фундамент устной речи и навыка
                  составления документов на английском языке.
                </p>{" "}
                <p>Также курс включает изучение базовой юридической лексики.</p>
              </div>
            </div>
          </div>
        </Level>
        <Level>
          <div className="question_block">
            {/* <div className="question_box">📝 А что это за навыки?</div> */}
          </div>
          <div className="answer_block">
            <div className="answer_box">
              <div className="header">2. Продвинутый Legal English</div>
              <div className="description">
                18 октября – 18 декабря 2021 года
              </div>
              <div>
                <p>
                  Мы учимся писать на английском языке и редактировать свои
                  тексты. Этот навык - фундамент устной речи и навыка
                  составления документов на английском языке.
                </p>{" "}
                <p>Также курс включает изучение базовой юридической лексики.</p>
              </div>
            </div>
          </div>
        </Level>
        <Level>
          <div className="question_block">
            {/* <div className="question_box">🤨 А зачем юр английский нужен?</div> */}
          </div>
          <div className="answer_block">
            <div className="answer_box">
              <div className="header">3. Тренинг по устной речи</div>
              <div className="description">
                3 недели (в любое время по договоренности с участником)
              </div>
              <div>
                <p>
                  Мы учимся писать на английском языке и редактировать свои
                  тексты. Этот навык - фундамент устной речи и навыка
                  составления документов на английском языке.
                </p>{" "}
                <p>Также курс включает изучение базовой юридической лексики.</p>
              </div>
            </div>
          </div>
        </Level>
        <Level>
          <div className="question_block">
            {/* <div className="question_box">🤨 А зачем юр английский нужен?</div> */}
          </div>
          <div className="answer_block">
            <div className="answer_box">
              <div className="header">4. Юридический перевод</div>
              <div className="description">Январь – февраль 2022 года</div>
              <div>
                <p>
                  Мы учимся писать на английском языке и редактировать свои
                  тексты. Этот навык - фундамент устной речи и навыка
                  составления документов на английском языке.
                </p>{" "}
                <p>Также курс включает изучение базовой юридической лексики.</p>
              </div>
            </div>
          </div>
        </Level>
      </Styles>
    </>
  );
};

export default Context;
