import {
    Mode,
    Coordinates,
    SET_COORDINATES,
    Location,
    SET_LOCATION,
} from './types';
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

export const setCoordinates: (coordinates: Coordinates) => SystemActionTypes = (
    coordinates,
) => {
    console.log('new coordinates: ' + JSON.stringify(coordinates, null, 2));

    return {
        type: SET_COORDINATES,
        payload: coordinates,
    };
};

export const setLocation: (location: Location) => SystemActionTypes = (
    location,
) => {
    console.log('new location: ' + JSON.stringify(location, null, 2));

    return {
        type: SET_LOCATION,
        payload: location,
    };
};
