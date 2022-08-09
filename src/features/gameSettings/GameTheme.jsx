import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTheme, setTheme } from './gameSettingsSlice';

export function GameTheme() {

    const dispatch = useDispatch();
    const currentTheme = useSelector(selectTheme);

    return (
        <div className="card game-theme">
            <div className="card-header">
                <p className="card-header-title is-size-6 has-text-centered">Scoreboard theme</p>
            </div>
            <div className="card-content">
                <div className="field">
                    <label className="label is-small">Theme</label>
                    <p className="control">
                        <span className="select is-small">
                            <select onChange={(event) => dispatch(setTheme(event.target.value))} value={currentTheme}>
                                <option value="default">default</option>
                                <option value="dhb">dhb</option>
                            </select>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}