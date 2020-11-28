import styled from "styled-components";
import { check } from "react-icons-kit/fa/check";
import Icon from "react-icons-kit";
import { ic_keyboard_arrow_down } from "react-icons-kit/md/ic_keyboard_arrow_down";

const Styles = styled.div`
  height: 85vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  #big {
    font-size: 4rem;
    font-weight: bold;
    margin-bottom: 4%;
  }
  #main {
    font-size: 2.3rem;
    text-align: center;
    margin-bottom: 6%;
  }
  #input {
    width: 80%;
    height: 45px;
    display: flex;
    flex-direction: row;
    #text {
      border: 2px solid black;
      border-radius: 6px 0 0 6px;
      width: 70%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2px 5px;
      input {
        outline: none;
        font-family: Montserrat;
        height: 70%;
        border: none;
        width: 100%;
        font-size: 1.7rem;
        padding: 2%;
      }
    }
    button {
      width: 30%;
      background: black;
      color: white;
      height: 100%;
      border: 2px solid black;
      border-left: none;
      font-family: Montserrat;
      font-size: 1.8rem;
      font-weight: bold;
      outline: none;
      border-radius: 0 6px 6px 0;
      cursor: pointer;
      transition: all 0.4s ease;
      &:hover {
        border: 2px solid black;
        border-left: none;
        color: black;
        background: white;
      }
    }
  }
  #advantages {
    display: flex;
    flex-direction: row;
    margin-top: 30px;
  }
  .bullet {
    display: flex;
    width: 250px;
    flex-direction: row;
    font-size: 1.2rem;
    font-weight: bold;
    span {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-left: 30px;
      margin-right: 15px;
    }
    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
  }
`;

const Arrow = styled.div`
  position: absolute;
  bottom: 0;
`;

const Intro = () => {
  const slide = () => {
    var my_element = document.getElementById("about");
    my_element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };
  return (
    <Styles>
      <Container>
        <div id="big">Great training starts here</div>
        <div id="main">
          Give your employees an e-mentor and cust costs on internal training by
          60%.
        </div>
        <div id="input">
          <div id="text">
            <input />
          </div>
          <button>Get Started</button>
        </div>
        <div id="advantages">
          <div className="bullet">
            <span>
              <Icon size={25} icon={check} />
            </span>
            <div>Unique training simulators </div>
          </div>
          <div className="bullet">
            <span>
              <Icon size={25} icon={check} />
            </span>
            <div>24/7 tech and course development support</div>
          </div>
          <div className="bullet">
            <span>
              <Icon size={25} icon={check} />
            </span>
            <div>Set up next course in minutes</div>
          </div>
        </div>
      </Container>
      <Arrow>
        <Icon
          size={75}
          icon={ic_keyboard_arrow_down}
          onClick={(e) => slide()}
        />
      </Arrow>
    </Styles>
  );
};

export default Intro;
