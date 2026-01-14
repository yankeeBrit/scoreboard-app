import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import GameScores from './GameScores';
import utils from '../utilities';

const CARD_WIDTH = 280;
const VISIBLE_CARDS = 4;

export default function Scoreboard({ source, pollMs = 15000 }) {
  const [league, setLeague] = useState({
    name: '',
    abbreviation: '',
    logo: '',
    date: '',
    events: []
  });

  const [index, setIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchScores = async (signal) => {
    const res = await axios.get(source, { signal });
    const l = res?.data?.sports?.[0]?.leagues?.[0];
    const events = l?.events ?? [];

    setLeague({
      name: l?.name ?? '',
      abbreviation: l?.abbreviation ?? '',
      logo: l?.abbreviation ? `./img/${l.abbreviation}-logo.png` : '',
      date: events?.[0]?.date ?? '',
      events
    });
  };

  // Polling
  useEffect(() => {
    let intervalId;
    let abortCurrent;

    const run = async () => {
      const controller = new AbortController();
      abortCurrent = () => controller.abort();

      try {
        await fetchScores(controller.signal);
        setIsLoaded(true);
      } catch (err) {
        // ignore abort
      }
    };

    run();
    intervalId = window.setInterval(run, pollMs);

    return () => {
      window.clearInterval(intervalId);
      abortCurrent?.();
    };
  }, [source, pollMs]);

  const childrenLength = league.events.length;
  const maxIndex = Math.max(0, childrenLength - VISIBLE_CARDS);

  const canPrev = index > 0;
  const canNext = index < maxIndex;

  // Clamp index if number of games changes
  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  const eventsDate = useMemo(() => {
    if (!league.date) return '';
    const d = new Date(league.date);
    return `${utils.getMonth(d)} ${d.getDate()}, ${d.getFullYear()}`;
  }, [league.date]);

  const handlePrev = () => {
    if (!canPrev) return;
    setIndex((i) => i - 1);
  };

  const handleNext = () => {
    if (!canNext) return;
    setIndex((i) => i + 1);
  };

  // This is what drives the smooth slide:
  const translateX = -CARD_WIDTH * index;

  if (!isLoaded) {
    return (
      <div className="scoreboard">
        <div className="scoreboard__header">
          <h1>Loading…</h1>
        </div>
      </div>
    );
  }

  return (
    <div className={`scoreboard ${isLoaded ? 'is-visible' : ''}`}>
      <div className="scoreboard__header">
        <div className="row">
          <span className="pull-left">
            <h1>{league.name}</h1>
          </span>
          <span className="pull-right">
            {league.logo ? (
              <img className="scoreboard__logo" src={league.logo} alt={league.abbreviation} />
            ) : null}
          </span>
        </div>
        <h2>{eventsDate}</h2>
      </div>

      <button
        type="button"
        className="scoreboard__prev"
        onClick={handlePrev}
        disabled={!canPrev}
        style={{ opacity: canPrev ? 1 : 0.5 }}
        aria-label="Previous games"
      >
        <span className="fa fa-chevron-left" />
      </button>

      <div className="scoreboard__scores">
        <div
          className="scoreboard__scores-inner"
          style={{
            width: `${CARD_WIDTH * childrenLength}px`,
            transform: `translateX(${translateX}px)`
          }}
        >
          <GameScores events={league.events} date={league.date} />
        </div>
      </div>

      <button
        type="button"
        className="scoreboard__next"
        onClick={handleNext}
        disabled={!canNext}
        style={{ opacity: canNext ? 1 : 0.5 }}
        aria-label="Next games"
      >
        <span className="fa fa-chevron-right" />
      </button>
    </div>
  );
}
