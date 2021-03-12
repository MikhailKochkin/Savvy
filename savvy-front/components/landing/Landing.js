import styled from "styled-components";
// import { withTranslation } from "../../i18n";
import Link from "next/link";
import { check } from "react-icons-kit/fa/check";
import Icon from "react-icons-kit";

const Styles = styled.div`
  width: 100%;
  display: flex;
  background: #f5f5f5;
  min-height: 60vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 900px) {
    padding-top: 30px;
  }
`;

const Block = styled.div`
  width: 70%;
  /* border: 1px solid black; */
  padding-top: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  @media (max-width: 900px) {
    width: 90%;
    display: flex;
    flex-direction: column;
    padding: 0;
  }
`;

const Image = styled.div`
  flex-basis: 35%;
  min-height: 50vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  img {
    height: 180px;
  }
  @media (max-width: 900px) {
    width: 100%;
    min-height: 10vh;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* order: 2; */
    /* display: none; */

    img {
      height: 140px;
      margin-bottom: 15px;
      /* display: none; */
    }
  }
`;

const Text = styled.div`
  flex-basis: 65%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  .header {
    font-size: 3rem;
    line-height: 1.6;
    text-align: right;
    font-weight: 600;
  }
  .subheader {
    font-size: 2.2rem;
    line-height: 1.6;
    text-align: right;
    margin-top: 20px;
    width: 85%;
  }
  .navigation_buttons {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: center;
    margin-top: 50px;
    width: 100%;
  }
  .navigation_button {
    font-size: 1.8rem;
    font-weight: 500;
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    button {
      background: #91e9e3;
      border-radius: 5px;
      border: none;
      color: black;
      margin-bottom: 15px;
      width: 250px;
      padding: 15px 0;
      outline: 0;
      cursor: pointer;
      font-family: Montserrat;
      font-size: 1.8rem;
      transition: 0.3s;
      &:hover {
        background: #33d7cc;
      }
    }
    div {
      font-size: 1.4rem;
    }
  }
  .point_text {
    text-align: right;
  }
  @media (max-width: 1300px) {
    .navigation_buttons {
      .navigation_button {
        width: 100%;
      }
      button {
        width: 80%;
      }
      div {
        width: 100%;
        font-size: 1.6rem;
        text-align: right;
        margin-bottom: 15px;
      }
    }
  }
  @media (max-width: 900px) {
    width: 100%;
    .navigation_buttons {
      display: flex;
      flex-direction: column;
      .navigation_button {
        width: 100%;
      }
      button {
        width: 100%;
      }
      div {
        width: 100%;
        font-size: 1.6rem;
        text-align: center;
        margin-bottom: 15px;
      }
    }
    .header {
      font-size: 2.4rem;
    }
    .subheader {
      font-size: 2rem;
      width: 95%;
    }
  }
`;

const Banner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 20vh;
  width: 80%;
  object-fit: cover;
  text-align: center;
  color: black;
  background: #7f7fd5; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #91eae4,
    #86a8e7,
    #7f7fd5
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #91eae4,
    #86a8e7,
    #7f7fd5
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  /* border-radius: 10px; */
  width: 80vw;
  padding: 0 12%;
  .text {
    color: white;
    line-height: 1.6;
    font-size: 2.4rem;
  }
  @media (max-width: 800px) {
    .text {
      font-size: 1.8rem;
    }
    padding: 0 5%;
    height: 20vh;
  }
`;

const Landing = (props) => {
  const slide = () => {
    var my_element = document.getElementById("course_search");
    my_element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };
  return (
    <Styles>
      <Block>
        <Image>
          <img src="../../static/main_page.svg" />
        </Image>
        <Text>
          <div className="header">
            Получите практические юридические навыки здесь и сейчас{" "}
          </div>
          <div className="subheader">
            Мы создаем образовательные курсы, которые через игры и симуляторы
            готовят к реальной работе юриста{" "}
          </div>
          <div className="navigation_buttons">
            <div className="navigation_button">
              <button onClick={(e) => slide()}>Юристам</button>
              <div>Помогаем трансформировать карьеру</div>
            </div>
            <div className="navigation_button">
              <Link href="/business">
                <button>Бизнесам</button>
              </Link>
              <div>Помогаем трансформировать обучение</div>
            </div>
          </div>
        </Text>
      </Block>
    </Styles>
  );
};

export default Landing;
// export default withTranslation("common")(Landing);
