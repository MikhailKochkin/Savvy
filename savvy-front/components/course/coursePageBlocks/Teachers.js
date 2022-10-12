import React from "react";
import styled from "styled-components";
import renderHTML from "react-render-html";
import { useTranslation } from "next-i18next";

const Styles = styled.div`
  width: 100%;
  min-height: 60vh;
  background: #fff;
  border-top: 1px solid #dce2e7;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px 0;
  @media (max-width: 800px) {
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
  @media (max-width: 800px) {
    h2 {
      margin-bottom: 0px;
      font-size: 3.2rem;
    }
  }
`;

const TeachersList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
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
    margin-top: 30px;
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
  width: 75%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-right: 15%;
  margin-top: 40px;
  position: relative;
  .upper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .image_container {
    width: 140px;
    height: 140px;
    position: relative;
    margin-bottom: 15px;
    img {
      width: 140px;
      height: 140px;
      border-radius: 50%;
      object-fit: cover;
      border: 1px solid #dde2e1;
    }
  }
  .info {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-left: 30px;
  }

  .name {
    color: #313d48;
    font-size: 2rem;
    text-align: left;
    line-height: 1.4;
    font-weight: 600;
    margin-bottom: 2%;
  }
  .work {
    border-top: 1px solid black;
    padding-top: 2%;
    color: #687481;
    font-size: 1.8rem;
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
    margin-top: 10px;
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
    width: 90%;

    margin-right: 0;
    margin-bottom: 40px;
    .upper {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
    }
    .info {
      margin-left: 0px;
    }
    .work {
      padding-top: 0;
      margin-bottom: 0px;
    }
  }
`;

const Teachers = (props) => {
  const d = props.data;
  const { coursePage } = props;
  const { t } = useTranslation("coursePage");

  let colors = [
    "#4db0de",
    "#9D5AE5",
    "#DB5ABA",
    "#5BC9BA",
    "#F18F01",
    "#F18F01",
  ];
  let authors;
  if (coursePage.authors.length > 0) {
    authors = coursePage.authors;
  } else {
    authors = [coursePage.user];
  }
  return (
    <Styles>
      <Container>
        <h2>{t("course_authors")}</h2>
        <TeachersList>
          {authors.map((a, i) => (
            <TeacherBoxBig>
              <div className="upper">
                <div className="image_container">
                  <img src={a.image} layout="fill" />
                </div>
                <div className="info">
                  <div className="name">
                    {a.name} {a.surname}
                  </div>
                  {a.work && <div className="work">{renderHTML(a.work)}</div>}
                </div>
              </div>

              {a.description && (
                <div className="description">{renderHTML(a.description)}</div>
              )}
            </TeacherBoxBig>
          ))}
        </TeachersList>
      </Container>
    </Styles>
  );
};

export default Teachers;
