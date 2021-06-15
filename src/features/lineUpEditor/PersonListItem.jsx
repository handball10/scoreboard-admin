import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { changePlayerProperty, removePerson } from '../teamInfo/teamInfoSlice';
import { PLAYER_PROPERTIES } from '../../constants/constants';

const hasInput = input => input && input.length > 0;

export function PersonListItem({ person, team, type }) {

    const dispatch = useDispatch();

    return (
        <tr>
            <td>
                <input
                    type="text"
                    className="input is-small" 
                    defaultValue={person.number}
                    pattern="^([a-f]{1})|([0-9]{1,3})$"
                    // onChange={e => hasInput(e.target.value) && dispatch(changePlayerProperty(
                    //     {
                    //         team,
                    //         person: person.number,
                    //         key: PLAYER_PROPERTIES.NUMBER,
                    //         value: e.target.value
                    //     }
                    // ))}
                />
            </td>
            <td>
                <input
                    type="text" 
                    className="input is-small" 
                    defaultValue={person.firstName}
                    // onChange={e => hasInput(e.target.value) && dispatch(changePlayerProperty(
                    //     {
                    //         team,
                    //         person: person.number,
                    //         key: PLAYER_PROPERTIES.FIRST_NAME,
                    //         value: e.target.value
                    //     }
                    // ))}
                />
            </td>
            <td>
                <input
                    type="text" 
                    className="input is-small" 
                    defaultValue={person.lastName}
                    // onChange={e => hasInput(e.target.value) && dispatch(changePlayerProperty(
                    //     {
                    //         team,
                    //         person: person.number,
                    //         key: PLAYER_PROPERTIES.LAST_NAME,
                    //         value: e.target.value
                    //     }
                    // ))}
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