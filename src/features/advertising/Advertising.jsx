import { useState } from "react";

export function Advertising(props) {

    const [ files, setFiles ] = useState([]);

    function handleInputChange(event) {
        setFiles([ ...event.target.files ]);
    }

    return (
        <div className="advertising">
            <input type="file" onChange={(e) => handleInputChange(e)} multiple />
            <img src="C:\Users\flori\Pictures\2021\Hochzeitsauswahl\5D4_0108.JPG" />

            {
                files.map(file => (
                    <p key={file.name}>{file.name} - {file.path}</p>
                ))
            }
        </div>
    )
}