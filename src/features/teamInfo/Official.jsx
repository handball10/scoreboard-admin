import { NumberInput } from '../../components/numberInput/NumberInput';

import './official.scss';

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

export function Official({ official, team }) {

    return (
        <tr className="official">
            <td>{official.number}</td>
            <td>{official.firstName} {official.lastName}</td>
            <td>
                {'-'}
            </td>
            <td>
                <NumberInput
                    max={1}
                    min={0}
                    value={official.warning}
                    increase={() => {
                        const notificationInfo = selectPersonInfoByNumber(team, official.number)(store.getState());

                        store.dispatch(
                            changePlayerProperty({
                                team,
                                person: official.number,
                                key: PLAYER_PROPERTIES.WARNING,
                                value: 1
                            })
                        );

                        store.dispatch(
                            createNotification(
                                createWarningNotification({
                                    team: notificationInfo.team,
                                    player: official
                                })
                            )
                        );
                        
                    }}
                    decrease={() => {
                        store.dispatch(
                            changePlayerProperty({
                                team,
                                person: official.number,
                                key: PLAYER_PROPERTIES.WARNING,
                                value: 0
                            })
                        );
                    }}
                />
            </td>
            <td>
                <NumberInput
                    max={2}
                    min={0}
                    value={official.timePenalty}
                    increase={() => {

                        const notificationInfo = selectPersonInfoByNumber(team, official.number)(store.getState());

                        store.dispatch(
                            changePlayerProperty({
                                team,
                                person: official.number,
                                key: PLAYER_PROPERTIES.PENALTY,
                                value: official.timePenalty + 1
                            })
                        );

                        store.dispatch(
                            addPenalty(team)
                        );

                        store.dispatch(
                            createNotification(
                                createPenaltyNotification({
                                    team: notificationInfo.team,
                                    player: official,
                                    quantity: official.timePenalty + 1
                                })
                            )
                        );


                    }}
                    decrease={() => {
                        store.dispatch(
                            changePlayerProperty({
                                team,
                                person: official.number,
                                key: PLAYER_PROPERTIES.PENALTY,
                                value: official.timePenalty - 1
                            })
                        );
                    }}
                />
            </td>
            <td>
                <NumberInput
                    max={1}
                    min={0}
                    value={official.disqualification}
                    increase={() => {
                        const notificationInfo = selectPersonInfoByNumber(team, official.number)(store.getState());

                        store.dispatch(
                            changePlayerProperty({
                                team,
                                person: official.number,
                                key: PLAYER_PROPERTIES.DISQUALIFICATION,
                                value: 1
                            })
                        );

                        store.dispatch(
                            createNotification(
                                createRedCardNotification({
                                    team: notificationInfo.team,
                                    player: official
                                })
                            )
                        );
                        
                    }}
                    decrease={() => {
                        store.dispatch(
                            changePlayerProperty({
                                team,
                                person: official.number,
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