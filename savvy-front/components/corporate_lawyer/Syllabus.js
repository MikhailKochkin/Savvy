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
      lessons: [
        "Вопросы учреждения ООО и непубличных АО",
        "Уставный капитал",
        "Органы управления в хозяйственных обществах",
        "Правовой режим крупных сделок исделок с заинтересованностью",
        "Реорганизация и ликвидация ООО и АО",
      ],
    },
    {
      number: "Модуль 2",
      name: "Основные инструменты договорной работы корпоративного юриста",
      case: "Организация компании",
      lessons: [
        "Преддоговорная ответственность",
        "Заверения / Возмещение потерь",
        "Опционы",
        "Сделки с акциями и долями",
        "Корпоративный договор",
      ],
    },
    {
      number: "Модуль 3",
      name: "Сделки M/A",
      case: "Организация компании",
      lessons: [
        "Memorandum of understanding",
        "Due diligence",
        "Подходы к структурированию сделок",
        "Совместные предприятия",
        "Работа с нотариусом и регистратором",
        "Подписание и закрытие",
      ],
    },
    {
      number: "Модуль 4",
      name: "Правовые вопросы создания и оборота программного обеспечения",
      case: "Организация компании",
      lessons: [
        "Что такое программное обеспечение с технической точки зрения?",
        "Эффективна ли охрана программного обеспечения с помощью авторского права?",
        "Как оформить права на компьютерную программу?",
      ],
    },
    {
      number: "Модуль 5",
      name: "Вопросы регулирования данных и работы с ними",
      case: "Организация компании",
      lessons: [
        "Работа с персональными данными",
        "Сделки с данными",
        "Способы защиты данных",
      ],
    },
    {
      number: "Модуль 6",
      name: "IP и недобросовестная конкуренция",
      case: "Организация компании",
      lessons: [
        "На практических примерах изучим, как работает глава 2.1 ФЗ 'О защите конкуренции' в привязке к защите IP активов",
        // "Работа с персональными данными",
        // "Правовые вопросы создания компьютерных программ",
        // "Обзор основных технологий и связанных с ними юридических вопросов",
      ],
    },
    {
      number: "Модуль 7",
      name: "Как защитить интересы компании в арбитражном суде?",
      case: "Организация компании",
      lessons: [
        "Компетенция арбитражных судов",
        "Субъекты арбитражных процессуальных правоотношений",
        "Доказывание и доказательства в арбитражном процессе",
        "Обеспечительные меры арбитражных судов",
        "Производство в арбитражном суде первой инстанции",
        "Производство по пересмотру судебных актов: апелляция, кассация, надзор, по новым и вновь открывшимся обстоятельствам",
      ],
    },
    {
      number: "Модуль 8",
      name: "Рассмотрение дела о банкротстве: как это работает?",
      case: "Организация компании",
      lessons: [
        "Особенности рассмотрения дел о банкротстве в арбитражном суде",
        "Процессуальные лайфаки в процедуре несостоятельности (банкротства)",
        "Анализ сделок Должника и его контрагентов",
        "Особенности оспаривания сделок по правилам Главы III.1 ФЗ «О несостоятельности (банкротстве)",
        "Особенности привлечения контролирующих должника лиц к субсидиарной ответственности при наличии акта налоговой проверки. ",
        "Субсидиарная ответственность контролирующих должника лиц при наличии приговора",
      ],
    },
    {
      number: "Модуль 9",
      name: "Legal Tech: как юристам создавать технологические продукты",
      case: "Соглашения об осуществлении прав участников (SHA)",
      lessons: [
        "Технологии в работе юриста: от Word к конструктору документов в Excel",
        "Профессия Legal Operations Manager",
        "Как создать свой Legal-tech продукт?",
      ],
    },

    {
      number: "Модуль 10",
      name: "Soft skills и навык прохождения собеседований",
      case: "Организация компании",
      lessons: [
        "Навыки прохождения собеседований + тестовые собеседования",
        "Анализ рынка и возможностей развития карьеры",
        "Выстраивание индивидуального плана развития карьеры на 1 год",
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
                Длительность: <span>18 недель</span>
              </div>
              <div>
                Учебных модулей: <span>10</span>
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
          <MiniHeader>Сопровождение IT/IP проектов</MiniHeader>
          <ol>
            {modules.slice(3, 6).map((m) => (
              <Module d={m} />
            ))}
          </ol>
          <MiniHeader>Работа судебного юриста</MiniHeader>
          <ol>
            {modules.slice(6, 8).map((m) => (
              <Module d={m} />
            ))}
          </ol>
          <MiniHeader>Карьера в Legal Tech</MiniHeader>
          <ol>
            {modules.slice(8).map((m) => (
              <Module d={m} />
            ))}
          </ol>
        </Modules>
      </Page>
    </Styles>
  );
};

export default Syllabus;
