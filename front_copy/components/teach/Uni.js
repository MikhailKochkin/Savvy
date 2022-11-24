import styled from "styled-components";
import PropTypes from "prop-types";
import { useTranslation } from "next-i18next";

const UniInfo = styled.div`
  width: 80%;
  max-width: 1200px;
  padding: 1.5%;
  flex-basis: 50%;
  @media (max-width: 850px) {
    width: 95%;
  }
`;

const Title = styled.h1`
  font-size: 2.6rem;
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 0;
`;

const Name = styled.p`
  font-size: 1.8rem;
  font-weight: 400;
  margin-top: 0;
  margin-bottom: 0;
`;

const Button = styled.button`
  margin-top: 2%;
  padding: 1% 2%;
  font-size: 1.6rem;
  background: white;
  color: #112a62;
  border: 1px solid #112a62;
  border-radius: 6px;
  outline: none;
  cursor: pointer;
  &:active {
    border: 2px solid #112a62;
  }
  a {
    color: #112a62;
  }
  @media (max-width: 850px) {
    padding: 2% 3%;
  }
`;

const Box = styled.div`
  display: grid;
  border: 1px solid #edefed;
  border-radius: 5px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 35px;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  margin-top: 20px;
  padding: 0.5%;
  div {
    padding-left: 15px;
  }
  .div1 {
    grid-area: 1 / 1 / 2 / 2;
  }
  .div2 {
    grid-area: 1 / 2 / 2 / 3;
    border-left: 1px solid #edefed;
  }
  .div3 {
    grid-area: 1 / 3 / 2 / 4;
    border-left: 1px solid #edefed;
  }
  @media (max-width: 850px) {
    display: flex;
    flex-direction: column;
    margin-bottom: 5%;
    div {
      padding: 8px 15px;
    }
    .div2 {
      border-left: 1px solid white;
      border-top: 1px solid #edefed;
    }
    .div3 {
      border-left: 1px solid white;
      border-top: 1px solid #edefed;
    }
  }
`;

const Uni = (props) => {
  const { me } = props;
  const { t } = useTranslation("educator");

  return (
    <UniInfo>
      <Title primary> {t("My_Courses")}</Title>
      {me && <Name>{me.surname ? `${me.name} ${me.surname}` : me.name}</Name>}
    </UniInfo>
  );
};

Uni.propTypes = {
  me: PropTypes.string.isRequired,
};

export default Uni;
