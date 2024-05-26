import styled from "styled-components";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";
import tinkoff from "@tcb-web/create-credit";
import { Tooltip } from "react-tooltip";

const CREATE_ORDER_MUTATION = gql`
  mutation createOrder(
    $coursePageId: String!
    $userId: String!
    $price: Int!
    $promocode: String
    $comment: String
  ) {
    createOrder(
      coursePageId: $coursePageId
      price: $price
      userId: $userId
      promocode: $promocode
      comment: $comment
    ) {
      order {
        id
        paymentID
      }
      url
    }
  }
`;

const Styles = styled.div`
  background: #ffffff; /* fallback for old browsers */
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const Container = styled.div`
  display: flex;
  width: 80%;
  min-height: 80vh;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  background: #ffffff;
  border-radius: 5px;
  margin: 30px 50px;
  h1 {
    font-size: 2.6rem;
    font-weight: 600;
    line-height: 1.2;
    margin: 35px 0;
  }
  .plans {
    display: flex;
    flex-direction: row;
  }
  @media (max-width: 1400px) {
    width: 90%;
  }

  @media (max-width: 1000px) {
    margin: 40px 0;
    width: 95%;
    .plans {
      flex-direction: column;
      align-items: center;
      width: auto;
      width: 100%;
    }
  }
`;

const Form = styled.div`
  width: 385px;
  height: 620px;
  flex-shrink: 0;
  margin-right: 20px;
  border: 1px solid #cfcfcf;
  border-radius: 10px;
  padding: 10px;
  h2 {
    font-size: 2.6rem;
    line-height: 1.2;
    color: #120944;
    margin-bottom: 15px;
    width: 90%;
    margin-top: 30px;
  }
  .label {
    font-weight: 600;
    font-size: 1.8rem;
    color: #120944;
  }
  .section {
    margin: 20px 10px;
    border-bottom: 1px solid #cfcfcf;
    padding-bottom: 10px;
  }
  input {
    width: 100%;
    border: 2px solid #dddddd;
    border-radius: 5px;
    height: 40px;
    padding: 5px;
    color: #120944;
    font-family: Montserrat;
    font-weight: 500;
    margin-bottom: 15px;
    font-size: 1.3rem;
    outline: 0;
  }
  .editor {
    font-size: 1.6rem;
    width: 100%;
    border: 2px solid #dddddd;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    outline: 0;
    padding: 0.5%;
    margin-bottom: 10px;
    color: #120944;
    p {
      font-size: 1.3rem;
      color: #120944;
    }
    @media (max-width: 800px) {
    }
  }
  #submit {
    background-color: #030161;
    color: #fff;
    border: 1px solid #030161;
    height: 50px;
    width: 100%;
    border-radius: 5px;
    margin-bottom: 15px;
    font-family: Montserrat;
    font-weight: 500;
    font-size: 1.6rem;
    cursor: pointer;
    transition: 0.2s ease-in;
    &:hover {
      background-color: #4b00e0;
      border: 1px solid #4b00e0;
    }
  }
  .thankyou {
    margin-bottom: 25px;
    line-height: 1.4;
    text-align: center;
    border: 2px solid #7000ff;
    padding: 10px;
    border-radius: 5px;
  }
  .comment {
    color: #b0b0b0;
    font-size: 1.2rem;
    line-height: 1.4;
    span {
      display: inline-block;
      background-color: #464646;
      text-align: center;
      color: #fff;
      width: 17px;
      height: 17px;
      border-radius: 50%;
      cursor: pointer;
      margin-left: 5px;
    }
  }
  .comment_main {
    color: #6d6d6d;
    font-size: 1.5rem;
    margin-bottom: 15px;
    line-height: 1.4;
    span {
      color: #130944;
    }
  }
  @media (max-width: 1400px) {
    width: 320px;
    height: 620px;
  }
  @media (max-width: 1000px) {
    width: 400px;
    height: 620px;
    margin-bottom: 20px;
  }

  @media (max-width: 800px) {
    width: 100%;
    margin-right: 0px;
    margin-bottom: 20px;
    height: auto;
  }
`;

const Banner = styled.div`
  width: 100%;
  height: 80px;
  background: radial-gradient(at bottom right, #da0119 0%, #1d4590 70%);
  color: #fff;
  padding: 10px;
  border-radius: 10px;
  .bannerFirst {
    font-size: 1.8rem;
    font-weight: 600;
  }
`;

const MovingRow = styled.div`
  width: 100%;
  overflow: hidden;
  margin-top: 100px;
  padding: 10px 0;
  .moving-row {
    display: flex;
    width: fit-content;
    animation: moveLeft 25s linear infinite;
  }

  .item {
    flex: 0 0 auto;
    width: 200px;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);

    padding: 10px 10px;
    line-height: 1.3;
    font-weight: 600;
    margin-right: 15px;
    display: flex;
    font-size: 1.3rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* border: 1px solid #cfcfcf; */
    div {
      width: 100%;
    }
    .itemTitle {
      font-size: 1.6rem;
      font-weight: 600;
      color: #120944;
      line-height: 1.2;
      margin-bottom: 10px;
    }
    .itemLength {
      font-size: 1.2rem;
      font-weight: 600;
      color: #120944;
      line-height: 1.2;
      margin-top: 10px;
    }
  }

  @keyframes moveLeft {
    0% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(-50%);
    }
  }
  @media (max-width: 800px) {
    margin-bottom: 5px;
  }
`;

const ButtonBuy = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 42px;
  padding: 2%;
  font-family: Montserrat;
  border: 2px solid #1c4490;
  border-radius: 10px;
  text-align: center;
  background: #1c4490;
  margin-bottom: 10px;
  outline: 0;
  cursor: pointer;
  font-size: 1.6rem;
  transition: ease-in 0.2s;
  color: #fff;
  a {
    color: #fff;
  }
  &:hover {
    background-color: #0b44bf;
  }
  @media (max-width: 800px) {
    width: 100%;
    margin-bottom: 5px;
  }
`;

const ButtonOpen = styled.button`
  width: 100%;
  height: 42px;
  padding: 2%;
  font-family: Montserrat;
  border: 2px solid #252f3f;
  border-radius: 10px;
  background: none;
  margin-bottom: 10px;
  outline: 0;
  cursor: pointer;
  font-size: 1.6rem;
  transition: ease-in 0.2s;
  &:hover {
    background-color: #e3e4ec;
  }
  @media (max-width: 800px) {
    width: 100%;
    margin-top: 5px;
  }
`;

const Comment = styled.div`
  line-height: 1.2;
  font-size: 1.2rem;
  color: #b0b0b0;
  margin-top: 20px;
  text-align: center;
  width: 100%;
`;

const Subscription = (props) => {
  const router = useRouter();

  const [
    createOrder,
    { data: order_data, loading: loading_data, error: error_data },
  ] = useMutation(CREATE_ORDER_MUTATION);

  const getInstallments = (price) => {
    tinkoff.create({
      shopId: process.env.NEXT_PUBLIC_SHOP_ID,
      showcaseId: process.env.NEXT_PUBLIC_SHOWCASE_ID,
      items: [
        { name: "Первая подписка на BeSavvy+", price: price, quantity: 1 },
      ],
      sum: price,
      promoCode: "installment_0_0_3_4,34",
    });
    if (props.me) {
      createOrder({
        variables: {
          coursePageId: props.courseId
            ? props.courseId
            : "clwl0no8h00002xuxtmyq8778",
          price: price,
          userId: props.me.id,
          comment: "Заявка на рассрочку",
        },
      });
    }
  };

  const completePayment = async (price) => {
    console.log("props.courseId", props.courseId);

    if (!props.me) {
      router.push(`auth?pathname=subscription?courseId=${props.courseId}`);
      return;
    }
    const res = await createOrder({
      variables: {
        coursePageId: props.courseId
          ? props.courseId
          : "clwl0no8h00002xuxtmyq8778",
        price: price,
        userId: props.me.id,
      },
    });
    location.href = res.data.createOrder.url;
  };
  return (
    <Styles>
      <Container>
        <h1 className="header">Выберите план и откройте доступ к 35+ курсам</h1>
        <div className="plans">
          <Form>
            <Banner>
              <div className="bannerFirst">Мини</div>
              <div>Для студентов</div>
            </Banner>
            <div className="section">
              <div className="comment">Стоимость</div>
              <div className="label" for="mistakes">
                1990 ₽ / мес
              </div>
            </div>
            <div className="section">
              <div className="comment">
                Доступные курсы{" "}
                <span
                  data-tooltip-id="my-tooltip"
                  data-tooltip-html={`Сразу после оплаты вы получите доступ к 1 курсу.<br/>
                  Впоследствии каждый месяц вы сможете открывать еще один новый курс в случае продления подписки.<br/>
                  Если подписка не продляется, доступ ко всем курсам будет закрыт.`}
                  data-tooltip-place="right"
                >
                  ?
                </span>
              </div>
              <div className="label" for="mistakes">
                1 новый курс в месяц
              </div>
            </div>
            <div className="section">
              <div className="comment">Карьерные сервисы</div>
              <div className="label" for="mistakes">
                X
              </div>
            </div>
            <div className="section">
              <div className="comment">Сообщество студентов и авторов</div>
              <div className="label" for="mistakes">
                ✔️
              </div>
            </div>
            <div className="section">
              <div className="comment">Количество студентов</div>
              <div className="label" for="mistakes">
                1
              </div>
            </div>
            <ButtonBuy onClick={(e) => completePayment(1990)}>
              {loading_data ? "..." : "Подписаться"}
            </ButtonBuy>
          </Form>
          <Form>
            <Banner>
              <div className="bannerFirst">Базовый</div>
              <div>Учитесь самостоятельно</div>
            </Banner>
            <div className="section">
              <div className="comment">Стоимость</div>
              <div className="label" for="mistakes">
                4990 ₽ / мес
              </div>
            </div>
            <div className="section">
              <div className="comment">
                Доступные курсы{" "}
                <span
                  data-tooltip-id="my-tooltip"
                  data-tooltip-html={`Сразу после оплаты вы получите доступ к 3 курсам.<br/>
                  Впоследствии каждый месяц вы сможете открывать по 3 новых курса в случае продления подписки.<br/>
                  Если подписка не продляется, доступ ко всем курсам будет закрыт.`}
                  data-tooltip-place="right"
                >
                  ?
                </span>
              </div>
              <div className="label" for="mistakes">
                3 новых курса в месяц
              </div>
            </div>
            <div className="section">
              <div className="comment">Карьерные сервисы</div>
              <div className="label" for="mistakes">
                ✔️
              </div>
            </div>
            <div className="section">
              <div className="comment">Сообщество студентов и авторов</div>
              <div className="label" for="mistakes">
                ✔️
              </div>
            </div>
            <div className="section">
              <div className="comment">Количество студентов</div>
              <div className="label" for="mistakes">
                1
              </div>
            </div>
            <ButtonBuy onClick={(e) => completePayment(4990)}>
              {loading_data ? "..." : "Подписаться"}
            </ButtonBuy>
            <ButtonOpen onClick={(e) => getInstallments(4990)}>
              Оформить рассрочку
            </ButtonOpen>
          </Form>
          <Form>
            <Banner>
              <div className="bannerFirst">Командный</div>
              <div>Экономьте вместе с друзьями</div>
            </Banner>
            <div className="section">
              <div className="comment">Стоимость</div>
              <div className="label" for="mistakes">
                9990 ₽ / мес
              </div>
            </div>
            <div className="section">
              <div className="comment">
                Доступные курсы{" "}
                <span
                  data-tooltip-id="my-tooltip"
                  data-tooltip-html={`Сразу после оплаты вы получите доступ к 6 курсам.<br/>
                  Впоследствии каждый месяц вы сможете открывать по 6 новых курсов в случае продления подписки.<br/>
                  В подписку можно добавить до 4 студентов.<br/>
                  Если подписка не продляется, доступ ко всем курсам будет закрыт.`}
                  data-tooltip-place="right"
                >
                  ?
                </span>
              </div>
              <div className="label" for="mistakes">
                6 новых курсов в месяц
              </div>
            </div>
            <div className="section">
              <div className="comment">Карьерные сервисы</div>
              <div className="label" for="mistakes">
                ✔️
              </div>
            </div>
            <div className="section">
              <div className="comment">Сообщество студентов и авторов</div>
              <div className="label" for="mistakes">
                ✔️
              </div>
            </div>
            <div className="section">
              <div className="comment">Количество студентов</div>
              <div className="label" for="mistakes">
                До 4
              </div>
            </div>
            <ButtonBuy onClick={(e) => completePayment(9990)}>
              {loading_data ? "..." : "Подписаться"}
            </ButtonBuy>
            <ButtonOpen onClick={(e) => getInstallments(9990)}>
              Оформить рассрочку
            </ButtonOpen>
          </Form>
          {/* <Form>
            <Banner>
              <div className="bannerFirst">Бизнес</div>
              <div>Обучайте сотрудников</div>
            </Banner>
            <div className="section">
              <div className="comment">Стоимость</div>
              <div className="label" for="mistakes">
                29990 ₽ / мес
              </div>
            </div>
            <div className="section">
              <div className="comment">Доступные курсы</div>
              <div className="label" for="mistakes">
                Все курсы на платформе
              </div>
            </div>
            <div className="section">
              <div className="comment">Карьерные сервисы</div>
              <div className="label" for="mistakes">
                ✔️
              </div>
            </div>
            <div className="section">
              <div className="comment">Сообщество студентов и авторов</div>
              <div className="label" for="mistakes">
                ✔️
              </div>
            </div>
            <div className="section">
              <div className="comment">Количество студентов</div>
              <div className="label" for="mistakes">
                До 10
              </div>
            </div>
            <ButtonBuy onClick={(e) => completePayment(29990)}>
              {loading_data ? "..." : "Подписаться"}
            </ButtonBuy>
          </Form> */}
        </div>
        <Comment>
          <div>
            <span>Важно:</span> Подписка оформляется на месяц. Через 30 дней мы
            свяжемся с вами для продления подписки.
          </div>
          <div>По всем вопросам обращайтесь на почту: mikhail@besavvy.app</div>
        </Comment>
        <MovingRow>
          <div className="moving-row">
            <div className="item">
              <div className="itemTitle">
                Legal English: составление договоров
              </div>
              <div>
                Научитесь составлять договоры и меморандумы на английском языке
              </div>
              <div className="itemLength">Срок: 4 недели</div>
            </div>
            <div className="item">
              <div className="itemTitle">Лексика из юр английского</div>
              <div>Изучите основную лексику юридического английского языка</div>
              <div className="itemLength">Срок: 2 недели</div>
            </div>
            <div className="item">
              <div className="itemTitle">Общая часть гражданского права</div>
              <div>Изучите основные принципы и концепции договорного права</div>
              <div className="itemLength">Срок: 3 недели</div>
            </div>
            <div className="item">
              <div className="itemTitle">Сделки M&A</div>
              <div>Научитесь проводить сделки слияния и поглощения</div>
              <div className="itemLength">Срок: 4 недели</div>
            </div>
            <div className="item">
              <div className="itemTitle">Работа в IT компании</div>
              <div>Узнайте особенности работы юристом в IT индустрии</div>
              <div className="itemLength">Срок: 2 недели</div>
            </div>
            <div className="item">
              <div className="itemTitle">Основы корпоративного права</div>
              <div>
                Изучите основы корпоративного права и управления компаниями
              </div>
              <div className="itemLength">Срок: 3 недели</div>
            </div>
            <div className="item">
              <div className="itemTitle">Грамматика юр английского</div>
              <div>
                Освойте грамматические конструкции юридического английского
              </div>
              <div className="itemLength">Срок: 2 недели</div>
            </div>
            <div className="item">
              <div className="itemTitle">Основы уголовного права</div>
              <div>Изучите основные принципы и концепции уголовного права</div>
              <div className="itemLength">Срок: 2 недели</div>
            </div>
            <div className="item">
              <div className="itemTitle">Как пройти юр собеседование</div>
              <div>Подготовьтесь к прохождению юридического собеседования</div>
              <div className="itemLength">Срок: 2 недели</div>
            </div>
            <div className="item">
              <div className="itemTitle">Основы Legal Tech</div>
              <div>Узнайте о применении технологий в юридической практике</div>
              <div className="itemLength">Срок: 4 недели</div>
            </div>
            <div className="item">
              <div className="itemTitle">
                Земельное право и право недвижимости
              </div>
              <div>Изучите основы земельного права и права недвижимости</div>
              <div className="itemLength">Срок: 3 недели</div>
            </div>
            <div className="item">
              <div className="itemTitle">Основы банкротства</div>
              <div>Изучите основные принципы и процедуры банкротства</div>
              <div className="itemLength">Срок: 2 недели</div>
            </div>
            <div className="item">
              <div className="itemTitle">Право IP</div>
              <div>Узнайте об основах права интеллектуальной собственности</div>
              <div className="itemLength">Срок: 3 недели</div>
            </div>
          </div>
        </MovingRow>
        <Tooltip id="my-tooltip" />
      </Container>
    </Styles>
  );
};

export default Subscription;
