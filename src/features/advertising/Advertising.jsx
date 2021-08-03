import FileSaver from "file-saver";
import { useRef } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AdvertisingGroup } from "./AdvertisingGroup";

import {
    selectAdvertisingData,
    setModuleDataFromFile
} from './advertisingSlice';

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

    // const [ files, setFiles ] = useState([]);

    // function handleInputChange(event) {
    //     setFiles(processFiles([ ...event.target.files ]));
    // }

    const dispatch = useDispatch();

    const {
        modules,
        items,
        activeModules
    } = useSelector(selectAdvertisingData);

    console.log(modules, items, activeModules);

    const fileInputRef = useRef(null);

    const handeInputFileChange = async event => {
        dispatch(setModuleDataFromFile(await processAdvertisingFile(event.target.files)));
    };


    const handleSaveFile = () => {
        const file = new Blob([ JSON.stringify({ modules, items }) ], { type: 'text/plain;charset=utf-8' });
        FileSaver.saveAs(file, `Advertising-${new Date().getTime()}.json`);
    }

    return (
        <div className="advertising p-3">

            <input type="file" onChange={(e) => handeInputFileChange(e)} style={{display: 'none'}} ref={fileInputRef} />

            <div className="controls is-flex is-justify-content-space-between mb-2">
                <div className="group">
                    <button className="button is-success is-outlined mr-2">Add Module</button>
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
    )
}