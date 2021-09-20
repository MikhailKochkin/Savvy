import { useEffect } from "react";
import styled from "styled-components";
import smoothscroll from "smoothscroll-polyfill";
import Link from "next/link";

const Styles = styled.div`
  width: 100%;
  display: flex;
  background: #fff;
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

const Text = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  h1 {
    font-size: 6rem;
    line-height: 1.2;
    text-align: center;
    font-weight: 800;
    margin: 0;
    margin-bottom: 20px;
    color: #252f3f;
    span {
      background: #fce969;
      display: inline-block;
      transform: skew(-8deg);
      /* -webkit-transform: skew(-5deg);
      -moz-transform: skew(-5deg);
      -o-transform: skew(-5deg); */
    }
  }
  .subheader {
    font-size: 2.2rem;
    line-height: 1.4;
    text-align: center;
    width: 65%;
    font-weight: 400;
    color: #4b5563;
  }
  button {
    background: #175ffe;
    color: #fff;
    border-radius: 5px;
    border: none;
    margin-top: 25px;
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

    div {
      font-size: 1.4rem;
    }
  }
  .point_text {
    text-align: right;
  }
  @media (max-width: 1300px) {
    button {
      width: 40%;
    }
    div {
      width: 100%;
      font-size: 1.6rem;
      text-align: right;
      margin-bottom: 15px;
    }
  }
  @media (max-width: 900px) {
    width: 100%;
    h1 {
      font-size: 4rem;
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
  useEffect(() => {
    // kick off the polyfill!
    smoothscroll.polyfill();
  });
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
        <Text>
          <h1>
            Мы <span>обучаем юристов</span> практическим навыкам онлайн{" "}
          </h1>
          <div className="subheader">
            В основе нашего обучения лежат экспертиза, технологии и сильное
            сообщество. Чтобы вы эффективно и быстро учились в кругу интересных
            людей.
          </div>

          <button onClick={(e) => slide()}>Смотреть программы</button>
        </Text>
      </Block>
    </Styles>
  );
};

export default Landing;
// export default withTranslation("common")(Landing);
