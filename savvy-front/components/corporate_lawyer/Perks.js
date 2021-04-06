import styled from "styled-components";

const Styles = styled.div`
  /* background: #f8efe6; */
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 0;
  .header {
    font-size: 2.6rem;
    font-weight: 500;
    line-height: 1.4;
    width: 80%;
    margin-bottom: 50px;
  }
  @media (max-width: 800px) {
    height: 100%;
    padding: 0;
    .header {
      width: 90%;
      margin-bottom: 25px;
    }
  }
`;

const Table = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  align-items: space-between;
  justify-content: space-between;
  line-height: 1.7;
  .main-element {
    border: 1px solid #f7efe6;
    background: #f7efe6;
    padding: 1%;
    border-bottom: none;
    font-weight: 600;
  }
  .element {
    border: 1px solid #f9f8fd;
    background: #f9f8fd;
    padding: 1%;
    border-bottom: 1px solid white;
    display: flex;
    flex-direction: row;
    align-items: space-between;
    justify-content: space-between;
    div {
      max-width: 80%;
    }
    img {
      width: 22px;
      margin-right: 15px;
    }
  }
  .final {
    border: 1px solid #f9f8fd;
  }
  @media (max-width: 800px) {
    .element {
      padding: 5px 8px;
    }
    width: 90%;
    img {
      margin: 5px 0;
      margin-right: 10px;
    }
  }
`;
const Perks = () => {
  return (
    <Styles>
      <div className="header">В ходе обучения вас ждут:</div>
      <Table>
        <div className="main-element">Онлайн-занятия </div>
        <div className="element">
          <div>Решение практического кейса в команде по каждому модулю</div>
          <img src="static/tick2.svg" />
        </div>
        <div className="element">
          <div>Еженедельные вебинары с преподавателем курса</div>{" "}
          <img src="static/tick2.svg" />
        </div>
        <div className="element">
          <div>Персональные консультации команды по решению кейсов</div>
          <img src="static/tick2.svg" />
        </div>
        <div className="element">
          <div>Интерактивные онлайн занятия по каждой изучаемой теме </div>
          <img src="static/tick2.svg" />
        </div>
        <div className="element">
          <div>
            Индивидуальные отчеты о степени выработка необходимых навыков по
            каждому модулю{" "}
          </div>
          <img src="static/tick2.svg" />
        </div>
        <div className="main-element">Погружение в рынок</div>
        <div className="element">
          <div>Встречи с экспертами и обсуждение трендов в работе юриста</div>
          <img src="static/tick2.svg" />
        </div>
        <div className="element">
          <div>Помощь в составлении резюме и CV</div>
          <img src="static/tick2.svg" />
        </div>
        <div className="element">
          <div>
            Проведение 2 тестовых собеседований по выбранным направлениям
          </div>
          <img src="static/tick2.svg" />
        </div>
        <div className="element">
          <div>Анализ рынка и существующих карьерных возможностей</div>
          <img src="static/tick2.svg" />
        </div>
        <div className="element">
          <div>Помощь в поиске работы по окончании программы</div>
          <img src="static/tick2.svg" />
        </div>
        <div className="element">
          <div>
            Индивидуальные консультации по подготовке к собеседованиям и по
            результатам их прохождения{" "}
          </div>
          <img src="static/tick2.svg" />
        </div>
        <div className="main-element">Дополнительные бонусы</div>
        <div className="element">
          <div>Бесплатное участие в программе Legaltech-директор</div>
          <img src="static/tick2.svg" />
        </div>
        {/* <div className="element">
          <div>Годовая подписка на </div>
          <img src="static/tick2.svg" />
        </div> */}
        <div className="element final">
          <div>
            50% скидка или бесплатное участие во всех программах по Legal
            English
          </div>
          <img src="static/tick2.svg" />
        </div>
        <div className="element final">
          <div>Доступ ко всем другим курсам на платформе BeSavvy</div>
          <img src="static/tick2.svg" />
        </div>
      </Table>
    </Styles>
  );
};

export default Perks;
