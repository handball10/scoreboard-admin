import classNames from 'classnames';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
    TEAM_HOME,
    TEAM_AWAY
} from '../../constants/constants';

import {
    toggleEmptyGoal,
    selectEmptyGoalByTeam,
} from './emptyGoalSlice';

export function EmptyGoal() {
    const dispatch = useDispatch();
    const emptyGoalHome = useSelector(selectEmptyGoalByTeam(TEAM_HOME));
    const emptyGoalAway = useSelector(selectEmptyGoalByTeam(TEAM_AWAY));

    const buttonHomeClasses = classNames({
        'button mb-1': true,
        'is-outlined': !emptyGoalHome,
        'is-success': emptyGoalHome
    });

    const buttonAwayClasses = classNames({
        'button mb-1': true,
        'is-outlined': !emptyGoalAway,
        'is-success': emptyGoalAway
    });

    return (
        <div className="empty-goal">
            <div className="home">
                <button className={buttonHomeClasses} onClick={() => dispatch(toggleEmptyGoal(TEAM_HOME))} style={{ width: '100%' }}>
                    {/* {emptyGoalHome ? 'Disable' : 'Enable'} Home     */}
                    Home
                </button>
            </div>
            <div className="away">
                <button className={buttonAwayClasses} onClick={() => dispatch(toggleEmptyGoal(TEAM_AWAY))} style={{ width: '100%' }}>
                    {/* {emptyGoalAway ? 'Disable' : 'Enable'} Away */}
                    Away
                </button>
            </div>
        </div>
    )
}