import React, { Component } from "react";
import styled from "styled-components";

const RightAnswer = styled.div`
  background-color: #5dae76;
  color: white;
  font-size: 1.8rem;
  padding: 1% 2%;
  border-radius: 10px;
  margin-top: 3%;
  display: inline-block;
  width: 50%;
  text-align: center;
`;

const Right = props => <RightAnswer>{props.children}</RightAnswer>;

export default Right;
