import { useSelector, useDispatch } from "react-redux"
import { selectPeriodCount, selectPeriodDuration, setPeriodCount, setPeriodDuration } from "./gameSettingsSlice";

export function PeriodSettings() {

    const dispatch = useDispatch();
    const periodDuration = useSelector(selectPeriodDuration);
    const periodCount = useSelector(selectPeriodCount);

    return (
        <div className="card">
            <div className="card-header">
                <p className="card-header-title is-size-6 has-text-centered">Period settings</p>
            </div>
            <div className="card-content">
                <div className="columns">
                    <div className="column">
                        <div className="field">
                            <label className="label is-small">Period duration</label>
                            <p className="control">
                                <span className="select is-small">
                                    <select value={periodDuration} onChange={(event) => dispatch(setPeriodDuration(event.target.value))}>
                                        <option value={1800}>30:00</option>
                                        <option value={1500}>25:00</option>
                                        <option value={1200}>20:00</option>
                                        <option value={900}>15:00</option>
                                        <option value={600}>10:00</option>
                                        <option value={300}>05:00</option>
                                        <option value={60}>01:00</option>
                                        <option value={10}>00:10</option>
                                    </select>
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="column">
                        <div className="field">
                            <label className="label is-small">Periods</label>
                            <p className="control">
                                <span className="select is-small">
                                    <select value={periodCount} onChange={(event) => dispatch(setPeriodCount(event.target.value))}>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                    </select>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* <footer class="card-footer">
                <a class="card-footer-item" onClick={() => dispatch(fetchTeamInformation({ mode: dataMode, game: gameId }))}>Load</a>
            </footer> */}
        </div>
    )
}