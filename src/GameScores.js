import React, { Component } from 'react';
import GameScore from "./GameScore.js";

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
          let laterDate = this.compareDates(date, eventsDate);

          if(laterDate){
            gameStatus = this.getDay(date);
            gameStatusDetail = this.getTime(date);
          }else{
            gameStatus = this.getTime(date);
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

  getDay(date) {
    const days = ['Sunday',
                  'Monday',
                  'Tuesday',
                  'Wednesday',
                  'Thursday',
                  'Friday',
                  'Saturday'];

    return days[date.getDay()];
  }

  getMonth(date) {
    const months = ['January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December'];

    return months[date.getMonth()];
  }

  getTime(date) {
    const hours = date.getHours();

    let minutes = date.getMinutes(),
        period = 'AM',
        hour = hours;

    //convert to 12 hour clock
    if(hour >= 12) {
      hour = hours - 12;
      period = 'PM';
    }

    if(hour === 0) hour = 12;

    minutes = minutes < 10 ? ('0' + minutes) : minutes;

    return hour + ':' + minutes + period;
  }

  compareDates(date1, date2) {
    const d1 = new Date(date1.getFullYear(),date1.getMonth(),date1.getDate()),
          d2 = new Date(date2.getFullYear(),date2.getMonth(),date2.getDate());

    if(d1 > d2){
      return true;
    }else{
      return false;
    }
  }
}

export default GameScores;
