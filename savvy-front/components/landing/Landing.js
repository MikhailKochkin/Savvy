import styled from "styled-components";
// import { withTranslation } from "../../i18n";
import Link from "next/link";

const Styles = styled.div`
  width: 100%;
  display: flex;
  background: #f5f5f5;
  min-height: 80vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 900px) {
    padding-top: 30px;
  }
`;

const Block = styled.div`
  width: 75%;
  /* border: 1px solid black; */
  padding: 25px 0;
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
  h1 {
    font-size: 3.6rem;
    line-height: 1.4;
    text-align: right;
    font-weight: 600;
  }
  .subheader {
    font-size: 2.2rem;
    line-height: 1.4;
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
      background: #175ffe;
      color: #fff;
      border-radius: 5px;
      border: none;
      margin-bottom: 15px;
      width: 250px;
      padding: 15px 0;
      outline: 0;
      cursor: pointer;
      font-family: Montserrat;
      font-size: 1.8rem;
      transition: 0.3s;
      &:hover {
        background: #0135a9;
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
          <img src="../../static/sync.svg" />
        </Image>
        <Text>
          <h1>Мы обучаем юристов практическим навыкам онлайн </h1>
          <div className="subheader">
            Подготовьтесь к работе на крупных юридических проектах с помощью
            вебинаров, симуляторов, помощи сообщества и общения с экспертами
            1-на-1{" "}
          </div>
          <div className="navigation_buttons">
            <div className="navigation_button">
              <button onClick={(e) => slide()}>Юристам</button>
              <div>Помогаем развивать карьеру</div>
            </div>
            {/* <div className="navigation_button">
              <Link href="/business">
                <button>Бизнесам</button>
              </Link>
              <div>Помогаем выстроить обучение</div>
            </div> */}
          </div>
        </Text>
      </Block>
    </Styles>
  );
};

export default Landing;
// export default withTranslation("common")(Landing);
