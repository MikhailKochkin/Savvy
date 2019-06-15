import React, { Component } from 'react';
import styled from 'styled-components';

const WrongAnswer = styled.div`
  background-color: #EF2D56;
  color: white;
  font-size: 1.8rem;
  padding: 1% 2%;
  border-radius: 10px;
  margin-top: 3%;
  display: inline-block;
`;

const Wrong = (props) => (
    <WrongAnswer>
        {props.children}
    </WrongAnswer>
)

export default Wrong;