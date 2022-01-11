import React from "react";
import Program from "./Program";
import styled from "styled-components";
import moment from "moment";

const Styles = styled.div`
  display: flex;
  margin: 70px 0;
  flex-direction: column;
  align-items: center;
  width: 100%;
  @media (max-width: 800px) {
    width: 100%;
    padding: 20px 0;
  }
`;

const Container = styled.div`
  display: flex;
  width: 800px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  flex-wrap: wrap;
  @media (max-width: 800px) {
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const Programs = () => {
  moment.locale("ru");

  var dates = [
    "November 11, 2021 20:00:00",
    "November 19, 2021 20:00:00",
    "November 28, 2021 20:00:00",
    "December 2, 2021 20:00:00",
    "December 7, 2021 20:00:00",
    "December 12, 2021 20:00:00",
    "December 19, 2021 20:00:00",
    "December 24, 2021 20:00:00",
    "December 29, 2021 20:00:00",
    "January 7, 2022 20:00:00",
  ];

  let chooseDate = (date) => {
    let i;
    for (i = 0; i < dates.length; i++) {
      if (date.diff(dates[i], "minutes") < 0) {
        return dates[i];
      }
    }
  };

  let next_date = moment(chooseDate(moment())).format("DD MMMM");
  const programs = [
    {
      title: "Юридический английский для профессионалов",
      description:
        "Научим использовать юридический английский в реальных рабочих проектах",
      term: "Длительность: 6 месяцев",
      price: "52 000₽",
      conditions: `До ${next_date}`,
      installments: "20% скидка",
      img: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1100&q=80",
      pathname: "english",
      query: "id=main_page",
    },
    {
      title: "Карьерная Школа Юриста",
      description:
        "Помогаем запустить престижную юридическую карьеру. Изучаем корпоративное право, арбитражный процесс, налоги и право IP/IT.",
      term: "Длительность: 6 месяцев",
      price: "59 000 ₽",
      conditions: `До ${next_date}`,
      installments: "20% скидка",
      img: "https://images.unsplash.com/photo-1565349173908-1cf6bc9fd4ee?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80",
      pathname: "program",
      query: "id=school",
    },
    {
      title: `Корпоративное право`,
      description:
        "Повышаем квалификацию юристов в области корпоративного права, антимонопольного права и сделок M/A",
      term: "Длительность: 3 месяца",
      price: "44 000₽",
      conditions: `До ${next_date}`,
      installments: "20% скидка",
      img: "https://images.unsplash.com/photo-1523731407965-2430cd12f5e4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
      pathname: "program",
      query: "id=corp",
    },
    {
      title: `Арбитражный процесс`,
      description:
        "Поэтапно покажем, как выиграть судебный процесс в арбитражном суде",
      term: "Длительность: 1 месяц",
      price: "29 900₽",
      conditions: `До ${next_date}`,
      installments: "50% скидка",
      img: "https://images.unsplash.com/photo-1555848962-6e79363ec58f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1433&q=80",
      pathname: "coursePage",
      query: "id=ckt9rmh4e51981hp97uwp6rft",
    },
    {
      title: `Старт в Праве`,
      description:
        "Вы познакомитесь с гражданским правом, IP и юр английским, получите необходимые soft skills и начнете свой карьерный путь в компании проактивных и талантливых юристов.",
      term: "Длительность: 6 месяцев",
      price: "29 900₽",
      conditions: `До ${next_date}`,
      installments: "50% скидка",
      img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80",
      pathname: "program",
      query: "id=start",
    },
    {
      title: "Старт в Гражданском праве",
      description:
        "Изучаем основы гражданского права, чтобы успешно сдать экзамены и пройти отбор в юридическую фирму.",
      term: "Длительность: 3 месяца",
      price: "8 900₽",
      conditions: `До ${next_date}`,
      installments: "20% скидка",
      img: "https://images.unsplash.com/photo-1495542779398-9fec7dc7986c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      pathname: "coursePage",
      query: "id=cjtreu3md00fp0897ga13aktp",
    },
    {
      title: "Старт в IP",
      description:
        "Изучаем основы права интеллектуальной собственности, чтобы успешно сдать экзамены и пройти отбор в юридическую фирму.",
      term: "Длительность: 1 месяц",
      price: "8 900₽",
      conditions: `До ${next_date}`,
      installments: "20% скидка",
      img: "https://images.unsplash.com/photo-1484136199491-6603c473c88b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
      pathname: "coursePage",
      query: "id=ckfy1q60a02f307281abcpgae",
    },
    {
      title: "Старт в Гражданском процессе",
      description:
        "Изучаем основы гражданского процессе, окунувшись в историю молодого юриста и его опытного наставника.",
      term: "Длительность: 1 месяц",
      price: "8 900₽",
      conditions: `До ${next_date}`,
      installments: "20% скидка",
      img: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      pathname: "coursePage",
      query: "id=ck78sx36r00vi0700zxlzs1a5",
    },
    {
      title: "Старт в юридическом английском",
      description:
        "Изучаем основы юридического и общего английского, чтобы успешно пройти испытания в российские и зарубежные компании и получить первую работу.",
      term: "Длительность: 2 месяца",
      price: "8 900₽",
      conditions: `До ${next_date}`,
      installments: "20% скидка",
      img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      pathname: "coursePage",
      query: "id=cktrbubdl2237dou9vzn1gb3w",
    },
  ];
  return (
    <Styles id="course_search">
      <Container>
        {programs.map((p, i) => (
          <Program
            key={i}
            img={p.img}
            title={p.title}
            description={p.description}
            term={p.term}
            price={p.price}
            installments={p.installments}
            conditions={p.conditions}
            pathname={p.pathname}
            query={p.query}
          />
        ))}
      </Container>
    </Styles>
  );
};

export default Programs;
