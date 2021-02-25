import styled from "styled-components";
import Question from "./Question";

const Styles = styled.div`
  height: 100vh;
  width: 100vw;
  background: #f8efe6;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .header {
    font-size: 2.6rem;
    color: #162b4b;
    font-weight: bold;
    line-height: 1.4;
    width: 80%;
    text-align: left;
    margin-bottom: 50px;
  }
  @media (max-width: 800px) {
    padding: 50px 0;
    height: auto;
    .header {
      margin-bottom: 0px;
    }
  }
`;

const QuestionsBlock = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  ol {
    width: 100%;
  }
  @media (max-width: 800px) {
    margin-top: 0px;
    width: 100%;
  }
`;

const Questions = () => {
  let questions = [
    {
      question:
        "Я плохо разбираюсь в корпоративном праве. А вдруг я ничего не пойму?",
      answer:
        "Мы специально построили курс так, чтобы провести вас от самых основ до сложных практических моментов. И для этого у вас на кажом модуле есть страший преподааватель, который будет готов вам помочь в рамках консультаций.",
    },
    {
      question:
        "Какой график обучения? Мне удастся совмещать его с работой/учебой?",
      answer:
        "Большая часть заданий выполняется в удобное вамм и вашей команде время. Главное успевать на встречи с экспертами и ведущими преподавателями 2 раза в неделю.",
    },
    {
      question: "Сколько часов в неделю мне надо будет уделять учебе?",
      answer:
        "3 часа на онлайн курс, 3 часа на работу с командой, 3 часа на встречи с экспертами и преподавателями. ",
    },
  ];
  return (
    <Styles>
      <div className="header">Часто задаваемые вопросы:</div>
      <QuestionsBlock>
        <ol>
          {questions.map((m) => (
            <Question d={m} />
          ))}
        </ol>
      </QuestionsBlock>
    </Styles>
  );
};

export default Questions;
