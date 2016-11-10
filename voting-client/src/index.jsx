import React from 'react';
import ReactDOM from 'react-dom';
import Voting from './components/Voting';

const pair = ['23', 'Star Wars'];

ReactDOM.render(
  <Voting pair={pair} hasVoted="23" />,
  document.getElementById('app')
);
