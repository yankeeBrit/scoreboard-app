import React, { useMemo } from 'react';
import GameScore from './GameScore';
import utils from '../utilities';

export default function GameScores({ events = [], date }) {
  const eventsDate = useMemo(() => new Date(date), [date]);

  const scores = useMemo(() => {
    return events.map((event, i) => {
      const game = event?.competitions?.[0];
      if (!game) return null;

      const gameStatusState = game?.status?.state;
      let gameStatus = game?.status?.description ?? '';
      let gameStatusDetail = '';
      let gameLink = '';

      // ESPN-style payloads can be inconsistent; keep fallbacks safe
      const away = game?.competitors?.[1] ?? {};
      const home = game?.competitors?.[0] ?? {};

      let awayTeamName = away?.team?.name ?? '';
      let awayTeamScore = away?.score ?? '';
      let awayTeamClass = 'scoreboard__game-score--away';
      const awayTeamIsWinner = Boolean(away?.isWinner);

      let homeTeamName = home?.team?.name ?? '';
      let homeTeamScore = home?.score ?? '';
      let homeTeamClass = 'scoreboard__game-score--home';

      // Determine game status
      // 'in': game in progress
      // 'post': game ended
      // default: game upcoming
      switch (gameStatusState) {
        case 'in': {
          gameLink = event?.links?.web?.liveUpdate?.href ?? '';
          gameStatusDetail = game?.status?.detail ?? '';
          break;
        }

        case 'post': {
          gameLink = event?.links?.web?.recap?.href ?? '';
          gameStatusDetail = 'Recap';

          const awayRec = away?.team?.record?.summary;
          const homeRec = home?.team?.record?.summary;

          if (awayRec) awayTeamName = `${awayTeamName} (${awayRec})`;
          if (homeRec) homeTeamName = `${homeTeamName} (${homeRec})`;

          if (awayTeamIsWinner) {
            awayTeamClass = `${awayTeamClass} scoreboard--winner`;
          } else {
            homeTeamClass = `${homeTeamClass} scoreboard--winner`;
          }
          break;
        }

        default: {
          // Upcoming: game.status.detail appears to be a date/time string in your data
          const start = new Date(game?.status?.detail);

          const laterDate = utils.compareDates(start, eventsDate);
          if (laterDate) {
            gameStatus = utils.getDay(start);
            gameStatusDetail = utils.getTime(start);
          } else {
            gameStatus = utils.getTime(start);
          }

          // For upcoming games you were showing records instead of scores
          awayTeamScore = away?.team?.record?.summary ?? '';
          homeTeamScore = home?.team?.record?.summary ?? '';
        }
      }

      return (
        <GameScore
          key={event?.id ?? i}
          gameStatus={gameStatus}
          gameLink={gameLink}
          gameStatusDetail={gameStatusDetail}
          awayTeamName={awayTeamName}
          awayTeamScore={awayTeamScore}
          awayTeamClass={awayTeamClass}
          homeTeamName={homeTeamName}
          homeTeamScore={homeTeamScore}
          homeTeamClass={homeTeamClass}
        />
      );
    });
  }, [events, eventsDate]);

  return <>{scores}</>;
}
