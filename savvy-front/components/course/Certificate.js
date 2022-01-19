import React from "react";
import styled from "styled-components";

const Outer = styled.div`
  width: 100%;
  height: 500px;
  margin: 50px 0;
  display: flex;
  background: #fff;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 3px solid black;
  @media (max-width: 800px) {
    padding: 50px 0;
  }
`;

const Inner = styled.div`
  width: 99%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 3px solid black;
  h2 {
    font-size: 5rem;
  }
  .name {
    font-weight: 600;
    font-size: 2.6rem;
    padding: 0px 50px;
    margin-bottom: 20px;
    border-bottom: 1px solid black;
  }
  .course {
    font-weight: 600;
    font-size: 2.4rem;
    margin-bottom: 20px;
    border-bottom: 1px solid grey;
    padding: 0px 50px;
  }
  @media (max-width: 800px) {
    padding: 50px 0;
  }
`;

const Data = styled.div`
  width: 95%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 30px;
  margin-bottom: 10px;

  .left {
    width: 50%;
  }
  .right {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
  }
  @media (max-width: 800px) {
    padding: 50px 0;
  }
`;

const Certificate = () => {
  return (
    <Outer>
      <Inner>
        <h2>СЕРТИФИКАТ</h2>
        <div>Этот сертификат подтверждает, что:</div>
        <div className="name">Михаил Кочкин</div>
        <div>успешно прошел курс:</div>
        <div className="course">Старт в Гражданском праве</div>
        <Data>
          <div className="left">
            <div>ID сертификата: #5bbf7b757201281e770dfbfe</div>
            <div>Выдан 10 октября 2021 года</div>
          </div>
          <div className="right">
            <div>МК</div>
            <div>Михаил Кочкин</div>
            <div>Директор ООО БиСэвви</div>
          </div>
        </Data>
      </Inner>
    </Outer>
  );
};

export default Certificate;
