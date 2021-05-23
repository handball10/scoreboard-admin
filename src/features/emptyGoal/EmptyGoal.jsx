import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
    TEAM_HOME,
    TEAM_AWAY
} from '../../constants/constants';

import {
    toggleEmptyGoal
} from './emptyGoalSlice';

export function EmptyGoal() {
    const dispatch = useDispatch();

    return (
        <div className="empty-goal">
            <div className="home">
                <button onClick={() => dispatch(toggleEmptyGoal(TEAM_HOME))}>
                    Toggle Home    
                </button>
            </div>
            <div className="away">
                <button onClick={() => dispatch(toggleEmptyGoal(TEAM_AWAY))}>
                    Toggle Away
                </button>
            </div>
        </div>
    )
}