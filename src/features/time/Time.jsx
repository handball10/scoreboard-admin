import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './time.scss';

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
        <div className="time mt-4 mb-4">
            <span className="display">
                {formatSeconds(time)}
            </span>
            <span className="state is-size-7 mb-2">
                {runningState}
            </span>
            <div className="controls">
                <button className="button is-success is-outlined mr-1" onClick={() => dispatch(start())}>Start</button>
                <button className="button is-danger is-outlined" onClick={() => dispatch(stop())}>Stop</button>
            </div>
        </div>
    )


}