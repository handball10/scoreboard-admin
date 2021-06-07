import { createSlice } from '@reduxjs/toolkit';
import { v1 as timestamp } from 'uuid';

import websocketApi from '../../lib/websocket';

const initialState = {
    logs: []
};

export const commandLogSlice = createSlice({
    name: 'logs',
    initialState,
    reducers: {
        logEvent: (state, action) => {
            state.logs.push({
                message: action.payload.message,
                type: action.payload.type,
                id: timestamp()
            });
        }
    }
});

export const {
    logEvent,
} = commandLogSlice.actions;

export const selectLogs = state => state.logs || [];

export default commandLogSlice.reducer;