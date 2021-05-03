import React from "react";
import styled from "styled-components";
import Link from "next/link";

const Styles = styled.div`
  color: #fff;
  background: #858ae3;
  min-height: 70px;
  display: flex;
  font-size: 1.8rem;
  font-weight: 400;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  div {
    width: 65%;
    text-align: center;
    line-height: 1.5;
  }
  a {
    color: #ffc36a;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  @media (max-width: 900px) {
    padding: 2% 4%;
    div {
      width: 90%;
      text-align: center;
      line-height: 1.5;
    }
  }
`;

const Ad2 = () => {
  return (
    <Styles>
      <div>
        ⚡️ Готовы изучить что-то посложнее и начать карьеру юриста? Посмотрите
        программу Школы молодого юриста.{" "}
        <Link href="/school">
          <a>Подробнее</a>
        </Link>
      </div>
    </Styles>
  );
};

export default Ad2;
