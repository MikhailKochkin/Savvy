import styled from "styled-components";
const Styles = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: #1c92d2; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #f2fcfe,
    #1c92d2
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #f2fcfe,
    #1c92d2
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  #data0 {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    width: 80%;
    h1 {
      margin-bottom: 0;
      font-size: 5rem;
      line-height: 1.4;
      font-weight: 600;
    }
  }
  #data {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 80%;
  }
  #mobile_image {
    display: none;
  }
  .timeline {
    font-size: 2.2rem;
    width: 90%;
  }
  @media (max-width: 800px) {
    height: 100%;
    padding-bottom: 50px;
    #mobile_image {
      display: block;
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: flex-start;
      img {
        width: 60%;
        margin: 15px 0;
      }
    }
    #data {
      width: 90%;
      flex-direction: column;
    }
    #data0 {
      width: 90%;
      flex-direction: column;
      justify-content: flex-start;
      h1 {
        line-height: 1.4;
        font-size: 3rem;
        margin-top: 40px;
      }
    }
  }
`;

const Header = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  padding: 0 100px;
  font-size: 2rem;
  margin-bottom: 8%;
`;

const Info = styled.div`
  flex-basis: 85%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  /* min-width: 1000px; */
  h1 {
    font-size: 5.6rem;
    font-weight: 500;
    width: 80%;
    text-align: left;
    line-height: 1.2;
  }
  img {
    width: 120px;
    margin-left: -30px;
  }
  h2 {
    font-size: 2rem;
    font-weight: 500;
    text-align: left;
    width: 60%;
    line-height: 1.6;
    margin-bottom: 20px;
  }
  span {
    color: #ff6f59;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  button {
    /* padding: 3%; */
    border-radius: 10px;
    color: #fff;
    background: #3175f3;
    border: none;
    outline: 0;
    cursor: pointer;
    margin-top: 20px;
    font-family: Montserrat;
    width: 400px;
    height: 80px;
    font-size: 1.8rem;
    transition: 0.3s;
    font-size: 2.2rem;
    &:hover {
      background: #e01e00;
    }
  }
  @media (max-width: 800px) {
    width: 90%;
    #level1 {
      display: flex;
      flex-direction: column;
      #mobile_image {
        display: block;
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: flex-start;
        img {
          width: 60%;
          margin: 15px 0;
        }
      }
      h1 {
        font-size: 3rem;
        font-weight: 500;
        width: 95%;
        text-align: left;
        line-height: 1.4;
      }
      img {
        width: 100px;
      }
    }
    h2 {
      width: 100%;
      font-size: 2rem;
      text-align: left;
      line-height: 1.4;
      margin-top: 20px;
      button {
        width: 100%;
      }
    }
    .timeline {
      margin-bottom: 0;
    }
  }
`;

const Main = () => {
  const slide = () => {
    var my_element = document.getElementById("C2A");
    my_element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };
  return (
    <Styles>
      <Header>BeSavvy</Header>
      <div id="data0">
        <div className="timeline">Старт 23 августа</div>
        <div id="level1">
          <h1> 🇬🇧 Научим использовать юридический английский в работе</h1>
          <Info>
            <h2>
              Покажем, как работать на международных проектах и поможем найти
              работу, где требуется английский
            </h2>
            <button onClick={(e) => slide()}>
              Записаться на пробное занятие
            </button>
          </Info>
        </div>
      </div>
    </Styles>
  );
};

export default Main;
