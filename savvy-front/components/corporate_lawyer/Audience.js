import styled from "styled-components";

const Styles = styled.div`
  min-height: 80vh;
  width: 100vw;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 0;
  .header {
    font-size: 2.6rem;
    font-weight: bold;
    width: 80%;
    line-height: 1.4;
  }
  .header2 {
    font-size: 2.6rem;
    font-weight: bold;
    width: 60%;
    line-height: 1.4;
    text-align: center;
    margin-bottom: 30px;
  }
  .review {
    width: 40%;
    margin: 20px 0;
    background: #f3f4f4;
    border-radius: 15px;
    /* border: 1px solid #ffd89b; */
    border-radius: 15px;
    padding: 15px;
    .author {
      display: flex;
      flex-direction: row;
      align-items: center;
      border-top: 1px solid #fff;
      padding-top: 10px;
      margin-top: 10px;
      img {
        width: 50px;
        border-radius: 50%;
        margin-right: 15px;
        height: 50px;
        object-fit: cover;
      }
    }
  }
  @media (max-width: 800px) {
    height: auto;
    padding-bottom: 0px;
    .header2 {
      width: 80%;
    }
    .review {
      width: 90%;
    }
  }
`;

const Table = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 0px 0px;
  grid-template-areas:
    ". ."
    ". .";
  width: 80%;
  height: 50%;
  margin: 100px 0;
  .cell {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .target {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 80%;
    /* height: 300px; */
    img {
      width: 130px;
    }
  }
  h3 {
    margin: 20px 0;
    width: 100%;
    font-weight: 500;
    text-align: left;
    font-weight: 2.2rem;
    padding-left: 30px;
  }
  @media (max-width: 800px) {
    margin: 40px 0;
    display: flex;
    flex-direction: column;
    height: auto;
    width: 100%;
    flex-wrap: nowrap;
    .target {
      margin-top: 20px;
      flex-direction: row;
      img {
        width: 90px;
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
      <div className="header">На программе вы сможете:</div>
      <Table>
        <div className="cell">
          <div className="target">
            <div>
              {" "}
              <img src="static/mobile.svg" />
            </div>
            <div>
              <h3>
                Сформировать свой блок навыков и карту построения карьеры.
              </h3>
            </div>
          </div>
        </div>
        <div className="cell">
          <div className="target">
            <div>
              {" "}
              <img src="static/career.svg" />
            </div>
            <h3>
              Прорешать онлайн и офлайн кейсы по самым актуальным и сложным
              темам
            </h3>
          </div>
        </div>

        <div className="cell">
          <div className="target">
            <div>
              {" "}
              <img src="static/student1.svg" />
            </div>
            <h3>
              Подготовиться к встрече с работодателем и получить заветную
              стажировку / работу
            </h3>
          </div>
        </div>

        <div className="cell">
          <div className="target">
            <div>
              {" "}
              <img src="static/student1.svg" />
            </div>
            <h3>
              Познакомиться с людьми, которые помогут вам развиваться в
              профессиональной сфере
            </h3>
          </div>
        </div>
      </Table>
      <div className="header2">
        Мы в этом уверены. Смотрите, что говорят 466 наших учеников.
      </div>
      <div className="review">
        <div>
          ❝ Понравилось тем, что акцент был поставлен именно на практическую
          часть в виде вопросов и задач. И отличительной особенностью является
          именно то, что тебе не просто кидают задачу, ты пишешь ответ и
          высвечивается правильно/неправильно, а тебя учат , как именно нужно
          подступиться к решению вопроса, в какой нпа надо посмотреть. В итоге,
          с помощью наводящих вопросов ты сам доходишь до правильного ответа,
          это очень круто! ❞
        </div>
        <div className="author">
          <img src="https://sun1-92.userapi.com/s/v1/if1/YDdXRk4Eeu2dsb1N3LWmRkl-6fAhRoteu1KkEqxxZTL-883-skq1jS9qmShxac0KZYMoc0YW.jpg?size=200x0&quality=96&crop=0,0,1772,1772&ava=1" />
          <div>Марина Владимирова</div>
        </div>
      </div>
      <div className="review">
        <div>
          ❝ В основе лежат важные моменты, которые должны пригодится
          непосредственно в практике. Очень хорошие кейсы, особенно финальный.
          Но главный плюс, что это не автономный тест, всегда имеется
          возможность проконсультироваться, спросить и с технической точки
          зрения и непосредственно по материалу у автора. ❞
        </div>
        <div className="author">
          <img src="https://sun1-97.userapi.com/s/v1/ig1/Z1RPvPNeUXCh88yMXwdQzLX5Cod-i5KBXRQfW__NfxDWRLGXV9YzPnHPy_5gQMQPlfNcPbNA.jpg?size=200x0&quality=96&crop=0,235,960,960&ava=1" />
          <div>Антон Ряхлов</div>
        </div>
      </div>
      <div className="review">
        <div>
          ❝ Помимо этого, курс - это нетворкинг, объединение ребят,
          интересующихся актуальными проблемами корпоративного права. ❞
        </div>
        <div className="author">
          <img src="https://sun1-90.userapi.com/s/v1/if1/WbsXA-m_tItb2sOjV4z3TyZJSzXIc6IrcFjEoFe6INxPCmtyFDyCCf-8_f63B_gtwbn0OoqF.jpg?size=200x0&quality=96&crop=394,62,1202,1204&ava=1" />
          <div>Лев Замескин</div>
        </div>
      </div>
      <div className="review">
        <div>
          ❝ Хочу отметить, что курс очень хорошо выстроен, начинается с самых
          базовых тем и заканчивается вопросами, которые волнуют нынешнюю
          практику. По мере погружения начинаешь решать задачи, которые лично
          меня заставили увидеть те проблемы, которые раньше я не замечал в
          учебниках и законах. Присоединяюсь к мнению тех, кто считает, что
          самое интересное в курсе - это семинары с Дени Мурдаловым. Он
          старается вложить в них не только знания, но и практические навыки,
          грамотно выстраивает групповую работу. ❞
        </div>
        <div className="author">
          <img src="https://sun1-20.userapi.com/s/v1/ig2/qafFyno8GY1XwSzUij7YKYksKq3Ed9EHmCqu8ZT8KSiE56W6_KRjzmR8l0ERYhGCEN6BIbxZjZXUw_I574g40MtD.jpg?size=200x0&quality=96&crop=0,0,1440,2160&ava=1" />
          <div>Евгений Забурдин</div>
        </div>
      </div>
    </Styles>
  );
};

export default Audience;
