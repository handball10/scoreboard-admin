import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import {
    fetchTeamInformation
} from '../teamInfo/teamInfoSlice';

export function GameData() {

    const [ dataMode, setDataMode ] = useState('dhb');
    const [ gameId, setGameId ] = useState('27549');

    const dispatch = useDispatch();

    return (
        <div className="card team-settings">
            <div className="card-header">
                <p className="card-header-title is-size-6 has-text-centered">Team information</p>
            </div>
            <div className="card-content">
                <div className="field">
                    <label className="label is-small">Source</label>
                    <p className="control">
                        <span className="select is-small">
                            <select onChange={(event) => setDataMode(event.target.value)} value={dataMode}>
                                <option value="dhb">DHB</option>
                                <option value="nu">nuLiga</option>
                            </select>
                        </span>
                    </p>
                </div>
                <div className="field">
                    <label className="label is-small">GameId</label>
                    <p className="control">
                        <input type="text" className="input is-small" value={gameId} onChange={(event) => setGameId(event.target.value)}/>
                    </p>
                </div>
            </div>
            <footer class="card-footer">
                <a class="card-footer-item" onClick={() => dispatch(fetchTeamInformation({ mode: dataMode, game: gameId }))}>Load</a>
            </footer>
        </div>
    )

}