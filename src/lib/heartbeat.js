import { store } from '../app/store';
import { useSelector } from 'react-redux';

import websocketApi from '../lib/websocket';

import {
    increase as increaseGlobalTime,
    STATUS
} from '../features/time/timeSlice';

import {
    increaseAll as increaseAllPenalties
} from '../features/penalties/penaltySlice';

let heartbeat;

const heartbeatFunction = () => {
    const actions = calculateActions(store.getState());

    actions.forEach(store.dispatch);

    if (actions.length > 0) {
        websocketApi.send(store.getState());
    }
}

const calculateActions = ({ time }) => {

    let actions = [];

    if (time.status === STATUS.RUNNING) {
        actions.push(increaseGlobalTime());
        actions.push(increaseAllPenalties());
    }

    return actions;
}

export const initHeartbeat = () => heartbeat = setInterval(heartbeatFunction, 1000);