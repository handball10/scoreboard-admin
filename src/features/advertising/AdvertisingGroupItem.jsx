import { ADVERTISING_ITEM_TYPES } from "../../constants/constants";

import { faTable, faVideo, faFilm, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { useDrag, useDrop } from 'react-dnd';
import { useRef } from 'react';
import { useDispatch } from "react-redux";

import {
    removeItems
} from './advertisingSlice';

const ItemTypes = {
    ITEM: 'item'
};

const styles = {
    cursor: 'move',
    userSelect: 'none'
};

export function AdvertisingGroupItem({ id, item, text, index, moveCard, module }) {

    let advertisingContentItem;
    const ref = useRef(null);

    const dispatch = useDispatch();

    const [{ handlerId }, drop] = useDrop({
        accept: ItemTypes.ITEM,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            // Get vertical middle
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // Determine mouse position
            const clientOffset = monitor.getClientOffset();
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            // Time to actually perform the action
            moveCard(dragIndex, hoverIndex);
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.ITEM,
        item: () => {
            return { id, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));

    switch (item.type) {
        case ADVERTISING_ITEM_TYPES.IMAGE: {
            advertisingContentItem = (<img src={item.src} draggable={false} />); break;
        }
        case ADVERTISING_ITEM_TYPES.STATS: {
            advertisingContentItem = (
                <span className="icon is-large m-3" title="Statistics">
                    <FontAwesomeIcon icon={faTable} size="2x"  />
                </span>
            );
            break;
        }
        case ADVERTISING_ITEM_TYPES.YOUTUBE: {
            advertisingContentItem = (
                <span className="icon is-large m-3" title="Youtube">
                    <FontAwesomeIcon icon={faVideo} size="2x"  />
                </span>
            );
            break;
        }
        case ADVERTISING_ITEM_TYPES.VIDEO: {
            advertisingContentItem = (
                <span className="icon is-large m-3" title="Video">
                    <FontAwesomeIcon icon={faFilm} size="2x"  />
                </span>
            );
            break;
        }
    }

    const classes = classNames({
        'advertising-item': true,
        [`is-${item.type}`]: true
    });

    return (
        <div className={classes} ref={ref} style={{ ...styles, opacity }} data-handler-id={handlerId}>
            {advertisingContentItem}
            <div className="label">
                {item.name}
            </div>
            <div className="remove">
                <FontAwesomeIcon icon={faTrashAlt} style={{ cursor: 'pointer' }} title="Remove" size="xs" onClick={() => dispatch(removeItems({ items: [id], moduleId: module }))}  />
            </div>
        </div>
    )
}