import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {
    PERSON_TYPES
} from '../../constants/constants';
import { PersonListItem } from './PersonListItem';
import { useDispatch } from 'react-redux';
import {
    addPerson
} from '../teamInfo/teamInfoSlice';

import { useToasts } from 'react-toast-notifications';

export function PersonList({ team, data }) {

    const dispatch = useDispatch();
    const { addToast } = useToasts();

    function submitForm(e) {
        e.preventDefault();
        e.stopPropagation();
        const formData = new FormData(e.target)
        
        const person = {
            number: formData.get(`number-input-${team}`),
            firstName: formData.get(`firstName-input-${team}`),
            lastName: formData.get(`lastName-input-${team}`),
        };

        try {
            dispatch(
                addPerson({ person, team })
            );
        }
        catch (e) {
            addToast(e.message, { appearance: 'error' });
        }

        return false;
    }

    return (
        <form onSubmit={submitForm}>
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
                    <tr>
                        <td>
                            <input type="text" autoComplete="off" className="input is-small" placeholder="Nr." name={`number-input-${team}`} />
                        </td>
                        <td>
                            <input type="text" autoComplete="off" className="input is-small" placeholder="First Name" name={`firstName-input-${team}`} />
                        </td>
                        <td>
                            <input type="text" autoComplete="off" className="input is-small" placeholder="Last Name" name={`lastName-input-${team}`} />
                        </td>
                        <td>
                        <button className="button is-small" type="submit">
                            <span className="icon is-small">
                                <FontAwesomeIcon icon={faPlus}  />
                            </span>
                        </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    )
};