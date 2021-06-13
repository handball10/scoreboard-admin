import classNames from 'classnames';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
    toggleTimeout,
    selectTimeoutStateByType,
    TIMEOUT_TYPES
} from './timeoutSlice';

export function TimeOut() {

    const dispatch = useDispatch();
    const timeoutState = useSelector(selectTimeoutStateByType(TIMEOUT_TYPES.TIMEOUT));
    const halftimeState = useSelector(selectTimeoutStateByType(TIMEOUT_TYPES.HALFTIME));
    const gameEndState = useSelector(selectTimeoutStateByType(TIMEOUT_TYPES.GAMEEND));

    console.log({ timeoutState, halftimeState, gameEndState });

    const timeOutClasses = classNames({
        'button is-primary mb-1': true,
        'is-outlined': !timeoutState.isActive
    });

    const halftimeClasses = classNames({
        'button is-success mb-1': true,
        'is-outlined': !halftimeState.isActive
    });

    const gameEndClasses = classNames({
        'button is-info': true,
        'is-outlined': !gameEndState.isActive
    });

    // const timeoutButtonClasses = class

    return (
        <div className="timeout" style={{display: 'flex', flexDirection: 'column'}}>
            <button className={timeOutClasses} onClick={() => dispatch(toggleTimeout(TIMEOUT_TYPES.TIMEOUT))}>Timeout</button>
            <button className={halftimeClasses} onClick={() => dispatch(toggleTimeout(TIMEOUT_TYPES.HALFTIME))}>Halftime</button>
            <button className={gameEndClasses} onClick={() => dispatch(toggleTimeout(TIMEOUT_TYPES.GAMEEND))}>Gameend</button>
        </div>
    )


}