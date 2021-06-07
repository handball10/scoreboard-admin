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

export function TeamInfo({ team }) {
    return (
        <div className="team-info">
            <Team team={team} />
        </div>
    )
}