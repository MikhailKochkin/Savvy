import styled from "styled-components";

const Styles = styled.div`
  background: #f8efe6;
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
    width: 100%;
    line-height: 1.4;
    width: 90%;
    margin-bottom: 30px;
  }
  @media (max-width: 800px) {
    height: 100%;
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
    border: 1px solid #162b4b;
    background: #162b4b;
    color: #fff;
    padding: 1%;
    border-bottom: none;
    font-weight: 600;
  }
  .element {
    border: 1px solid #162b4b;
    padding: 1%;
    border-bottom: none;
    display: flex;
    flex-direction: row;
    align-items: space-between;
    justify-content: space-between;
    div {
      max-width: 80%;
    }
    img {
      width: 30px;
    }
  }
  .final {
    border: 1px solid #162b4b;
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
        <div className="main-element ">Онлайн-занятия </div>
        <div className="element">
          <div>Решение практического кейса в команде по каждому модулю</div>
          <img src="static/tick.svg" />
        </div>
        <div className="element">
          <div>Еженедельные вебинары с преподавателем курса</div>{" "}
          <img src="static/tick.svg" />
        </div>
        <div className="element">
          <div>Персональные консультации команды</div>
          <img src="static/tick.svg" />
        </div>
        <div className="element">
          <div>Интерактивные занятия по каждой изучаемой теме </div>
          <img src="static/tick.svg" />
        </div>
        <div className="main-element ">Погружение в рынок</div>
        <div className="element">
          <div>Встречи с экспертами</div>
          <img src="static/tick.svg" />
        </div>
        <div className="element">
          <div>Помощь в составлении резюме</div>
          <img src="static/tick.svg" />
        </div>
        <div className="element">
          <div>Проведение 2 тестовых собеседований</div>
          <img src="static/tick.svg" />
        </div>
        <div className="element">
          <div>Анализ рынка и существующих возможностей</div>
          <img src="static/tick.svg" />
        </div>
        <div className="main-element ">Дополнительные бонусы</div>
        <div className="element">
          <div>Бесплатное участие в программе Legaltech-директор</div>
          <img src="static/tick.svg" />
        </div>
        <div className="element">
          <div>Годовая подписка на </div>
          <img src="static/tick.svg" />
        </div>
        <div className="element final">
          <div>50% скидка на все программы по Legal English</div>
          <img src="static/tick.svg" />
        </div>
      </Table>
    </Styles>
  );
};

export default Perks;
