import { NumberInput } from '../../components/numberInput/NumberInput';
import './player.scss';

import { store } from '../../app/store';

import {
    increase as increaseGoal,
    decrease as decreaseGoal,
} from '../../features/goal/goalSlice';

import {
    changePlayerProperty,
    selectPersonInfoByNumber
} from '../../features/teamInfo/teamInfoSlice';

import {
    createNotification
} from '../../features/gameEvent/gameEventSlice';

import {
    createGoalNotification,
    createWarningNotification,
    createRedCardNotification,
    createPenaltyNotification
} from '../../lib/helper/notificationFactory';

import {
    addPenalty,
} from '../../features/penalties/penaltySlice';

import { LOG_TYPES, PLAYER_PROPERTIES } from '../../constants/constants';

export function Player({ player, team }) {

    return (
        <tr className="player">
            <td>{player.number}</td>
            <td>{player.firstName} {player.lastName}</td>
            <td>
                <NumberInput
                    max={100}
                    min={0}
                    value={player.goals}
                    increase={() => {

                        const notificationInfo = selectPersonInfoByNumber(team, player.number)(store.getState());

                        store.dispatch(increaseGoal(team));

                        store.dispatch(
                            createNotification(
                                createGoalNotification({
                                    team: notificationInfo.team,
                                    player: player,
                                    quantity: player.goals + 1
                                })
                            )
                        );
            
                        store.dispatch(
                            changePlayerProperty({
                                team,
                                person: player.number,
                                key: PLAYER_PROPERTIES.GOAL,
                                value: player.goals + 1
                            })
                        );
                    }}
                    decrease={() => {
                        store.dispatch(decreaseGoal(team));

                        store.dispatch(
                            changePlayerProperty({
                                team,
                                person: player.number,
                                key: PLAYER_PROPERTIES.GOAL,
                                value: player.goals - 1
                            })
                        );
                    }}
                />
            </td>
            <td>
                <NumberInput
                    max={1}
                    min={0}
                    value={player.warning}
                    increase={() => {
                        const notificationInfo = selectPersonInfoByNumber(team, player.number)(store.getState());

                        store.dispatch(
                            changePlayerProperty({
                                team,
                                person: player.number,
                                key: PLAYER_PROPERTIES.WARNING,
                                value: 1
                            })
                        );

                        store.dispatch(
                            createNotification(
                                createWarningNotification({
                                    team: notificationInfo.team,
                                    player: player
                                })
                            )
                        );
                        
                    }}
                    decrease={() => {
                        store.dispatch(
                            changePlayerProperty({
                                team,
                                person: player.number,
                                key: PLAYER_PROPERTIES.WARNING,
                                value: 0
                            })
                        );
                    }}
                />
            </td>
            <td>
                <NumberInput
                    max={3}
                    min={0}
                    value={player.timePenalty}
                    increase={() => {

                        const notificationInfo = selectPersonInfoByNumber(team, player.number)(store.getState());

                        store.dispatch(
                            changePlayerProperty({
                                team,
                                person: player.number,
                                key: PLAYER_PROPERTIES.PENALTY,
                                value: player.timePenalty + 1
                            })
                        );

                        store.dispatch(
                            addPenalty(team)
                        );

                        store.dispatch(
                            createNotification(
                                createPenaltyNotification({
                                    team: notificationInfo.team,
                                    player: player,
                                    quantity: player.timePenalty + 1
                                })
                            )
                        );


                    }}
                    decrease={() => {
                        store.dispatch(
                            changePlayerProperty({
                                team,
                                person: player.number,
                                key: PLAYER_PROPERTIES.PENALTY,
                                value: player.timePenalty - 1
                            })
                        );
                    }}
                />
            </td>
            <td>
                <NumberInput
                    max={1}
                    min={0}
                    value={player.disqualification}
                    increase={() => {
                        const notificationInfo = selectPersonInfoByNumber(team, player.number)(store.getState());

                        store.dispatch(
                            changePlayerProperty({
                                team,
                                person: player.number,
                                key: PLAYER_PROPERTIES.DISQUALIFICATION,
                                value: 1
                            })
                        );

                        store.dispatch(
                            createNotification(
                                createRedCardNotification({
                                    team: notificationInfo.team,
                                    player: player
                                })
                            )
                        );
                        
                    }}
                    decrease={() => {
                        store.dispatch(
                            changePlayerProperty({
                                team,
                                person: player.number,
                                key: PLAYER_PROPERTIES.DISQUALIFICATION,
                                value: 0
                            })
                        );
                    }}
                />
            </td>
        </tr>
    )
}