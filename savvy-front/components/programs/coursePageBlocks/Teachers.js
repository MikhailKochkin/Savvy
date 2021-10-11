import React from "react";
import styled from "styled-components";
// import Image from "next/image";

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
          {d.authors.map((a, i) => (
            <TeacherBox color={colors[(i + 1) % 6]}>
              <div className="image_container">
                <img src={a.image} layout="fill" />
              </div>
              <div className="name">
                {a.name} <br />
                {a.surname}
              </div>
              <div className="work">{a.title}</div>
              <div className="description">{a.info}</div>
            </TeacherBox>
          ))}
          {/* <TeacherBox color="#4db0de">
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
          </TeacherBox> */}
          {/* <TeacherBox color="#9D5AE5">
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
            <img src="/static/misha.jpg" />
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
          </TeacherBox> */}
        </TeachersList>
      </Container>
    </Styles>
  );
};

export default Teachers;
