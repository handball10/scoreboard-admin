import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
    changeTeamLongName,
    changeTeamShortName,
    changeTeamColor,
    selectTeamInfoByTeam
} from './teamInfoSlice';

export function Team({ team }) {

    const dispatch = useDispatch();
    const teamData = useSelector(selectTeamInfoByTeam(team));

    return (
        <div className="team">
            <div className="input">
                <input 
                    type="text"
                    onChange={(event) => dispatch(changeTeamLongName({ team, value: event.target.value }))}
                    value={teamData.longName} 
                />
            </div>
            <div className="input">
                <input
                    type="text"
                    onChange={(event) => dispatch(changeTeamShortName({ team, value: event.target.value }))}
                    value={teamData.shortName}
                />
            </div>
            <div className="input">
                <input 
                    type="color"
                    onChange={(event) => dispatch(changeTeamColor({ team, value: event.target.value }))}
                    value={teamData.color} 
                />
            </div>
        </div>
    )

}