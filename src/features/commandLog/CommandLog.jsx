import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectGoals } from '../goal/goalSlice';

import {
    selectLogs
} from './commandLogSlice';

import './commandLog.scss';

import {
    LOG_COLORS
} from '../../constants/constants';

export function CommandLog() {

    const { logs } = useSelector(selectLogs);

    return (
        <div className="logs p-3">
            {
                logs.map(log => (
                    <div className="log is-size-7" style={{ color: LOG_COLORS[log.type] }} key={log.id}>
                        <p>{log.message}</p>
                    </div>
                ))
            }
        </div>
    )

}