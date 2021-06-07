import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './goal.scss';


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
            <div className="controls home mr-4">
                <button onClick={() => dispatch(increase(TEAM_HOME))} className="button is-success is-outlined mb-1">+</button>
                <button onClick={() => dispatch(decrease(TEAM_HOME))} className="button is-danger is-outlined">-</button>
            </div>
            <div className="display">
                <span>{goals[TEAM_HOME]}:{goals[TEAM_AWAY]}</span>
            </div>
            <div className="controls away ml-4">
                <button onClick={() => dispatch(increase(TEAM_AWAY))} className="button is-success is-outlined mb-1">+</button>
                <button onClick={() => dispatch(decrease(TEAM_AWAY))} className="button is-danger is-outlined">-</button>
            </div>
        </div>
    )
}