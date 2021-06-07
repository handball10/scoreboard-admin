export const TEAM_HOME = 'home';
export const TEAM_AWAY = 'away';

export const ACTIONS = {
    HEARTBEAT: 'heartbeat',
    GAME_EVENT: 'gameEvent',
    PARTIAL_EVENT: 'partial'
};

export const LOG_TYPES = {
    ERROR: 'error',
    SUCCESS: 'success',
    INFO: 'info'
};

export const LOG_COLORS = {
    [ LOG_TYPES.INFO ]: '#3298dc',
    [ LOG_TYPES.SUCCESS ]: '#2ecc71',
    [ LOG_TYPES.ERROR ]: '#e74c3c'
}

export const NOTIFICATION_TYPES = {
    PENALTY: 'penalty',
    GOAL: 'goal',
    YELLOW_CARD: 'yellowcard',
    RED_CARD: 'redcard',
    BLUE_CARD: 'bluecard'
};

export const PLAYER_PROPERTIES = {
    GOAL: 'goals',
    WARNING: 'warning',
    PENALTY: 'timePenalty',
    DISQUALIFICATION: 'disqualification'
};