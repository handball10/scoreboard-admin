import { Player } from "./Player";
import { Official } from "./Official";
import { officialSort, playerSort } from "../../lib/helper/personHelper";

export function PersonList({ players, officials, team }) {
    return (
        <div className="card player-list">
            <div className="card-header">
                <p className="card-header-title">Players</p>
            </div>
            <div className="card-content" style={{ padding: '0' }}>
                <table className="table" style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            <th>Nr.</th>
                            <th>Name</th>
                            <th>
                                <span>🥅</span>
                            </th>
                            <th>
                                <span>🟨</span>
                            </th>
                            <th>
                                <span>✌</span>
                            </th>
                            <th>
                                <span>🟥</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            [ ...players ].sort(playerSort).map(player => (<Player player={player} team={team} key={player.key} /> ))
                        }
                        <tr><td colSpan="6"></td></tr>
                        {
                            [ ...officials ].sort(officialSort).map(official => (<Official official={official} team={team} key={official.key} /> ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}