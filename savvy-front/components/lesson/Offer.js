import React, { useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";
import AnswerOption from "./tests/AnswerOption";
// import { CURRENT_USER_QUERY } from "../User";
// import { withTranslation } from "../../i18n";

const CREATE_ORDER_MUTATION = gql`
  mutation createOrder(
    $coursePageId: String!
    $userId: String!
    $price: Int!
    $promocode: String
    $comment: String
  ) {
    createOrder(
      coursePageId: $coursePageId
      price: $price
      userId: $userId
      promocode: $promocode
      comment: $comment
    ) {
      order {
        id
        paymentID
      }
      url
    }
  }
`;

const IconBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  .icon {
    margin: 5px;
    border-radius: 50%;
    height: 55px;
    width: 55px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .name {
    font-size: 1.2rem;
    text-align: center;
    color: #8f93a3;
    max-width: 80px;
    margin: 0 7px;
  }
`;

const Options = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  min-width: 60%;
  max-width: 80%;
`;

const Styles = styled.div`
  width: 650px;
  margin: 50px 0;
  /* width: ${(props) => props.width}; */
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const TextBar = styled.div`
  width: ${(props) => (props.story ? "100%" : "100%")};
  font-size: 1.6rem;
  padding-bottom: 2%;
  ul {
    list-style-type: none;
    padding-left: 0px;
  }
  a {
    border-bottom: 2px solid #26ba8d;
    padding: 0;
    transition: 0.3s;
    cursor: pointer;
  }
  .question {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-bottom: 20px;
  }
  .question_name {
    margin-left: 5px;
    background: #00204e;
    color: white;
    border-radius: 50%;
    padding: 2%;
    height: 55px;
    width: 55px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .question_text {
    background: #f3f3f3;
    color: black;
    border-radius: 25px;
    padding: 2% 5%;
    min-width: 40%;
    max-width: 70%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    p {
      margin: 5px 0;
    }
    img {
      width: 100%;
    }
  }
  .answer {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
  }
  .answer_name {
    margin-right: 10px;
    background: #00204e;
    color: white;
    border-radius: 50%;
    padding: 2%;
    height: 55px;
    width: 55px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .answer_test {
    width: 50%;
    border: 2px solid;
    border-color: #f3f3f3;
    border-radius: 25px;
    padding: 2% 5%;
    margin-bottom: 20px;
  }
  @media (max-width: 800px) {
    width: 100%;
    padding-left: 5px;
  }
`;

const Question = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin: 40px 0;
  .question_name {
    margin-left: 5px;
    background: #00204e;
    color: white;
    border-radius: 50%;
    padding: 2%;
    height: 55px;
    width: 55px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .question_text {
    background: #f3f3f3;
    border: 2px solid;
    border-color: ${(props) => props.inputColor};
    color: black;
    border-radius: 25px;
    padding: 2% 5%;
    min-width: 40%;
    max-width: 70%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    #buttons {
      margin-top: 10px;
    }
    button {
      width: 100%;
      font-family: Montserrat;
      font-size: 1.6rem;
      color: white;
      height: 45px;
      border-radius: 5px;
      margin-bottom: 10px;
      cursor: pointer;
      transition: 0.2s ease-in;
    }
    .main {
      border: 1px solid #fa8334;
      background: #fa8334;
      &:hover {
        background: #d17537;
        border: 1px solid #d17537;
      }
    }
    .second {
      border: 1px solid #429ea6;
      background: #429ea6;
      &:hover {
        background: #357378;
        border: 1px solid #357378;
      }
    }
    p {
      margin: 5px 0;
    }
    img {
      width: 100%;
    }
  }
`;

const Group = styled.div`
  display: ${(props) => (props.answerState === "right" ? "none" : "flex")};
  flex-direction: row;
  justify-content: center;
  width: 100%;
  padding: 0.5%;
  margin: 0;
  margin-bottom: 3%;
`;

const MiniButton = styled.div`
  pointer-events: ${(props) =>
    props.answerState === "right" ? "none" : "auto"};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 60%;
  text-align: center;
  background: #d2edfd;
  border-radius: 5px;
  color: #000a60;
  border: none;
  padding: 0.5% 0;
  margin-top: 20px;
  font-size: 1.6rem;
  display: ${(props) => (props.answerState === "right" ? "none" : "block")};
  &:hover {
    background: #a5dcfe;
  }
`;

const OptionsGroup = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  min-width: 60%;
  max-width: 80%;
  margin-bottom: 20px;
`;

const Option = styled.div`
  display: inline-block;
  vertical-align: middle;
  border: 1px solid #c4c4c4;
  padding: 10px 15px;
  cursor: pointer;
  margin-right: 3%;
  margin-bottom: 2%;
  height: 50px;
`;

const SingleTest = (props) => {
  const [answerState, setAnswerState] = useState("think"); // is the answer of the student correct?
  const [answerOptions, setAnswerOptions] = useState(props.length); // how many test options do we have?
  const [answer, setAnswer] = useState([]); // what is the answer?
  const [attempts, setAttempts] = useState(0); // how many attempts to answer correctly did the student make?
  const [inputColor, setInputColor] = useState("#f3f3f3");
  const [update, setUpdate] = useState(false);
  const [sent, setSent] = useState(false);
  const [zero, setZero] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [reveal, setReveal] = useState("");

  const { asPath } = useRouter();

  const getTestData = (number, answer) => {
    handleAnswerSelected(number, answer);
  };

  const handleAnswerSelected = async (number, student_answer) => {
    // 1. Create an array with true / false values to compare the answer of the student and the author
    let answerVar = answerOptions;
    console.log("answerVar", answerVar);
    // 2. Which option did the student choose?
    let int = parseInt(number);
    console.log("int", int);

    // 3. Change the true / false value from step 1 according to the answer of the student in step 2
    answerVar[int] = !answerVar[int];
    // 4. get the array of all the answers of the student
    let answerText = answer;
    // 5. check if the student chose or singled out the option
    function change() {
      if (!answerText.includes(student_answer)) {
        answerText.push(student_answer);
      } else if (answerText.includes(student_answer)) {
        var index = answerText.indexOf(student_answer);
        answerText.splice(index, 1);
      }
    }
    const res = await change();
    //6. save the results
    const res1 = await setAnswerOptions(answerVar);
    const res2 = await setAnswer(answerText);
  };

  const onSend = async () => {
    const res = () => {
      if (JSON.stringify(answerOptions) == JSON.stringify(props.true)) {
        setAnswerState("right");
        // 1. if the data is sent for the first time
        if (props.getData) {
          // 2. and if this quiz is a part of an exam
          props.getData(
            props.next && props.next.true
              ? [true, props.next.true]
              : [true, { type: "finish" }],
            "true"
          );
          // document.querySelector(".button").disabled = true;
        }
      } else {
        setAnswerState("wrong");
        // 1. if the data is sent for the first time
        if (props.getData) {
          // 2. and if this quiz is a part of an exam
          props.getData(
            props.next && props.next.false
              ? [false, props.next.false]
              : [false, { type: "finish" }]
          );
        }
      }
    };
    const res2 = await res();
  };

  const onCheck = async () => {
    if (attempts == 0) {
      const res = () => {
        console.log(JSON.stringify(answerOptions), JSON.stringify(props.true));

        if (JSON.stringify(answerOptions) == JSON.stringify(props.true)) {
          setAnswerState("right");
          console.log("right");
          setInputColor("rgba(50, 172, 102, 0.25)");
          // 1. if the data is sent for the first time
          if (props.getData) {
            // 2. and if this quiz is a part of an exam
            props.getData(
              props.next && props.next.true
                ? [true, props.next.true]
                : [true, { type: "finish" }],
              "true"
            );
          }
        } else {
          setAnswerState("wrong");
          console.log("wrong");

          setInputColor("rgba(222, 107, 72, 0.5)");
          // 1. if the data is sent for the first time
          if (props.getData) {
            // 2. and if this quiz is a part of an exam
            props.getData(
              props.next && props.next.false
                ? [false, props.next.false]
                : [false, { type: "finish" }]
            );
          }
        }
      };
      const res2 = await res();
    } else {
      const res = () => {
        if (JSON.stringify(answerOptions) == JSON.stringify(props.true)) {
          setAnswerState("right");
          setInputColor("rgba(50, 172, 102, 0.25)");
        } else {
          setAnswerState("wrong");
          setInputColor("rgba(222, 107, 72, 0.5)");
        }
      };
      const res2 = await res();
    }

    setSent(true);
  };

  const [createOrder, { data, loading, error }] = useMutation(
    CREATE_ORDER_MUTATION
  );

  const { exam, story, ifWrong, ifRight, me, user_name, author } = props;
  const mes = _.zip(["Да", "Нет"], [true, false]);
  let userData = 1;
  let width = "50%";

  return (
    <Styles width={width}>
      <TextBar className="Test" story={story}>
        {/*<div className="question">
           <div className="question_text">
            На этом все. Вам понравилось занятие? Было ли оно полезно?{" "}
          </div>
          <IconBlock>
            {author && author.image != null ? (
              <img className="icon" src={author.image} />
            ) : (
              <img className="icon" src="../../static/hipster.svg" />
            )}{" "}
            <div className="name">
              {author && author.name ? author.name : "BeSavvy"}
            </div>
          </IconBlock>
        </div>
        <div className="answer">
          <IconBlock>
            <img className="icon" src="../../static/flash.svg" />
            <div className="name">{me.name}</div>
          </IconBlock>
          <Options>
            {mes.map((answer, index) => (
              <AnswerOption
                true={0}
                hidden={hidden}
                key={index}
                answer={answer[0]}
                correct={answer[1]}
                number={index}
                onAnswerSelected={getTestData}
              />
            ))}
          </Options>
        </div>
        {zero && (
          <div className="question">
            <div className="question_text">Выберите хотя бы один вариант</div>
            <IconBlock>
              {author && author.image != null ? (
                <img className="icon" src={author.image} />
              ) : (
                <img className="icon" src="../../static/hipster.svg" />
              )}{" "}
              <div className="name">
                {author && author.name ? author.name : "BeSavvy"}
              </div>
            </IconBlock>
          </div>
        )}
        {attempts == 0 && (
          <Group>
            <MiniButton
              // block={block}
              className="button"
              id="but1"
              onClick={async (e) => {
                // Stop the form from submitting
                e.preventDefault();
                // call the mutation
                console.log(1, answer.length);
                setAttempts(1);
                if (answer.length < 1) {
                  setZero(true);
                  console.log(2);
                } else {
                  const res = await onCheck();
                }
              }}
            >
              Ответить
            </MiniButton>
          </Group>
        )}
        {zero && (
          <div className="question">
            <div className="question_text">Выберите хотя бы один вариант</div>
            <IconBlock>
              {author && author.image != null ? (
                <img className="icon" src={author.image} />
              ) : (
                <img className="icon" src="../../static/hipster.svg" />
              )}
              <div className="name">
                {author && author.name ? author.name : "BeSavvy"}
              </div>
            </IconBlock>
          </div>
        )} */}
        {/* {answerState === "right" && ( */}
        <Question inputColor={"#F3F3F3"}>
          <div className="question_text">
            <p>
              Хотим предложить вам принять участие в курсе на лучших условиях.{" "}
              <b>Со скидкой 35%</b>!
            </p>
            <p>
              Цена составит 31 200 вместо 48 000 за 6 месяцев обучения.{" "}
              <b>
                И действует она только, пока вы находитесь на этой странице.
              </b>{" "}
              Если вы оплатите курс по ссылке ниже, то по этой цене получите:
              <p>
                <li>2-месячный Курс "Старт в юридическом английском"</li>
                <li>2-месячный тренинг по английской грамматике</li>
                <li>
                  6-месячный курс "Юридический английский для профессионалов"
                </li>
              </p>
            </p>
            <p>
              Вы также можете оплатить курс{" "}
              <b>в рассрочку на специальных условиях</b>: 3 платежа по 13 300
              рублей. Первый сейчас, второй через 2 месяца, третий через 4
              месяца.
            </p>
            <p>
              Если все же у вас есть вопросы или условия, описанные выше, вам не
              подходят, то вы можете забронировать встречу с директором
              программы, нажав на кнопку ниже.{" "}
            </p>
            <div id="buttons">
              <button
                className="main"
                onClick={async (e) => {
                  e.preventDefault();

                  const res = await createOrder({
                    variables: {
                      coursePageId: "ck0pdit6900rt0704h6c5zmer",
                      price: 31200,
                      userId: props.me.id,
                      comment: asPath,
                    },
                  });
                  location.href = res.data.createOrder.url;
                }}
              >
                {loading ? "Готовим платеж" : "Купить курс со скидкой 35%"}
              </button>
              <button
                className="second"
                onClick={async (e) => {
                  e.preventDefault();

                  const res = await createOrder({
                    variables: {
                      coursePageId: "ck0pdit6900rt0704h6c5zmer",
                      price: 13300,
                      userId: props.me.id,
                      // promocode: props.promocode,
                      comment: asPath,
                    },
                    // refetchQueries: [{ query: CURRENT_USER_QUERY }],
                  });

                  console.log(res.data.createOrder.url);
                  location.href = res.data.createOrder.url;
                }}
              >
                {loading ? "Готовим платеж" : "Оплатить в рассрочку"}
              </button>
              <a
                href="https://calendly.com/mikhail-from-besavvy/30min"
                target="_blank"
              >
                <button className="second">Встреча с директором</button>
              </a>
            </div>
          </div>
          <IconBlock>
            {author && author.image != null ? (
              <img className="icon" src={author.image} />
            ) : (
              <img className="icon" src="../../static/hipster.svg" />
            )}{" "}
            <div className="name">
              {author && author.name ? author.name : "BeSavvy"}
            </div>
          </IconBlock>
        </Question>
        {/* )} */}
        {/* {answerState === "wrong" && (
          <Question inputColor="#F3F3F3">
            <div className="question_text">
              <p>
                Жалко. Возможно, вам нужно больше работы с преподавателем 
              </p>
              <p>
                Мы можем открыть вам досступ к первым 5 неделям за 2200 ₽. Или
                доступ ко всем материалам (16 недель) по специальной цене – 4900
                ₽.
              </p>{" "}
              <p>Возникли вопросы? Вам ответит наш менеджер.</p>
              <div id="buttons">
                <button
                  className="main"
                  onClick={async (e) => {
                    e.preventDefault();

                    const res = await createOrder({
                      variables: {
                        coursePageId: props.coursePageId,
                        price: "ck0pdit6900rt0704h6c5zmer",
                        userId: props.me.id,
                        comment: asPath,
                      },
                    });
                    location.href = res.data.createOrder.url;
                  }}
                >
                  {loading ? "Готовим платеж" : "Купить курс целиком"}
                </button>
                <button
                  className="second"
                  onClick={async (e) => {
                    e.preventDefault();

                    const res = await createOrder({
                      variables: {
                        coursePageId: props.coursePageId,
                        price: "ck0pdit6900rt0704h6c5zmer",
                        userId: props.me.id,
                        // promocode: props.promocode,
                        comment: asPath,
                      },
                      // refetchQueries: [{ query: CURRENT_USER_QUERY }],
                    });

                    console.log(res.data.createOrder.url);
                    location.href = res.data.createOrder.url;
                  }}
                >
                  {loading ? "Готовим платеж" : "Купить 5 недель курса"}
                </button>
                <button className="second">Задать вопрос менеджеру</button>
              </div>
            </div>
            <IconBlock>
              {author && author.image != null ? (
                <img className="icon" src={author.image} />
              ) : (
                <img className="icon" src="../../static/hipster.svg" />
              )}{" "}
              <div className="name">
                {author && author.name ? author.name : "BeSavvy"}
              </div>
            </IconBlock>
          </Question>
        )} */}
      </TextBar>
    </Styles>
  );
};

// export default withTranslation("tasks")(SingleTest);
export default SingleTest;
