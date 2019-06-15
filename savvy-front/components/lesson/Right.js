import React, { Component } from 'react';
import styled from 'styled-components';

const RightAnswer = styled.div`
  background-color: #5DAE76;
  color: white;
  font-size: 1.8rem;
  padding: 1% 2%;
  border-radius: 10px;
  margin-top: 3%;
  display: inline-block;
`

const Right = (props) => (
    <RightAnswer>
        {props.children}
    </RightAnswer>
)

export default Right;