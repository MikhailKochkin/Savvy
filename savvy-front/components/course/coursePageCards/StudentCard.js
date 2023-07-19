import React, { Component } from "react";
import styled from "styled-components";
import CreateCertificate from "../CreateCertificate";

const Payment = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: #ffffff;
  box-sizing: border-box;
  border-radius: 10px;
  width: 350px;
  min-height: 190px;
  padding: 2% 4%;
  @media (max-width: 800px) {
    width: 310px;
  }

  .results {
    padding: 3% 0;
    h2 {
      font-weight: bold;
      font-size: 2.2rem;
      margin: 0;
      margin-bottom: 30px;
    }
  }
  .news {
    padding: 3% 0;
    border-bottom: 1px solid #e4e4e4;
  }
  .final {
    padding: 3% 0;
  }
  .bar {
    height: 5px;
    width: 100%;
    background: #b6bce2;
  }
  .numbers {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .quote {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    img {
      width: 30px;
      height: 30px;
      object-fit: cover;
      border-radius: 50px;
    }
    .imessage {
      background-color: #fff;
      border-radius: 0.25rem;
      display: flex;
      flex-direction: column;
      margin: 0 auto 1rem;
      max-width: 600px;
      padding: 0.5rem 1.5rem;
    }

    .imessage p {
      border-radius: 1.15rem;
      line-height: 1.25;
      max-width: 100%;
      padding: 0.5rem 0.875rem;
      position: relative;
      word-wrap: break-word;
    }

    .imessage p::before,
    .imessage p::after {
      bottom: -0.1rem;
      content: "";
      height: 1rem;
      position: absolute;
    }

    p.from-me {
      align-self: flex-end;
      background-color: #248bf5;
      color: #fff;
    }

    p.from-me::before {
      border-bottom-left-radius: 0.8rem 0.7rem;
      border-right: 1rem solid #248bf5;
      right: -0.35rem;
      transform: translate(0, -0.1rem);
    }

    p.from-me::after {
      background-color: #fff;
      border-bottom-left-radius: 0.5rem;
      right: -40px;
      transform: translate(-30px, -2px);
      width: 10px;
    }

    p[class^="from-"] {
      margin: 0.5rem 0;
      width: fit-content;
    }

    p.from-me ~ p.from-me {
      margin: 0.25rem 0 0;
    }

    p.from-me ~ p.from-me:not(:last-child) {
      margin: 0.25rem 0 0;
    }

    p.from-me ~ p.from-me:last-child {
      margin-bottom: 0.5rem;
    }

    p.from-them {
      align-items: flex-start;
      background-color: #e5e5ea;
      color: #000;
    }

    p.from-them:before {
      border-bottom-right-radius: 0.8rem 0.7rem;
      border-left: 1rem solid #e5e5ea;
      left: -0.35rem;
      transform: translate(0, -0.1rem);
    }

    p.from-them::after {
      background-color: #fff;
      border-bottom-right-radius: 0.5rem;
      left: 20px;
      transform: translate(-30px, -2px);
      width: 10px;
    }

    p[class^="from-"].emoji {
      background: none;
      font-size: 2.5rem;
    }

    p[class^="from-"].emoji::before {
      content: none;
    }

    .no-tail::before {
      display: none;
    }

    .margin-b_none {
      margin-bottom: 0 !important;
    }

    .margin-b_one {
      margin-bottom: 1rem !important;
    }

    .margin-t_one {
      margin-top: 1rem !important;
    }

    /* general styling */
    @font-face {
      font-family: "SanFrancisco";
      src: url("https://cdn.rawgit.com/AllThingsSmitty/fonts/25983b71/SanFrancisco/sanfranciscodisplay-regular-webfont.woff2")
          format("woff2"),
        url("https://cdn.rawgit.com/AllThingsSmitty/fonts/25983b71/SanFrancisco/sanfranciscodisplay-regular-webfont.woff")
          format("woff");
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
      font-weight: normal;
      margin: 0;
    }

    .container {
      margin: 0 auto;
      max-width: 600px;
      padding: 1rem;
    }

    h1 {
      font-weight: normal;
      margin-bottom: 0.5rem;
    }

    h2 {
      border-bottom: 1px solid #e5e5ea;
      color: #666;
      font-weight: normal;
      margin-top: 0;
      padding-bottom: 1.5rem;
    }

    .comment {
      color: #222;
      font-size: 1.25rem;
      line-height: 1.5;
      margin-bottom: 1.25rem;
      max-width: 100%;
      padding: 0;
    }

    @media screen and (max-width: 800px) {
      body {
        margin: 0 0.5rem;
      }

      .container {
        padding: 0.5rem;
      }

      .imessage {
        font-size: 1.05rem;
        margin: 0 auto 1rem;
        max-width: 600px;
        padding: 0.25rem 0.875rem;
      }

      .imessage p {
        margin: 0.5rem 0;
      }
    }
  }
`;

const Result = styled.div`
  width: ${(props) => props.progress};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media (max-width: 800px) {
  }
`;

const Full = styled.div`
  width: ${(props) => props.progress};
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-bottom: 40px;
  @media (max-width: 800px) {
  }
`;

const Button = styled.button`
  padding: 1.5% 3%;
  margin-top: 2%;
  font-size: 1.6rem;
  width: 50%;
  font-weight: 600;
  color: #fffdf7;
  background: ${(props) => props.theme.green};
  border: solid 1px white;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
  &:active {
    background: ${(props) => props.theme.darkGreen};
  }
  @media (max-width: 800px) {
    width: 40%;
  }
`;

const Progress = styled.div`
  height: 5px;
  background: #3f51b5;
  width: ${(props) => props.progress};
  border-height: 15px;
  transition: all 0.5s;
`;

class StudentCard extends Component {
  render() {
    const { coursePage, me, lessonResults } = this.props;
    // 0. Put all lesson results in an array
    // let lessonResults = [];
    // coursePage.lessons.map((lesson) =>
    //   lessonResults.push(lesson.lessonResults)
    // );
    // // 1. leave only the results of the current user
    // const newlessonResults = lessonResults.map((result) =>
    //   result.filter((result) => result.student.id === me.id)
    // );
    // 2. See how many lessons the currents user has attended
    let status = 0;
    lessonResults.map((res) => (res.progress > 1 ? status++ : status));
    // 3. Generate the ratio which is used to determine
    // whether the student can complete the final task
    let ratio =
      (status * 100) /
      coursePage.lessons.filter((l) => l.type.toLowerCase() !== "hidden")
        .length;
    let left =
      coursePage.lessons.filter((l) => l.type.toLowerCase() !== "hidden")
        .length - status;

    let my_certificate = me.certificates.find(
      (certificate) => certificate.coursePage.id === coursePage.id
    );
    return (
      <Payment>
        {/* <div className="news">
          <div>
            <span>Новости курса</span>
          </div>
          <div>{coursePage.news}</div>
        </div> */}
        <div className="results">
          <h2>Results</h2>
          <div className="bar">
            <Progress
              className="progress"
              progress={
                parseInt(
                  100 *
                    (status /
                      coursePage.lessons.filter(
                        (l) => l.type.toLowerCase() !== "hidden"
                      ).length)
                ) + "%"
              }
            ></Progress>
          </div>
          <div className="numbers">
            <Result
              className="result"
              progress={
                parseInt(
                  100 *
                    (status /
                      coursePage.lessons.filter(
                        (l) => l.type.toLowerCase() !== "hidden"
                      ).length)
                ) + "%"
              }
            >
              {/* <div>1</div> */}
              <div>{status}</div>
            </Result>
            <Full
              className="full"
              progress={
                parseInt(
                  100 -
                    100 *
                      (status /
                        coursePage.lessons.filter(
                          (l) => l.type.toLowerCase() !== "hidden"
                        ).length)
                ) + "%"
              }
            >
              {" "}
              <div>
                {
                  coursePage.lessons.filter(
                    (l) => l.type.toLowerCase() !== "hidden"
                  ).length
                }
              </div>
            </Full>
          </div>
          {/* {ratio < 33 && (
            <div className="quote">
              <div className="imessage">
                <p class="from-me">
                  У вас все получится! Вы же не из тех, кто бросает онлайн курс
                  в самом начале?"
                </p>
              </div>
              <img src="https://res.cloudinary.com/mkpictureonlinebase/image/upload/v1625686040/savvy/%D0%9C%D0%B8%D1%88%D0%B0_1_kdulb7.png" />
            </div>
          )}
          {ratio > 33 && ratio < 66 && (
            <div className="quote">
              <div className="imessage">
                <p class="from-me">
                  Вы в середине пути. Уверен, что у вас получится дойти до
                  конца!
                </p>
              </div>
              <img src="https://res.cloudinary.com/mkpictureonlinebase/image/upload/v1625686040/savvy/%D0%9C%D0%B8%D1%88%D0%B0_1_kdulb7.png" />
            </div>
          )}
          {ratio > 66 && ratio < 85 && (
            <div className="quote">
              <div className="imessage">
                <p class="from-me">
                  {" "}
                  Отличная работа! Осталась совсем чуть-чуть. Поднажмите!
                </p>
              </div>
              <img src="https://res.cloudinary.com/mkpictureonlinebase/image/upload/v1625686040/savvy/%D0%9C%D0%B8%D1%88%D0%B0_1_kdulb7.png" />
            </div>
          )}
          {ratio >= 85 && (
            <div className="quote">
              <div className="imessage">
                <p class="from-me">
                  {" "}
                  Курс пройден. Сертификакт о его прохождении уже ждет вас
                  внизу!
                </p>
              </div>
              <img src="https://res.cloudinary.com/mkpictureonlinebase/image/upload/v1625686040/savvy/%D0%9C%D0%B8%D1%88%D0%B0_1_kdulb7.png" />
            </div>
          )} */}
        </div>
        {/* {coursePage.examQuestion && (
          <div className="final">
            <span>Финальное задание</span>
            {ratio < 100 && (
              <div>
                Пройдите еще {left}
                {left === 1 && " урок"}
                {left > 1 && left < 5 && " урока"}
                {left > 4 && " уроков"}
              </div>
            )}
            {ratio === 100 && (
              <Link
                href={{
                  pathname: "/examAnswer",
                  query: { id: coursePage.id }
                }}
              >
                <Button>Начать</Button>
              </Link>
            )}
          </div>
        )} */}
        {ratio > 85 && my_certificate && (
          <button>
            <a
              href={`https://besavvy.app/certificate?id=${my_certificate.id}`}
              target="_blank"
            >
              Открыть мой сертификат
            </a>
          </button>
        )}
        {ratio > 85 && !my_certificate && (
          <CreateCertificate coursePageId={coursePage.id} studentId={me.id} />
        )}
      </Payment>
    );
  }
}

export default StudentCard;
