import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.scss';
import { Goal } from './features/goal/Goal';
import { Time } from './features/time/Time';
import { Penalties } from './features/penalties/Penalties';
import { EmptyGoal } from './features/emptyGoal/EmptyGoal';
import { TeamInfo } from './features/teamInfo/TeamInfo';
import { GameEvent } from './features/gameEvent/GameEvent';
import { TimeOut } from './features/timeout/Timeout';

function App() {
  return (
    <div className="App">
      <Time />
      <Goal />
      <Penalties />
      <EmptyGoal />
      <TeamInfo />
      <GameEvent />
      <TimeOut />
    </div>
  );
}

export default App;
