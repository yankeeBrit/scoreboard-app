import React from 'react';
import ReactDOM from 'react-dom/client';
import Scoreboard from './components/Scoreboard';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Scoreboard source="./json/mlb.json" pollMs={15000} />
  </React.StrictMode>
);
