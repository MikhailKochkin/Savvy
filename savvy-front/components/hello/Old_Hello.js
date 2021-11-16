import { useEffect } from "react";
import styled from "styled-components";
import { InlineWidget } from "react-calendly";

const Styles = styled.div`
  min-height: 90vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  @media (max-width: 800px) {
    height: 100%;
  }
`;

const Container = styled.div`
  height: 85%;
  width: 80%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  h1 {
    font-weight: bold;
    font-size: 3.6rem;
    line-height: 1.4;
  }
  .widget {
    margin-bottom: 50px;
  }
  .picture {
    width: 30%;
    height: 100%;
    div {
      margin-top: 20%;
      height: 150px;
      img {
        height: 100%;
      }
    }
  }
  .text {
    width: 55%;
    height: 100%;
    .row {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: flex-start;
      font-size: 1.8rem;
      margin: 15px 0;
      div {
        width: 90%;
        line-height: 1.4;
      }
      img {
        width: 25px;
        height: 25px;
        margin-right: 10px;
      }
    }
    .row_final {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: flex-start;
      font-size: 1.8rem;
      margin: 10px 0;
      margin-bottom: 20px;
      div {
        width: 90%;
        line-height: 1.4;
      }
      img {
        width: 25px;
        height: 25px;
        margin-right: 10px;
      }
    }
    .message {
      font-size: 1.8rem;
      margin-bottom: 15px;
      span {
        display: inline-block;
        transform: skew(-6deg);
        background: #fce969;
        font-weight: 600;
      }
    }
    button {
      height: 60px;
      width: 280px;
      background: none;
      border: 2px solid black;
      font-family: Montserrat;
      font-size: 1.8rem;
      font-weight: bold;
      border-radius: 5px;
      outline: 0;
      cursor: pointer;
      transition: all 0.3s;
      margin-bottom: 15px;

      &:hover {
        background: black;
        color: white;
      }
    }
  }
  @media (max-width: 800px) {
    height: auto;
    flex-direction: column;
    width: 90%;
    margin-bottom: 10%;
    .picture {
      width: 85%;
    }
    .text {
      width: 85%;
    }
    .widget {
      margin-bottom: 10px;
    }
  }
`;

const hello = (props) => {
  useEffect(() => {
    var my_element = document.getElementById("initial");
    my_element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }, [0]);
  return (
    <Styles>
      <Container id="initial">
        <div className="picture">
          <div>
            <img src="../../static/hello.svg" />
          </div>
        </div>
        <div className="text">
          <h1 className="hello">Спасибо, мы получили вашу заявку</h1>
          <div className="message">
            Теперь, пожалуйста, <span>выберите удобное время</span> для
            консультации. Это займет 15 секунд. На консультации покажем, как
            идет обучение, откроем вводный урок и ответим на все вопросы.
          </div>
          <div className="row">
            {" "}
            <img src="/static/tick2.svg" />
            <div>Консультация займет всего 15 минут.</div>
          </div>
          <div className="row">
            <img src="/static/tick2.svg" />
            <div>Вы можете выбрать удобное для вас время в течение недели.</div>
          </div>
          <div className="row">
            <img src="/static/tick2.svg" />
            <div>
              Мы не будем звонить вам в неудобное время и отвлекать вас от
              работы или семейных дел.
            </div>
          </div>
          <div className="row">
            <img src="/static/tick2.svg" />
            <div>
              Если вы оставите мобильный номер, мы пришлем вам напоминание по
              смс за 10 минут до встречи.
            </div>
          </div>
          <div className="row_final">
            <img src="/static/tick2.svg" />
            <div>В крайнем случае консультацию можно легко перенести. </div>
          </div>
          <div className="widget">
            <InlineWidget
              url={`https://calendly.com/mikhail-from-besavvy/15-min-intro?name=${props.name}&email=${props.email}&a1=${props.number}`}
            />
          </div>
        </div>
      </Container>
    </Styles>
  );
};

export default hello;
