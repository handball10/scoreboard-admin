import { store } from '../app/store';

import websocketApi from '../lib/websocket';

import {
    increase as increaseGlobalTime,
    stop as stopTime,
    STATUS
} from '../features/time/timeSlice';

import { increaseCurrentPeriod } from '../features/gameSettings/gameSettingsSlice';

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

const calculateActions = ({ time, gameSettings }) => {

    let actions = [];

    if (time.status === STATUS.RUNNING) {
        // if next tick is period end => stop timer
        if (time.gameTime + 1 <= (gameSettings.currentPeriod * gameSettings.periodDuration)) {
            actions.push(increaseGlobalTime());
            actions.push(increaseAllPenalties());
        }

        else {
            actions.push(stopTime());
            actions.push(increaseCurrentPeriod());
        }
    }

    return actions;
}

export const initHeartbeat = () => heartbeat = setInterval(heartbeatFunction, 1000);