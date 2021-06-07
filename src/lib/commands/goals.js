import {
    getTeamByModifier,
    isIncreaseModifier,
    isQuantityModifier,
    isTeamModifier,
    parseInputByRegex,
    isNumberValue,
    isOfficialPrefix
} from '../commandLineHelper';
import AbstractCommand from './abstractCommand';
import { store } from '../../app/store';

import {
    increase,
    decrease,
} from '../../features/goal/goalSlice';

import {
    selectPersonInfoByNumber,
    changePlayerProperty
} from '../../features/teamInfo/teamInfoSlice';

import {
    createNotification
} from '../../features/gameEvent/gameEventSlice';

import { LOG_TYPES, PLAYER_PROPERTIES } from '../../constants/constants';
import { parse } from 'uuid';
import { createGoalNotification } from '../helper/notificationFactory';

export default class GoalsCommand extends AbstractCommand {

    static command = 'g';

    parserRegex = /(?<team>\W?[hg])?(?<number>\W?[0-9a-d]+)?(?<modifier>\W?[\-\+])?/;

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

        if (isNumberValue(parsedInput.number) || isOfficialPrefix(parsedInput.number)) {
            console.log(store.getState());
            const notificationInfo = selectPersonInfoByNumber(getTeamByModifier(parsedInput.team), parsedInput.number)(store.getState());

            if (!notificationInfo.player) {
                this.log({
                    type: LOG_TYPES.ERROR,
                    message: `Player with number ${parsedInput.number} has not been found!`
                });

                return;
            }

            store.dispatch(
                createNotification(
                    createGoalNotification({
                        team: notificationInfo.team,
                        player: notificationInfo.player,
                        quantity: notificationInfo.player.goals + 1
                    })
                )
            );

            store.dispatch(
                changePlayerProperty({
                    team: getTeamByModifier(parsedInput.team),
                    person: parsedInput.number,
                    key: PLAYER_PROPERTIES.GOAL,
                    value: notificationInfo.player.goals + 1
                })
            );

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