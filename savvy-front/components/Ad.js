import React from "react";
import styled from "styled-components";
import Link from "next/link";

const Styles = styled.div`
  color: #fff;
  background: #858ae3;
  min-height: 50px;
  display: flex;
  font-size: 1.8rem;
  font-weight: 400;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  a {
    color: #ffc36a;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  @media (max-width: 900px) {
    padding: 2% 4%;
  }
`;

const Ad = () => {
  return (
    <Styles>
      <div>
        ⚡️ Запускаем Школу молодого юриста. Подготовьтесь к запуску карьеры за
        18 недель!{" "}
        <Link href="/school">
          <a>Подробнее</a>
        </Link>
      </div>
    </Styles>
  );
};

export default Ad;
