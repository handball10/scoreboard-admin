import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    periodDuration: 1800,
    periodCount: 2,
    currentPeriod: 1
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
        }
    }
});

export const {
    setPeriodDuration,
    setPeriodCount,
    setCurrentPeriod,
    increaseCurrentPeriod
} = gameSettingsSlice.actions;

export const selectPeriodDuration = state => state.gameSettings.periodDuration;
export const selectPeriodCount = state => state.gameSettings.periodCount;
export const selectCurrentPeriod = state => state.gameSettings.currentPeriod;

export default gameSettingsSlice.reducer;
