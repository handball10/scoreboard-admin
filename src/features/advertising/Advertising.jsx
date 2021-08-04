import FileSaver from "file-saver";
import { useRef } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AdvertisingGroup } from "./AdvertisingGroup";
import Modal from 'react-modal';

import {
    addModule,
    selectAdvertisingData,
    setModuleDataFromFile
} from './advertisingSlice';

import './Advertising.scss';
import classNames from "classnames";

const processFiles = (files = []) => {
    return files.map(file => ({
        file,
        path: file.path,
        name: file.name,
        preview: URL.createObjectURL(file)
    }));
}

const processAdvertisingFile = async (files = []) => {

    const reader = new FileReader();
    let promiseHandlers;
    const readerPromise = new Promise((resolve, reject) => promiseHandlers = { resolve, reject });

    reader.onload = (fileEvent) => {

        try {
            const data = JSON.parse(fileEvent.target.result);
            promiseHandlers.resolve({ data });
        }
        catch (error) {
            console.log(error);
            promiseHandlers.reject();
        }

    };

    reader.readAsText(files[0]);

    return readerPromise;

}

export function Advertising(props) {

    const [ isModalVisible, setModalVisibility ] = useState(false);
    const [ isSaveButtonVisible, setSaveButtonVisibility ] = useState(false);
    const [ modalSize, setModalSize ] = useState('x-small');
    const [ modalMode, setModalMode ] = useState('module');
    const [ newModuleName, setNewModuleName ] = useState('');
    const [ newModuleType, setNewModuleType ] = useState('Full');

    const moduleFormRef = useRef(null);

    const modalClasses = classNames({
        'modal': true,
        'is-active': isModalVisible
    });

    let modalContentComponent;

    const customStyles = {
        overlay: {
            background: 'rgba(10,10,10,.86)',
            zIndex: 100
        }
    };

    const dispatch = useDispatch();

    const {
        modules,
        items,
        activeModules
    } = useSelector(selectAdvertisingData);

    const fileInputRef = useRef(null);

    const handeInputFileChange = async event => {
        dispatch(setModuleDataFromFile(await processAdvertisingFile(event.target.files)));
    };

    const handleSaveFile = () => {
        const file = new Blob([ JSON.stringify({ modules, items }) ], { type: 'text/plain;charset=utf-8' });
        FileSaver.saveAs(file, `Advertising-${new Date().getTime()}.json`);
    }

    const handleAddModuleClick = () => {
        setModalVisibility(true);
        setSaveButtonVisibility(true);
        setModalVisibility('x-small');
    }

    const saveModule = () => {

        dispatch(addModule({
            name: newModuleName,
            type: newModuleType
        }));

        setNewModuleType('');
        setNewModuleName('');
        setModalVisibility(false);
    }

    const modalWrapperClasses = classNames({
        'modal-card': true,
        [`is-${modalSize}`]: true
    });

    return (
        <>
            <div className="advertising p-3">

                <input type="file" onChange={(e) => handeInputFileChange(e)} style={{display: 'none'}} ref={fileInputRef} />

                <div className="controls is-flex is-justify-content-space-between mb-2">
                    <div className="group">
                        <button className="button is-success is-outlined mr-2" onClick={() => handleAddModuleClick()}>Add Module</button>
                    </div>
                    <div className="group">
                        <button className="button is-info is-outlined mr-2" onClick={() => fileInputRef.current.click() }>Load</button>
                        <button className="button is-success is-outlined" onClick={handleSaveFile}>Save</button>
                    </div>
                </div>

                {
                    modules.map(item => (
                        <AdvertisingGroup group={item} key={item.id} />
                    ))
                }







                {/* <input type="file" onChange={(e) => handleInputChange(e)} multiple />
                
                {
                    files.map(
                        file => (
                            <div className="preview">
                                <img src={file.preview} onload={() => URL.revokeObjectURL(file.preview)}/>
                            </div>
                        )
                    )
                }


                {
                    files.map(file => (
                        <p key={file.name}>{file.name} - {file.path}</p>
                    ))
                } */}
            </div>
            <Modal
                isOpen={isModalVisible}
                onRequestClose={() => setModalVisibility(false)}
                contentLabel="Modal"
                className={modalClasses}
                style={customStyles}
            >
                <div className={modalWrapperClasses}>
                    <header className="modal-card-head">
                        <p className="modal-card-title">Create module</p>
                        <button className="delete" onClick={() => setModalVisibility(false)}></button>
                    </header>
                    <section className="modal-card-body">
                        {
                            modalMode === 'module' && (
                                <form ref={moduleFormRef}>
                                    <div className="field">
                                        <label className="label is-small">Name</label>
                                        <p className="control">
                                            <input type="text" className="input is-small" value={newModuleName} onChange={e => setNewModuleName(e.target.value)}/>
                                        </p>
                                    </div>
                                    <div className="field">
                                        <label className="label is-small">Type</label>
                                        <p className="control">
                                            <span className="select is-small">
                                                <select onChange={e => setNewModuleType(e.target.value)} value={newModuleType}>
                                                    <option value="bottom">Bottom</option>
                                                    <option value="fullSize">Full Size</option>
                                                </select>
                                            </span>
                                        </p>
                                    </div>
                                </form>
                            )
                        }
                    </section>
                    <footer className="modal-card-foot">
                        { isSaveButtonVisible && (
                            <a className="button is-success" onClick={() => saveModule()}>Save</a>
                        )}
                        <a className="button is-primary" onClick={() => setModalVisibility(false)}>Close</a>
                    </footer>
                </div>
            </Modal>
        </>
    )
}