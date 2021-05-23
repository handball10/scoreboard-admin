import { createSlice } from '@reduxjs/toolkit';

import { v4 as uuidv4 } from 'uuid';

import {
    TEAM_HOME,
    TEAM_AWAY
} from '../../constants/constants';
import websocketApi from '../../lib/websocket';

const initialState = {
    items: [],
    penaltyDuration: 120
};

const penaltyFactory = ({ team }) => ({
    team,
    time: 120,
    id: uuidv4()
});

export const penaltiesSlice = createSlice({
    name: 'penalties',
    initialState,
    reducers: {
        addPenalty: (state, action) => { 
            state.items = [...state.items, penaltyFactory({ team: action.payload })];

            websocketApi.sendPartialEvent(
                'penalties',
                { ...state }
            );
        },
        removePenalty: (state, action) => {
            state.items = state.items.filter(({ id }) => id !== action.payload );

            websocketApi.sendPartialEvent(
                'penalties',
                { ...state }
            );
        },
        clear: state => { 
            state.items = [];

            websocketApi.sendPartialEvent(
                'penalties',
                { ...state }
            );
        },
        increaseAll: state => {
            state.items = state.items
                // decrease time by 1
                .map(penalty => ({ ...penalty, time: penalty.time - 1 }))
                // remove all outdated penalties
                .filter(({ time }) => time > 0)
            ;

            websocketApi.sendPartialEvent(
                'penalties',
                { ...state }
            );
        }
    }
});

export const {
    addPenalty,
    removePenalty,
    clear,
    increaseAll
} = penaltiesSlice.actions;

export const selectPenaltiesByTeam = targetTeam => state => state.penalties.items.filter(({ team }) => team === targetTeam);

export default penaltiesSlice.reducer;

