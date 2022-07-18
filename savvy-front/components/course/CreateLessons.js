import { useState } from "react";
import LessonElement from "./LessonElement";
import { v4 as uuidv4 } from "uuid";

const CreateLessons = (props) => {
  const [lessons, setLessons] = useState([
    {
      id: "df734y31ff3",
      name: "",
      description: "",
      comment:
        "Хорошая идея – начать курс со знакомства с участниками. Это можно сделать двумя способами: можно проверить имеющиеся знания с помощью испытания или собрать информацию об аудитории с помощью урока-знакомства. Сейчас можно просто дать названия и описание уроку, а, как его составить, мы уже покажем при создании урока. ",
    },
    {
      id: "dfsdqfe4rfq3f4",
      name: "",
      description: "",
      comment:
        "С этого урока можно начинать обучать. Пропишите в этом и последующих уроках, чему мы научим студентов.",
    },
    {
      id: "dvnjweri1243",

      name: "",
      description: "",
      comment:
        "Давайте в конце курса дадим студентам практическое задание, которое можете проверить вы или обсудить на вебинаре.",
    },
    {
      id: "wooeri123errifw",
      name: "",
      description: "",
      comment: "Финальное испытание проверит, чему студенты научились за курс.",
    },
    {
      id: "ewrqreo1mrmeveqv",
      name: "",
      description: "",
      comment:
        "Можем провести вебинар, чтобы обсудить итоги курса. Если хотите, можете добавить вебинары еще в начале или середине курса.",
    },
  ]);

  const addLesson = (id, i) => {
    let new_elements = [...lessons];
    const index = new_elements.findIndex((object) => {
      return object.id === id;
    });
    new_elements.splice(i + 1, 0, { id: uuidv4(), name: "", description: "" });
    setLessons([...new_elements]);
  };

  const removeLesson = (id, i) => {
    let new_list = [...lessons];
    let new_list2 = new_list.filter((el) => el.id != id);
    setLessons([...new_list2]);
  };

  return (
    <div>
      {lessons.map((l, i) => (
        <LessonElement
          key={l.id}
          courseId={props.courseId}
          number={i}
          lesson={l}
          addLesson={addLesson}
          removeLesson={removeLesson}
        />
      ))}
    </div>
  );
};

export default CreateLessons;
