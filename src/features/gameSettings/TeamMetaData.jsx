import { useSelector, useDispatch } from 'react-redux';
import { TEAM_AWAY, TEAM_HOME } from '../../constants/constants';

import {
    changeTeamLongName,
    changeTeamShortName,
    changeTeamColor,
    selectTeamInfoByTeam
} from '../teamInfo/teamInfoSlice';

const TEAM_LABELS = {
    [TEAM_HOME]: 'Home',
    [TEAM_AWAY]: 'Guest'
}

export function TeamMetaData({ team }) {

    const dispatch = useDispatch();
    const teamData = useSelector(selectTeamInfoByTeam(team));

    return (
        <div className="card mb-2">
            <div className="card-header">
                <p className="card-header-title is-size-6 has-text-centered">{TEAM_LABELS[team]}</p>
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
    )
}