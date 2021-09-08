import classNames from "classnames";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectActiveModule, selectModules, setActiveModule } from "./advertisingSlice"

export function AdvertisingController() {
    const modules = useSelector(selectModules);
    const activeModule = useSelector(selectActiveModule);
    const dispatch = useDispatch();
    const selectRef = useRef(null);

    const options = modules.map(item => (
        <option value={item.id} key={`option-${item.id}`}>{item.name}</option>
    ));

    const buttonClasses = classNames({
        'button is-outlined mb-2': true,
        'is-success': activeModule === null,
        'is-danger': activeModule !== null,
        'is-outlined': activeModule !== null
    });

    return (
        <div className="advertising-controller">
            <div className="field mb-1">
                <div className="field-body">
                    <div className="control">
                        <div className="field">
                            <label className="label is-small">Source</label>
                            <p className="control">
                                <span className="select is-small">
                                    <select ref={selectRef}>{options}</select>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <button className={buttonClasses} onClick={() => { dispatch(setActiveModule(activeModule === null ? selectRef.current.value : null))}}>
                    {
                        activeModule === null ? 'Start' : 'Stop'
                    }
                </button>
            </div>

        </div>
    )
}