import { createSlice } from '@reduxjs/toolkit';

import {
    TEAM_HOME,
    TEAM_AWAY,
    ACTIONS
} from '../../constants/constants';

import websocketApi from '../../lib/websocket';

const initialState = {
    [TEAM_HOME]: 0,
    [TEAM_AWAY]: 0
};

export const goalSlice = createSlice({
    name: 'goals',
    initialState,
    reducers: {
        increase: (state, action) => { 
            state[action.payload] += 1;
            websocketApi.sendPartialEvent(
                'goals',
                { ...state }
            ); 
        },
        decrease: (state, action) => {
            if (state[action.payload] - 1 >= 0) {
                state[action.payload] -= 1;
            }

            websocketApi.sendPartialEvent(
                'goals',
                { ...state }
            );
        },
        reset: state => { 
            Object.assign(state, initialState);
            
            websocketApi.sendPartialEvent(
                'goals',
                { ...state }
            );
        }
    }
});

export const {
    increase,
    decrease,
    reset
} = goalSlice.actions;


export const selectGoals = state => state.goals;
// export const selectGoalsByTeam = (state, 

export default goalSlice.reducer;