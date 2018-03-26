import React, { Component } from 'react';
import { Spinner } from 'spin.js';
import axios from 'axios';
import { TweenMax, Power2 } from 'gsap';
import GameScores from './GameScores.js';
import utils from './utilities.js';

class Scoreboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      abbreviation: '',
      logo: '',
      date: '',
      events: []
    };
  }

  componentWillMount() {
    // Add spinner
    const opts = { color: '#fff' };
    this.spinner = new Spinner(opts).spin();
    document.querySelector('#scoreboard').appendChild(this.spinner.el);
  }

  componentDidMount() {
    // Get JSON data
    axios.get(this.props.source)
      .then(res => {
        this.setState({
          name: res.data.sports[0].leagues[0].name,
          abbreviation: res.data.sports[0].leagues[0].abbreviation,
          logo: 'img/' + res.data.sports[0].leagues[0].abbreviation + '-logo.png',
          date: res.data.sports[0].leagues[0].events[0].date,
          events: res.data.sports[0].leagues[0].events
        });
      });
  }

  componentDidUpdate() {
    this.scoreboard = document.querySelector('.scoreboard');
    this.gameScores = document.querySelector('.scoreboard__scores-inner');
    this.prevBtn = document.querySelector('.scoreboard__prev');
    this.nextBtn = document.querySelector('.scoreboard__next');
    this.childrenLength = this.gameScores.children.length;
    this.gameScoreIndex = 0;

    // Update slider inner container width
    this.gameScores.style.width = 280 * this.childrenLength + 'px';

    // Set up event listeners for slider buttons
    this.prevBtn.addEventListener('click', evt => {
      if(this.gameScoreIndex > 0){
        this.gameScoreIndex--;
        let leftPos = -280 * this.gameScoreIndex + 'px';
        TweenMax.to(this.gameScores, .5, {left:leftPos, ease:Power2.easeInOut, onComplete:this.updateButtons.bind(this)});
      }
    });

    this.nextBtn.addEventListener('click', evt => {
      if(this.gameScoreIndex < this.childrenLength - 4){
        this.gameScoreIndex++;
        let leftPos = -280 * this.gameScoreIndex + 'px';
        TweenMax.to(this.gameScores, .5, {left:leftPos, ease:Power2.easeInOut, onComplete:this.updateButtons.bind(this)});
      }
    });

    // Stop spinner, fade in scoreboard
    this.spinner.stop();
    TweenMax.to(this.scoreboard, 1, {autoAlpha:1});
  }

  updateButtons() {
    if(this.gameScoreIndex === 0){
      this.prevBtn.style.opacity = .5;
      this.nextBtn.style.opacity = 1;
    }else if(this.gameScoreIndex === (this.childrenLength - 4)){
      this.prevBtn.style.opacity = 1;
      this.nextBtn.style.opacity = .5;
    }else{
      this.prevBtn.style.opacity = 1;
      this.nextBtn.style.opacity = 1;
    }
  }

  render() {
    const date = new Date(this.state.date),
          eventsDate = utils.getMonth(date) + ' ' + date.getDate() + ', ' + date.getFullYear();

    return (
      <div className='scoreboard'>
        <div className='scoreboard__header'>
          <div className='row'>
            <span className='pull-left'><h1>{this.state.name}</h1></span>
            <span className='pull-right'><img className='scoreboard__logo' src={this.state.logo} alt={this.state.abbreviation}/></span>
          </div>
          <h2>{eventsDate}</h2>
        </div>
        <div className='scoreboard__prev'><span className='fa fa-chevron-left'></span></div>
        <div className='scoreboard__scores'>
          <GameScores events={this.state.events} date={this.state.date}/>
        </div>
        <div className='scoreboard__next'><span className='fa fa-chevron-right'></span></div>
      </div>
    );
  }
}

export default Scoreboard;
