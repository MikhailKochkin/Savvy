import styled from "styled-components";
import Module from "./Module";

const Styles = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: #f7efe6;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  @media (max-width: 800px) {
    height: 100%;
    background: #fff;
  }
`;

const Page = styled.div`
  width: 70vw;
  /* border: 1px solid #162b4b; */
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4% 2%;
  margin: 50px 0;
  background: white;

  @media (max-width: 800px) {
    height: 100%;
    width: 100%;
    border: none;
  }
`;

const Header = styled.div`
  width: 80%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  .header {
    font-size: 3rem;
    font-weight: 600;
    flex-basis: 50%;
    text-align: left;
    line-height: 1.2;
  }
  .description {
    font-size: 1.8rem;
    flex-basis: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* border-left: 1px solid #162b4b; */
    span {
      font-weight: 600;
      color: #ff6f59;
    }
    div {
      width: 95%;
    }
  }
  @media (max-width: 800px) {
    height: 100%;
    width: 100%;
    flex-direction: column;
    .header {
      font-size: 2.6rem;
      text-align: left;
      width: 90%;
    }
    .description {
      align-items: flex-start;
      font-size: 1.8rem;
      width: 90%;
      div {
        width: 100%;
        margin-top: 10px;
      }
    }
  }
`;

const Modules = styled.div`
  width: 90%;
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

    height: 100%;
    ol {
      padding: 0;
    }
  }
`;

const MiniHeader = styled.div`
  font-size: 2rem;
  font-weight: 600;
  width: 90%;
  margin-bottom: -30px;
  margin-top: 30px;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const Syllabus = () => {
  let modules = [
    {
      number: "Модуль 1",
      name: "Основы работы с корпорациями",
      case: "Организация компании",
      lessons: ["Правовое регулирование ООО и АО", "Тема 2", "Тема 3"],
    },
    {
      number: "Модуль 2",
      name: "Основные инструменты договорной работы корпоративного юриста",
      case: "Организация компании",
      lessons: [
        "Обеспечение обязательств в корпоративных сделках",
        "Тема 2",
        "Тема 3",
      ],
    },
    {
      number: "Модуль 3",
      name: "Сделки M/A",
      case: "Организация компании",
      lessons: [
        "Соглашения об осуществлении прав участников (SHA)",
        "Структура договора купли-продажи",
        "Тема 3",
      ],
    },
    {
      number: "Модуль 4",
      name: "Авторские права в it-проектах",
      case: "Организация компании",
      lessons: ["Защита веб-сайтов и программ", "Вопросы публичного права"],
    },
    {
      number: "Модуль 5",
      name: "IP-инструменты защиты интересов компании",
      case: "Организация компании",
      lessons: ["Товарные знаки", "Патенты"],
    },
    {
      number: "Модуль 6",
      name: "Основы Digital law",
      case: "Организация компании",
      lessons: ["Практические вопросы персональных данных", "Тема 2", "Тема 3"],
    },
    {
      number: "Модуль 7",
      name: "Правовое регулирование инвестиций в технологические проекты",
      case: "Организация компании",
      lessons: [
        "Иностранные инвестиции и стратегические компании",
        "Структура инвестиционных соглашений",
        "Тема 3",
      ],
    },
    {
      number: "Модуль 8",
      name: "Legal Tech: как юристам создавать технологические продукты",
      case: "Соглашения об осуществлении прав участников (SHA)",
      lessons: [
        "Технологии в работе юриста: от Word к конструктору документов в Excel",
        "Как создать свой Legal-tech продукт?",
      ],
    },

    {
      number: "Модуль 9",
      name: "Soft skills",
      case: "Организация компании",
      lessons: [
        "Прохождение собеседований и оценка рынка",
        "Основы Legal Design",
        "Составление документов и работа с государственными органами",
      ],
    },
  ];
  return (
    <Styles>
      <Page>
        <Header>
          <div className="header">Программа</div>
          <div className="description">
            <div>
              <div>
                Старт: <span>5 июля 2021</span>
              </div>
              <div>
                Длительность: <span>16 недель</span>
              </div>
              <div>
                Учебных модулей: <span>9</span>
              </div>
              {/* Курс состоит из 8 модулей. Каждый модуль идет 2 недели и включает:
              <ul>
                <li>интерактивные занятия</li>
                <li>решение кейса в команде</li>
                <li>вебинары с преподавателями</li>
                <li>встречи с экспертами</li>
              </ul>{" "} */}
            </div>
          </div>
        </Header>
        <Modules>
          <MiniHeader>Работа корпоративного юриста</MiniHeader>
          <ol>
            {modules.slice(0, 3).map((m) => (
              <Module d={m} />
            ))}
          </ol>
          <MiniHeader>
            Сложные вопросы права интеллектуальной собственности
          </MiniHeader>
          <ol>
            {modules.slice(3, 5).map((m) => (
              <Module d={m} />
            ))}
          </ol>
          <MiniHeader>Сопровождение технологических проектов</MiniHeader>
          <ol>
            {modules.slice(5, 7).map((m) => (
              <Module d={m} />
            ))}
          </ol>
          <MiniHeader>Карьера в Legal Tech</MiniHeader>
          <ol>
            {modules.slice(7).map((m) => (
              <Module d={m} />
            ))}
          </ol>
        </Modules>
      </Page>
    </Styles>
  );
};

export default Syllabus;
