import styled from "styled-components";
const Styles = styled.div`
  padding: 50px 0;
  min-height: 80vh;
  width: 100vw;
  background: linear-gradient(
    359.74deg,
    #ffffff 0.21%,
    rgba(255, 255, 255, 0.5) 29.76%,
    rgba(220, 232, 253, 0.466013) 48.43%,
    rgba(49, 117, 243, 0.3) 99.76%,
    #c4d6fc 99.76%
  );

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
    height: 90%;
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
        font-size: 3.6rem;
        margin-top: 40px;
      }
    }
  }
`;

const Header = styled.div`
  height: 100px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  font-size: 2.4rem;
  margin-bottom: 4%;
  @media (max-width: 800px) {
    margin-bottom: 4%;
  }
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
    font-size: 2.4rem;
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
    width: 310px;
    height: 70px;
    font-size: 1.8rem;
    transition: 0.3s;
    font-size: 2.2rem;
    &:hover {
      background: #0057f8;
    }
  }
  @media (max-width: 800px) {
    width: 100%;
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
      img {
        width: 100px;
      }
    }
    h1 {
      font-size: 3.6rem;
      font-weight: 500;
      width: 95%;
      text-align: left;
      line-height: 1.4;
    }
    h2 {
      width: 90%;
      font-size: 2.4rem;
      text-align: left;
      line-height: 1.4;
      margin: 15px 0;
    }
    button {
      width: 100%;
    }
    .timeline {
      margin-bottom: 0;
    }
  }
`;

const Main = () => {
  const slide = () => {
    var my_element = document.getElementById("contact");
    my_element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };
  return (
    <Styles>
      <div id="data0">
        <Header>BeSavvy Legal English</Header>
        {/* <div className="timeline">Старт 23 августа</div> */}
        <div id="level1">
          <h1> 🇬🇧 Научим использовать юридический английский в работе</h1>
          <Info>
            <h2>
              Покажем, как работать на международных проектах, и поможем найти
              работу, где требуется английский
            </h2>
            <button onClick={(e) => slide()}>Узнать больше</button>
          </Info>
        </div>
      </div>
    </Styles>
  );
};

export default Main;
