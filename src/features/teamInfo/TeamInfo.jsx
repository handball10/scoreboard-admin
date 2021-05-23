import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
    TEAM_HOME,
    TEAM_AWAY
} from '../../constants/constants';
import { Team } from './Team';

import {
    changeTeamLongName,
    changeTeamShortName,

    selectTeamInfoByTeam
} from './teamInfoSlice';

export function TeamInfo() {

    const dispatch = useDispatch();
    const teamHome = useSelector(selectTeamInfoByTeam(TEAM_HOME));
    const teamAway = useSelector(selectTeamInfoByTeam(TEAM_HOME));

    return (
        <div className="team-info">
            <Team team={TEAM_HOME} />
            <Team team={TEAM_AWAY} />
        </div>
    )
}