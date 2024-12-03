import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useMutation, gql } from "@apollo/client";
import { useTranslation } from "next-i18next";

const Container = styled.div`
  width: 45%;
  margin: 3% 0;
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

const UPDATE_OFFER_MUTATION = gql`
  mutation UPDATE_OFFER_MUTATION(
    $id: String!
    $text: String
    $header: String
    $type: String
    $courseId: String
    $price: Int
    $discountPrice: Int
  ) {
    updateOffer(
      id: $id
      text: $text
      header: $header
      type: $type
      courseId: $courseId
      price: $price
      discountPrice: $discountPrice
    ) {
      id
      text
      header
      type
      courseId
      price
      discountPrice
      user {
        id
      }
    }
  }
`;

// [Add the styled components and other constants here]

const UpdateOffer = (props) => {
  const { offer } = props;

  const [header, setHeader] = useState(offer.header);
  const [text, setText] = useState(offer.text);
  const [type, setType] = useState(offer.type);
  const [courseId, setCourseId] = useState(offer.courseId);
  const [price, setPrice] = useState(offer.price);
  const [discountPrice, setDiscountPrice] = useState(offer.discountPrice);

  const { t } = useTranslation("lesson");
  const [updateOffer, { data, loading }] = useMutation(UPDATE_OFFER_MUTATION);

  useEffect(() => {
    setHeader(offer.header);
    setText(offer.text);
    setType(offer.type);
    setCourseId(offer.courseId);
    setPrice(offer.price);
    setDiscountPrice(offer.discountPrice);
  }, [offer]);

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
          const res = await updateOffer({
            variables: {
              id: offer.id,
              header,
              text,
              type,
              courseId,
              price,
              discountPrice,
            },
          });
          props.getResult(res);
          props.switchUpdate();
        }}
      >
        {loading ? t("saving") : t("save")}
      </ButtonTwo>
    </Container>
  );
};

export default UpdateOffer;
