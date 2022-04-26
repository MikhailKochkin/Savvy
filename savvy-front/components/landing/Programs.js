import React from "react";
import Program from "./Program";
import styled from "styled-components";
import moment from "moment";
import { useRouter } from "next/router";

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
  justify-content: ${(props) =>
    props.moreThanOne ? "space-between" : "center"};
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
  const router = useRouter();

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
  const rus_programs = [
    {
      title: "Юридический английский для профессионалов. Базовый курс",
      description:
        "Индивидуально обучаем общему, деловому и юридическому английскому для работы в России и за рубежом",
      term: "Длительность: 2 месяца",
      price: "9 900₽",
      conditions: `Рассрочка`,
      installments: "на 4 мес.",
      img: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1100&q=80",
      pathname: "coursePage",
      query: "id=ck0pdit6900rt0704h6c5zmer",
    },
    {
      title: "Юридический английский для профессионалов. Продвинутый курс",
      description:
        "Индивидуально обучаем общему, деловому и юридическому английскому для работы в России и за рубежом",
      term: "Длительность: 2 месяца",
      price: "9 900₽",
      conditions: `Рассрочка`,
      installments: "на 4 мес.",
      img: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      pathname: "coursePage",
      query: "id=ck2f2nk4007dw0785lhixfppw",
    },
    {
      title: "Юридический английский для профессионалов. Юр перевод",
      description:
        "Индивидуально обучаем общему, деловому и юридическому английскому для работы в России и за рубежом",
      term: "Длительность: 2 месяца",
      price: "9 900₽",
      conditions: `Рассрочка`,
      installments: "на 4 мес.",
      img: "https://images.unsplash.com/photo-1513026705753-bc3fffca8bf4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      pathname: "coursePage",
      query: "id=ck6mc531p02z20748kwpqnt7z",
    },
    {
      title: "Юридический английский для профессионалов. Устная речь",
      description:
        "Индивидуально обучаем общему, деловому и юридическому английскому для работы в России и за рубежом",
      term: "Длительность: 1 месяц",
      price: "4 900₽",
      conditions: `Рассрочка`,
      installments: "на 4 мес.",
      img: "https://images.unsplash.com/photo-1534374950034-3644ddb72710?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      pathname: "coursePage",
      query: "id=cknu5zekc112311g1emrinm7io",
    },
    // {
    //   title: "Карьерная Школа Юриста",
    //   description:
    //     "Помогаем запустить престижную юридическую карьеру. Изучаем корпоративное право, арбитражный процесс, налоги и право IP/IT.",
    //   term: "Длительность: 6 месяцев",
    //   price: "39 000 ₽",
    //   conditions: `Рассрочка`,
    //   installments: "на 4 мес.",
    //   img: "https://images.unsplash.com/photo-1565349173908-1cf6bc9fd4ee?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80",
    //   pathname: "program",
    //   query: "id=school",
    // },
    {
      title: `Корпоративное право`,
      description:
        "Повышаем квалификацию юристов в области корпоративного права и сделок M/A",
      term: "Длительность: 2 месяца",
      price: "9 900₽",
      conditions: `Рассрочка`,
      installments: "на 4 мес.",
      img: "https://images.unsplash.com/photo-1523731407965-2430cd12f5e4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
      pathname: "coursePage",
      query: "id=ck587y4kp00lf07152t0tyywl",
    },
    {
      title: `Правовое регулирование программного обесепечения`,
      description:
        "Повышаем квалификацию юристов в области корпоративного права и сделок M/A",
      term: "Длительность: 2 месяца",
      price: "9 900₽",
      conditions: `Рассрочка`,
      installments: "на 4 мес.",
      img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      pathname: "coursePage",
      query: "id=ckup6fss5650821hwe4oqbql91",
    },
    {
      title: `Арбитражный процесс`,
      description:
        "Поэтапно покажем, как выиграть судебный процесс в арбитражном суде",
      term: "Длительность: 1 месяц",
      price: "9 900₽",
      conditions: `Рассрочка`,
      installments: "на 4 мес.",
      img: "https://images.unsplash.com/photo-1555848962-6e79363ec58f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1433&q=80",
      pathname: "coursePage",
      query: "id=ckt9rmh4e51981hp97uwp6rft",
    },
    {
      title: `Налоговое право`,
      description:
        "Необходимые знания из области налогового права для юристов любого уровня",
      term: "Длительность: 1 месяц",
      price: "9 900₽",
      conditions: `Рассрочка`,
      installments: "на 4 мес.",
      img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1911&q=80",
      pathname: "coursePage",
      query: "id=ckwue8197229091h1abn955mbe",
    },
    {
      title: `Семейное право`,
      description:
        "Разбираем практические вопросы для старта карьеры семейного юриста",
      term: "Длительность: 1 месяц",
      price: "9 900₽",
      conditions: `Рассрочка`,
      installments: "на 4 мес.",
      img: "https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1354&q=80",
      pathname: "coursePage",
      query: "id=ckum7fc9i644701hqtbnqalqgg",
    },
    {
      title: `Старт в Праве`,
      description:
        "Вы познакомитесь с гражданским правом, IP и юр английским, получите необходимые soft skills и начнете свой карьерный путь в компании проактивных и талантливых юристов.",
      term: "Длительность: 6 месяцев",
      price: "18 100₽",
      conditions: `Рассрочка`,
      installments: "на 4 мес.",
      img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80",
      pathname: "program",
      query: "id=start",
    },
    {
      title: `Старт в банкротстве`,
      description: "",
      term: "Длительность: 1 месяц",
      price: "4 900₽",
      conditions: `Рассрочка`,
      installments: "на 4 мес.",
      img: "https://images.unsplash.com/photo-1527874594978-ee4f8a05b4c1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      pathname: "coursePage",
      query: "id=ckgdgw88c02uv0742v0ttx8pl",
    },
    {
      title: "Старт в Гражданском праве",
      description:
        "Изучаем основы гражданского права, чтобы успешно сдать экзамены и пройти отбор в юридическую фирму.",
      term: "Длительность: 3 месяца",
      price: "8 900₽",
      conditions: `Рассрочка`,
      installments: "на 4 месяца",
      img: "https://images.unsplash.com/photo-1495542779398-9fec7dc7986c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      pathname: "coursePage",
      query: "id=cjtreu3md00fp0897ga13aktp",
    },
    {
      title: "Гражданское право: особенная часть",
      description:
        "Изучаем основы гражданского права, чтобы успешно сдать экзамены и пройти отбор в юридическую фирму.",
      term: "Длительность: 3 месяца",
      price: "8 900₽",
      conditions: `Рассрочка`,
      installments: "на 4 месяца",
      img: "https://images.unsplash.com/photo-1572977141534-4b0a0aa22118?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1538&q=80",
      pathname: "coursePage",
      query: "id=ck4n47a2j01jg0790gspxqxju",
    },
    {
      title: "Старт в IP",
      description:
        "Изучаем основы права интеллектуальной собственности, чтобы успешно сдать экзамены и пройти отбор в юридическую фирму.",
      term: "Длительность: 1 месяц",
      price: "8 900₽",
      conditions: `Рассрочка`,
      installments: "на 4 месяца",
      img: "https://images.unsplash.com/photo-1484136199491-6603c473c88b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
      pathname: "coursePage",
      query: "id=ckfy1q60a02f307281abcpgae",
    },
    {
      title: "Старт в Гражданском процессе",
      description:
        "Изучаем основы гражданского процесса, окунувшись в историю молодого юриста и его опытного наставника.",
      term: "Длительность: 1 месяц",
      price: "4 900₽",
      conditions: `Рассрочка`,
      installments: "на 4 месяца",
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
      conditions: `Рассрочка`,
      installments: "на 4 месяца",
      img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      pathname: "coursePage",
      query: "id=cktrbubdl2237dou9vzn1gb3w",
    },
    {
      title: `Старт в земельном праве и праве недвижимости`,
      description: "",
      term: "Длительность: 1 месяц",
      price: "4 900₽",
      conditions: `Рассрочка`,
      installments: "на 4 мес.",
      img: "https://images.unsplash.com/photo-1591389703635-e15a07b842d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1333&q=80",
      pathname: "coursePage",
      query: "id=ck3e1vo65002307638xcx7wkd",
    },
  ];

  const eng_programs = [
    {
      title: "Legal English course",
      description:
        "The course teaches students grammar, vocabulary and writing skills necessary to work in a law firm.",
      term: "Length: 9 weeks",
      price: "149 $",
      conditions: `for groups `,
      installments: "up to -33%",
      img: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1100&q=80",
      pathname: "coursePage",
      query: "id=cl11wmpa584311hyuvzpunsqi",
    },
    // {
    //   title: "Legal English. Full course",
    //   description:
    //     "We will dive into the complex grammar and vocabulary topics, develop writing and editing skills to make sure that you are good at drafting contracts, writing memos and business letters.",
    //   term: "Length: 2 months",
    //   price: "From 99$",
    //   conditions: `is free`,
    //   installments: "First lesson",
    //   img: "https://images.unsplash.com/photo-1565349173908-1cf6bc9fd4ee?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80",
    //   pathname: "program",
    //   query: "id=english_full",
    // },
  ];

  let programs;
  router.locale == "ru" ? (programs = rus_programs) : (programs = eng_programs);

  return (
    <Styles id="course_search">
      <Container moreThanOne={programs.length > 1 ? true : false}>
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
