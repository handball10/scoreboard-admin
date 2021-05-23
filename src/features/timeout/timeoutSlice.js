import { createSlice } from '@reduxjs/toolkit';

import {
    TEAM_HOME,
    TEAM_AWAY
} from '../../constants/constants';
import websocketApi from '../../lib/websocket';

export const TIMEOUT_TYPES = {
    TIMEOUT: 'timeout',
    HALFTIME: 'halftime',
    GAMEEND: 'gameend'
}

const TIMEOUT_LABELS = {
    [TIMEOUT_TYPES.TIMEOUT]: 'Auszeit',
    [TIMEOUT_TYPES.HALFTIME]: 'Halbzeit',
    [TIMEOUT_TYPES.GAMEEND]: 'Spielende',
};

const initialState = {
    [ TIMEOUT_TYPES.TIMEOUT ]: {
        isActive: false,
        label: TIMEOUT_LABELS[ TIMEOUT_TYPES.TIMEOUT]
    },
    [ TIMEOUT_TYPES.HALFTIME ]: {
        isActive: false,
        label: TIMEOUT_LABELS[ TIMEOUT_TYPES.HALFTIME]
    },
    [ TIMEOUT_TYPES.GAMEEND ]: {
        isActive: false,
        label: TIMEOUT_LABELS[ TIMEOUT_TYPES.GAMEEND]
    }
};

export const timeoutSlice = createSlice({
    name: 'timeout',
    initialState,
    reducers: {
        toggleTimeout: (state, action) => {

            Object.entries(state).forEach(([ key, value ]) => key === action.payload ? (value.isActive = !value.isActive) : ( value.isActive = false ));

            // state[action.payload].isActive = !state[action.payload].isActive;

            websocketApi.sendPartialEvent(
                'timeout',
                { ...state }
            );
        }
    }
});

export const {
    toggleTimeout
} = timeoutSlice.actions;


export const selectTimeoutStateByType = type => state => state.timeout[type];

export default timeoutSlice.reducer;