import styled from "styled-components";
import Question from "./Question";

const Styles = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: #f8efe6;
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
      question:
        "Чем эта программа лучше бесплатных видео от практикующих юристов на ютубе?",
      answer: `Наша программа принципиально отличается от любых видеолекций тем, что мы помогаем вырабатывать практические навыки, необходимые для поиска работы и построения карьеры. Мы хотим, чтобы вы научились анализировать и решать любые кейсы, видеть риски и их устранять, работать с документами, взаимодействовать со своей командой и контрагентами. Для этого весь наш курс пропитан практическими упражнениями по развитию навыков: от интерактивных курсов по решению кейсов и драфтингу документов до работы в команде по решению кейса и презентации решения преподавателю. Ни одно видео вам этого не даст.`,
    },
    {
      question:
        "Что вы мне рассказываете, за 6 месяцев невозможно выучить так много!",
      answer:
        "А никто и не собирается здесь вас учить теории гражданского права. Наша задача – дать вам систему анализа и решения практических задач, а также развить у вас навык решения проблем, необходимый любому юристу, претендующему на сложные и интересные проекты.",
    },
    {
      question: "Чем так хороши ваши преподаватели?",
      answer:
        "Мы разбили всех специалистов на нашей программе на 2 группы. Есть преподаватели. Это профессионалы, на уровень которых вы можете выйти через несколько лет. Они сопровождают вас в рамках своих модулей, составляют для вас онлайн-курс, проводят консультации. Вторая группа специалистов – эксперты. Это профессионалы с многолетним опытом, задача которых не научить вас базовым вещам, а поделиться своими подходами к решению проблем, взглядами на мир, пониманию индустрии. Совмещая работу и с теми, и с другими вы добьётесь максимальных результатов. ",
    },
    {
      question:
        "Я плохо разбираюсь в корпоративном праве / интеллектуальных правах или в чем-то еще. А вдруг я ничего не пойму?",
      answer:
        "Мы специально построили курс так, чтобы провести вас от самых основ до сложных практических моментов. И для этого у вас на кажом модуле есть страший преподаватель, который будет готов вам помочь в рамках консультаций.",
    },
    {
      question:
        "Какой график обучения? Мне удастся совмещать его с работой/учебой?",
      answer:
        "Большая часть заданий выполняется в удобное вам и вашей команде время. Главное успевать на встречи с экспертами и ведущими преподавателями 2 раза в неделю.",
    },
    {
      question: "Сколько часов в неделю мне надо будет уделять учебе?",
      answer:
        "3 часа на онлайн курс, 3 часа на работу с командой, 3 часа на встречи с экспертами и преподавателями. ",
    },
    {
      question: "А можно оплатить программу в рассрочку?",
      answer: "Да, можно. Обсудите это на встрече с диреткором программы.",
    },
    {
      question: "У меня есть вопрос, которого нет в списке..",
      answer:
        "Запишитесь на собеседование с директором программы. Он все подробно расскажет.",
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
