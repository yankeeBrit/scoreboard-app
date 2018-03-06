import React, { Component } from 'react';

class GameScore extends Component {
  render() {
    return (
      <div className='scoreboard__game-score'>
        <div className='scoreboard__game-score-inner'>
          <div className='scoreboard__game-score-status'>
            <span className='pull-left'>{this.props.gameStatus}</span>
            <a className='pull-right' href={this.props.gameLink} target='_blank'>{this.props.gameStatusDetail}</a>
          </div>
          <div className={this.props.awayTeamClass}>
            <span className='pull-left'>{this.props.awayTeamName}</span>
            <span className='pull-right'>{this.props.awayTeamScore}</span>
          </div>
          <div className={this.props.homeTeamClass}>
            <span className='pull-left'>{this.props.homeTeamName}</span>
            <span className='pull-right'>{this.props.homeTeamScore}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default GameScore;
