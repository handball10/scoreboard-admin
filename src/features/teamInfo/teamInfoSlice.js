import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    TEAM_HOME,
    TEAM_AWAY
} from '../../constants/constants';

import { fetchTeamInfo } from '../../lib/api/teamInfo';

import websocketApi from '../../lib/websocket';

const initialState = {
    [ TEAM_HOME ]: {
        shortName: 'Home',
        longName: 'Home Team',
        color: '#92f50a',
        players: [],
        officials: []
    },
    [ TEAM_AWAY ]: {
        shortName: 'Guest',
        longName: 'Guest Team',
        color: '#004080',
        players: [],
        officials: []
    },
};

const fetchTeamInformation = createAsyncThunk(
    'team/fetchTeamInformation',
    async (config, thunkApi) => {
        const response = await fetchTeamInfo(config);
        return response;
    }
)

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
        },
        changePlayerProperty: (state, action) => {
            const {
                team,
                person,
                key,
                value
            } = action.payload;

            try {
                const personData = state[ team ][ !isNaN(person) ? 'players' : 'officials' ].find(item => item.number == person);
                personData[ key ] = value;
            }
            catch (e) {
                console.error(e);
                console.log(`Property ${key} or person ${person} not found!`);
            }
        },
        removePerson: (state, action) => {
            const {
                team,
                person,
            } = action.payload;

            let personList = state[ team ][ !isNaN(person) ? 'players' : 'officials' ];

            personList = personList.filter(item => item.number != person);

            state[ team ][ !isNaN(person) ? 'players' : 'officials' ] = personList;

        }
    },
    extraReducers: {
        [fetchTeamInformation.fulfilled]: (state, { payload }) => {
            state[ TEAM_HOME ] = {
                ...state[ TEAM_HOME ],
                ...payload.data[ TEAM_HOME ]
            };

            state[ TEAM_AWAY ] = {
                ...state[ TEAM_AWAY ],
                ...payload.data[ TEAM_AWAY ]
            };

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
    changeTeamColor,
    changePlayerProperty,
    removePerson
} = teamInfotSlice.actions;

export {
    fetchTeamInformation
};

export const selectTeamInfoByTeam = team => state => state.teams[ team ];
export const selectPlayersByTeam = team => state => state.teams[ team ].players;
export const selectPersonInfoByNumber = (team, number) => state => ({
    team: state.teams[ team ],
    player: ([ ...state.teams[ team ].players, ...state.teams[ team ].officials ]).find(person => person.number.toString() === number)
});

export default teamInfotSlice.reducer;

