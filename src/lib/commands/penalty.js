import {
    getTeamByModifier,
    isIncreaseModifier,
    isQuantityModifier,
    isTeamModifier,
    parseInputByRegex,
    isNumberValue
} from '../commandLineHelper';

import AbstractCommand from './abstractCommand';
import { store } from '../../app/store';

import {
    increase,
    decrease,
} from '../../features/p/goalSlice';

import { LOG_TYPES } from '../../constants/constants';

export default class GoalsCommand extends AbstractCommand {

    static command = 'g';

    parserRegex = /(?<team>\W?[hg])?(?<number>\W?[0-9]+)?(?<modifier>\W?[\-\+])?/;

    constructor() {
        super();
    }

    process(fragments) {

        const parsedInput = parseInputByRegex(this.parserRegex, fragments);

        if (!isTeamModifier(parsedInput.team)) {
            this.log({
                message: 'Invalid team!',
                type: LOG_TYPES.ERROR
            });

            return;
        }

        const quantifierFunction = (
            typeof parsedInput.modifier === 'undefined' || isIncreaseModifier(parsedInput.modifier)
        ) 
            ? increase 
            : decrease;

        const quantifierVerb = (
            typeof parsedInput.modifier === 'undefined' || isIncreaseModifier(parsedInput.modifier)
        ) 
            ? 'Added' 
            : 'Removed';

        store.dispatch(
            quantifierFunction(getTeamByModifier(parsedInput.team))
        );

        this.log({
            message: `${quantifierVerb} goal for team ${getTeamByModifier(parsedInput.team)}`
        });

        if (isNumberValue(parsedInput.number)) {
            // create notification
            this.log({
                message: `Added notification for player`
            });
        }
    }

    static register() {
        return {
            handler: GoalsCommand,
            command: GoalsCommand.command
        }
    }
}