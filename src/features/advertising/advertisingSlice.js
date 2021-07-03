import { createSlice } from '@reduxjs/toolkit';

import websocketApi from '../../lib/websocket';

const initialState = {
    files: []
};

export const advertisingSlice = createSlice({
    name: 'advertising',
    initialState,
    reducers: {
        setFiles: (state, action) => {
            state.files = action.payload;
        }
    }
});

export const {
    setFiles,
} = advertisingSlice.actions;

export default advertisingSlice.reducer;

