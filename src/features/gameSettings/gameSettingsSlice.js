import { createSlice } from '@reduxjs/toolkit';
import websocketApi from '../../lib/websocket';

const initialState = {
    periodDuration: 1800,
    periodCount: 2,
    currentPeriod: 1,
    theme: 'dhb'
};

export const gameSettingsSlice = createSlice({
    name: 'gameSettings',
    initialState,
    reducers: {
        setPeriodDuration: (state, action) => {
            state.periodDuration = action.payload;
        },
        setPeriodCount: (state, action) => {
            state.periodCount = action.payload;
        },
        setCurrentPeriod: (state, action) => {
            state.currentPeriod = action.payload;
        },
        increaseCurrentPeriod: (state, action) => {
            if (state.currentPeriod + 1 <= state.periodCount) {
                state.currentPeriod++;
            }
        },
        setTheme: (state, action) => {
            state.theme = action.payload;

            websocketApi.sendPartialEvent(
                'theme',
                { theme: state.theme }
            );
        },
        reset: (state, action) => {
            Object.assign(state, initialState);
        }
    }
});

export const {
    setPeriodDuration,
    setPeriodCount,
    setCurrentPeriod,
    increaseCurrentPeriod,
    reset,
    setTheme
} = gameSettingsSlice.actions;

export const selectPeriodDuration = state => state.gameSettings.periodDuration;
export const selectPeriodCount = state => state.gameSettings.periodCount;
export const selectCurrentPeriod = state => state.gameSettings.currentPeriod;
export const selectTheme = state => state.gameSettings.theme;

export default gameSettingsSlice.reducer;
