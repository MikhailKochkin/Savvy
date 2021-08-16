import { useState, useEffect } from "react";
import styled from "styled-components";
import Question from "./Question";

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
    button {
      width: 100%;
      margin-left: 0;
    }
  }
`;

const TeacherBox = styled.div``;

const QA = (element) => {
  const [isVisible, setState] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setState(entry.isIntersecting);
      },
      { rootMargin: "20px" }
    );

    element && observer.observe(element);

    return () => observer.unobserve(element);
  }, []);

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
      <Container>
        {console.log(isVisible)}
        <h2>Часто задаваемые вопросы</h2>
        <QuestionsList>
          {questions.map((m) => (
            <Question d={m} />
          ))}
        </QuestionsList>
      </Container>
      <ButtonZone>
        <div>
          Мы сделаем изучение гражданского быстрым и эффективным. А вы уже
          никогда не сможете вернуться к банальному чтению книг и прослушиванию
          лекций.
        </div>
        <button onClick={(e) => slide2()}>Записаться</button>
      </ButtonZone>
    </Styles>
  );
};

export default QA;
