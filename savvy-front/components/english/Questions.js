import styled from "styled-components";
import Question from "./Question";

const Styles = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(
    180deg,
    #ffffff 0%,
    rgba(255, 255, 255, 0.5) 29.69%,
    rgba(220, 232, 253, 0.466013) 48.44%,
    rgba(49, 117, 243, 0.3) 100%,
    #c4d6fc 100%
  );
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 0;
  .header {
    font-size: 2.6rem;
    /* color: #162b4b; */
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
      question: "Чем эта программа лучше аналогов?",
      answer: `Мы делаем акцент на активном обучении. Наш курс не построен на видео и тестах. С первого дня вы пишете, переводите и говорите. И получаете фидбэк по каждому заданию либо от системы, либо от автора напрямую. Мы гордимся тем, что нам удается, несмотря на онлайн и групповой формат, уделять каждому студенту внимание.`,
    },
    {
      question: "Разве можно выучить язык за 7 месяцев?",
      answer:
        "Юридический английский – это набор навыков, а не просто изучение языка. За 7 месяцев у вас вполне получится овладеть вссеми необходимыми навыками.",
    },
    {
      question: "А я хочу еще грамматику подтянуть. Поможете?",
      answer: "Да, у нас есть мини-курсы по грамматике. Мы откроем вам доступ.",
    },
    {
      question:
        "Какой график обучения? Мне удастся совмещать его с работой/учебой?",
      answer:
        "Большая часть заданий выполняется в удобное вам время в течение недели. Таким заданиям потребуется уделить 3-5 часов в неделю. Еще есть вебиннары с преподавателем. Они проходят каждые 2 недели по субботам в 14:00. Время индивидуальных занятий по продвинутому тарифу определяется по договоренности со студентом. ",
    },
    {
      question: "А можно оплатить программу в рассрочку?",
      answer: "Да, можно. Обсудите это на встрече с автором программы.",
    },
    {
      question: "У меня есть вопрос, которого нет в списке..",
      answer:
        "Запишитесь на собеседование с автором программы Он все подробно расскажет.",
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
