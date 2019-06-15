import React, { Component } from 'react';
import CreateQuiz from '../components/create/CreateQuiz';

const createQuizPage  = props => (
  <div>
    <CreateQuiz id={props.query.id} />
  </div>
);

export default createQuizPage;