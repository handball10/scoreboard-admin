import { ADVERTISING_MODES_LABELS } from "../../constants/constants";
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export function AdvertisingGroup({ group }) {
    return (
        <div className="card mb-2">
            <div className="card-header">
                <p className="card-header-title is-size-6 has-text-centered">{group.name}</p>

                <div className="tag is-primary m-2">{ADVERTISING_MODES_LABELS[group.mode]}</div>
                <span className="icon is-small m-3">
                    <FontAwesomeIcon icon={faEdit}  />
                </span>
            </div>
            <div className="card-content">
                <p>Hallo</p>
            </div>
        </div>
    )
}