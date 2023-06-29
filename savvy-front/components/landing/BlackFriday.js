import { useEffect } from "react";
import styled from "styled-components";
import smoothscroll from "smoothscroll-polyfill";

const Styles = styled.div`
  height: 100%;
  width: 100vw;
  background-image: url("/static/pattern.svg");
  background-size: contain;

  color: #fff;
  padding-bottom: 100px;
  margin-bottom: 100px;
  h2 {
    color: #ffffff;
    font-weight: 700;
    font-size: 4rem;
    text-align: center;
  }

  .custom-shape-divider-top-1636534911 {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
    margin-top: -3px;
  }

  .custom-shape-divider-top-1636534911 svg {
    position: relative;
    display: block;
    width: calc(163% + 1.3px);
    height: 73px;
  }

  .custom-shape-divider-top-1636534911 .shape-fill {
    fill: #ffffff;
    margin-top: -3px;
  }
  @media (max-width: 900px) {
    margin: 40px 0;
    /* background-size: contain; */
    h2 {
      line-height: 1.4;
      font-weight: 600;
      font-size: 3rem;
      margin-bottom: 20px;
    }
    .custom-shape-divider-top-1636534911 {
      display: none;
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const Container2 = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center;
  align-items: center; */
  width: 80%;
  height: 100%;
`;

const Offer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin: 30px 0;
  justify-content: center;
  align-items: center;
  .arrow {
    width: 60px;
    margin: 0 10px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    div {
      font-size: 3rem;
      height: 40px;
      width: 40px;
      border-radius: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
  .plus {
    width: 60px;
    margin: 0 10px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    div {
      background: #f9ca16;
      color: #171e2e;
      font-size: 3rem;
      height: 40px;
      width: 40px;
      border-radius: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
  @media (max-width: 800px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .plus {
      width: 90%;
      margin-bottom: 0;
    }
  }
`;

const Course = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background: #252f3f;
  border-radius: 20px;
  padding: 25px;
  width: 30%;
  font-size: 2.2rem;
  line-height: 1.4;
  margin-bottom: 20px;
  div {
    text-align: center;
    width: 100%;
  }
  div.button {
    font-size: 1.6rem;
    color: #5b729a;
    background: none;
    border: none;
    font-family: Montserrat;
    cursor: pointer;
  }
  @media (max-width: 800px) {
    width: 90%;
    margin: 20px 0;
  }
`;

const Price = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  padding: 25px;
  /* width: 30%; */
  font-size: 3rem;
  line-height: 1.4;
  .new {
    font-size: 1.8rem;
    text-align: center;
    /* white-space: nowrap; */
    width: 350px;
  }
  .old {
    font-size: 2.6rem;
    white-space: nowrap;
    color: #5b729a;
    text-decoration: line-through;
  }
  button {
    margin-bottom: 10px;
    background-color: #3f83f8;
    border-radius: 10px;
    border: none;
    display: inline-block;
    white-space: nowrap;
    cursor: pointer;
    color: #ffffff;
    font-family: Montserrat;
    padding: 10px 15px;
    font-weight: 500;
    font-size: 2rem;
    text-decoration: none;
    text-shadow: 0px 0px 0px #2f6627;
    transition: all 0.4s ease;
    a {
      color: #ffffff;
    }
    &:hover {
      background-color: #0854d9;
    }
  }
  @media (max-width: 800px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 90%;
    padding: 0;

    .new {
      width: 100%;
      font-size: 1.6rem;
    }
    .plus {
      width: 90%;
    }
    button {
      width: 100%;
      margin-top: 30px;
      font-size: 1.8rem;
    }
  }
`;

const BlackFriday = (props) => {
  useEffect(() => {
    // kick off the polyfill!
    smoothscroll.polyfill();
  });
  const slide = () => {
    var my_element = document.getElementById("c2a");
    my_element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };
  return (
    <Styles id="black_friday">
      <div class="custom-shape-divider-top-1636534911">
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
      <Container>
        <Container2>
          <h2>
            Бесплатный интенсив <br />
            "Актуальные юридические профессии"
          </h2>
          <Offer>
            <Course>
              <div>Legal English</div>
            </Course>
            <div className="plus">
              <div>+</div>
            </div>
            <Course>
              <div>Корпоративное право</div>
            </Course>
            <div className="plus">
              <div>+</div>
            </div>
            <Course>
              <div>IP/IT</div>
            </Course>
            <div className="plus">
              <div>+</div>
            </div>
            <Course>
              <div>Арбитражный процесс</div>
            </Course>
            <div className="plus">
              <div>+</div>
            </div>
            <Course>
              <div>Налоговое право</div>
            </Course>

            <div className="arrow">
              <div>⬇️</div>
            </div>
            <Price>
              {" "}
              <button
              // onClick={(e) => {
              //   props.getOffer("corp");
              //   slide();
              // }}
              >
                <a target="_blank" href="https://t.me/+5FUacwk7o6czYzdi">
                  Перейти к интенсиву
                </a>{" "}
              </button>
              <div className="new">Подробная информация в телеграм-канале</div>
              {/* <div className="old">96 000 ₽</div> */}
            </Price>
          </Offer>
        </Container2>
      </Container>
    </Styles>
  );
};

export default BlackFriday;
