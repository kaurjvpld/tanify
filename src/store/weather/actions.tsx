import {
    SystemActionTypes,
    SET_MODE,
    SET_TIME_OF_DAY,
    SET_TEMPERATURE,
} from './types';

export const setMode: (mode: string) => SystemActionTypes = (mode) => {
    return {
        type: SET_MODE,
        payload: mode,
    };
};

export const setTemperature: (temperature: string) => SystemActionTypes = (
    temperature,
) => {
    return {
        type: SET_TEMPERATURE,
        payload: temperature,
    };
};

export const setTimeOfDay: (timeOfDay: string) => SystemActionTypes = (
    timeOfDay,
) => {
    return {
        type: SET_TIME_OF_DAY,
        payload: timeOfDay,
    };
};
