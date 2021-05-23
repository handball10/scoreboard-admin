import { createSlice } from '@reduxjs/toolkit';

import websocketApi from '../../lib/websocket';

import { v4 as uuidv4 } from 'uuid';

import {
    TEAM_HOME,
    TEAM_AWAY
} from '../../constants/constants';

const notificationFactory = ({ team, type, quantifier = 0 }) => ({
    id: uuidv4(),
    team,
    type,
    quantifier
})

const initialState = {
    notifications: []
};

export const gameEventSlice = createSlice({
    name: 'gameEvent',
    initialState,
    reducers: {
        createNotification: (state, action) => {
            websocketApi.send({
                ...action.payload
            }, 'gameEvent');
        }
    }
});

export const {
    createNotification,
} = gameEventSlice.actions;

export default gameEventSlice.reducer;

