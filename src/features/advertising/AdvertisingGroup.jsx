import { ADVERTISING_MODES_LABELS } from "../../constants/constants";
import { faEdit, faTrashAlt, faPlus, faVideo, faFilm, faTable, faPhotoVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { addItems, deleteModule, selectAdvertisingItemsByModule, setItems } from "./advertisingSlice";
import { AdvertisingGroupItem } from "./AdvertisingGroupItem";
import { filePathTransformer } from "../../lib/utils";
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import update from 'immutability-helper';
import { useRef } from "react";
import smalltalk from 'smalltalk';


export function AdvertisingGroup({ group, addFiles }) {

    const items = useSelector(selectAdvertisingItemsByModule(group.id));

    const dispatch = useDispatch();

    const fileInputRef = useRef(null);

    const moveCard = useCallback((dragIndex, hoverIndex) => {
        const dragCard = items[dragIndex];

        dispatch(
            setItems({
                moduleId: group.id,
                items: update(items, {
                    $splice: [
                        [dragIndex, 1],
                        [hoverIndex, 0, dragCard],
                    ],
                }).map((item, index) => ({
                    ...item,
                    index: index
                }))
            })
        );
    }, [items]);

    const handleAddYoutube = async () => {
        const src = await smalltalk.prompt('Add Youtube', 'Provide Youtube link');
        const name = await smalltalk.prompt('Add Youtube', 'Provide Name');

        dispatch(
            addItems({
                items: [{ name, type: 'youtube', src }],
                moduleId: group.id
            })
        );
    }

    const handleAddStats = () => {
        dispatch(
            addItems({
                items: [{ name: 'Statistik', type: 'stats', src: '' }],
                moduleId: group.id
            })
        );
    }

    return (
        <div className="card mb-2 advertising-group">
            <input type="file" onChange={(e) => addFiles(e, group.id)} style={{display: 'none'}} ref={fileInputRef} accept="image/*,video/*" multiple />
            <div className="card-header">
                <p className="card-header-title is-size-6 has-text-centered">{group.name}</p>

                <div className="tag is-primary m-2">{ADVERTISING_MODES_LABELS[group.type]}</div>

                <span className="icon is-small m-3">
                    <FontAwesomeIcon icon={faPhotoVideo} style={{ cursor: 'pointer' }} title="Local media" onClick={() => fileInputRef.current.click()} />
                </span>
                <span className="icon is-small m-3">
                    <FontAwesomeIcon icon={faVideo} style={{ cursor: 'pointer' }} title="Youtube" onClick={handleAddYoutube} />
                </span>
                <span className="icon is-small m-3">
                    <FontAwesomeIcon icon={faTable} style={{ cursor: 'pointer' }} title="Stats" onClick={handleAddStats} />
                </span>
                <span className="icon is-small m-3">
                    <FontAwesomeIcon icon={faTrashAlt} style={{ cursor: 'pointer' }} onClick={() => { if (window.confirm('Delete module?')) { dispatch(deleteModule(group.id)); }}}  />
                </span>
            </div>
            <div className="card-content">
                <div className="items">


                {
                    items.map((item, index) => (
                        <AdvertisingGroupItem item={item} index={index} key={item.id} id={item.id} moveCard={moveCard} module={group.id} />
                    ))
                }
                </div>


            </div>
        </div>
    )
}