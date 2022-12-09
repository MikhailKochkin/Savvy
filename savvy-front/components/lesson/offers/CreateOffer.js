import React, { useState } from "react";
import styled from "styled-components";
import { useMutation, gql } from "@apollo/client";
import dynamic from "next/dynamic";
// import { SINGLE_LESSON_QUERY } from "../lesson/SingleLesson";
import { useTranslation } from "next-i18next";

const CREATE_OFFER_MUTATION = gql`
  mutation CREATE_OFFER_MUTATION(
    $text: String!
    $header: String!
    $type: String!
    $courseId: String!
    $price: Int!
    $discountPrice: Int!
    $lessonId: String!
  ) {
    createOffer(
      text: $text
      header: $header
      type: $type
      courseId: $courseId
      price: $price
      discountPrice: $discountPrice
      lessonId: $lessonId
    ) {
      id
      text
      header
      type
      courseId
      price
      discountPrice
      lessonId
      user {
        id
      }
    }
  }
`;

const Explainer = styled.div``;

const Container = styled.div`
  width: 95%;
  margin: 3% 0;
  /* input {
    height: 50%;
    width: 100%;
    margin: 1% 0;
    border: 1px solid #c4c4c4;
    border-radius: 3.5px;
    padding: 2%;
    font-size: 1.6rem;
    outline: 0;
  } */
  input,
  textarea {
    padding: 1.5% 2%;
    margin-bottom: 1.5%;
    width: 100%;
    outline: 0;
    font-family: Montserrat;
    border: 1px solid #ccc;
    border-radius: 3.5px;
    font-size: 1.4rem;
  }
  @media (max-width: 850px) {
    width: 85%;
  }
`;

const ButtonTwo = styled.button`
  border: none;
  background: #3f51b5;
  padding: 10px 20px;
  border: 2px solid #3f51b5;
  border-radius: 5px;
  font-family: Montserrat;
  font-size: 1.4rem;
  font-weight: 500;
  color: #fff;
  cursor: pointer;
  margin-top: 20px;
  margin-right: 10px;
  transition: 0.3s;
  &:hover {
    background: #2e3b83;
    border: 2px solid #2e3b83;
  }
`;

const Editor = styled.div`
  margin-top: 1%;
`;

// const DynamicLoadedEditor = dynamic(import("../editor/Editor"), {
//   loading: () => <p>Loading...</p>,
//   ssr: false,
// });

const CreateOffer = (props) => {
  const [header, setHeader] = useState("");
  const [text, setText] = useState("");
  const [type, setType] = useState("course");
  const [courseId, setCourseId] = useState("");
  const [price, setPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);

  const { t } = useTranslation("lesson");
  const [createOffer, { data, loading }] = useMutation(CREATE_OFFER_MUTATION);

  //   const myCallback = (dataFromChild) => {
  //     setText(dataFromChild);
  //   };

  const { lessonId } = props;
  return (
    <Container>
      <div>Header</div>
      <input
        type="text"
        id="title"
        placeholder="header"
        defaultValue={header}
        onChange={(e) => setHeader(e.target.value)}
      />
      <div>Text</div>
      <textarea
        type="text"
        id="summary"
        placeholder="Text"
        defaultValue={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div>Type</div>
      <select defaultValue={type} onChange={(e) => setType(e.target.value)}>
        <option value="course">Course</option>
        <option value="program">Program</option>
      </select>
      <div>ID</div>
      <input
        type="text"
        id="title"
        placeholder="header"
        defaultValue={courseId}
        onChange={(e) => setCourseId(e.target.value)}
      />
      <div>Price</div>
      <input
        type="number"
        id="title"
        placeholder="header"
        defaultValue={price}
        onChange={(e) => setPrice(parseInt(e.target.value))}
      />

      <div>Discount Price</div>
      <input
        type="number"
        id="title"
        placeholder="header"
        defaultValue={discountPrice}
        onChange={(e) => setDiscountPrice(parseInt(e.target.value))}
      />

      <ButtonTwo
        onClick={async (e) => {
          e.preventDefault();
          const res = await createOffer({
            variables: {
              lessonId,
              header,
              text,
              type,
              courseId,
              price,
              discountPrice,
            },
          });
          props.getResult(res);
        }}
      >
        {loading ? t("saving") : t("save")}
      </ButtonTwo>
    </Container>
  );
};

export default CreateOffer;
