import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
    TEAM_HOME,
    TEAM_AWAY
} from '../../constants/constants';

import { Penalty } from './Penalty';

import {
    addPenalty,
    removePenalty,
    clear,
    increaseAll,
    selectPenaltiesByTeam
} from './penaltySlice';

import './penalties.scss';

export function Penalties() {

    const dispatch = useDispatch();

    const penaltiesHome = useSelector(selectPenaltiesByTeam(TEAM_HOME));
    const penaltiesAway = useSelector(selectPenaltiesByTeam(TEAM_AWAY));

    return (
        <div className="penalties columns">
            <div className="column home">
                <button className="button is-outlined mb-2 is-success" onClick={() => dispatch(addPenalty(TEAM_HOME))}>Add Home</button>
                <div className="penalty-list">
                {
                    penaltiesHome.map(penalty => (<Penalty penalty={penalty} key={penalty.id} />))
                }
                </div>
            </div>
            <div className="column guest">
                <button className="button is-outlined mb-2 is-success" onClick={() => dispatch(addPenalty(TEAM_AWAY))}>Add Away</button>
                <div className="penalty-list">
                {
                    penaltiesAway.map(penalty => (<Penalty penalty={penalty} key={penalty.id} />))
                }
                </div>
            </div>
        </div>
    )
}