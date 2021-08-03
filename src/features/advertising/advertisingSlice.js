import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { ADVERTISING_MODES } from '../../constants/constants';

import websocketApi from '../../lib/websocket';

const moduleFactory = data => ({
    mode: ADVERTISING_MODES.BOTTOM,
    ...data,
    id: uuidv4()
});

const itemFactory = data => ({

})

const initialState = {
    modules: [

    ],
    items: []
};

export const advertisingSlice = createSlice({
    name: 'advertising',
    initialState,
    reducers: {
        setFiles: (state, action) => {
            state.files = action.payload;
        },
        toggleActiveModule: (state, action) => {
            state.activeModules = state.activeModules.includes(action.payload) 
                ? state.activeModules.filter(item => item !== action.payload) 
                : [...state.activeModules, action.payload]
            ;
        },
        setModuleDataFromFile: (state, { payload }) => {
            state.modules = payload.data.modules;
            state.items = payload.data.items;
        }
    }
});

export const {
    setFiles,
    setModuleDataFromFile,
    toggleActiveModule,
} = advertisingSlice.actions;

export const selectAdvertisingData = state => state.advertising;

export default advertisingSlice.reducer;

