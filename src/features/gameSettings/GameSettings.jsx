import { GameData } from "./GameData";
import { TeamMetaData } from "./TeamMetaData";
import { TEAM_AWAY, TEAM_HOME } from '../../constants/constants';
import { PeriodSettings } from "./PeriodSettings";
import { LineUpEditor } from "../lineUpEditor/LineUpEditor";

export function GameSettings() {
    return (
        <>
            <div className="columns m-3">
                <div className="column">
                    <GameData />
                </div>
                <div className="column">
                    <LineUpEditor />
                </div>
                <div className="column">
                    <TeamMetaData team={TEAM_HOME} />
                </div>
                <div className="column">
                    <TeamMetaData team={TEAM_AWAY} />
                </div>
            </div>
            <div className="columns m-3">
                <div className="column is-one-third">
                    <PeriodSettings />
                </div>
            </div>
        </>
    )
}