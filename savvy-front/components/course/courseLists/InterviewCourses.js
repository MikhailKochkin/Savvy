import React, { useState } from "react";
import styled from "styled-components";
import Course from "../Course";

const Block = styled.div`
  background: rgba(121, 132, 238, 0.15);
  height: 270px;
  border-radius: 15px;
  display: flex;
  flex-direction: row;
  margin: 4% 0;
  @media (max-width: 600px) {
    flex-direction: column;
    height: auto;
  }
`;

const Img = styled.img`
  object-fit: cover;
  width: 40%;
  height: 100%;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  @media (max-width: 1100px) {
    width: 40%;
    height: none;
  }
  @media (max-width: 600px) {
    width: 100%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 0;
  }
`;

const Text = styled.div`
  border-radius: 15px;
  padding: 2.5% 3%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 1.6rem;
  .header {
    font-size: 2.2rem;
    font-weight: bold;
  }
  @media (max-width: 1100px) {
    font-size: 1.4rem;
  }
  @media (max-width: 800px) {
    padding: 5%;
    border-radius: 0;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    .header {
      font-size: 2.1rem;
    }
  }
  button {
    transition: all 0.2s ease;
    background: #165bdc;
    border-radius: 5px;
    color: white;
    width: 30%;
    padding: 2% 3%;
    font-family: Montserrat;
    font-size: 1.6rem;
    outline: 0;
    cursor: pointer;
    &:hover {
      background: rgba(22, 91, 220, 0.7);
    }
    @media (max-width: 1100px) {
      width: 40%;
    }
    @media (max-width: 800px) {
      margin-top: 3%;
      width: 60%;
      padding: 3%;
    }
  }
`;

const RowStyles = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: left;
  @media (max-width: 800px) {
    justify-content: center;
    align-items: center;
  }
`;

const InterviewCourses = props => {
  const [show, setShow] = useState(false);
  const { courses, me } = props;
  return (
    <>
      <Block>
        <Img src="https://cdn.pixabay.com/photo/2015/01/09/11/09/startup-594091_1280.jpg" />
        <Text>
          <div className="header">Подготовка к собеседованиям</div>
          <div>
            Перед юридическим собеседованием на младшие позиции нужно быстро
            повторить большое количество теоретического материала и быть готовым
            решать практические задачи.
          </div>
          <button onClick={e => setShow(!show)}>
            {show ? "Скрыть курсы" : "Смотреть курсы"}
          </button>
        </Text>
      </Block>
      {show && (
        <RowStyles>
          {courses &&
            courses.map(coursePage => (
              <Course
                key={coursePage.id}
                id={coursePage.id}
                coursePage={coursePage}
                me={me}
              />
            ))}
        </RowStyles>
      )}
    </>
  );
};

export default InterviewCourses;
