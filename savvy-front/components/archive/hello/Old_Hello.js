import { useEffect } from "react";
import styled from "styled-components";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

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
  min-height: 90%;
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
        a {
          color: #fff;
        }
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
  const { t } = useTranslation("hello");
  const router = useRouter();

  return (
    <Styles>
      <Container id="initial">
        <div className="picture">
          <div>
            <img src="../../static/hello.svg" />
          </div>
        </div>
        <div className="text">
          <h1 className="hello">{t("h1")}</h1>
          <div className="message">
            {router.locale == "ru" ? (
              <>
                Мы скоро с вами свяжемся. Также, если вы хотите больше узнать о
                программе, <span>запишитесь на звонок</span> с директором
                программы. Мы будем рады ближе с вами познакомиться 🤗
              </>
            ) : (
              <>
                We will get back to you soon. You can also{" "}
                <span>schedule a call</span> yourself by clicking on the button
                below. We are really looking forward to e-meeting you 🤗
              </>
            )}
          </div>
          <button>
            <a
              target="_blank"
              href={`https://calendly.com/mikhail-from-besavvy/call-with-mike-kochkin?name=${props.name}&email=${props.email}&a1=${props.number}`}
            >
              {t("choose_time")}
            </a>
          </button>
          <div className="row">
            {" "}
            <img src="/static/tick2.svg" />
            <div>{t("15_minutes")}</div>
          </div>
          <div className="row">
            <img src="/static/tick2.svg" />
            <div>{t("convenient_time")}</div>
          </div>
          <div className="row">
            <img src="/static/tick2.svg" />
            <div>{t("no_distract")}</div>
          </div>
        </div>
      </Container>
    </Styles>
  );
};

export default hello;
