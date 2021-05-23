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
        <div className="timeout">
            <button onClick={() => dispatch(toggleTimeout(TIMEOUT_TYPES.TIMEOUT))} className="start">Timeout</button>
            <button onClick={() => dispatch(toggleTimeout(TIMEOUT_TYPES.HALFTIME))} className="stop">Halftime</button>
            <button onClick={() => dispatch(toggleTimeout(TIMEOUT_TYPES.GAMEEND))} className="stop">Gameend</button>
        </div>
    )


}