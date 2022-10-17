import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";

import LessonElement from "./LessonElement";

const CreateLessons = (props) => {
  const router = useRouter();
  const { pathname, asPath, query, locale } = router;
  const [lessons, setLessons] = useState([
    {
      id: "df734y31ff3",
      name: "",
      description: "",
      comment:
        locale == "ru"
          ? "Хорошая идея – начать курс со знакомства с участниками. Это можно сделать двумя способами: можно проверить имеющиеся знания с помощью испытания или собрать информацию об аудитории с помощью урока-знакомства. Сейчас можно просто дать названия и описание уроку, а, как его составить, мы уже покажем при создании урока. "
          : "It is a good idea to start the course by getting to know the students. This can be done in two ways: you can test their existing knowledge with a test, or you can gather information about the students using the forms. Now you can simply give a title and a description of the lesson.",
    },
    {
      id: "dfsdqfe4rfq3f4",
      name: "",
      description: "",
      comment:
        locale == "ru"
          ? "С этого урока можно начинать обучать. Пропишите в этом и последующих уроках, чему мы научим студентов."
          : "With this lesson you can start teaching. Write down learning objectives for every lesson.",
    },
    {
      id: "dvnjweri1243",

      name: "",
      description: "",
      comment:
        locale == "ru"
          ? "Давайте в конце курса дадим студентам практическое задание, которое можете проверить вы или обсудить на вебинаре."
          : "Let's now give the students a practical assignment, which you can check or discuss at a webinar.",
    },
    {
      id: "wooeri123errifw",
      name: "",
      description: "",
      comment:
        locale == "ru"
          ? "Финальное испытание проверит, чему студенты научились за курс."
          : "Give the final test to check what the students have learned.",
    },
    {
      id: "ewrqreo1mrmeveqv",
      name: "",
      description: "",
      comment:
        locale == "ru"
          ? "Можем провести вебинар, чтобы обсудить итоги курса. Если хотите, можете добавить вебинары еще в начале или середине курса."
          : "You can also host a webinar to discuss the outcomes of the course. You can also host webinars at the beginning or in the middle of the course.",
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
