import React from "react";
import styled from "styled-components";

const Page = styled.div`
  height: 60vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Box = styled.div`
  width: 40%;
  padding: 3%;
  box-shadow: 5px 5px 25px 0 rgba(46, 61, 73, 0.2);
  font-size: 2rem;
  .header {
    font-size: 2.4rem;
    font-weight: bold;
  }
  @media (max-width: 850px) {
    width: 95%;
  }
`;

const Reload = () => {
  return (
    <Page>
      <Box>
        <p className="header">😔 Что-то пошло не так...</p>
        <p>Пожалуйста, перезагрузите страницу.</p>
      </Box>
    </Page>
  );
};

export default Reload;
