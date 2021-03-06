import {
    NOTIFICATION_TYPES
} from '../../constants/constants';

const formatNumber = number => (
    /^[a-d]$/.test(number) ? `O${number.toString().toUpperCase()}` : number
);

export const createGoalNotification = ({ team, player, quantity }) => ({
    type: NOTIFICATION_TYPES.GOAL,
    team: team.longName,
    player: {
        name: `${player.firstName} ${player.lastName}`,
        number: formatNumber(player.number)
    },
    quantity
});

export const createWarningNotification = ({ team, player }) => ({
    type: NOTIFICATION_TYPES.YELLOW_CARD,
    team: team.longName,
    player: {
        name: `${player.firstName} ${player.lastName}`,
        number: formatNumber(player.number)
    },
    quantity: 1
});

export const createRedCardNotification = ({ team, player }) => ({
    type: NOTIFICATION_TYPES.RED_CARD,
    team: team.longName,
    player: {
        name: `${player.firstName} ${player.lastName}`,
        number: formatNumber(player.number)
    },
    quantity: 1
});

export const createPenaltyNotification = ({ team, player, quantity }) => ({
    type: NOTIFICATION_TYPES.PENALTY,
    team: team.longName,
    player: {
        name: `${player.firstName} ${player.lastName}`,
        number: formatNumber(player.number)
    },
    quantity
});