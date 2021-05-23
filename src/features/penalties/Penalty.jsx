import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import {
    removePenalty
} from './penaltySlice';

import {
    formatSeconds
} from '../../lib/utils';

export function Penalty(props) {

    const dispatch = useDispatch();

    const {
        penalty
    } = props;

    return (
        <div className="penalty">
            <div className="time">
                {formatSeconds(penalty.time)}
            </div>
            <div className="action">
                <button onClick={() => dispatch(removePenalty(penalty.id))}>Remove</button>
            </div>
        </div>
    );
}