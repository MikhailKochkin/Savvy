import React from "react";
import LessonResults from "../stats/lessons/LessonResults";

const LessonsData = () => {
  let lessons = [
    {
      name: "Введение в юридический перевод",
      id: "ck6nftvl101d90757yflepopx",
      coursePageId: "ck6mc531p02z20748kwpqnt7z",
      structure: { lessonItems: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
    },
    {
      name: "Компетенция арбитражных судов",
      id: "cl657y8dc42041hylqjugrjc8",
      coursePageId: "ckt9rmh4e51981hp97uwp6rft",
      structure: {
        lessonItems: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
        ],
      },
    },
    {
      name: "Due Diligence",
      id: "cks068xc0143811gv9xxwjspvx",
      coursePageId: "ckrza2r9a1377641guuzwhlgcb5",
      structure: {
        lessonItems: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
        ],
      },
    },
  ];
  return (
    <div>
      <h3>Результаты открытых уроков</h3>
      {lessons.map((les, i) => (
        <>
          <h4>
            {i + 1}. {les.name}
          </h4>
          <LessonResults
            id={les.id}
            coursePageId={les.coursePageId}
            structure={les.structure}
          />
        </>
      ))}
    </div>
  );
};

export default LessonsData;
