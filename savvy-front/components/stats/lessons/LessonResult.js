import React from "react";

const LessonResult = (props) => {
  return (
    <div>
      <div>Всего визитов: {props.res.length}</div>
      <div>
        Всего ненулевых визитов:{" "}
        {props.res.filter((r) => r.progress !== 0).length}
      </div>
    </div>
  );
};

export default LessonResult;
