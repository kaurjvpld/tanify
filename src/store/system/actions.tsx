import { Mode } from './types';
import {
    SystemActionTypes,
    SET_MODE,
    SET_TIME_OF_DAY,
    SET_TEMPERATURE,
} from './types';

export const setMode: (mode: Mode) => SystemActionTypes = (mode) => {
    console.log('new mode: ' + mode);

    return {
        type: SET_MODE,
        payload: mode,
    };
};

export const setTemperature: (temperature: string) => SystemActionTypes = (
    temperature,
) => {
    console.log('new temperature: ' + temperature);

    return {
        type: SET_TEMPERATURE,
        payload: temperature,
    };
};

export const setTimeOfDay: (timeOfDay: TimeOfDay) => SystemActionTypes = (
    timeOfDay,
) => {
    console.log('new time of day: ' + timeOfDay);

    return {
        type: SET_TIME_OF_DAY,
        payload: timeOfDay,
    };
};
