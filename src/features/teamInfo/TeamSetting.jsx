import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import {
    fetchTeamInformation
} from './teamInfoSlice';

export function TeamSettings() {

    const [ dataMode, setDataMode ] = useState('dhb');
    const [ gameId, setGameId ] = useState('27549');

    const dispatch = useDispatch();

    return (
        <div className="team-settings">
            <button onClick={() => dispatch(fetchTeamInformation({ mode: dataMode, game: gameId }))}>Test</button>
        </div>
    )

}