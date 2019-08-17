import React, { Component } from "react";
import styled from "styled-components";

const WrongAnswer = styled.div`
  background-color: #ef2d56;
  color: white;
  font-size: 1.8rem;
  padding: 1% 2%;
  border-radius: 10px;
  margin-top: 3%;
  display: inline-block;
  width: 50%;
  text-align: center;
`;

const Wrong = props => <WrongAnswer>{props.children}</WrongAnswer>;

export default Wrong;
