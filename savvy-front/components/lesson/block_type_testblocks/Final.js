import React from "react";
import styled from "styled-components";
import { useTranslation } from "next-i18next";
import parse from "html-react-parser";

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
  let correct = props.answers.filter((a) => a !== false);
  let ratio = correct.length / props.tasks_number;
  const { t } = useTranslation("lesson");

  return (
    <Styles>
      <img src="/static/test_pattern.svg" />
      <p>
        {t("there_were")}: {props.tasks_number}.{" "}
        <span>
          {t("correct_num")}: {correct.length}
        </span>{" "}
      </p>
      {ratio < 0.8 ? (
        <div>
          {props.failureText ? parse(props.failureText) : t("once_more")}
        </div>
      ) : (
        <div>{props.successText ? parse(props.successText) : t("great")}</div>
      )}
    </Styles>
  );
};

export default Final;
