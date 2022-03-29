import React from "react";
import styled from "styled-components";
import { useTranslation } from "next-i18next";

const Styles = styled.div`
  font-size: 1.6rem;
  span {
    border-bottom: 2px solid #f6a6ad;
    padding-bottom: 2px;
  }
  img {
    width: 100%;
  }
`;

const Final = (props) => {
  console.log(props.answers);
  let correct = props.answers.filter((a) => a !== false);
  let ratio = correct.length / props.tasks_number;
  const { t } = useTranslation("lesson");

  return (
    <Styles>
      <img src="/static/test_pattern.svg" />
      <p>
        {t("there_were")} {props.tasks_number} {t("questions")}
        <span>
          {" "}
          {correct.length} {t("correct_num")}
        </span>{" "}
      </p>
      {ratio < 0.8 ? <p>{t("once_more")}</p> : <div>{t("great")}</div>}
    </Styles>
  );
};

export default Final;
