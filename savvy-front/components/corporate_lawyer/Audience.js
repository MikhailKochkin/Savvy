import styled from "styled-components";

const Styles = styled.div`
  min-height: 80vh;
  width: 100vw;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 0;
  .header {
    font-size: 2.6rem;
    font-weight: bold;
    width: 80%;
    line-height: 1.4;
  }
  @media (max-width: 800px) {
    height: auto;
    padding-bottom: 0px;
  }
`;

const Table = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 0px 0px;
  grid-template-areas:
    ". ."
    ". .";
  width: 80%;
  height: 50%;
  margin: 100px 0;
  .cell {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .target {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 80%;
    /* height: 300px; */
    img {
      width: 130px;
    }
  }
  h3 {
    margin: 20px 0;
    width: 100%;
    font-weight: 500;
    text-align: left;
    font-weight: 2.2rem;
    padding-left: 30px;
  }
  @media (max-width: 800px) {
    margin: 40px 0;
    display: flex;
    flex-direction: column;
    height: auto;
    width: 100%;
    flex-wrap: nowrap;
    .target {
      margin-top: 20px;
      flex-direction: row;
      img {
        width: 90px;
      }
      h3 {
        text-align: left;
        padding-left: 30px;
      }
    }
  }
`;

const Audience = () => {
  return (
    <Styles>
      <div className="header">На программе вы сможете:</div>
      <Table>
        <div className="cell">
          <div className="target">
            <div>
              {" "}
              <img src="static/mobile.svg" />
            </div>
            <div>
              <h3>
                Сформировать свой блок навыков и карту построения карьеры.
              </h3>
            </div>
          </div>
        </div>
        <div className="cell">
          <div className="target">
            <div>
              {" "}
              <img src="static/career.svg" />
            </div>
            <h3>
              Прорешать онлайн и офлайн кейсы по самым актуальным и сложным
              темам
            </h3>
          </div>
        </div>

        <div className="cell">
          <div className="target">
            <div>
              {" "}
              <img src="static/student1.svg" />
            </div>
            <h3>
              Подготовиться к встрече с работодателем и получить заветную
              стажировку / работу
            </h3>
          </div>
        </div>

        <div className="cell">
          <div className="target">
            <div>
              {" "}
              <img src="static/student1.svg" />
            </div>
            <h3>
              Познакомиться с людьми, которые помогут вам развиваться в
              профессиональной сфере
            </h3>
          </div>
        </div>
      </Table>
    </Styles>
  );
};

export default Audience;
