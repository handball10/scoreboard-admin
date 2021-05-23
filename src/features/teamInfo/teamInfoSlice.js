import { createSlice } from '@reduxjs/toolkit';

import { v4 as uuidv4 } from 'uuid';

import {
    TEAM_HOME,
    TEAM_AWAY
} from '../../constants/constants';
import websocketApi from '../../lib/websocket';

const initialState = {
    [ TEAM_HOME ]: {
        shortName: 'HSG D/M',
        longName: 'HSG Dutenhofen/Münchholzhausen',
        color: '#ff00ff'
    },
    [ TEAM_AWAY ]: {
        shortName: 'HSG Hanau',
        longName: 'HSG Hanau',
        color: '#0000ff'
    },
};

export const teamInfotSlice = createSlice({
    name: 'teams',
    initialState,
    reducers: {
        changeTeamLongName: (state, action) => {
            const {
                team,
                value
            } = action.payload;

            state[ team ].longName = value;

            websocketApi.sendPartialEvent(
                'teams',
                { ...state }
            );
        },
        changeTeamShortName: (state, action) => {
            const {
                team,
                value
            } = action.payload;

            state[ team ].shortName = value;

            websocketApi.sendPartialEvent(
                'teams',
                { ...state }
            );
        },
        changeTeamColor: (state, action) => {
            const {
                team,
                value
            } = action.payload;

            state[ team ].color = value;

            websocketApi.sendPartialEvent(
                'teams',
                { ...state }
            );
        }
    }
});

export const {
    changeTeamLongName,
    changeTeamShortName,
    changeTeamColor
} = teamInfotSlice.actions;

export const selectTeamInfoByTeam = team => state => state.teams[ team ];

export default teamInfotSlice.reducer;

