import { store } from '../app/store';

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
        // remove logs
        const { logs, ...gameState } = store.getState();
        websocketApi.send(gameState);
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