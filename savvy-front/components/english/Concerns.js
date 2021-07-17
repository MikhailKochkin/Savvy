import React from "react";
import styled from "styled-components";

const Styles = styled.div`
  padding: 0 5%;
  min-height: 100vh;
  width: 100vw;
  background: #9676e4;
  color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Column1 = styled.div`
  height: 100vh;
  width: 33.3%;
  background: #9073db;
  .container {
    width: 100%;
    height: 100%;
    padding: 4% 2%;
    font-size: 2rem;
  }
`;

const Column2 = styled.div`
  height: 100vh;
  width: 33.3%;
  background: #9a7de3;
`;

const Column3 = styled.div`
  height: 100vh;
  width: 33.3%;
  background: #a084e6;
`;

const Concerns = () => {
  return (
    <Styles>
      <Column1>
        <div className="container">
          Я уже пробовал учиться онлайн, это не привело ни к каким изменениям в
          моей жизни
        </div>
      </Column1>
      <Column2>
        Моего уровня не хватит, чтобы освоить юридический английский
      </Column2>
      <Column3>Я не уверен, что именно вы сможете мне помочь</Column3>
    </Styles>
  );
};

export default Concerns;
