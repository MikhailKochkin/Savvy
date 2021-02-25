import styled from "styled-components";

const Styles = styled.div`
  height: 80vh;
  width: 100vw;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .header {
    font-size: 2.6rem;
    font-weight: bold;
    width: 80%;
    line-height: 1.4;
  }
  @media (max-width: 800px) {
    max-height: 120vh;
    padding-bottom: 50px;
  }
`;

const Table = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 90%;
  margin: 100px 0;
  .target {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    flex-basis: 33%;
    height: 300px;
    img {
      width: 200px;
    }
  }
  h3 {
    margin: 20px 0;
    width: 70%;
    text-align: center;
    font-weight: 2.2rem;
  }
  @media (max-width: 800px) {
    margin: 40px 0;

    flex-direction: column;
    height: auto;
    flex-wrap: nowrap;
    .target {
      margin-top: 20px;
      flex-direction: row;
      img {
        width: 130px;
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
      <div className="header">Кому мы хотим помочь?</div>
      <Table>
        <div className="target">
          <img src="static/mobile.svg" />
          <h3>Студентам старших курсов</h3>
        </div>
        <div className="target">
          <img src="static/student1.svg" />
          <h3>Недавним выпускникам</h3>
        </div>
        <div className="target">
          <img src="static/career.svg" />
          <h3>Юристам, которые хотят сменить карьерную траекторию</h3>
        </div>
      </Table>
    </Styles>
  );
};

export default Audience;
