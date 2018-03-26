import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Scoreboard from './Scoreboard';

ReactDOM.render(<Scoreboard source="json/mlb.json" />, document.getElementById('scoreboard'));
