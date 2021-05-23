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

export function Penalties() {

    const dispatch = useDispatch();

    const penaltiesHome = useSelector(selectPenaltiesByTeam(TEAM_HOME));
    const penaltiesAway = useSelector(selectPenaltiesByTeam(TEAM_AWAY));

    return (
        <div className="penalties">
            <div className="home">
                {
                    penaltiesHome.map(penalty => (<Penalty penalty={penalty} key={penalty.id} />))
                }
                <button onClick={() => dispatch(addPenalty(TEAM_HOME))}>Add Home</button>
            </div>
            <div className="guest">
                {
                    penaltiesAway.map(penalty => (<Penalty penalty={penalty} key={penalty.id} />))
                }
                <button onClick={() => dispatch(addPenalty(TEAM_AWAY))}>Add Away</button>
            </div>
        </div>
    )
}