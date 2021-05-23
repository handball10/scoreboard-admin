import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
    TEAM_HOME,
    TEAM_AWAY
} from '../../constants/constants';

import {
    increase,
    decrease,
    reset,
    selectGoals,
    selectGoalsByTeam
} from './goalSlice';

export function Goal() {
    const goals = useSelector(selectGoals);
    const dispatch = useDispatch();

    return (
        <div className="goals">
            <div className="home">
                {goals[TEAM_HOME]}
                <button onClick={() => dispatch(increase(TEAM_HOME))}>+ Home</button>
                <button onClick={() => dispatch(decrease(TEAM_HOME))}>- Home</button>
            </div>
            <div className="away">
                {goals[TEAM_AWAY]}
                <button onClick={() => dispatch(increase(TEAM_AWAY))}>+ Away</button>
                <button onClick={() => dispatch(decrease(TEAM_AWAY))}>- Away</button>
            </div>
        </div>
    )
}