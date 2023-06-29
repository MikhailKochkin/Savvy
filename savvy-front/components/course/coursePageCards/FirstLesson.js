import React from "react";
import styled from "styled-components";
<<<<<<< HEAD

=======
import renderHTML from "react-render-html";
>>>>>>> origin/master

const Payment = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  background: #ffffff;
  /* border: 1px solid #e4e4e4; */
  box-sizing: border-box;
  border-radius: 10px;
  width: 95%;
  min-height: 290px;
  /* padding: 2% 4%; */
  .message {
    border-bottom: 1px solid #e4e4e4;
    padding-bottom: 15px;
  }
`;

const Header = styled.div`
  font-size: 2rem;
  padding-bottom: 4%;
  padding-top: 4%;
  line-height: 1.4;
  border-radius: 10px;
  background: rgba(36, 101, 255, 0.1);
  margin: 0;
  text-align: center;
  /* color: #112b62; */
`;

const Text = styled.div`
  margin: 4% 4%;
  max-width: 280px;
  display: flex;
  height: 90%;
  flex-direction: column;
  justify-content: space-between;
`;

const Part1 = styled.div`
  line-height: 1.6;
  font-size: 1.4rem;
  .Title {
    font-weight: bold;
    font-size: 1.6rem;
  }
`;

const Part2 = styled.div``;

const Button = styled.button`
  background: #0846d8;
  border-radius: 5px;
  width: 100%;
  height: 38px;
  outline: 0;
  color: white;
  font-weight: 600;
  font-size: 1.4rem;
  outline: none;
  cursor: pointer;
  border: none;
  margin-top: 10px;
  &:hover {
    background: rgba(8, 70, 216, 0.85);
  }
  &:active {
    background-color: ${(props) => props.theme.darkGreen};
  }
  &:disabled {
    &:hover {
      background-color: #84bc9c;
    }
  }
`;

const RegisterCard = (props) => {
  const l = props.openLesson;
  return (
    <>
      <Payment>
        <Header>🔓 Открытый урок</Header>
        {l && (
          <Text>
            <Part1>
              <div className="Title">
                Урок {l.number}. {l.name}
              </div>
<<<<<<< HEAD
              <div>{l.description ? parse(l.description) : null}</div>
=======
              <div>{l.description ? renderHTML(l.description) : null}</div>
>>>>>>> origin/master
            </Part1>
            {/* <Part2>
            <Button>Начать</Button>
          </Part2> */}
          </Text>
        )}
        {!l && (
          <Text>
            <Part1>
              <div className="Title">
                Напишите нам, какой урок этого курса вы хотели бы посмотреть.
              </div>
            </Part1>
            {/* <Part2>
            <Button>Начать</Button>
          </Part2> */}
          </Text>
        )}
      </Payment>
    </>
  );
};

export default RegisterCard;
