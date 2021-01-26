import React, { Component } from "react";
import styled from "styled-components";
import renderHTML from "react-render-html";
import Link from "next/link";

const Payment = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  background: #ffffff;
  border: 1px solid #e4e4e4;
  box-sizing: border-box;
  border-radius: 10px;
  width: 270px;
  min-height: 260px;
  /* padding: 2% 4%; */
  .message {
    border-bottom: 1px solid #e4e4e4;
    padding-bottom: 15px;
  }
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const Header = styled.div`
  font-size: 2rem;
  padding-bottom: 4%;
  padding-top: 4%;
  line-height: 1.4;
  border-radius: 10px 10px 0 0;
  background: rgba(36, 101, 255, 0.1);
  margin: 0;
  text-align: center;
  /* color: #112b62; */
`;

const Text = styled.div`
  margin: 4% 4%;
  max-width: 280px;
  display: flex;
  flex-direction: column;
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
  a {
    color: white;
  }
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
  let l = props.lesson;
  console.log(l);
  return (
    <>
      <Payment>
        {l.length == 0 && (
          <>
            <Header>🔓 Открытый урок</Header>
            <Text>
              <Part1>
                <div className="Title">Открытый урок</div>
                <div>
                  Мы скоро откроем для вас первый открытый урок. Напишите нам,
                  какой урок вам было бы интереснее всего посмотреть.
                </div>
              </Part1>
              <Part2>
                <Button>
                  <a href="mailto:mikhail@besavvy.com">Перейти</a>
                </Button>
              </Part2>
            </Text>
          </>
        )}
        {l.length > 0 && (
          <>
            <Header>🔓 Открытый урок</Header>
            <Text>
              <Part1>
                <div className="Title">
                  Урок {l.number}. {l.name}
                </div>
                <div>{l.description ? renderHTML(l.description) : null}</div>
              </Part1>
              <Part2>
                <Link
                  href={{
                    pathname: "/lesson",
                    query: {
                      id: l.id,
                      type: l.type.toLowerCase(),
                    },
                  }}
                >
                  <Button
                    onClick={() => {
                      console.log(0);
                    }}
                  >
                    Перейти
                  </Button>
                </Link>
              </Part2>
            </Text>
          </>
        )}
      </Payment>
    </>
  );
};

export default RegisterCard;
