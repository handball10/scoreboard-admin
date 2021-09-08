import { createSlice } from '@reduxjs/toolkit';

export const STATUS = {
    RUNNING: 'running',
    STOPPED: 'stopped'
};

const initialState = {
    gameTime: 0,
    status: STATUS.STOPPED,
};

export const timeSlice = createSlice({
    name: 'time',
    initialState,
    reducers: {
        increase: state => { state.gameTime += 1; },
        decrease: state => { state.gameTime -= 1; },
        setTime: (state, action) => { state.gameTime = action.payload },
        reset: state => { Object.assign(state, initialState); },
        start: state => { state.status = STATUS.RUNNING;  },
        stop: state => { state.status = STATUS.STOPPED; },
    }
});

export const {
    increase,
    decrease,
    setTime,
    reset,
    start,
    stop
} = timeSlice.actions;


export const selectTime = state => state.time.gameTime;
export const selectStatus = state => state.time.status;
export const selectPenaltyByTeam = (state, team) => state.penalties.filter(penalty => penalty.team === team);

export default timeSlice.reducer;