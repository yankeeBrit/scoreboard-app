import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Scoreboard from './Scoreboard';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Scoreboard source="json/mlb.json" />, document.getElementById('scoreboard'));
registerServiceWorker();
