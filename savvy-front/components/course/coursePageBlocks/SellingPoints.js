import React from "react";
import styled from "styled-components";
import { useTranslation } from "next-i18next";
import renderHTML from "react-render-html";

const Styles = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #fff;
  border-top: 1px solid #dce2e7;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 1040px) {
    padding: 30px 0;
  }
`;

const Container = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  h2 {
    line-height: 1.4;
    font-weight: 700;
    font-size: 2.8rem;
  }
  h2 {
    margin-bottom: 40px;
  }
  .text {
    width: 80%;
    margin-bottom: 40px;
  }
`;

const PointsBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: space-around;
  width: 100%;
  @media (max-width: 1040px) {
    flex-direction: column;
  }
`;

const Point = styled.div`
  width: 270px;
  display: flex;
  flex-direction: column;
  margin-bottom: 60px;
  border: 1px solid #dce2e6;
  padding: 20px;
  margin-right: 60px;
  @media (max-width: 1040px) {
    flex-direction: column;
    width: 90%;
  }
  .number {
    font-size: 1.8rem;
    width: 36px;
    height: 36px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #327998;
    color: #fff;
    border-radius: 50%;
  }
  img {
    width: 200px;
    height: 200px;
    object-fit: cover;
    margin-right: 20px;
  }
  .info {
    width: 90%;
  }

  .header {
    font-weight: 600;
    font-size: 2rem;
    line-height: 1.4;
    margin-bottom: 10px;
    span {
      padding-bottom: 1px;
      border-bottom: 2px solid #d7690b;
    }
  }
  .text {
    font-weight: 300;
    line-height: 1.4;
    font-size: 1.6rem;
  }
  @media (max-width: 1040px) {
    margin-bottom: 40px;
    .header {
      margin-top: 20px;
    }
  }
`;

const SellingPoints = (props) => {
  const d = props.data;
  const { t } = useTranslation("coursePage");
  const sps = [
    {
      selling_point: "Интерактивные мини-уроки",
      selling_point_details:
        "Мы понятно разберем сложные темы на мини-уроках и сразу начнем применять новые знания на практике с помощью симуляторов.",
      image:
        "https://images.unsplash.com/photo-1562564055-71e051d33c19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
    },
    {
      selling_point: "Отработка навыков",
      selling_point_details:
        "Сразу начнем применять свои знания на практике с помощью тестов, задач, редакторов и конструкторов документов.",
      image:
        "https://images.unsplash.com/photo-1600195077909-46e573870d99?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    {
      selling_point: "Практические задания",
      selling_point_details:
        "Мы даем вам практические задания, по которым можно получить обратную связь от преподавателей.",
      image:
        "https://images.unsplash.com/photo-1589386417686-0d34b5903d23?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    {
      selling_point: "Помощь кураторов",
      selling_point_details:
        "У вас будет доступ 24/7 к кураторам и преподавателям, которые помогут вам с любым техническим и учебным вопросом.",
      image:
        "https://images.unsplash.com/photo-1459499362902-55a20553e082?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1049&q=80",
    },
  ];
  return (
    <Styles>
      <Container>
        <h2>{t("program_includes")}</h2>
        <div className="text">
          {props.coursePage.methods && renderHTML(props.coursePage.methods)}
        </div>
        <PointsBox>
          {sps.map((s, i) => (
            <Point>
              <div className="number">{i + 1}</div>
              <div className="info">
                <div className="header">{s.selling_point}</div>
                <div className="text">{s.selling_point_details}</div>
              </div>
            </Point>
          ))}
        </PointsBox>
        <h2>Результаты по итогам курса</h2>

        <div className="text">
          {props.coursePage.result && renderHTML(props.coursePage.result)}
        </div>
      </Container>
    </Styles>
  );
};

export default SellingPoints;
