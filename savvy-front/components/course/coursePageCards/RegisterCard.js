import React, { useState, useEffect } from "react";
import styled from "styled-components";
import EnrollCoursePage from "../../EnrollCoursePage";
import ReactResizeDetector from "react-resize-detector";
import { useTranslation } from "next-i18next";

const Data = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 20px 0;
  @media (max-width: 800px) {
    flex-direction: column;
    width: 100%;
    padding: 3%;
  }
`;

const Payment = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  background: #ffffff;
  box-sizing: border-box;
  width: 350px;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const Part1 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .message {
    text-align: center;
    margin-bottom: 10%;
    margin: 0 10px;
    font-size: 1.6rem;
  }
`;

const Part2 = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Text = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 200px;
`;

const Paid = styled.div`
  background: #fdf3c8;
  padding: 1% 3%;
  border-radius: 5px;
  font-size: 1.4rem;
  margin-top: 2%;
`;

const RegisterCard = (props) => {
  const { t } = useTranslation("course");
  const [width, setWidth] = useState(800);

  const onResize = (width) => {
    setWidth(width);
  };

  const { coursePage, me, studentsArray, subjectArray } = props;
  let applied;
  me &&
  me.orders.filter(
    (o) => o.coursePage.id === coursePage.id && o.isPaid === null
  ).length > 0
    ? (applied = true)
    : (applied = false);

  return (
    <>
      <ReactResizeDetector handleWidth handleHeight onResize={onResize} />
      <Data>
        <Payment>
          <Text>
            <Part1>
              {(coursePage.courseType === "PUBLIC" ||
                coursePage.courseType === "CHALLENGE") && (
                <>
                  <div className="message">{t("open_course")}</div>
                </>
              )}
              {(coursePage.courseType === "PRIVATE" ||
                coursePage.courseType === "FORMONEY") && (
                <div className="message">{t("private_course")}</div>
              )}
            </Part1>
            <Part2>
              {applied && <Paid>{t("applied")}</Paid>}
              {me && (
                <>
                  {/* {coursePage.courseType !== "FORMONEY" && ( */}
                  <EnrollCoursePage
                    coursePage={coursePage}
                    studentsArray={studentsArray}
                    subjectArray={subjectArray}
                    meData={me}
                  />
                  {/* )} */}
                </>
              )}
            </Part2>
          </Text>
        </Payment>
      </Data>
    </>
  );
};

export default RegisterCard;
