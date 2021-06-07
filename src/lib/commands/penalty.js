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

import { LOG_TYPES, PLAYER_PROPERTIES } from '../../constants/constants';
import { createPenaltyNotification } from '../helper/notificationFactory';
import { changePlayerProperty, selectPersonInfoByNumber } from '../../features/teamInfo/teamInfoSlice';
import { addPenalty } from '../../features/penalties/penaltySlice';
import { createNotification } from '../../features/gameEvent/gameEventSlice';

export default class PenaltyCommand extends AbstractCommand {

    static command = 'p';

    parserRegex = /(?<team>\W?[hg])?(?<number>\W?[0-9a-d]+)?/;

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

        store.dispatch(addPenalty(getTeamByModifier(parsedInput.team)));

        this.log({
            message: `Added time penalty for team ${getTeamByModifier(parsedInput.team)}`
        });

        if (isNumberValue(parsedInput.number) || isOfficialPrefix(parsedInput.number)) {
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
                    createPenaltyNotification({
                        team: notificationInfo.team,
                        player: notificationInfo.player,
                        quantity: notificationInfo.player.timePenalty + 1
                    })
                )
            );

            store.dispatch(
                changePlayerProperty({
                    team: getTeamByModifier(parsedInput.team),
                    person: parsedInput.number,
                    key: PLAYER_PROPERTIES.PENALTY,
                    value: notificationInfo.player.timePenalty + 1
                })
            );

            // create notification
            this.log({
                message: `Added notification for player ${parsedInput.number}!`
            });
        }
    }

    static register() {
        return {
            handler: PenaltyCommand,
            command: PenaltyCommand.command
        }
    }
}