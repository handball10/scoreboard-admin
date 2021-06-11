import './numberInput.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

export function NumberInput({ value, increase, decrease, min, max  }) {
    return (
        <div className="number-input">
            <span>{value}</span>
            <div className="controls ml-2">
                <span className="icon is-small" onClick={() => (value + 1 > max) ? void(0) : increase() }>
                    <FontAwesomeIcon icon={faSortUp} />
                </span>
                <span className="icon is-small" onClick={() => (value - 1 < min) ? void(0) : decrease() }>
                    <FontAwesomeIcon icon={faSortDown} />
                </span>
            </div>
        </div>
    )
}