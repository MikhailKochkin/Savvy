import React, { Component } from "react";
import renderHTML from "react-render-html";
import styled from "styled-components";
import { useTranslation } from "next-i18next";

const Box = styled.div`
  border-bottom: 1px solid grey;
  ins {
    text-decoration: none;
    background: #edffe7;
    /* padding: 0.5% 0.3%; */
  }
  del {
    background: #f6b7bc;
  }
`;

const Feedback = (props) => {
  const { t } = useTranslation("course");
  const { feedback } = props;
  return (
    <Box>
      <>
        <h4>
          {t("lesson")} {feedback.lesson.number}. {feedback.lesson.name}
        </h4>
        {renderHTML(feedback.text)}
      </>
    </Box>
  );
};

export default Feedback;
