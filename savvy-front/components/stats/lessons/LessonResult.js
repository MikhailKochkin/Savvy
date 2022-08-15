import React from "react";

const LessonResult = (props) => {
  console.log(1, props.res);
  let maxes = props.res.filter((r) => r.progress !== 0);

  // if (props.res.length > 0) {
  // maxes = props.res.reduce((prev, current) =>
  //   prev.progress > current.progress ? prev : current
  // );
  // }
  console.log("props.res", props.structure);
  return (
    <div>
      <div>
        Всего визитов: {maxes.length}
        {maxes.map((r) => (
          <li>
            {r.student.name} {r.student.surname} – {r.progress} /{" "}
            {props.structure.lessonItems.length}
          </li>
        ))}
      </div>
    </div>
  );
};

export default LessonResult;
