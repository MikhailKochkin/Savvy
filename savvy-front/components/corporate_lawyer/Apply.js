import styled from "styled-components";
const Styles = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 0;
  .header {
    font-size: 3.6rem;
    font-weight: 500;
    line-height: 1.4;
    width: 80%;
    text-align: center;
    margin-bottom: 50px;
  }
  @media (max-width: 800px) {
    height: 100%;
  }
`;

const Stage = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 50%;
  margin-bottom: 40px;

  .number {
    font-size: 5rem;
    flex-basis: 20%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-right: 30px;
    padding-top: -13px;
    justify-content: flex-end;
    /* border: 1px solid blue; */
  }
  .sub_header {
    color: #ff6f59;
    font-size: 3rem;
    font-weight: 500;
    line-height: 1.2;
    margin-bottom: 10px;
  }
  .explanation {
    flex-basis: 80%;
    max-width: 500px;
  }
  .details {
    font-size: 1.6rem;
  }
  @media (max-width: 800px) {
    width: 80%;
    .sub_header {
      font-size: 2.6rem;
    }
  }
`;
const Apply = () => {
  return (
    <Styles>
      <div className="header">Как попасть на программу?</div>
      <Stage>
        <div className="number">1.</div>
        <div className="explanation">
          <div className="sub_header">Оставить заявку</div>
          <div className="details">
            Заполните заявку на сайте и выберите удобный способ связи с вами
          </div>
        </div>
      </Stage>
      <Stage>
        <div className="number">2.</div>
        <div className="explanation">
          <div className="sub_header">Пройти собеседование</div>
          <div className="details">
            Мы не будем вас испытывать. Вы с директором программы обсудите
            структуру и методологию обучения, а также ваши цели и задачи.
          </div>
        </div>
      </Stage>
      <Stage>
        <div className="number">3.</div>
        <div className="explanation">
          <div className="sub_header">Пройти испытание</div>
          <div className="details">
            Если вы претендуете на скидки или стипендию,то мы предложим вам
            выполнить несколько небольших тестовых заданий.
          </div>
        </div>
      </Stage>
      <Stage>
        <div className="number">4.</div>
        <div className="explanation">
          <div className="sub_header">Оплатить программу</div>
          <div className="details">
            Вам нужно будет оплатить программу до 1 июля. Но учтите, что по мере
            приближения программы цена на нее будет расти.
          </div>
        </div>
      </Stage>
      <Stage>
        <div className="number">5.</div>
        <div className="explanation">
          <div className="sub_header">Начать строить карьеру</div>
          <div className="details">
            1 июля вы познакомитесь со своей командой и начнете развиваться с
            беспрецедентной скоростью.
          </div>
        </div>
      </Stage>
    </Styles>
  );
};

export default Apply;
