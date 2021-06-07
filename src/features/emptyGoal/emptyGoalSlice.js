import { createSlice } from '@reduxjs/toolkit';

import {
    TEAM_HOME,
    TEAM_AWAY
} from '../../constants/constants';
import websocketApi from '../../lib/websocket';

const initialState = {
    [ TEAM_HOME ]: false,
    [ TEAM_AWAY ]: false
};

export const emptyGoalSlice = createSlice({
    name: 'emptyGoal',
    initialState,
    reducers: {
        toggleEmptyGoal: (state, action) => {
            state[ action.payload ] = !state[ action.payload ];

            websocketApi.sendPartialEvent(
                'emptyGoal',
                { ...state }
            );
        }
    }
});

export const {
    toggleEmptyGoal,
} = emptyGoalSlice.actions;

export const selectEmptyGoalByTeam = team => state => state.emptyGoal[ team ];

export default emptyGoalSlice.reducer;

