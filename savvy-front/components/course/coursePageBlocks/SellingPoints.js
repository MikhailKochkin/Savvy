import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import parse from "html-react-parser";

const Styles = styled.div`
  width: 100%;
  /* background: #f4f8fc; */
  border-top: 1px solid #dce2e7;
  display: flex;
  padding: 40px 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 50px;
  .video-container {
    width: 600px;
    margin: 40px auto;
    text-align: center;
  }
  video {
    max-width: 100%;
    height: auto;
  }
  .video-fit {
    width: 600px;
    height: 100%;
    object-fit: cover;
  }
  @media (max-width: 1040px) {
    padding: 30px 0;
    .video-container {
      width: 350px;
      margin: 40px auto;
      text-align: center;
    }
    video {
      max-width: 100%;
      height: auto;
    }
    .video-fit {
      width: 350px;
      height: 100%;
      object-fit: cover;
    }
  }
`;

const Container = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  img {
    width: 100%;
    max-width: 100%;
  }
  h2 {
    line-height: 1.3;
    font-weight: 700;
    font-size: 2.8rem;
    margin: 15px 0;
  }
  .text {
    width: 80%;
    font-size: 1.6rem;
    p {
      margin: 5px 0;
    }
  }
  @media (max-width: 1040px) {
    .text {
      width: 100%;
    }
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
  background: #fff;
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

const Bubble = styled.div`
  border-radius: 20px;
  background-color: #fff;
  /* background-position: center center; */
  border: 2px solid #7000ff;
  border-style: solid;
  padding: 10px 25px;
  width: 80%;
  .pattern {
    width: 100%;
    /* height: 220px; */
    div {
      border: 1px solid blue;
      img {
        background-repeat: no-repeat;
        width: 40%;
        height: 180px;
      }
    }
    /* background-image: url("/static/pattern3.svg");
    background-size: contain;
    background-repeat: no-repeat; */
  }
`;

const Blue = styled.div`
  background: #171e2e;
  background-image: url("/static/pattern.svg");
  background-size: cover;
  color: #dee1ec;
  padding: 20px 30px;
  border-radius: 15px;
  width: 85%;
  margin-bottom: 20px;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const SellingPoints = (props) => {
  const d = props.data;
  const router = useRouter();
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

  const sps_eng = [
    {
      selling_point: "Learning quickly",
      selling_point_details:
        "Learn from real-life experience of your instructors in the form of stories, dialogues and videos.",
    },
    {
      selling_point: "Mastering new skills",
      selling_point_details:
        "Master new skills online using our AI-powered tools: doc editors, contract builders and online case studies.",
      image:
        "https://images.unsplash.com/photo-1600195077909-46e573870d99?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    {
      selling_point: "Practical assignments",
      selling_point_details: "Get real feedback on your practical assignments.",
      image:
        "https://images.unsplash.com/photo-1589386417686-0d34b5903d23?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    {
      selling_point: "Getting help",
      selling_point_details:
        "Ask questions 24/7 to your instructors on Discord or book an e-meeting.",
      image:
        "https://images.unsplash.com/photo-1459499362902-55a20553e082?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1049&q=80",
    },
  ];
  return (
    <Styles>
      <Container>
        <Blue>
          <div className="text">
            {props.coursePage.result && parse(props.coursePage.result)}
          </div>
        </Blue>
        <div className="text">
          {props.coursePage.methods && parse(props.coursePage.methods)}
        </div>
      </Container>
    </Styles>
  );
};

export default SellingPoints;
