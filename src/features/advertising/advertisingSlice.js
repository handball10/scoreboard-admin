import { createSlice, current } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { ADVERTISING_MODES } from '../../constants/constants';
import { filePathTransformer } from '../../lib/utils';

import websocketApi from '../../lib/websocket';

const moduleFactory = data => ({
    mode: ADVERTISING_MODES.BOTTOM,
    ...data,
    id: uuidv4()
});

const itemFactory = data => ({
    ...data,
    id: uuidv4()
})


const initialState = {
    modules: [
        { id: 'test', name: 'test', type: 'fullSize' }
    ],
    items: [
        itemFactory({ src: filePathTransformer('E:\\Projects\\Video\\LiveStreaming\\LindenCup 2021\\logos\\feldmann.jpg'), type: 'image', moduleId: 'test' }),
        itemFactory({ src: filePathTransformer('E:\\Projects\\Video\\LiveStreaming\\LindenCup 2021\\logos\\intersport.jpg'), type: 'image', moduleId: 'test' }),
        itemFactory({ src: filePathTransformer('E:\\Projects\\Video\\LiveStreaming\\LindenCup 2021\\logos\\goethe.jpg'), type: 'image', moduleId: 'test' }),
        itemFactory({ src: filePathTransformer('E:\\Projects\\Video\\LiveStreaming\\LindenCup 2021\\logos\\licher.jpg'), type: 'image', moduleId: 'test' }),
        itemFactory({ src: filePathTransformer('E:\\Projects\\Video\\LiveStreaming\\LindenCup 2021\\logos\\manz.jpg'), type: 'image', moduleId: 'test' }),
        itemFactory({ src: filePathTransformer('E:\\Projects\\Video\\LiveStreaming\\LindenCup 2021\\logos\\manz.jpg'), type: 'image', moduleId: 'test' }),
        itemFactory({ src: filePathTransformer('E:\\Projects\\Video\\LiveStreaming\\LindenCup 2021\\logos\\manz.jpg'), type: 'image', moduleId: 'test' }),
    ]
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
        },
        deleteModule: (state, action) => {
            console.log(action.payload);
            state.modules = state.modules.filter(item => item.id !== action.payload);
            state.items = state.items.filter(item => item.moduleId !== action.payload);
        },
        addModule: (state, action) => {
            state.modules = [
                ...state.modules,
                moduleFactory(action.payload)
            ];
        },
        editModule: (state, action) => {

            const data = action.payload;

            const currentModule = state.modules.find(item => item.id === data.id);

            Object.entries(data).forEach(([entry, value]) => currentModule[entry] = value);
        }
    }
});

export const {
    setFiles,
    setModuleDataFromFile,
    toggleActiveModule,
    deleteModule,
    addModule,
    editModule
} = advertisingSlice.actions;

export const selectAdvertisingData = state => state.advertising;
export const selectAdvertisingItemsByModule = moduleId => state => state.advertising.items.filter(item => item.moduleId === moduleId);
export const selectModuleById = moduleId => state => state.advertising.modules.find(item => item.id === moduleId);

export default advertisingSlice.reducer;

