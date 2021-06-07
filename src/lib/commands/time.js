import AbstractCommand from "./abstractCommand";
import { store } from '../../app/store';

import {
    isTimeStartModifier,
    isTimeStopModifier,
    parseInputByRegex
} from '../commandLineHelper';

import {
    start,
    stop
} from '../../features/time/timeSlice';
import { LOG_TYPES } from "../../constants/constants";

export default class TimeCommand extends AbstractCommand {

    static command = 't';

    parserRegex = /(?<command>\W?[sp])/;

    constructor() {
        super();
    }

    process(fragments) {
        const { command } = parseInputByRegex(this.parserRegex, fragments);

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