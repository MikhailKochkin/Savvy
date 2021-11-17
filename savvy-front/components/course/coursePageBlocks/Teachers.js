import React from "react";
import styled from "styled-components";
import renderHTML from "react-render-html";

const Styles = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: #fff;
  border-top: 1px solid #dce2e7;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px 0;
`;

const Container = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h2 {
    text-align: left;
    font-weight: 400;
    font-size: 4rem;
    line-height: 1.4;
    width: 100%;
    margin: 80px 0;
  }
  @media (max-width: 800px) {
    h2 {
      margin-bottom: 40px;
      font-size: 3.2rem;
    }
  }
`;

const TeachersList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: space-between;
  width: 100%;
  @media (max-width: 800px) {
    width: auto;
  }
`;

const TeacherBox = styled.div`
  width: 240px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 40px;
  position: relative;
  .image_container {
    width: 160px;
    height: 200px;
    position: relative;
    margin-bottom: 15px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .name {
    color: #313d48;
    font-size: 1.6rem;
    text-align: left;
    line-height: 1.4;
    font-weight: 500;
    margin-bottom: 5px;
    width: 160px;
    border-bottom: 1px solid black;
  }
  .work {
    color: #687481;
    font-size: 1.4rem;
    font-weight: 500;
    margin-bottom: 20px;
    text-align: left;
    width: 160px;
    line-height: 1.4;
  }
  .description {
    text-align: left;
    color: #687481;
    width: 85%;
    font-size: 1.4rem;
    line-height: 1.5;
  }
  .header {
    font-weight: 600;
    font-size: 1.8rem;
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
    font-size: 1.4rem;
  }
  @media (max-width: 800px) {
    margin-right: 0;
  }
`;

const TeacherBoxBig = styled.div`
  width: 340px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-right: 15%;
  position: relative;
  .image_container {
    width: 340px;
    height: 460px;
    position: relative;
    margin-bottom: 15px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .name {
    color: #313d48;
    font-size: 2.8rem;
    text-align: left;
    line-height: 1.4;
    font-weight: 600;
    margin-bottom: 5px;
  }
  .work {
    border-top: 1px solid black;
    padding-top: 3%;
    color: #687481;
    font-size: 2rem;
    font-weight: 500;
    margin-bottom: 20px;
    text-align: left;
    line-height: 1.4;
  }
  .description {
    text-align: left;
    color: #687481;
    width: 100%;
    font-size: 1.6rem;
    line-height: 1.5;
  }
  .header {
    font-weight: 600;
    font-size: 1.8rem;
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
    font-size: 1.4rem;
  }
  @media (max-width: 800px) {
    margin-right: 0;
    margin-bottom: 40px;
  }
`;

const Teachers = (props) => {
  const d = props.data;
  let colors = [
    "#4db0de",
    "#9D5AE5",
    "#DB5ABA",
    "#5BC9BA",
    "#F18F01",
    "#F18F01",
  ];
  return (
    <Styles>
      <Container>
        <h2>{d.authors_intro}</h2>
        <TeachersList>
          {d.authors.map((a, i) => {
            if (d.authors.length > 2) {
              return (
                <TeacherBox>
                  <div className="image_container">
                    <img src={a.image} layout="fill" />
                  </div>
                  <div className="name">
                    {a.name} <br />
                    {a.surname}
                  </div>
                  <div className="work">{a.title}</div>
                  <div className="description">{renderHTML(a.info)}</div>
                </TeacherBox>
              );
            } else {
              return (
                <TeacherBoxBig>
                  <div className="image_container">
                    <img src={a.image} layout="fill" />
                  </div>
                  <div className="name">
                    {a.name} <br />
                    {a.surname}
                  </div>
                  <div className="work">{a.title}</div>
                  <div className="description">{renderHTML(a.info)}</div>
                </TeacherBoxBig>
              );
            }
          })}
        </TeachersList>
      </Container>
    </Styles>
  );
};

export default Teachers;
