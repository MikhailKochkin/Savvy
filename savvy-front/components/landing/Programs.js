import React from "react";
import Program from "./Program";
import styled from "styled-components";

const Styles = styled.div`
  display: flex;
  margin: 20px 0;
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
  const programs = [
    {
      title: "Юридический английский для профессионалов",
      description:
        "Научим использовать юридический английский в реальных рабочих проектах",
      term: "Длительность: 6 месяцев",
      price: "39 000₽",
      conditions: "Рассрочка на 6 мес",
      installments: "6 500₽",
      img: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1100&q=80",
      pathname: "english",
      query: "id=main_page",
    },
    {
      title: "Школа Молодого Юриста",
      description:
        "Помогаем запустить престижную юридическую карьеру. Изучаем корпоративное право, арбитражный процесс, налоги и право IP/IT.",
      term: "Длительность: 6 месяцев",
      price: "48 000₽",
      conditions: "Грант на обучение",
      installments: "до 50%",
      img: "https://images.unsplash.com/photo-1565349173908-1cf6bc9fd4ee?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80",
      pathname: "program",
      query: "id=main_page",
    },
    // {
    //   title: `Интенсив "Корпоративный юрист"`,
    //   description:
    //     "Повышаем квалификацию юристов в области корпоративного права, антимонопольного права и сделок M/A",
    //   term: "Длительность: 3 месяца",
    //   price: "28 000₽",
    //   conditions: "Рассрочка на 12 мес",
    //   installments: "2 340₽",
    //   img: "https://images.unsplash.com/photo-1523731407965-2430cd12f5e4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
    //   pathname: "program",
    //   query: "id=main_page",
    // },
    {
      title: "Старт в Гражданском праве",
      description:
        "Изучаем основы гражданского права, чтобы успешно сдать экзамены и пройти отбор в юридическую фирму.",
      term: "Длительность: 6 месяцев",
      price: "9 800₽",
      conditions: "2 платежа",
      installments: "4 900₽",
      img: "https://images.unsplash.com/photo-1495542779398-9fec7dc7986c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      pathname: "coursePage",
      query: "id=cjtreu3md00fp0897ga13aktp",
    },
    {
      title: "Старт в юридическом английском",
      description:
        "Изучаем основы юридического и общего английского, чтобы успешно пройти испытания в российские и зарубежные компании и получить первую работу.",
      term: "Длительность: 2 месяца",
      price: "7 900₽",
      conditions: "До 1 октября скидка",
      installments: "25%",
      img: "https://images.unsplash.com/photo-1592748752489-40082b21cd99?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1100&q=80",
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
