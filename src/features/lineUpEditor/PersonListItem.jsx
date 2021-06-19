import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { changePlayerProperty, removePerson } from '../teamInfo/teamInfoSlice';
import { PLAYER_PROPERTIES } from '../../constants/constants';

const hasInput = input => input && input.length > 0;

const hasChanged = (oldValue, newValue) => oldValue != newValue;

export function PersonListItem({ person, team, type }) {

    const dispatch = useDispatch();

    function checkInputAndDispatch(oldValue, newValue, key) {
        if (hasInput && hasChanged(oldValue, newValue)) {
            dispatch(changePlayerProperty({
                team,
                person: person.number,
                key,
                value: newValue
            }));
        }
    }

    return (
        <tr>
            <td>
                <input
                    type="text"
                    className="input is-small" 
                    defaultValue={person.number}
                    pattern="^([a-f]{1})|([0-9]{1,3})$"
                    onBlur={(e) => checkInputAndDispatch(person.number, e.target.value, PLAYER_PROPERTIES.NUMBER)}
                />
            </td>
            <td>
                <input
                    type="text" 
                    className="input is-small" 
                    defaultValue={person.firstName}
                    onBlur={(e) => checkInputAndDispatch(person.firstName, e.target.value, PLAYER_PROPERTIES.FIRST_NAME)}
                />
            </td>
            <td>
                <input
                    type="text" 
                    className="input is-small" 
                    defaultValue={person.lastName}
                    onBlur={(e) => checkInputAndDispatch(person.lastName, e.target.value, PLAYER_PROPERTIES.LAST_NAME)}
                />
            </td>
            <td>
                <button className="button is-small" onClick={() => dispatch(removePerson({ person: person.number, team }))}>
                    <span className="icon is-small">
                        <FontAwesomeIcon icon={faTrashAlt}  />
                    </span>
                </button>
            </td>
        </tr>
    )
}