import React, { Component } from 'react';
import GameScore from './GameScore.js';
import utils from './utilities.js';

class GameScores extends Component {
  render() {
    const eventsDate = new Date(this.props.date);

    const scores = this.props.events.map((event, i) => {
      const game = event.competitions[0];

      let gameStatusState  = game.status.state,
          gameStatus       = game.status.description,
          gameStatusDetail = '',
          gameLink         = '',
          awayTeamName     = game.competitors[1].team.name,
          awayTeamScore    = game.competitors[1].score,
          awayTeamClass    = 'scoreboard__game-score--away',
          awayTeamIsWinner = game.competitors[1].isWinner,
          homeTeamName     = game.competitors[0].team.name,
          homeTeamScore    = game.competitors[0].score,
          homeTeamClass    = 'scoreboard__game-score--home';

      // Determine game status
      // 'in': game in progress
      // 'post': game ended
      // default: game upcoming
      switch(gameStatusState){
        case 'in':
          gameLink = event.links.web.liveUpdate.href;
          gameStatusDetail = game.status.detail;
          break;
        case 'post':
          gameLink = event.links.web.recap.href;
          gameStatusDetail = 'Recap';
          awayTeamName = game.competitors[1].team.name + ' (' + game.competitors[1].team.record.summary + ')';
          homeTeamName = game.competitors[0].team.name + ' (' + game.competitors[0].team.record.summary + ')';
          awayTeamIsWinner ? awayTeamClass = 'scoreboard__game-score--away scoreboard--winner' : homeTeamClass = 'scoreboard__game-score--home scoreboard--winner';
          break;
        default:
          const date = new Date(game.status.detail);

          // If game starts on a later date, add date to game score header
          let laterDate = utils.compareDates(date, eventsDate);

          if(laterDate){
            gameStatus = utils.getDay(date);
            gameStatusDetail = utils.getTime(date);
          }else{
            gameStatus = utils.getTime(date);
          }

          awayTeamScore = game.competitors[1].team.record.summary;
          homeTeamScore = game.competitors[0].team.record.summary;
      }

      return(
        <GameScore
          key={i}
          gameStatus={gameStatus}
          gameLink={gameLink}
          gameStatusDetail={gameStatusDetail}
          awayTeamName={awayTeamName}
          awayTeamScore={awayTeamScore}
          awayTeamClass={awayTeamClass}
          homeTeamName={homeTeamName}
          homeTeamScore={homeTeamScore}
          homeTeamClass={homeTeamClass}/>
      )
    })

    return (
      <div className='scoreboard__scores-inner'>{scores}</div>
    )
  }
}

export default GameScores;
