import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TEAM_AWAY, TEAM_HOME } from '../../constants/constants';
import { PersonList } from './PersonList';

import {
    changeTeamLongName,
    changeTeamShortName,
    changeTeamColor,
    selectTeamInfoByTeam
} from './teamInfoSlice';

export function Team({ team }) {

    const teamData = useSelector(selectTeamInfoByTeam(team));

    return (
        <div className="team">
            <PersonList players={teamData.players} officials={teamData.officials} team={team} />
        </div>
    )

}