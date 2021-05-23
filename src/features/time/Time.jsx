import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
    start,
    stop,
    selectTime,
    selectStatus
} from './timeSlice';

import {
    formatSeconds
} from '../../lib/utils';

export function Time() {

    const dispatch = useDispatch();
    const time = useSelector(selectTime);
    const runningState = useSelector(selectStatus);

    return (
        <div className="time">
            <span className="display">
                {formatSeconds(time)}
            </span>
            <span className="state">
                {runningState}
            </span>
            <button onClick={() => dispatch(start())} className="start">Start</button>
            <button onClick={() => dispatch(stop())} className="stop">Stop</button>
        </div>
    )


}