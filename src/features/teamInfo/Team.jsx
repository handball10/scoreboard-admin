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

const TEAM_LABELS = {
    [TEAM_HOME]: 'Heim',
    [TEAM_AWAY]: 'Gast'
}

export function Team({ team }) {

    const dispatch = useDispatch();
    const teamData = useSelector(selectTeamInfoByTeam(team));

    console.log(teamData);

    return (
        <div className="team">
            <div className="card mb-2">
                <div className="card-header">
                    <p className="card-header-title is-size-5 has-text-centered">{TEAM_LABELS[team]}</p>
                </div>
                <div className="card-content p-3">
                    <div className="field mb-1">
                        <label className="field-label is-small">Long name</label>
                        <div className="field-body">
                            <div className="field">
                                <div className="control">
                                <input
                                    className="input is-small"
                                    type="text"
                                    onChange={(event) => dispatch(changeTeamLongName({ team, value: event.target.value }))}
                                    value={teamData.longName} 
                                />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="field mb-1">
                        <label className="field-label is-small">Short name</label>
                        <div className="field-body">
                            <div className="field">
                                <div className="control">
                                    <input
                                        className="input is-small"
                                        type="text"
                                        onChange={(event) => dispatch(changeTeamShortName({ team, value: event.target.value }))}
                                        value={teamData.shortName}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="field mb-1">
                        <label className="field-label is-small">Color</label>
                        <div className="field-body">
                            <div className="field">
                                <div className="control">
                                    <input
                                        className="input is-small"
                                        type="color"
                                        onChange={(event) => dispatch(changeTeamColor({ team, value: event.target.value }))}
                                        value={teamData.color} 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <PersonList players={teamData.players} officials={teamData.officials} team={team} />
        </div>
    )

}