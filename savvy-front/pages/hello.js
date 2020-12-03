import { useEffect } from "react";
import styled from "styled-components";

const Styles = styled.div`
  height: 90vh;
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
  align-items: center;
  justify-content: center;
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
    .hello {
      font-weight: bold;
      font-size: 1.6rem;
    }
    .message {
      font-size: 1.8rem;
      span {
        border-bottom: 2px solid #91e9e3;
      }
    }
    button {
      height: 40px;
      width: 180px;
      background: none;
      border: 2px solid black;
      font-family: Montserrat;
      font-weight: bold;
      border-radius: 5px;
      outline: 0;
      cursor: pointer;
      transition: all 0.3s;
      &:hover {
        background: black;
        color: white;
      }
    }
    div {
      height: 100px;
      img {
        margin-left: 40%;
        height: 100%;
      }
    }
  }
  @media (max-width: 800px) {
    height: auto;
    flex-direction: column;
    width: 100%;
    margin-bottom: 10%;
    .picture {
      width: 85%;
    }
    .text {
      width: 85%;
      div {
        display: none;
      }
    }
  }
`;

const hello = () => {
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
          <p className="hello">Hello there!</p>
          <p className="message">
            BeSavvy is the tool for clever people learning and teaching clever
            things. That's why setting up a course with us is not just about
            uploading a video or creating a test. It's a bit more complex!
          </p>
          <p className="message">
            <span>But don't worry</span>. We are here to help. We will show you
            around, help come up with great ideas for your course and implement
            them! Just choose the most convenient tool for you!
          </p>
          <a
            href="https://calendly.com/mikhail-from-besavvy/30min"
            target="_blank"
          >
            <button>Set up a meeting</button>
          </a>
          <p className="message">Or ask your questions in the chat</p>
          <div>
            <img src="../../static/arrow.svg" />
          </div>
        </div>
      </Container>
    </Styles>
  );
};

export default hello;
