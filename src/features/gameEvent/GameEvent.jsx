import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
    TEAM_HOME,
    TEAM_AWAY
} from '../../constants/constants';

import {
    createNotification
} from './gameEventSlice';

export function GameEvent() {
    const dispatch = useDispatch();

    return (
        <div className="notifications">
            <div className="home">
                <button className="button is-outlined mb-1 is-success" onClick={() => dispatch(createNotification({
                    type: 'goal',
                    team: 'HSG Dutenhofen/Münchholzhausen',
                    player: {
                        name: 'Lukas Gümbel',
                        number: 3
                    },
                    quantity: 4
                }))}>
                    Add Goal Notification  
                </button>
                <button className="button is-outlined mb-1 is-primary" onClick={() => dispatch(createNotification({
                    type: 'penalty',
                    team: 'HSG Dutenhofen/Münchholzhausen',
                    player: {
                        name: 'Lukas Gümbel',
                        number: 3
                    },
                    quantity: 2
                }))}>
                    Add Penalty Notification  
                </button>
                <button className="button is-outlined mb-1 is-warning" onClick={() => dispatch(createNotification({
                    type: 'yellowcard',
                    team: 'HSG Dutenhofen/Münchholzhausen',
                    player: {
                        name: 'Lukas Gümbel',
                        number: 3
                    }
                }))}>
                    Add Yellow Card Notification  
                </button>
                <button className="button is-outlined mb-1 is-danger" onClick={() => dispatch(createNotification({
                    type: 'redcard',
                    team: 'HSG Dutenhofen/Münchholzhausen',
                    player: {
                        name: 'Lukas Gümbel',
                        number: 3
                    }
                }))}>
                    Add Red Card Notification  
                </button>
            </div>
        </div>
    )
}