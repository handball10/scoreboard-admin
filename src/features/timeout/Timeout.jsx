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

    // const timeoutButtonClasses = class

    return (
        <div className="timeout" style={{display: 'flex', flexDirection: 'column'}}>
            <button className="button is-outlined is-success mb-1" onClick={() => dispatch(toggleTimeout(TIMEOUT_TYPES.TIMEOUT))}>Timeout</button>
            <button className="button is-outlined is-primary mb-1" onClick={() => dispatch(toggleTimeout(TIMEOUT_TYPES.HALFTIME))}>Halftime</button>
            <button className="button is-outlined is-info" onClick={() => dispatch(toggleTimeout(TIMEOUT_TYPES.GAMEEND))}>Gameend</button>
        </div>
    )


}