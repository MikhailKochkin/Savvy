import React from "react";
import { useState } from "react";
import Progress from "../components/progress/Progress";

const progress = () => {
  const [option, setOption] = useState("cjtreu3md00fp0897ga13aktp");

  return (
    <div>
      <select onChange={(e) => setOption(e.target.value)}>
        <option value="cjtreu3md00fp0897ga13aktp">
          Старт в Гражданском Праве (общая часть)
        </option>
        <option value="ckfy1q60a02f307281abcpgae">
          Введение в право интеллектуальной собственности
        </option>
        <option value="cktrbubdl2237dou9vzn1gb3w">
          Старт в юридическом английском
        </option>
        <option value="ck0pdit6900rt0704h6c5zmer">
          Legal English. Базовый уровень
        </option>
        <option value="ck2f2nk4007dw0785lhixfppw">
          Legal English. Продвинутый уровень
        </option>
        <option value="ck6mc531p02z20748kwpqnt7z">
          Legal English. Cложности юридического перевода
        </option>
        <option value="ck587y4kp00lf07152t0tyywl">
          Корпоративное право: основы работы с непубличными обществами
        </option>
        <option value="ckrza2r9a1377641guuzwhlgcb5">Сделки M&A</option>
        <option value="ckqut60ya145911gqj58c0qo8a">
          Основные инструменты договорной работы корпоративного юриста
        </option>
        <option value="ckt9rmh4e51981hp97uwp6rft">
          Как защитить интересы компании в арбитражном суде?
        </option>
      </select>
      <Progress courseId={option} />
    </div>
  );
};

export default progress;
