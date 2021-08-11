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
        <h2>Учитесь у лучших</h2>
        <TeachersList>
          <TeacherBox color="#4db0de">
            <img src="https://res.cloudinary.com/mkpictureonlinebase/image/upload/v1626079215/%D0%9B%D0%B5%D0%B2_2.png" />
            <div className="name">
              Лев
              <br /> Толстопятов
            </div>
            <div className="work">Помощник юриста в Clifford Chance</div>
            <div className="description">
              Специализируется на M/A сделках и рынке ценных бумаг. Также
              помогает студентам структурировать свою подготовку к
              собеседованиям в юридические фирмы, научиться разбирать кейсы и
              готовить резюме и сопроводительные письма. Закончил МГЮА.
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
              Специализируется на финансовых сделках и синдицированном
              кредитовании. Закончил бакалавриат и магистерскую программу
              "Магистр частного права" в МГУ. Основал проект по изучению
              гражданского права "Цивилист".
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
              Закончила магистратуру СПБГУ, аспирант 2 года ИЗиСП.
              Специализируется в разрешении судебных споров в сфере
              земельно-имущественных и строительных отношений, сопровождает
              строительные проекты, в частности проекты по комплексному развитию
              территории в г. Москве.
            </div>
          </TeacherBox>
          <TeacherBox color="#5BC9BA">
            <img src="https://res.cloudinary.com/mkpictureonlinebase/image/upload/v1628687623/%D0%93%D1%83%D0%BD%D0%B0.png" />
            <div className="name">
              Александр
              <br /> Гуна
            </div>
            <div className="work">Помощник юриста в CMS</div>
            <div className="description">
              «Яндекс» третий раз увеличил прогноз по размеру выручки в 2021
              году: теперь компания ожидает, что показатель вырастет на 53-55%.
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
              Специализируется на разработке курсов для юристов. Его задача
              – проконтролировать, чтобы знания экспертов передавались в простой
              и удобной для запоминания форме, а каждый урок был не просто
              набором материалов, а движением от базовых знаний к сложным
              практическим навыкам.
            </div>
          </TeacherBox>
          <TeacherBox color="#5BC9BA">
            <img src="https://res.cloudinary.com/mkpictureonlinebase/image/upload/v1627914070/%D0%9D%D0%B8%D0%BA%D0%B8%D1%82%D0%B0.png" />
            <div className="name">
              Никита
              <br /> Мазурин
            </div>
            <div className="work">Студент ВШЭ</div>
            <div className="description">
              Студент факультета права ВШЭ, финалист муткорта в Финансовом
              университете, участник студенческого конкурса по арбитражу
              корпоративных споров имени В. П. Мозолина. Победитель двух секций
              в рамках V Ежегодной научно-практической конференции студентов и
              аспирантов «Дни науки факультета права НИУ ВШЭ – 2021».
            </div>
          </TeacherBox>
        </TeachersList>
      </Container>
    </Styles>
  );
};

export default Teachers;
