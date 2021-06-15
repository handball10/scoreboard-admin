import {
    PERSON_TYPES
} from '../../constants/constants';
import { PersonListItem } from './PersonListItem';

export function PersonList({ team, data }) {

    console.log(data);

    return (
        <table className="table" style={{ width: '100%' }}>
            <thead>
                <tr>
                    <th>Nr.</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.players.map(player => (<PersonListItem person={player} team={team} key={player.key} type={PERSON_TYPES.PLAYER} /> ))
                }
                {
                    data.officials.map(official => (<PersonListItem person={official} team={team} key={official.key} type={PERSON_TYPES.OFFICIAL} /> ))
                }
            </tbody>
        </table>
    )
};