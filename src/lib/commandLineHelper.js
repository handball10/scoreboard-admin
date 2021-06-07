import { TEAM_AWAY, TEAM_HOME } from "../constants/constants";

const QUANTITY_MODIFIER_DECREASE = '-';
const QUANTITY_MODIFIER_INCREASE = '+';
const TEAM_MODIFIER_HOME = 'h';
const TEAM_MODIFIER_AWAY = 'g';
const TIME_START_MODIFIER = 's';
const TIME_STOP_MODIFIER = 'p';

const TEAM_MODIFIER_MAP = {
    [ TEAM_MODIFIER_HOME ]: TEAM_HOME,
    [ TEAM_MODIFIER_AWAY ]: TEAM_AWAY
};

export const parseInputByRegex = (regex, input) => {

    const regexResult = regex.exec(input);

    if (regexResult === null) {
        return {};
    }

    return Object.entries(regex.exec(input).groups).reduce((acc, [ key, value ]) => {
        return {
            ...acc,
            [ key ]: value
        }
    }, {});
}

const modifierTestFactory = (items = []) => input => items.includes(input);


export const isQuantityModifier = modifierTestFactory([QUANTITY_MODIFIER_DECREASE, QUANTITY_MODIFIER_INCREASE]);
export const isIncreaseModifier = input => input === QUANTITY_MODIFIER_INCREASE;
export const isDecreaseModifier = input => input === QUANTITY_MODIFIER_DECREASE;

export const isTeamModifier = modifierTestFactory([ TEAM_MODIFIER_HOME, TEAM_MODIFIER_AWAY ]);
export const isTeamModifierHome = input => input === TEAM_MODIFIER_HOME;
export const isTeamModifierAway = input => input === TEAM_MODIFIER_AWAY;
export const getTeamByModifier = input => TEAM_MODIFIER_MAP[input];

export const isNumberValue = input => input && !isNaN(input);
export const getNumberValue = input => parseInt(input);

export const isTimeStartModifier = input => input === TIME_START_MODIFIER;
export const isTimeStopModifier = input => input === TIME_STOP_MODIFIER;

// just check length as regex filters characters
export const isOfficialPrefix = input => input && input.length === 1;

