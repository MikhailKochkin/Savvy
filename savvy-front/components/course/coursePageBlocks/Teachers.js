import React from "react";
import styled from "styled-components";

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
    text-align: center;
    font-weight: 400;
    font-size: 3rem;
    line-height: 1.4;
    margin-bottom: 100px;
  }
`;

const TeachersList = styled.div`
  /* width: 800px; */
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: space-between;
  /* overflow: scroll; */
  width: 100%;
`;

const TeacherBox = styled.div`
  width: 310px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-top: 3px solid;
  border-top-color: ${(props) => props.color};
  margin-bottom: 40px;
  margin-right: 20px;
  box-shadow: 0px 0px 10px rgba(129, 129, 129, 0.45);
  border-radius: 5px;
  padding: 20px 0;
  padding-top: 80px;
  /* margin-right: 40px; */
  position: relative;
  .name {
    color: #313d48;
    font-size: 2.3rem;
    text-align: center;
    line-height: 1.4;
    margin-bottom: 20px;
  }
  .work {
    color: #687481;
    font-size: 1.8rem;
    font-weight: 500;
    margin-bottom: 20px;
    text-align: center;
    width: 80%;
    line-height: 1.4;
  }
  .description {
    text-align: center;
    color: #687481;
    width: 80%;
    font-size: 1.4rem;
    line-height: 1.5;
  }
  img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 50px;
    position: absolute;
    top: -25px;
    z-index: 1;
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
`;

const Teachers = () => {
  return (
    <Styles>
      <Container>
        <h2>
          Преподаватели – ключ к успешному обучению. Мы создали команду
          великолепных специалистов из разных юридических школ России.
        </h2>
        <TeachersList>
          <TeacherBox color="#4db0de">
            <img src="https://res.cloudinary.com/mkpictureonlinebase/image/upload/v1626079215/%D0%9B%D0%B5%D0%B2_2.png" />
            <div className="name">
              Лев
              <br /> Толстопятов
            </div>
            <div className="work">Помощник юриста в Clifford Chance</div>
            <div className="description">
              Лев недавно закончил МГЮА и сейчас работает в международной фирме,
              попасть в которую – мечта любого юриста. Сейчас он активно
              занимается M/A сделками и рынком ценных бумаг, а также помогает
              молодым специалистам проходить отбор в компании.
            </div>
          </TeacherBox>
          <TeacherBox color="#9D5AE5">
            <img src="https://media-exp1.licdn.com/dms/image/C5603AQEgI1cMJORQVA/profile-displayphoto-shrink_400_400/0/1603742799048?e=1633564800&v=beta&t=XuBR5Dk0RjkHI_xbriY-OFXZefl9P9FjXF7i3ueiNmQ" />
            <div className="name">
              Кирилл
              <br />
              Михайлов
            </div>
            <div className="work">Юрист в Алруд</div>
            <div className="description">
              Кирилл не только получил работу в одной из лучших компаний России,
              но и основал проект по изучению гражданского права "Цивилист". Он
              закончил МГУ и может много рассказать как про теорию гражданского
              права, так и про финансовые сделки.
            </div>
          </TeacherBox>
          <TeacherBox color="#DB5ABA">
            <img src="https://res.cloudinary.com/mkpictureonlinebase/image/upload/v1619615136/%D0%AE%D0%BB%D1%8F_%D0%97%D0%B5%D0%BC_1.png" />
            <div className="name">
              Юлия
              <br /> Максимкина
            </div>
            <div className="work">Юрист Land Law Firm</div>
            <div className="description">
              Юля – аспирант 2 года ИЗиСП. На работе она сопровождает
              строительные проекты, в том числе, по комплексному развитию
              территории в г. Москве. А на курсе поможет вам разобраться в
              вещном праве.
            </div>
          </TeacherBox>
          <TeacherBox color="#5BC9BA">
            <img src="https://res.cloudinary.com/mkpictureonlinebase/image/upload/v1628687623/%D0%93%D1%83%D0%BD%D0%B0.png" />
            <div className="name">
              Александр
              <br /> Гуна
            </div>
            <div className="work">Выпускник МГУ</div>
            <div className="description">
              Александр вместе с Кириллом развивает проект "Цивилист", где они
              изучают сложные аспекты гражаднского права и часто беседуют с
              видными юристами, в том числе, Артемом Карапетовым и Романом
              Бевзенко.
            </div>
          </TeacherBox>
          <TeacherBox color="#F18F01">
            <img src="./static/misha.jpg" />
            <div className="name">
              Михаил
              <br /> Кочкин
            </div>
            <div className="work">Создатель BeSavvy</div>
            <div className="description">
              Задача Миши – проконтролировать, чтобы знания экспертов
              передавались в простой и удобной для запоминания форме, а каждый
              урок был не просто набором материалов, а движением от базовых
              знаний к сложным практическим навыкам.
            </div>
          </TeacherBox>
          <TeacherBox color="#ffd60a">
            <img src="https://res.cloudinary.com/mkpictureonlinebase/image/upload/v1627914070/%D0%9D%D0%B8%D0%BA%D0%B8%D1%82%D0%B0.png" />
            <div className="name">
              Никита
              <br /> Мазурин
            </div>
            <div className="work">Практикующий юрист</div>
            <div className="description">
              Никита – студент факультета права ВШЭ, финалист муткорта в
              Финансовом университете, участник студенческого конкурса по
              арбитражу корпоративных споров имени В. П. Мозолина. Победитель
              двух секций в рамках V Ежегодной научно-практической конференции
              студентов и аспирантов «Дни науки факультета права НИУ ВШЭ –
              2021».
            </div>
          </TeacherBox>
        </TeachersList>
      </Container>
    </Styles>
  );
};

export default Teachers;
