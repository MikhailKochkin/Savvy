import React from "react";
import { useState, useEffect } from "react";
import { Typewriter, useTypewriter, Cursor } from "react-simple-typewriter";
import styled from "styled-components";
import smoothscroll from "smoothscroll-polyfill";

const PhoneStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40%;
  .body {
    background: #f5f5f5;
    border-radius: 28px;
    width: 252px;
    height: 460px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    filter: drop-shadow(0px 10px 12px rgba(0, 0, 0, 0.45));
    .screen {
      background: #fff;
      overflow-y: scroll;
      border-radius: 20px;
      width: 238px;
      height: 445px;
      padding: 0 5px;
      padding-bottom: 15px;
    }
  }
  @media (max-width: 900px) {
    display: none;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: space-between;
  margin-top: 8px;
  color: #909aa5;
  font-size: 1rem;
  .name {
    border-radius: 17px;
    font-weight: 500;
    line-height: 1.4;
    padding: 2px;
    width: 30%;
    margin-left: 8px;
  }
  .time {
    border-radius: 17px;
    font-weight: 500;
    line-height: 1.4;
    padding: 2px;
    width: 30%;
    text-align: end;
    margin-right: 8px;
  }
`;

const Question = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 15px;
  .image_box {
    width: 20%;
    margin-left: 10px;
    img {
      width: 40px;
      height: 40px;
      object-fit: cover;
      border-radius: 50%;
    }
  }
  .bubble {
    background: #f3f3f3;
    border-radius: 17px;
    font-size: 1.2rem;
    font-weight: 500;
    line-height: 1.4;
    padding: 10px;
    width: 60%;
  }
`;

const Answer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-top: 15px;
  .image_box {
    width: 20%;
    margin-left: 10px;
    img {
      width: 40px;
      height: 40px;
      object-fit: cover;
      border-radius: 50%;
    }
  }
  .bubble {
    background: #4ba9ff;
    border-radius: 17px;
    font-size: 1.2rem;
    color: #fff;
    font-weight: 500;
    line-height: 1.4;
    padding: 10px;
    width: 60%;
    p {
      margin: 0;
    }
  }
`;

const ButtonBox = styled.div`
  width: 100%;
  margin-top: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Button = styled.div`
  width: 50%;
  text-align: center;
  border-radius: 5px;
  cursor: pointer;
  color: #000a60;
  border: none;
  padding: 3px 5px;
  font-family: Montserrat;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  display: ${(props) => (props.correct === "true" ? "none" : "block")};
  pointer-events: ${(props) => (props.correct === "true" ? "none" : "auto")};
  background: ${(props) => (props.clicked ? "#a5dcfe" : "#d2edfd")};
  clicked1 &:hover {
    background: #a5dcfe;
  }
`;

const Phone = () => {
  const [clicked1, setClicked1] = useState(false);
  const [clicked2, setClicked2] = useState(false);

  const handleType = (count) => {
    // access word count number
    console.log(count);
  };

  useEffect(() => {
    // kick off the polyfill!
    smoothscroll.polyfill();
  });

  const handleDone = () => {
    setTimeout(() => setClicked1(true), 600);
    setTimeout(() => setClicked2(true), 800);
    var elem = document.getElementById("screen");
    elem.scrollTop = elem.scrollHeight;
  };
  return (
    <PhoneStyles>
      <div className="body">
        <div className="screen" id="screen">
          <Header>
            <div className="name">Кейс 1</div>
            <div className="time">20:34</div>
          </Header>
          <Question>
            <div className="bubble">
              Чтобы решить этот кейс, нужно вспомнить признаки юр лица. Какие ты
              помнишь?
            </div>
            <div className="image_box">
              <img src="https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80" />
            </div>
          </Question>
          <Answer>
            <div className="image_box">
              <img src="https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" />
            </div>
            <div className="bubble">
              <p>
                {/* Я думаю, что надо сначала посмотреть на */}
                <Typewriter
                  words={[
                    "Наличие обособленного имущества, гражданско-правовая ответственность ... ",
                  ]}
                  loop={1}
                  cursor
                  cursorStyle="_"
                  typeSpeed={50}
                  deleteSpeed={50}
                  delaySpeed={1000}
                  onLoopDone={handleDone}
                  onType={handleType}
                />
              </p>
            </div>
          </Answer>
          <ButtonBox>
            <Button clicked={clicked1}>Ответить</Button>
          </ButtonBox>

          {clicked2 && (
            <Question>
              <div className="bubble">
                Хорошо, как тогда обособленное имущество связано с защитой
                интересов кредиторов?
              </div>
              <div className="image_box">
                <img src="https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80" />
              </div>
            </Question>
          )}
        </div>
      </div>
    </PhoneStyles>
  );
};

export default Phone;
