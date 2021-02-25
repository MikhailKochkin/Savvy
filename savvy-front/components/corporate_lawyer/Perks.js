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
    font-weight: bold;
    width: 100%;
    line-height: 1.4;
    width: 80%;
    margin-bottom: 50px;
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
  .main-element {
    border: 2px solid #162b4b;
    background: #162b4b;
    color: #fff;
    padding: 1%;
    border-bottom: none;
    font-weight: 600;
  }
  .element {
    border: 2px solid #162b4b;
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
    border: 2px solid #162b4b;
  }
  @media (max-width: 800px) {
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
          <div>Встречи с экспертами </div>
          <img src="static/tick.svg" />
        </div>
        <div className="element">
          <div>Помощь в составлении резюме</div>
          <img src="static/tick.svg" />
        </div>
        <div className="element">
          <div>Подготовка к собеседованиям</div>
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
