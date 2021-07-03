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
import { useRef } from 'react';
import { officialSort, playerSort } from '../../lib/helper/personHelper';

export function PersonList({ team, data }) {

    const dispatch = useDispatch();
    const { addToast } = useToasts();

    const formRef = useRef();
    const submitRef = useRef();

    const inputRefs = {
        number: useRef(),
        firstName: useRef(),
        lastName: useRef()
    };

    function submitForm(e) {
        e.preventDefault();
        e.stopPropagation();
        const formData = new FormData(e.target);

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
            addToast(e.message, { appearance: 'error', autoDismiss: true });
            return false;
        }

        formRef.current.reset();
        inputRefs.number.current.focus();

        return false;
    }

    function keyDownHandler(event) {
        if (event.key === 'Enter') {
            submitRef.current.click();
            event.preventDefault();
            event.stopPropagation();
        }
    }

    return (
        <form onSubmit={submitForm} ref={formRef}>
            <table className="table" style={{ width: '100%' }}>
                <thead>
                    <tr>
                        <th style={{width: '15%'}}>Nr.</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <input 
                                type="text"
                                autoComplete="off"
                                ref={inputRefs.number}
                                className="input is-small"
                                placeholder="Nr."
                                name={`number-input-${team}`}
                                onKeyDown={keyDownHandler}
                                required
                            />
                        </td>
                        <td>
                            <input 
                                type="text"
                                autoComplete="off"
                                ref={inputRefs.firstName}
                                className="input is-small"
                                placeholder="First Name"
                                name={`firstName-input-${team}`}
                                onKeyDown={keyDownHandler}
                                required
                            />
                        </td>
                        <td>
                            <input 
                                type="text"
                                autoComplete="off"
                                ref={inputRefs.lastName}
                                className="input is-small"
                                placeholder="Last Name"
                                name={`lastName-input-${team}`}
                                onKeyDown={keyDownHandler}
                                required
                            />
                        </td>
                        <td>
                        <button className="button is-small" type="submit" ref={submitRef}>
                            <span className="icon is-small">
                                <FontAwesomeIcon icon={faPlus}  />
                            </span>
                        </button>
                        </td>
                    </tr>
                    {
                        [ ...data.players ].sort(playerSort).map(player => (<PersonListItem person={player} team={team} key={player.key} type={PERSON_TYPES.PLAYER} /> ))
                    }
                    {
                        [ ...data.officials ].sort(officialSort).map(official => (<PersonListItem person={official} team={team} key={official.key} type={PERSON_TYPES.OFFICIAL} /> ))
                    }
                </tbody>
            </table>
        </form>
    )
};