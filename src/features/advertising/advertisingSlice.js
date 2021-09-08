import { createSlice, current } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { ADVERTISING_MODES } from '../../constants/constants';
import { filePathTransformer } from '../../lib/utils';

import websocketApi from '../../lib/websocket';

const moduleFactory = data => ({
    mode: ADVERTISING_MODES.BOTTOM,
    ...data,
    items: [],
    id: uuidv4()
});

const itemFactory = (data, index = 0) => ({
    index,
    ...data,
    src: (data.src.length === 0 || data.src.includes('http') ? data.src : filePathTransformer(data.src)),
    type: data.type.split('/')[0],
    id: uuidv4()
});

const sortIndex = (a, b) => a.index - b.index;

const initialState = {
    modules: [
        // { 
        //     id: 'test',
        //     name: 'test',
        //     type: 'fullSize',
        //     items: [
        //         itemFactory({ src: 'E:\\Projects\\Video\\LiveStreaming\\LindenCup 2021\\logos\\feldmann.jpg', type: 'image', index: 1 }),
        //         itemFactory({ src: 'E:\\Projects\\Video\\LiveStreaming\\LindenCup 2021\\logos\\intersport.jpg', type: 'image', index: 2 }),
        //         itemFactory({ src: 'E:\\Projects\\Video\\LiveStreaming\\LindenCup 2021\\logos\\goethe.jpg', type: 'image', index: 3 }),
        //         itemFactory({ src: 'E:\\Projects\\Video\\LiveStreaming\\LindenCup 2021\\logos\\licher.jpg', type: 'image', index: 4 }),
        //         itemFactory({ src: 'E:\\Projects\\Video\\LiveStreaming\\LindenCup 2021\\logos\\manz.jpg', type: 'image', index: 5 }),
        //         itemFactory({ src: 'E:\\Projects\\Video\\LiveStreaming\\LindenCup 2021\\logos\\manz.jpg', type: 'image', index: 6 }),
        //         itemFactory({ src: 'E:\\Projects\\Video\\LiveStreaming\\LindenCup 2021\\logos\\manz.jpg', type: 'image', index: 7 }),
        //         itemFactory({ src: 'E:\\Projects\\Video\\LiveStreaming\\LindenCup 2021\\logos\\manz.jpg', type: 'image', index: 8 }),
        //         itemFactory({ src: 'E:\\Projects\\Video\\LiveStreaming\\LindenCup 2021\\logos\\manz.jpg', type: 'image', index: 9 }),
        //         itemFactory({ src: 'E:\\Projects\\Video\\LiveStreaming\\LindenCup 2021\\logos\\manz.jpg', type: 'image', index: 10 }),
        //         itemFactory({ src: 'E:\\Projects\\Video\\LiveStreaming\\LindenCup 2021\\logos\\manz.jpg', type: 'image', index: 11 }),
        //     ]
        // },
        // { 
        //     id: 'Simsalabim',
        //     name: 'Simsalabim',
        //     type: 'fullSize',
        //     items: [
        //         itemFactory({ src: 'E:\\Projects\\Video\\LiveStreaming\\LindenCup 2021\\logos\\feldmann.jpg', type: 'image', index: 1 }),
        //         itemFactory({ src: 'E:\\Projects\\Video\\LiveStreaming\\LindenCup 2021\\logos\\intersport.jpg', type: 'image', index: 2 }),
        //         itemFactory({ src: 'E:\\Projects\\Video\\LiveStreaming\\LindenCup 2021\\logos\\goethe.jpg', type: 'image', index: 3 }),
        //         itemFactory({ src: 'E:\\Projects\\Video\\LiveStreaming\\LindenCup 2021\\logos\\licher.jpg', type: 'image', index: 4 }),
        //         itemFactory({ src: 'E:\\Projects\\Video\\LiveStreaming\\LindenCup 2021\\logos\\manz.jpg', type: 'image', index: 5 }),
        //         itemFactory({ src: 'E:\\Projects\\Video\\LiveStreaming\\LindenCup 2021\\logos\\manz.jpg', type: 'image', index: 1 }),
        //         itemFactory({ src: 'E:\\Projects\\Video\\LiveStreaming\\LindenCup 2021\\logos\\manz.jpg', type: 'image', index: 7 }),
        //     ]
        // }
    ],
    activeModule: null
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
        },
        setItems: (state, action) => {
            const {
                moduleId,
                items
            } = action.payload;

            const currentModule = state.modules.find(item => item.id === moduleId);

            currentModule.items = items;
        },
        addItems: (state, action) => {
            const {
                moduleId,
                items
            } = action.payload;

            const currentModule = state.modules.find(item => item.id === moduleId);

            // get the greatest index
            const greatestIndex = currentModule.items.reduce((acc, item) => Math.max(acc, item.index), 0);

            currentModule.items = [...currentModule.items, ...items.map((item, index) => itemFactory(item, greatestIndex + index + 1))];
        },
        removeItems: (state, action) => {
            const {
                moduleId,
                items
            } = action.payload;

            const currentModule = state.modules.find(item => item.id === moduleId);

            currentModule.items = currentModule.items.filter(item => !items.includes(item.id)).map((item, index) => item.index = index);
        },
        setActiveModule: (state, action) => {

            state.activeModule = action.payload;

            if (action.payload !== null) {
                const currentModule = state.modules.find(item => item.id === action.payload);
                const type = currentModule.type;
                const items = currentModule.items;

                websocketApi.sendAdvertisingEvent(type, items);
            }
            else {
                websocketApi.sendAdvertisingEvent(ADVERTISING_MODES.NONE, []);
            }

        }
    }
});

export const {
    setFiles,
    setModuleDataFromFile,
    toggleActiveModule,
    deleteModule,
    addModule,
    editModule,
    setItems,
    addItems,
    removeItems,
    setActiveModule
} = advertisingSlice.actions;

export const selectAdvertisingData = state => state.advertising;
export const selectModuleById = moduleId => state => state.advertising.modules.find(item => item.id === moduleId);
export const selectAdvertisingItemsByModule = moduleId => state => [...selectModuleById(moduleId)(state).items].sort(sortIndex);
export const selectModules = state => state.advertising.modules;
export const selectActiveModule = state => state.advertising.activeModule;


export default advertisingSlice.reducer;

