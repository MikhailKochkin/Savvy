import React from "react";
import styled from "styled-components";

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  min-height: 120vh;
  background: #111111;
  color: #fff;
  @media (max-width: 800px) {
    padding: 30px 0;
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 80%;
  background: #111111;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 20px;
  font-size: 5.4rem;
  width: 70%;
  line-height: 1.4;
  font-weight: 800;
  @media (max-width: 800px) {
    width: 100%;
    font-size: 2.6rem;
  }
`;

const Args = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: space-between;
  .image {
    width: 15%;
    img {
      width: 110px;
      height: 110px;
      background: grey;
      object-fit: cover;
      border-radius: 50%;
    }
  }
  .intro {
    font-size: 2.2rem;
    width: 45%;
    p {
      width: 80%;
      line-height: 1.4;
    }
  }
  .background {
    color: #8c8c8c;
    font-size: 2.2rem;
    width: 40%;
    p {
      width: 80%;
      line-height: 1.4;
    }
  }
  @media (max-width: 800px) {
    flex-direction: column;
    .intro {
      width: 95%;
      p {
        width: 100%;
        font-size: 2rem;

        line-height: 1.4;
      }
    }
    .background {
      color: #8c8c8c;
      width: 95%;
      p {
        width: 100%;
        font-size: 2rem;
        line-height: 1.4;
      }
    }
  }
`;

const Founder = () => {
  return (
    <Styles>
      <Container>
        <Header>Привет, я Миша</Header>
        <Args>
          <div className="image">
            <img src="static/misha2.png" />
          </div>
          <div className="intro">
            <p>Основатель BeSavvy Connect.</p>{" "}
            <p>
              Я по своему опыту вижу, что нетворкинг – это ключ к решению самых
              разных вопросов. В первую очередь, карьерных.{" "}
            </p>
            <p>
              Но даже внутри юридического сообщества не совсем понятно, как ему
              учиться и как им заниматься.
            </p>
            <p>
              Чтобы каждому юристу дать инструменты для выстраивания отношений с
              широким кругом людей, я создал BeSavvy Connect.
            </p>
          </div>
          <div className="background">
            <p>
              А еще я основал онлайн-школу BeSavvy Lawyer. Там мы учим юристов
              праву и английскому языку. И помогаем им найти работу или получить
              повышение.
            </p>
            <p>
              Благодаря опыту создания школы, я хорошо знаю, как создавать
              сообщества и проводить мероприятия. И этот опыт ляжет в основу
              работы BeSavvy Connect.
            </p>
          </div>
        </Args>
      </Container>
    </Styles>
  );
};

export default Founder;
