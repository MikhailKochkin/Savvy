import React from "react";
import styled from "styled-components";

const Styles = styled.div`
  min-height: 80vh;
  width: 100vw;
  background: #77cbfa;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 800px) {
    height: 100%;
  }
`;

const Block = styled.div`
  min-height: 50%;
  width: 80%;
  background: #f5f5f5;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 2% 2%;
  #block1 {
    flex-basis: 50%;
    line-height: 1.4;
    font-size: 2.4rem;
    font-weight: 500;
    padding-left: 10px;
    #additional-info {
      width: 80%;
      margin-bottom: 20px;
      /* line-height: 1.8rem; */
      font-size: 1.8rem;
      margin-top: 15px;
    }
  }
  #block2 {
    flex-basis: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    #form {
      width: 80%;
    }
    form {
      font-size: 1.6rem;
      margin-bottom: 5px;
      #input_box {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin-top: 5px;
        #call {
          flex-basis: 50%;
        }
        #telegram {
          flex-basis: 50%;
        }
        #agree {
          width: 100%;
        }
      }
    }
    .data {
      width: 100%;
      background: none;
      font-size: 1.6rem;
      border: none;
      font-family: Montserrat;
      outline: 0;
      border-bottom: 1px solid #162b4b;
      padding-bottom: 0.5%;
      cursor: pointer;
      margin-bottom: 25px;
      color: #162b4b;
      &:hover {
        border-bottom: 1px solid #162b4b;
      }
      &:active {
        border-bottom: 1px solid #162b4b;
      }
    }
    button {
      background: #4571c9;
      padding: 10px 15px;
      border-radius: 10px;
      font-size: 1.8rem;
      font-family: Montserrat;
      border: 1px solid #4571c9;
      color: #fff;
      transition: 0.2s ease-in;
      cursor: pointer;
      width: 100%;
      &:hover {
        background: #3157a1;
      }
    }
  }

  @media (max-width: 800px) {
    padding: 50px 0;
    height: 100%;
    width: 100%;
    flex-direction: column;
    #block1 {
      font-size: 2.2rem;
      font-weight: 500;
      width: 90%;
      padding-left: 0;
    }
    #block2 {
      width: 90%;
      #additional-info {
        width: 100%;
        margin-bottom: 20px;
        margin-top: 30px;
      }
      #form {
        width: 100%;
      }
    }
  }
`;
const Call1 = () => {
  return (
    <Styles id="C2A">
      <Block>
        <div id="block1">
          <div>
            Запишитесь на собеседование с директором программы и получите{" "}
          </div>
          <span style={{ color: "#FF6F59" }}>персональную консультацию</span>
          <div id="additional-info">
            Мы расскажем о программе, о наших преподавателях и подходах, о
            рынке, разберемся в ваших целях и нынешних знаниях.
          </div>
        </div>
        <div id="block2">
          <div id="form">
            <input className="data" placeholder="Имя" />
            <input className="data" type="tel" placeholder="Телефон" />
            <input className="data" type="email" placeholder="Имейл" />
            <form>
              <div>Удобный способ связи:</div>
              <div id="input_box">
                <div id="call">
                  <input type="radio" id="male" name="gender" value="male" />
                  <label for="male">Звонок</label>
                </div>
                <div id="telegram">
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="female"
                  />
                  <label for="female">Телеграм</label>
                </div>
              </div>
            </form>
            <form>
              <div>Согласие на обработку персональных данных</div>
              <div id="input_box">
                <div id="agree">
                  <input type="radio" id="male" name="gender" value="male" />
                  <label for="male">Да</label>
                </div>
              </div>
            </form>
            <button>Записаться</button>
          </div>
        </div>
      </Block>
    </Styles>
  );
};

export default Call1;
