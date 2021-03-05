import styled from "styled-components";

const Slide = styled.div`
  min-height: 60vh;
  width: 100vw;
  background: #fff;
  padding: 100px 50px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  @media (max-width: 800px) {
    padding: 50px 20px;
  }
`;

const Styles = styled.div`
  width: 90%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  .header {
    font-size: 2.6rem;
    flex-basis: 50%;
    color: black;
    font-weight: 500;
    line-height: 1.4;
    width: 80%;
    text-align: left;
    margin-bottom: 50px;
    margin-right: 50px;
  }
  .result_box {
    width: 90%;
    padding: 20px 0;
    font-size: 2rem;
    line-height: 1.4;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
  }
  .result_box_first {
    width: 90%;
    padding-bottom: 20px;
    font-size: 2rem;
    line-height: 1.4;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
  }
  img {
    width: 22px;
    margin-right: 15px;
    margin-top: 5px;
  }
  @media (max-width: 800px) {
    height: 100%;
    padding-bottom: 50px;
    flex-direction: column;
    width: 100%;
    .header {
      margin-right: 0px;
      width: 100%;
    }
    .result_box {
      width: 100%;
    }
    .result_box_first {
      width: 100%;
    }
  }
`;
const Results = () => {
  return (
    <Slide>
      <Styles>
        <div className="header">
          Что вы получите в результате прохождения программы?
        </div>
        <div>
          <div className="result_box_first">
            <img src="static/tick2.svg" />
            <div>
              У вас будет возможность пройти стажировку / найти работу в
              компании партнере
            </div>
          </div>
          <div className="result_box">
            <img src="static/tick2.svg" />
            <div>Пройдете 3 тестовых собеседования с разными юристами</div>
          </div>
          <div className="result_box">
            <img src="static/tick2.svg" />
            <div>
              Научитесь работать с документами на уровне младшего юриста топовой
              фирмы
            </div>
          </div>
          <div className="result_box">
            <img src="static/tick2.svg" />
            <div>
              В формате кейсов и игр разберете сложный материал в сжатые сроки
            </div>
          </div>
          {/* <div className="result_box">
            В формате кейсов и игр разберем сложный материал в сжатые сроки
          </div> */}
        </div>
      </Styles>
    </Slide>
  );
};

export default Results;
