import styled from "styled-components";
import Module from "./Module";

const Styles = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: #162b4b;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  @media (max-width: 800px) {
    height: 100%;
  }
`;

const Page = styled.div`
  width: 70vw;
  border: 1px solid #f7d188;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4% 2%;
  margin: 50px 0;

  @media (max-width: 800px) {
    height: 100%;
    width: 100%;
    border: none;
  }
`;

const Header = styled.div`
  width: 90%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: #fff;
  .header {
    font-size: 2.6rem;
    flex-basis: 50%;
    text-align: center;
    line-height: 1.2;
  }
  .description {
    font-size: 1.4rem;
    flex-basis: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    div {
      width: 70%;
    }
  }
  @media (max-width: 800px) {
    height: 100%;
    width: 90%;
    flex-direction: column;
    .header {
      font-size: 2.6rem;
      text-align: left;
    }
    .description {
      align-items: flex-start;
      font-size: 1.8rem;
      div {
        width: 100%;
        margin-top: 20px;
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
const Syllabus = () => {
  let modules = [
    {
      number: "Модуль 1",
      name: "Cоздание компании и распоряжение ее акциями / долями",
      case: "Организация компании",
      lessons: ["Тема 1", "Тема 2", "Тема 3"],
    },
    {
      number: "Модуль 2",
      name: "Работа на рынке ценных бумаг",
      case: "Организация компании",
      lessons: ["Тема 1", "Тема 2", "Тема 3"],
    },
    {
      number: "Модуль 3",
      name: "Технологии в работе юриста",
      case: "Организация компании",
      lessons: ["Тема 1", "Тема 2", "Тема 3"],
    },
  ];
  return (
    <Styles>
      <Page>
        <Header>
          <div className="header">Чему и как вы научитесь</div>
          <div className="description">
            <div>
              Курс состоит из 8 модулей. Каждый модуль идет 2 недели. Модуль
              включает в себя интерактивные занятия, решение кейса в команде,
              вебинары с преподавателями и встречи с приглашенными эксспертами.
            </div>
          </div>
        </Header>
        <Modules>
          <ol>
            {modules.map((m) => (
              <Module d={m} />
            ))}
          </ol>
        </Modules>
      </Page>
    </Styles>
  );
};

export default Syllabus;
