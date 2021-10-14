import { useState } from "react";
import LessonHeader from "./LessonHeader";
import { useUser } from "../../User";
import styled from "styled-components";
import Mod from "./Mod";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f4f8fc;
  padding: 50px 0;
`;

const LessonStyles = styled.div`
  width: 65%;
  margin: 2% 4%;
  background-color: #fff;
  @media (max-width: 1000px) {
    width: 90%;
    min-width: 100px;
  }
`;

const Total = styled.div`
  font-size: 2rem;
  margin: 10px 0;
  margin-bottom: 20px;
  margin-right: 35px;
  display: flex;
  flex-direction: row;
  .number {
    width: 55px;
    height: 35px;
    background-color: black;
    color: #fff;
    margin-right: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 50px;
  }

  @media (max-width: 800px) {
    font-size: 1.8rem;
    margin-bottom: 6%;
    width: 100%;
  }
`;

const Lessons = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  @media (max-width: 800px) {
  }
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  .details {
    margin: 40px 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 60%;
  }
  @media (max-width: 800px) {
    flex-direction: column;
    .details {
      margin: 10px 0;
      width: 100%;
    }
  }
`;

const LessonsInfo = styled.div`
  margin-top: 2%;
  padding: 0 60px;
  h2 {
    text-align: left;
    font-weight: 400;
    font-size: 4rem;
    line-height: 1.4;
    width: 40%;
    margin: 40px 0;
  }
  h3 {
    font-weight: 600;
    font-size: 2.8rem;
  }
  .week {
    font-size: 1.6rem;
    font-weight: bold;
    margin: 1% 0;
    margin-top: 20px;
  }
  @media (max-width: 800px) {
    padding: 0 20px;
    h2 {
      font-size: 3.2rem;
      margin: 30px 0;
    }
  }
`;

const CoursePage = (props) => {
  const [page, setPage] = useState("lessons");
  const me = useUser();

  const getNoun = (number, one, two, five) => {
    let n = Math.abs(number);
    n %= 100;
    if (n >= 5 && n <= 20) {
      return five;
    }
    n %= 10;
    if (n === 1) {
      return one;
    }
    if (n >= 2 && n <= 4) {
      return two;
    }
    return five;
  };

  return (
    <>
      <div id="root"></div>
      <>
        <Container id="syllabus">
          <LessonStyles>
            <LessonsInfo>
              <Header>
                <h2>Программа</h2>
                <div className="details">
                  <Total>
                    {" "}
                    <div className="number">
                      {props.data.syllabus.time}
                    </div>{" "}
                    <div>
                      {getNoun(
                        props.data.syllabus.time,
                        "месяц",
                        "месяца",
                        "месяцев"
                      )}{" "}
                      занятий
                    </div>
                  </Total>
                  <Total>
                    {" "}
                    <div className="number">
                      {props.data.syllabus.modules.length}
                    </div>{" "}
                    <div>
                      {getNoun(
                        props.data.syllabus.modules.length,
                        "модуль",
                        "модуля",
                        "модулей"
                      )}
                    </div>
                  </Total>
                  <Total>
                    {" "}
                    <div className="number">
                      {props.data.syllabus.lessons}
                    </div>{" "}
                    <div>
                      {getNoun(
                        props.data.syllabus.lessons,
                        "урок",
                        "урока",
                        "уроков"
                      )}
                    </div>
                  </Total>
                  <Total>
                    {" "}
                    <div className="number">
                      {props.data.syllabus.webinars}
                    </div>{" "}
                    <div>
                      практических{" "}
                      {getNoun(
                        props.data.syllabus.webinars,
                        "вебинар",
                        "вебинара",
                        "вебинаров"
                      )}
                    </div>
                  </Total>
                </div>
              </Header>
              <h3>Модули</h3>
              <>
                <Lessons>
                  {[...props.data.syllabus.modules].map((mod, index) => (
                    <Mod mod={mod} index={index} />
                  ))}
                </Lessons>
              </>
            </LessonsInfo>
          </LessonStyles>
        </Container>
      </>
    </>
  );
};

// export default withTranslation("course")(CoursePage);
export default CoursePage;
