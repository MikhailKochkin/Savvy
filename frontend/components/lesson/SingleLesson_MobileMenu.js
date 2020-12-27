import React from "react";
import styled from "styled-components";
import Link from "next/link";

const ButtonZone = styled.div`
  width: 100%;
  align-content: left;
  background: white;
  @media (max-width: 800px) {
    text-align: center;
    background: none;
    align-content: center;
    padding-top: 3%;
    border-bottom: solid 1px #112a62;
  }
`;

const ChooseButton = styled.button`
  font-size: 1.5rem;
  padding: 1%;
  width: 100%;
  border: none;
  border-left: 1px solid white;
  padding-left: 8%;
  outline: none;
  font-family: Montserrat;
  background: none;
  text-align: left;
  padding-top: 1.4rem;
  padding-bottom: 1.4rem;
  cursor: pointer;
  &:hover {
    border-left: 1px solid #112a62;
  }
  @media (max-width: 800px) {
    border-left: 1px solid #112a62;
    color: white;
    &:hover {
      border-bottom: 1px solid white;
    }
  }
`;

const SingleLesson_MobileMenu = (props) => {
  const getDataMob = (e) => {
    e.preventDefault();
    const name = e.target.getAttribute("name");
    setPage(name);
  };
  return (
    <Styles>
      <div id="mySidenav2" className="sidenav">
        <a
          href="javascript:void(0)"
          className="closebtn"
          onClick={(e) => closeNav()}
        >
          &times;
        </a>
        <ButtonZone>
          <ChooseButton name="lesson" onClick={(e) => onSwitchMob(e)}>
            {" "}
            Урок{" "}
          </ChooseButton>
        </ButtonZone>
        {lesson.notes.length > 0 && (
          <ButtonZone>
            <ChooseButton name="note" onClick={(e) => onSwitchMob(e)}>
              {" "}
              Лонгриды{" "}
            </ChooseButton>
          </ButtonZone>
        )}
        {/* {lesson.documents.length > 0 && (
          <ButtonZone>
            <ChooseButton name="document" onClick={(e) => onSwitch(e)}>
              {" "}
              Документы{" "}
            </ChooseButton>
          </ButtonZone>
        )} */}
        {lesson.newTests.length > 0 && (
          <ButtonZone>
            <ChooseButton name="test" onClick={(e) => onSwitchMob(e)}>
              {" "}
              Тесты{" "}
            </ChooseButton>
          </ButtonZone>
        )}
        {lesson.quizes.length > 0 && (
          <ButtonZone>
            <ChooseButton name="quiz" onClick={(e) => onSwitchMob(e)}>
              {" "}
              Вопросы{" "}
            </ChooseButton>
          </ButtonZone>
        )}
        {/* {lesson.problems.length > 0 && (
          <ButtonZone>
            <ChooseButton name="problem" onClick={(e) => onSwitchMob(e)}>
              {" "}
              Задачи{" "}
            </ChooseButton>
          </ButtonZone>
        )}
        {lesson.constructions.length > 0 && (
          <ButtonZone>
            <ChooseButton name="constructor" onClick={(e) => onSwitchMob(e)}>
              {" "}
              Конструкторы{" "}
            </ChooseButton>
          </ButtonZone>
        )}
        {lesson.texteditors.length > 0 && (
          <ButtonZone>
            <ChooseButton name="textEditor" onClick={(e) => onSwitchMob(e)}>
              {" "}
              Редакторы{" "}
            </ChooseButton>
          </ButtonZone>
        )}
        {lesson.exams.length > 0 && (
          <ButtonZone>
            <ChooseButton name="exam" onClick={(e) => onSwitchMob(e)}>
              {" "}
              Экзамены{" "}
            </ChooseButton>
          </ButtonZone>
        )} */}
      </div>
    </Styles>
  );
};

export default SingleLesson_MobileMenu;
