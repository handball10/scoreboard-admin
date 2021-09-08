import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {
    TEAM_HOME,
    TEAM_AWAY,
    PLAYER_PROPERTIES,
    TEAM_INFO_PERSON_MAP,
    PERSON_TYPES
} from '../../constants/constants';

import { fetchTeamInfo } from '../../lib/api/teamInfo';
import { isOfficial, isPlayer } from '../../lib/helper/personHelper';

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

const personFactory = ({
    number,
    firstName,
    lastName,
    goals = 0,
    penaltyGoals = 0,
    penaltyMissed = 0,
    timePenalty = 0,
    warning = 0,
    disqualification = 0,
}, team, type) => ({
    number,
    firstName,
    lastName,
    goals,
    penaltyGoals,
    penaltyMissed,
    timePenalty,
    warning,
    disqualification,
    key: `${type}-${team}-${number}`
});

const playerFactory = (data, team) => personFactory(data, team, 'player');
const officialFactory = (data, team) => personFactory(data, team, 'official');

const getPersonListByTeamAndIndentifier = (state, team, number) => state[
    team
][
    !isNaN(number) 
        ? TEAM_INFO_PERSON_MAP[PERSON_TYPES.PLAYER]
        : TEAM_INFO_PERSON_MAP[PERSON_TYPES.OFFICIAL]
];

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

            let personData;

            // check for duplicate numbers
            if (key === PLAYER_PROPERTIES.NUMBER) {
                personData = getPersonListByTeamAndIndentifier(state, team, person).filter(item => item.number == person || item.number == value);

                console.log(personData);

                if (personData.length > 1) {
                    throw new Error(`Duplicate person for Number ${value}!`);
                }
            }

            else {
                personData = getPersonListByTeamAndIndentifier(state, team, person).filter(item => item.number == person)
            }
            try {

                personData[0][ key ] = value;
            }
            catch (e) {
                console.error(e);
                console.log(`Property ${key} or person ${person} not found!`);
            }
        },
        removePerson: (state, action) => {

            console.log('remove Person');

            const {
                team,
                person,
            } = action.payload;

            let personList = getPersonListByTeamAndIndentifier(state, team, person);

            personList = personList.filter(item => item.number != person);

            state[ 
                team
            ][ 
                !isNaN(person) 
                    ? TEAM_INFO_PERSON_MAP[PERSON_TYPES.PLAYER]
                    : TEAM_INFO_PERSON_MAP[PERSON_TYPES.OFFICIAL] 
            ] = personList;
        },
        addPerson: (state, action) => {
            const {
                team,
                person
            } = action.payload;

            let personList = getPersonListByTeamAndIndentifier(state, team, person.number);

            if (personList.find(item => item.number == person.number)) {
                throw new Error(`Person with number ${person.number} already exists!`);
            }

            if (isPlayer(person.number)) {
                personList.push(playerFactory(person, team));
            }
            else if (isOfficial(person.number)) {
                personList.push(officialFactory(person, team));
            }
            else {
                throw new Error('This is not a valid person!');
            }

        },
        reset: (state, action) => {
            Object.assign(state, initialState);
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
    addPerson,
    removePerson,
    reset
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

