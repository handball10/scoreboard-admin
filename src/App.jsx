import React from 'react';
import './App.scss';
import { Goal } from './features/goal/Goal';
import { Time } from './features/time/Time';
import { Penalties } from './features/penalties/Penalties';
import { EmptyGoal } from './features/emptyGoal/EmptyGoal';
import { TeamInfo } from './features/teamInfo/TeamInfo';
import { GameEvent } from './features/gameEvent/GameEvent';
import { TimeOut } from './features/timeout/Timeout';
import { Sidebar } from './components/sidebar/Sidebar';
import { TEAM_AWAY, TEAM_HOME } from './constants/constants';
import { ControlSection } from './components/controlSection/ControlSection';
import { CommandLine } from './features/commandLine/CommandLine';
import { CommandLog } from './features/commandLog/CommandLog';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { GamePanel } from './components/gamePanel/GamePanel';
import { TeamSettings } from './features/gameSettings/GameData';
import { GameSettings } from './features/gameSettings/GameSettings';

function App() {
  return (
    <div className="App">
      <Sidebar position={'left'}>
        <TeamInfo team={TEAM_HOME} />
      </Sidebar>
      <div className="main">
        <Tabs>
          <TabList>
            <Tab>SCOREBOARD</Tab>
            <Tab>CONFIG</Tab>
            <Tab>ADVERTISING</Tab>
          </TabList>

          <TabPanel>
            <GamePanel />
          </TabPanel>
          <TabPanel>
            <GameSettings />
          </TabPanel>
          <TabPanel>
            <div>Advertising</div>
          </TabPanel>
        </Tabs>
      </div>
      <CommandLog />
      <Sidebar position={'right'}>
        <TeamInfo team={TEAM_AWAY} />
      </Sidebar>
      <div className="command-palette">
        <CommandLine />
      </div>
      <div className="app-footer p-2">
        <span>Powered by <b>FGsportfoto</b></span>
      </div>
    </div>
  );
}

export default App;
