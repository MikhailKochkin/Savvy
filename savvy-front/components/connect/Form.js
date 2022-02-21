import { useState } from "react";
import styled from "styled-components";
import { useMutation, gql } from "@apollo/client";

const CREATE_CLIENT = gql`
  mutation createCommunityMember(
    $email: String!
    $name: String!
    $surname: String!
    $number: String!
    $subscription: String!
  ) {
    createCommunityMember(
      email: $email
      name: $name
      surname: $surname
      number: $number
      subscription: $subscription
    ) {
      url
      communityMember {
        id
      }
    }
  }
`;

const Styles = styled.div`
  width: 80%;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h2 {
    font-size: 5.6rem;
    font-weight: 1000;
    margin: 20px 0;
    margin-bottom: 0px;
  }
  #explainer {
    width: 80%;
    color: #7d7d7d;
    font-weight: 600;
    line-height: 1.2;
    margin-bottom: 20px;
  }
  button {
    width: 100%;
    padding: 2%;
    font-family: Montserrat;
    border: none;
    background: #fff;
    color: #000000;
    border-radius: 5px;
    margin-bottom: 10px;
    outline: 0;
    cursor: pointer;
    font-size: 1.8rem;
    transition: ease-in 0.2s;
    &:hover {
      background-color: #fe7e42;
    }
  }
  input {
    width: 100%;
    background: #222222;
    border: 2px solid #5b5b5b;
    border-radius: 15px;
    color: #fff;
    padding: 4% 5%;
    font-family: Montserrat;
    margin-bottom: 20px;
    outline: 0;
    cursor: pointer;
    font-size: 1.4rem;
  }
  form {
    width: 80%;
    .names {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
      #name {
        margin-right: 10px;
      }
    }
  }
  #legal {
    width: 80%;
    font-size: 1.3rem;
    line-height: 1.5;
    a {
      text-decoration: underline;
      color: #fff;
    }
  }
  @media (max-width: 800px) {
  }
`;
const Form = (props) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");

  const [createCommunityMember, { data, loading }] = useMutation(CREATE_CLIENT);

  return (
    <Styles>
      <h2>1 {props.subscription == "month" ? "месяц" : "год"}</h2>
      <div id="explainer">
        После оплаты мы свяжемся с вами и присоединим к нашему сообществу
      </div>
      <form>
        <div className="names">
          <input
            className="data"
            id="name"
            placeholder="Имя"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="data"
            id="surname"
            placeholder="Фамилия"
            onChange={(e) => setSurname(e.target.value)}
          />
        </div>
        <input
          id="tel"
          type="tel"
          placeholder="+7 (999) 999-99-99"
          onChange={(e) => setNumber(e.target.value)}
        />
        <input
          id="email"
          type="email"
          placeholder="Электронная почта"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          id="community_application_button"
          onClick={async (e) => {
            e.preventDefault();
            // if (!EmailValidator.validate(email)) {
            //   alert("Неправильный имейл");
            // } else if (number.length < 7) {
            //   alert("Неправильный номер мобильнного телефона");
            // } else {
            //   if (props.data.price.course == "school") {
            //     ReactGA.event({
            //       category: "Litigation Apply Button Click",
            //       action: "Click",
            //     });
            //   } else if (props.data.price.course == "corp") {
            //     ReactGA.event({
            //       category: "Corp Apply Button Click",
            //       action: "Click",
            //     });
            //   }
            const res = await createCommunityMember({
              variables: {
                surname,
                email,
                name,
                number,
                subscription: props.subscription,
              },
            });
            console.log(res.data.createCommunityMember.url);
            location.href = res.data.createCommunityMember.url;
            //   Router.push({
            //     pathname: "/hello",
            //     query: {
            //       name: name + " " + surname,
            //       email: email,
            //       number: number,
            //     },
            //   });
          }}
        >
          {loading ? "⚙️ Готовим платеж ... " : "Вступить в сообщество"}
        </button>
      </form>
      <div id="legal">
        Нажимая кнопку, принимаю условия{" "}
        <a href="https://besavvy.app/legal?name=privacy" target="_blank">
          политики
        </a>{" "}
        и{" "}
        <a href="https://besavvy.app/legal?name=offer" target="_blank">
          оферты
        </a>
        .
      </div>
    </Styles>
  );
};

export default Form;
