export const TEAM_HOME = 'home';
export const TEAM_AWAY = 'away';

export const TEAM_LABELS = {
    [TEAM_HOME]: 'Home',
    [TEAM_AWAY]: 'Guest'
}

export const ACTIONS = {
    HEARTBEAT: 'heartbeat',
    GAME_EVENT: 'gameEvent',
    PARTIAL_EVENT: 'partial',
    ADVERTISING: 'advertising',
    PING: 'ping',
    PONG: 'pong'
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
    DISQUALIFICATION: 'disqualification',
    NUMBER: 'number',
    FIRST_NAME: 'firstName',
    LAST_NAME: 'lastName'
};

export const PERSON_TYPES = {
    PLAYER: 'player',
    OFFICIAL: 'official'
};

export const TEAM_INFO_PERSON_MAP = {
    [ PERSON_TYPES.PLAYER ]: 'players',
    [ PERSON_TYPES.OFFICIAL ]: 'officials'
};

export const ADVERTISING_MODES = {
    FULL_SIZE: 'fullSize',
    BOTTOM: 'bottom',
    NONE: 'none'
};

export const ADVERTISING_MODES_LABELS = {
    [ADVERTISING_MODES.FULL_SIZE]: 'Full',
    [ADVERTISING_MODES.BOTTOM]: 'Bottom',
};

export const ADVERTISING_ITEM_TYPES = {
    VIDEO: 'video',
    YOUTUBE: 'youtube',
    IMAGE: 'image',
    STATS: 'stats'
};