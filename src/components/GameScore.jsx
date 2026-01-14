import React from 'react';

export default function GameScore({
  gameStatus,
  gameLink,
  gameStatusDetail,
  awayTeamName,
  awayTeamScore,
  awayTeamClass,
  homeTeamName,
  homeTeamScore,
  homeTeamClass
}) {
  return (
    <div className="scoreboard__game-score">
      <div className="scoreboard__game-score-inner">
        <div className="scoreboard__game-score-status">
          <span className="pull-left">{gameStatus}</span>

          {gameLink ? (
            <a
              className="pull-right"
              href={gameLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {gameStatusDetail}
            </a>
          ) : (
            <span className="pull-right">{gameStatusDetail}</span>
          )}
        </div>

        <div className={awayTeamClass}>
          <span className="pull-left">{awayTeamName}</span>
          <span className="pull-right">{awayTeamScore}</span>
        </div>

        <div className={homeTeamClass}>
          <span className="pull-left">{homeTeamName}</span>
          <span className="pull-right">{homeTeamScore}</span>
        </div>
      </div>
    </div>
  );
}
