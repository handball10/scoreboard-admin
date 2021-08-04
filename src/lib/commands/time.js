import AbstractCommand from "./abstractCommand";
import { store } from '../../app/store';

import {
    isTimeStartModifier,
    isTimeStopModifier,
    isTimeSetModifier,
    parseInputByRegex
} from '../commandLineHelper';

import {
    setTime,
    start,
    stop
} from '../../features/time/timeSlice';
import { LOG_TYPES } from "../../constants/constants";
import { parseTimeFromString } from "../utils";

export default class TimeCommand extends AbstractCommand {

    static command = 't';

    parserRegex = /(?<command>\W?[spt])(?<time>\W?([0-9]{2}\:[0-9]{2}))?/;

    constructor() {
        super();
    }

    process(fragments) {

        const { command, time } = parseInputByRegex(this.parserRegex, fragments);

        if (isTimeStartModifier(command)) {
            store.dispatch(start());
            this.log({
                message: 'Time started!'
            });
            return;
        }

        if (isTimeStopModifier(command)) {
            store.dispatch(stop());
            this.log({
                message: 'Time stopped!'
            });
            return;
        }

        if (isTimeSetModifier(command)) {

            store.dispatch(setTime(
                parseTimeFromString(time)
            ))
            return;
        }

        this.log({
            message: 'Invalid time modifier!',
            type: LOG_TYPES.ERROR
        });
    }

    static register() {
        return {
            handler: TimeCommand,
            command: TimeCommand.command
        }
    }

}