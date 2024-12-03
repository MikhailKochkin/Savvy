import { useState } from "react";
import { useMutation, gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import moment from "moment";
import dynamic from "next/dynamic";

const ORDERS_QUERY = gql`
  query ORDERS_QUERY {
    orders(where: { createdAt: { gte: "2023-01-01T18:15:33.245Z" } }) {
      id
      paymentID
      isPaid
      createdAt
      price
      user {
        name
        surname
        email
        number
        id
      }
      coursePage {
        id
        title
      }
    }
  }
`;

const SEND_MESSAGE_MUTATION = gql`
  mutation SEND_MESSAGE_MUTATION($userId: String!, $text: String!) {
    sendMessage(userId: $userId, text: $text) {
      id
    }
  }
`;

const Editor = styled.div`
  font-size: 1.6rem;
  width: 75%;
  border: 1px solid #c4c4c4;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  outline: 0;
  padding: 0.5%;
  font-size: 1.6rem;
  margin: 15px 0;
  @media (max-width: 800px) {
    width: 350px;
  }
`;

const DynamicLoadedEditor = dynamic(import("../editor/HoverEditor"), {
  loading: () => <p>...</p>,
  ssr: false,
});

const EmptyOrders = () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState();

  const { loading: loading, error: error, data: data } = useQuery(ORDERS_QUERY);
  const [sendMessage, { data: data1, loading: loading1, error: error1 }] =
    useMutation(SEND_MESSAGE_MUTATION);

  const myCallback = (dataFromChild) => {
    setText(dataFromChild);
  };
  if (loading) return <p>Loading orders...</p>;

  let orders = [];
  if (data) {
    orders = data.orders;
  }
  moment.locale("ru");

  return (
    <div>
      <button onClick={(e) => setOpen(!open)}>Открыть</button>
      {open && (
        <>
          {[...orders]
            .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
            .map((o, i) => (
              <>
                <div key={i}>
                  {i + 1}. {o.user.name} {o.user.surname} {o.user.email} –{" "}
                  {moment(o.createdAt).format("LLL")} – {o.coursePage.title}{" "}
                  {o.price} – {o.isPaid ? "Оплачен" : "Не оплачен"}
                </div>
                <div key={i}>
                  Ссылка на курс: https://besavvy.app/coursePage?id=
                  {o.coursePage.id}
                </div>

                {o.user.number && (
                  <button>
                    <a target="_blank" href={`https://t.me/${o.user.number}`}>
                      Написать в Telegram
                    </a>
                  </button>
                )}
                {o.user.number && (
                  <button>
                    <a
                      target="_blank"
                      href={`https://wa.me/${o.user.number}?text=Добрый!`}
                    >
                      Написать в WhatsApp
                    </a>
                  </button>
                )}
                <Editor className="editor">
                  <DynamicLoadedEditor
                    getEditorText={myCallback}
                    value={""}
                    name="text"
                  />
                </Editor>
                <button
                  onClick={async (e) => {
                    const res = await sendMessage({
                      variables: {
                        userId: o.user.id,
                        text: text,
                      },
                    });
                  }}
                >
                  {loading1 ? "Sending..." : "Send"}
                </button>
              </>
            ))}
        </>
      )}
    </div>
  );
};

export default EmptyOrders;
