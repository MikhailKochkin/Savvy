import styled from "styled-components";

export const IconBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  .icon {
    margin: 5px;
    border-radius: 50%;
    height: 55px;
    width: 55px;
    display: flex;
    object-fit: cover;

    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .icon2 {
    margin: 5px;
    border-radius: 50%;
    background: #cb2d3e; /* fallback for old browsers */
    background: -webkit-linear-gradient(
      #ef473a,
      #cb2d3e
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      #ef473a,
      #cb2d3e
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    color: #fff;
    font-size: 2rem;
    font-weight: bold;
    height: 55px;
    width: 55px;
    object-fit: cover;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .name {
    font-size: 1.2rem;
    line-height: 1.2;
    text-align: center;
    color: #8f93a3;
    max-width: 80px;
    margin: 0 7px;
  }
`;

export const Question = styled.div`
  display: flex;
  flex-direction: column;
  flex: 50%;
  margin-bottom: 3%;
  margin-top: ${(props) => (props.story ? "2%" : "0%")};

  p {
    margin: 5px 0;
  }
  a {
    border-bottom: 2px solid #26ba8d;
    padding: 0%;
    transition: 0.3s;
    cursor: pointer;
  }
  .video {
    height: 489px;
    width: 275px;
    iframe {
      width: 100%;
      border: none;
      height: 100%;
      border-radius: 15px;
    }
  }
  .question_box {
    display: flex;
    background: #ffffff;
    flex-direction: row;
    justify-content: flex-end;
    margin-bottom: 20px;

    /* Add slide-in animation from bottom */
    opacity: 0;
    transform: translateY(30px); /* Start below */
    animation: animate-slide-in-from-bottom 0.8s forwards;

    /* Animation from the bottom */
    @keyframes animate-slide-in-from-bottom {
      0% {
        opacity: 0;
        transform: translateY(50px); /* Start below */
      }
      50% {
        transform: translateY(-10px); /* Move up */
      }
      100% {
        opacity: 1;
        transform: translateY(0); /* Rest position */
      }
    }
  }
  .question_name {
    margin-left: 5px;
    background: #00204e;
    color: white;
    border-radius: 50%;
    padding: 2% 3%;
    height: 55px;
    width: 55px;
    object-fit: cover;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .question_text {
    background: #f3f3f3;
    color: black;
    border-radius: 25px;
    padding: 2% 5%;
    min-width: 40%;
    max-width: 70%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }
  .answer {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
  .answer_name {
    margin-right: 10px;
    background: #00204e;
    color: white;
    border-radius: 50%;
    padding: 2%;
    height: 55px;
    width: 55px;
    object-fit: cover;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .answer_test {
    width: 50%;
    border: 2px solid;
    border-color: #f3f3f3;
    border-radius: 25px;
    padding: 2% 5%;
    margin-bottom: 20px;
  }
  button {
    width: 30%;
    padding: 2%;
    margin-top: 5%;
  }
  @media (max-width: 800px) {
    padding: 0%;
    margin-bottom: 5%;
    button {
      width: 50%;
      padding: 3%;
    }
    .video {
      height: 356px;
      width: 200px;
    }
  }
`;

export const Answer_text = styled.textarea`
  height: 70px;
  width: 95%;
  outline: 0;
  border: none;
  resize: none;
  border-radius: 25px;
  padding: 3% 4%;
  line-height: 1.8;
  font-family: Montserrat;
  font-size: 1.6rem;
  margin: 10px 0;
  &:disabled {
    background-color: #fff; // or any other color you want
  }
`;

export const ResultCircle = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  bottom: 0;
  right: 0;
  font-size: 1.4rem;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid;
  border-color: ${(props) => props.inputColor};
  margin: 10px; // Adjust margin to position the circle as desired
`;

export const PositionCircle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  top: 0;
  right: 0;
  font-size: 1.4rem;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid;
  border-color: #f3f3f3;
  margin: 10px; // Adjust margin to position the circle as desired
  margin-bottom: 20px;
`;

export const Button1 = styled.div`
  min-width: 120px;
  line-height: 1.6;
  margin-right: 20px;
  text-align: left;
  background: #d2edfd;
  border-radius: 5px;
  padding: 10px 30px;
  margin-bottom: 15px;
  /* height: 45px; */
  cursor: pointer;
  color: #000a60;
  border: none;
  white-space: nowrap;
  font-size: 1.6rem;
  font-weight: 500;
  transition: all 0.3s ease;
  display: ${(props) => (props.correct === "true" ? "none" : "flex")};
  pointer-events: ${(props) => (props.correct === "true" ? "none" : "auto")};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  &:hover {
    background: #a5dcfe;
  }
  @media (max-width: 800px) {
    min-width: 100px;
    margin-right: 10px;
    padding: 10px 15px;
    height: auto;

    white-space: normal;
    text-align: left;
  }
`;

export const Circle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50px;
  border: 1px solid gray;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 15px;
  cursor: pointer;
  transition: ease-in 0.4s;
  &:hover {
    border: 1px solid blue;
  }
  @media (max-width: 800px) {
    margin-left: 5px;
    display: none;
  }
`;

export const Frame = styled.div`
  position: relative;
  min-width: 60%;
  max-width: 70%;
  margin-bottom: 10px;
  border: 2px solid;
  border: ${(props) =>
    props.inputColor == "#D0EADB" ? "3px solid" : "2px solid"};
  border-color: ${(props) => props.inputColor};
  border-radius: 25px;
  background: #fff;
  padding: 0 2%;
  /* margin: 15px 0; */
  .com {
    border-top: 1px solid #f3f3f3;
  }
`;

export const CommentFrame = styled.div`
  position: relative;
  margin-bottom: 10px;
  border: 2px solid #f3f3f3;
  border-radius: 25px;
  background: #fff;
  padding: 15px 20px;
  margin-left: 20px;
  line-height: 1.6;
  font-weight: 400;
  /* margin: 15px 0; */
  .com {
    border-top: 1px solid #f3f3f3;
  }
`;

export const MiniOpenQuestionFrame = styled.div`
  position: relative;
  width: 100%;
  min-height: 35px;
  border: 2px solid;
  border: ${(props) =>
    props.inputColor == "#D0EADB" ? "3px solid" : "2px solid"};
  border-color: ${(props) => props.inputColor};
  border-radius: 10px;
  background: #fff;
  padding: 5px 10px;
  margin: 15px 0;
`;

export const MiniAIButton = styled.button`
  background-color: #d2edfd;
  color: #000a60;
  border-radius: 4px;
  border: none;
  text-align: left;
  box-shadow: none;
  box-sizing: border-box;
  font-family: Montserrat;
  font-weight: 500;
  font-size: 14px;
  padding: 8px 15px;
  margin-right: 10px;
  margin-bottom: 10px;
  transition: 0.3s;
  text-align: center;
  cursor: pointer;
  &:hover {
    box-shadow: rgb(66 133 244 / 15%) 0px 1px 3px 1px;
    background-color: #a4dbfe;
  }
`;

export const MiniCircle = styled.div`
  width: 23px;
  height: 23px;
  border-radius: 50px;
  border: 1px solid #d0d0d0;
  color: #d0d0d0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.1rem;
  cursor: pointer;
  transition: ease-in 0.2s;
  &:hover {
    border: 1px solid #828282;
    color: #828282;
  }
`;
