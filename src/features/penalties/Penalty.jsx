import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import {
    removePenalty
} from './penaltySlice';

import {
    formatSeconds
} from '../../lib/utils';

import './penalty.scss';

export function Penalty(props) {

    const dispatch = useDispatch();

    const {
        penalty
    } = props;

    return (
        <div className="penalty tag is-danger is-large mb-2">
            <span>{formatSeconds(penalty.time)}</span>
            <button className="delete is-medium ml-3" onClick={() => dispatch(removePenalty(penalty.id))}>Remove</button>
        </div>
    );
}