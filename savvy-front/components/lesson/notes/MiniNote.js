import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useTranslation } from "next-i18next";
import moment from "moment";
import parse from "html-react-parser";

const Container = styled.div`
  width: 100%;
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    width: 30%;
  }

  @media (max-width: 800px) {
    flex-direction: column;
    width: 100%;
    font-size: 1.5rem;
  }
`;

const NoteStyles = styled.div`
  max-width: 660px;
  background: #fff;
  margin: 2% 0 0 0;
  .video-container {
    width: 400px;
    margin: 0 auto;
    text-align: center;
  }
  video {
    max-width: 100%;
    height: auto;
  }
  .video-fit {
    width: 400px;
    height: 100%;
    object-fit: cover;
  }
  @media (max-width: 800px) {
    .video-container {
      width: 350px;
    }
    .video-fit {
      width: 350px;
      height: 100%;
    }
  }
  @media (max-width: 800px) {
    font-size: 1.5rem;
    width: 100%;
    order: 3;
    h2 {
      font-size: 2.2rem;
      line-height: 1.4;
    }
  }
  .header {
    background: #e0e0e0;
  }
  h2 {
    font-size: 2.8rem;
    font-weight: 600;
    line-height: 1.2;
  }
  img {
    display: block;
    max-width: 600px;
    box-shadow: "0 0 0 2px blue;";
    object-fit: contain;
    @media (max-width: 800px) {
      width: 100%;
    }
  }
  p {
    margin: 10px 0;
  }
  iframe {
    min-width: 600px;
    width: 100%;
    height: 400px;
    @media (max-width: 800px) {
      min-width: 300px;
      min-height: 200px;
      width: 100%;
      height: auto;
    }
  }
  a {
    border-bottom: 2px solid #26ba8d;
    padding: 0%;
    transition: 0.3s;
    cursor: pointer;
  }
  .flag {
    color: #008489;
    font-size: 1.5rem;
    width: 100%;
    margin: 3% 0;
    padding: 3% 8%;
    background-color: #f2fafb;
    border-radius: 5px;
  }
  .article {
    font-size: 1.5rem;
    width: 100%;
    margin: 1% 1%;
    padding: 1% 4%;
    border-left: 3px solid #0094c6;
    p {
      margin: 10px 0;
    }
  }
  blockquote {
    font-size: 1.5rem;
    width: 100%;
    margin: 0;
    padding: 1% 4%;
    border-left: 3px solid #0094c6;
    p {
      margin: 5px 0;
    }
  }
  pre {
    background: #282c34;
    color: white;
    padding: 2% 4%;
    line-height: 1;
    font-size: 1.5rem;
    border-radius: 10px;
    overflow-x: scroll;
  }
  table {
    width: 540px;
    border: 1px solid green;
    border-collapse: collapse;
    font-size: 1.4rem;
    tbody {
      width: 100%;
    }
    tr {
      border: 1px solid #edefed;
    }
    tr:nth-child(even) {
      background: #f8f8f8;
    }
    thead {
      background: #36304a;
      color: #fff;
    }
    th {
      border: 1px solid #edefed;
      padding: 15px 0;
    }
    td {
      border: 1px solid #edefed;
      border-top: none;
      border-bottom: none;
      border-right: none;
      padding: 0% 2.5%;
      position: relative;
      padding: 15px 15px;
    }
  }
`;

const Note = (props) => {
  const { t } = useTranslation("lesson");
  moment.locale("ru");
  const { text, id } = props;

  return (
    <>
      <Container id={id}>
        <div className="text">
          <NoteStyles>{parse(text)}</NoteStyles>
        </div>
      </Container>
    </>
  );
};

export default Note;
