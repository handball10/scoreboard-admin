import { ADVERTISING_MODES_LABELS } from "../../constants/constants";
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { deleteModule, selectAdvertisingItemsByModule } from "./advertisingSlice";
import { AdvertisingGroupItem } from "./AdvertisingGroupItem";
import { filePathTransformer } from "../../lib/utils";
import { useDispatch } from "react-redux";
import { useCallback } from "react";


export function AdvertisingGroup({ group }) {

    const items = useSelector(selectAdvertisingItemsByModule(group.id));

    const dispatch = useDispatch();

    console.log(items);

    const moveCard = useCallback((dragIndex, hoverIndex) => {
        const dragCard = items[dragIndex];
        // setCards(update(items, {
        //     $splice: [
        //         [dragIndex, 1],
        //         [hoverIndex, 0, dragCard],
        //     ],
        // }));
    }, [items]);

    return (
        <div className="card mb-2 advertising-group">
            <div className="card-header">
                <p className="card-header-title is-size-6 has-text-centered">{group.name}</p>

                <div className="tag is-primary m-2">{ADVERTISING_MODES_LABELS[group.type]}</div>
                {/* <span className="icon is-small m-3">
                    <FontAwesomeIcon icon={faEdit}  />
                </span> */}
                <span className="icon is-small m-3">
                    <FontAwesomeIcon icon={faTrashAlt} style={{ cursor: 'pointer' }} onClick={() => { if (window.confirm('Delete module?')) { dispatch(deleteModule(group.id)); }}}  />
                </span>
            </div>
            <div className="card-content">
                <div className="items">


                {
                    items.map((item, index) => (
                        <AdvertisingGroupItem item={item} index={index} key={item.id} id={item.id} moveCard={moveCard} />
                    ))
                }
                </div>


            </div>
        </div>
    )
}