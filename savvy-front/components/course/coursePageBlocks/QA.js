import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Question from "./Question";
import Modal from "styled-react-modal";

const Styles = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: #f4f8fd;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 0;
`;

const Container = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h2 {
    text-align: center;
    font-weight: 400;
    font-size: 3rem;
    line-height: 1.4;
    margin-bottom: 100px;
  }
  @media (max-width: 800px) {
    width: 90%;
    h2 {
      margin-bottom: 40px;
    }
  }
`;

const QuestionsList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const ButtonZone = styled.div`
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70%;
  div {
    width: 80%;
    margin-bottom: 50px;
    text-align: center;
    font-size: 3rem;
    line-height: 1.4;
  }
  button {
    width: 40%;
    margin-left: 50px;
    height: 50px;
    font-size: 2rem;
    color: #fff;
    font-family: Montserrat;
    background-color: #4785a2;
    border: 1px solid #4785a2;
    border-radius: 8px;
    transition: 0.2s ease-in;
    cursor: pointer;
    &:hover {
      background: #29617a;
    }
  }
  @media (max-width: 800px) {
    div {
      font-size: 2.4rem;
      width: 100%;
    }
    button {
      width: 100%;
      margin-left: 0;
    }
  }
`;

const StyledModal = Modal.styled`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: 1px solid grey;
  border-radius: 10px;
  max-width: 40%;
  min-width: 400px;
  padding: 2%;
  p {
    width: 100%;
  }
  @media (max-width: 1300px) {
    max-width: 70%;
    min-width: 200px;
    margin: 10px;
    max-height: 100vh;
    overflow-y: scroll;
  }
  @media (max-width: 800px) {
    max-width: 90%;
    min-width: 200px;
    margin: 10px;
    max-height: 100vh;
    overflow-y: scroll;
  }
`;

const TeacherBox = styled.div``;

const QA = (element) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = (e) => setIsOpen(!isOpen);

  const [hasShown, setHasShown] = useState(false);

  const nodeRef = useRef();

  useEffect(() => {}, []);

  const slide2 = () => {
    var my_element = document.getElementById("c2a");
    my_element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };
  let questions = [
    {
      question: "Как мне присоединиться к курсу?",
      answer: `Присоединиться очень просто - надо зарегистрироваться на сайте и оплатить курс по одному из тарифов. 13 сентября мы пришлеем тебе на почту всю информацию о вводном занятии и подключении к курсу. И начнем заниматься 15 сентября.
`,
    },
    {
      question: "Сколько времени у меня будет уходить на занятия?",
      answer: `2-4 часа в неделю. Нам важно не перегрузить вас и не помешать остальной учебе.`,
    },
    {
      question: "Я могу пройти всю программу за 1 месяц?",
      answer: `Нет, каждый месяц вам открывается 5 уроков, которые необходимо пройти. За 3 месяца вы сможете пройти всю программу.`,
    },
    {
      question: "Какой формат занятий?",
      answer: `Вы в своем темпе проходите онлайн-урок на платформе besavvy.app в течение недели, задаете вопросы преподавателю в чате, учавствуете в разборе сложных кейсов с преподавателем в зуме.`,
    },
    {
      question: "А если со мной хочется друг?",
      answer:
        "За каждого друга, который придет с вами, мы дадим вам скидку 1000 рублей на следующий месяц. И другу тоже.",
    },
    {
      question:
        "А что если я уже проходил / проходила курс по общей части ГП на BeSavvy?",
      answer:
        "Наш курс в августе 2021 пережил масштабное преобразование. Были добавлены теоретические блоки и сложные кейсы. Задания были переделаны и пересобраны, используя новые возможности платформы. Плюс добавилась командная работа, вебинары с преподавателями и карьерные тренинги. В результате получился совершенно новый продукт с новыми большими целями: гарантировать подготовку к экзаменам и собеседованиям.",
    },
    {
      question:
        "А что если я уже проходил / проходила курс подобные курсы где-то еще?",
      answer:
        "Центральными элементами курса являются авторы и платформа. Ни одна другая программа доп подготовки не может похвастаться таким набором авторов, которые совмещают теоретическую базу и практический опыт. Плюс наша платформа, которая отцифровывает получение новых знаний и навыков, дает нам и вам подробную статистику и может гарантировать, что вы вышли по итогам этих 3 месяцев на новый уровень, а не просто прослушали лекции.",
    },
    {
      question: "А что если я еще вообще не разбираюсь в гражданском праве?",
      answer:
        "Не проблема. Наш курс сделан так, что ты начнешь с самых азов и постепенно дойдешь до самых сложных вопросов. А мы будем тебе помогать на каждом этапе.",
    },
    {
      question:
        "А что если я все уже знаю по курсу - мне стоит присоединиться?",
      answer:
        "Конечно! И это связано не только с пресловутым «повторение - мать учения», но и с тем, что работодатели имеют привычку очень подробно распрашивать по общей части ГК. Надо знать материал буквально досконально. Наша же система тебе в этом поможет и заменит перечитывание ГК на интерактивные испытания, которые проходить гораздо веселее.",
    },
    {
      question: "Как проходит проверка домашнего задания?",
      answer:
        "Автоматически на платформе. По всем дополнительным вопросам ты сможешь напрямую писать авторам в чат.",
    },
    {
      question: "У нас будут вебинары-разборы заданий?",
      answer:
        "Да, система соберет вопросы, с которыми возникли наибольшие сложности, и мы проведем по ним отдельные вебинары.",
    },
    {
      question: "А если у меня возникнет вопрос, мне кто-то сможет помочь?",
      answer:
        "Да, есть чат курса в Дискорде, за которым будет внимательно следить создатели и авторы курса.",
    },
    {
      question: "У меня есть вопрос, которого нет в списке..",
      answer:
        "Напиши нам в социальных сетях. Ссылки на них можно найти внизу этой страницы.",
    },
  ];

  return (
    <Styles>
      <Container ref={nodeRef}>
        <h2>Часто задаваемые вопросы</h2>
        <QuestionsList>
          {questions.map((m) => (
            <Question d={m} />
          ))}
        </QuestionsList>
      </Container>
      <ButtonZone>
        <div>
          Мы сделаем ваше обучение быстрым и эффективным. А вы уже никогда не
          сможете вернуться к банальному чтению книг и прослушиванию лекций.
        </div>
        <button onClick={(e) => slide2()}>Записаться</button>
      </ButtonZone>
      <StyledModal
        isOpen={isOpen}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}
      >
        <p>
          С нашей новой реферральной программой вы можете учиться практически
          бесплатно.
        </p>{" "}
        После приобретения этого курса, вы получите специальный код, который
        можете передать своим друзьям. После того, как ваш друг оплатит участие
        в программе, вы оба получите бонусные 1000 рублей на следующую покупку
        на BeSavvy. Таким образом, если по вашему промокоду придет 3 человека,
        вы сможете участвовать в следующем месяце программы бесплатно.{" "}
        <p>
          {" "}
          Промокод можно получить, написав в личные сообщения группы любого
          аккаунта нашей социальной сети.
        </p>
      </StyledModal>
    </Styles>
  );
};

export default QA;
