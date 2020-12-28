import { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import DeleteSingleLesson from "../delete/DeleteSingleLesson";

const MenuPart = styled.div`
  display: flex;
  flex-basis: 25%;
  flex-direction: column;
  margin-left: 1rem;
  border-radius: 2px;
  @media (max-width: 800px) {
    display: ${(props) => (props.shown ? "block" : "none")};
    order: 1;
    margin: 1%;
    position: absolute;
    top: 200px;
    z-index: 10;
    margin-right: -100%;
    width: 100%;
    animation-name: fadein;
    animation-duration: 1.5s;
    @keyframes fadein {
      from {
        right: 650px;
      }
      to {
        right: 350px;
      }
    }
  }
`;

const Sticky = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 20px;
`;

const NavPart = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 20px 0;
  @media (max-width: 800px) {
    width: 50%;
    order: 0;
    background: #112a62;
    align-items: left;
    justify-content: left;
    align-content: left;
  }
`;

const TeacherPart = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 1rem;
  background: white;
  @media (max-width: 800px) {
    display: none;
  }
`;

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

const SingleLesson_Menu = (props) => {
  const [shown, setShown] = useState(true);
  const onSwitch = (e) => {
    e.preventDefault();
    const name = e.target.getAttribute("name");
    props.getData(name);
  };
  const { lesson, me } = props;
  return (
    <MenuPart shown={shown}>
      <Sticky>
        <NavPart>
          <ButtonZone>
            <ChooseButton name="lesson" onClick={(e) => onSwitch(e)}>
              {" "}
              Модель урока{" "}
            </ChooseButton>
          </ButtonZone>
          {lesson.shots.length > 0 && (
            <ButtonZone>
              <ChooseButton name="shots" onClick={(e) => onSwitch(e)}>
                {" "}
                Алгоритм{" "}
              </ChooseButton>
            </ButtonZone>
          )}
          {/* {lesson.forum && (
              <ButtonZone>
                <ChooseButton name="forum" onClick={onSwitch}>
                  {" "}
                  Форум{" "}
                </ChooseButton>
              </ButtonZone>
            )} */}
          {lesson.notes.length > 0 && (
            <ButtonZone>
              <ChooseButton name="note" onClick={(e) => onSwitch(e)}>
                {" "}
                Заметки{" "}
              </ChooseButton>
            </ButtonZone>
          )}
          {lesson.documents.length > 0 && (
            <ButtonZone>
              <ChooseButton name="document" onClick={(e) => onSwitch(e)}>
                {" "}
                Документы{" "}
              </ChooseButton>
            </ButtonZone>
          )}
          {lesson.newTests.length > 0 && (
            <ButtonZone>
              <ChooseButton name="test" onClick={(e) => onSwitch(e)}>
                {" "}
                Тесты{" "}
              </ChooseButton>
            </ButtonZone>
          )}
          {lesson.quizes.length > 0 && (
            <ButtonZone>
              <ChooseButton name="quiz" onClick={(e) => onSwitch(e)}>
                {" "}
                Вопросы{" "}
              </ChooseButton>
            </ButtonZone>
          )}
          {lesson.problems.length > 0 && (
            <ButtonZone>
              <ChooseButton name="problem" onClick={onSwitch}>
                {" "}
                Задачи{" "}
              </ChooseButton>
            </ButtonZone>
          )}
          {lesson.constructions.length > 0 && (
            <ButtonZone>
              <ChooseButton name="constructor" onClick={onSwitch}>
                {" "}
                Конструкторы{" "}
              </ChooseButton>
            </ButtonZone>
          )}
          {lesson.texteditors.length > 0 && (
            <ButtonZone>
              <ChooseButton name="textEditor" onClick={onSwitch}>
                {" "}
                Редакторы{" "}
              </ChooseButton>
            </ButtonZone>
          )}
          {/*  {lesson.exams.length > 0 && (
              <ButtonZone>
                <ChooseButton name="exam" onClick={onSwitch}>
                  {" "}
                  Экзамены{" "}
                </ChooseButton>
              </ButtonZone>
            )} */}
        </NavPart>
        {me && (lesson.user.id === me.id || me.permissions.includes("ADMIN")) && (
          <TeacherPart>
            <ButtonZone>
              <ChooseButton name="updateLesson" onClick={onSwitch}>
                Изменить урок
              </ChooseButton>
            </ButtonZone>
            <ButtonZone>
              <ChooseButton name="createTest" onClick={onSwitch}>
                Новый тест
              </ChooseButton>
            </ButtonZone>
            <ButtonZone>
              <ChooseButton name="createForum" onClick={onSwitch}>
                Включить форум
              </ChooseButton>
            </ButtonZone>

            <ButtonZone>
              <ChooseButton name="createNote" onClick={onSwitch}>
                Новый лонгрид
              </ChooseButton>
            </ButtonZone>

            <ButtonZone>
              <ChooseButton name="createDocument" onClick={onSwitch}>
                Новый документ
              </ChooseButton>
            </ButtonZone>

            <ButtonZone>
              <ChooseButton name="createShot" onClick={onSwitch}>
                Новый алгоритм
              </ChooseButton>
            </ButtonZone>

            <ButtonZone>
              <ChooseButton name="createQuiz" onClick={onSwitch}>
                Новый вопрос
              </ChooseButton>
            </ButtonZone>

            <ButtonZone>
              <ChooseButton name="createProblem" onClick={onSwitch}>
                Новая задача
              </ChooseButton>
            </ButtonZone>

            <ButtonZone>
              <ChooseButton name="createConstructor" onClick={onSwitch}>
                Новый конструктор
              </ChooseButton>
            </ButtonZone>
            <ButtonZone>
              <ChooseButton name="createTextEditor" onClick={onSwitch}>
                Новый редактор
              </ChooseButton>
            </ButtonZone>
            <ButtonZone>
              <ChooseButton name="createExam" onClick={onSwitch}>
                Новый экзамен
              </ChooseButton>
            </ButtonZone>

            <ButtonZone>
              <DeleteSingleLesson
                id={lesson.id}
                coursePageID={lesson.coursePage.id}
              />
            </ButtonZone>
          </TeacherPart>
        )}
      </Sticky>
    </MenuPart>
  );
};

export default SingleLesson_Menu;
