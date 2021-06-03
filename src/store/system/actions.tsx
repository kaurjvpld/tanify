import {
    SystemActionTypes,
    SET_MODE,
    SET_TIME_OF_DAY,
    SET_TEMPERATURE,
    SET_UV,
    Mode,
    Coordinates,
    SET_COORDINATES,
    Location,
    SET_LOCATION,
    SET_TIME_OF_MEASURE,
    SET_APP_STATE,
    SET_DATA_LOADING,
    SET_LOCATION_SERVICES_ON,
    SET_NETWORK_CONNECTION,
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

export const setUv: (uv: number) => SystemActionTypes = (uv) => {
    console.log('new UV index: ' + uv);

    return {
        type: SET_UV,
        payload: uv,
    };
};

export const setTimeOfMeasure: (timeOfMeasure: string) => SystemActionTypes = (
    timeOfMeasure,
) => {
    console.log('new time of measure: ' + timeOfMeasure);

    return {
        type: SET_TIME_OF_MEASURE,
        payload: timeOfMeasure,
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

export const setAppState: (appState: string) => SystemActionTypes = (
    appState,
) => {
    console.log(`app state changed to '${appState}'`);
    return {
        type: SET_APP_STATE,
        payload: appState,
    };
};

export const setDataLoading: (dataLoading: boolean) => SystemActionTypes = (
    dataLoading,
) => {
    return {
        type: SET_DATA_LOADING,
        payload: dataLoading,
    };
};

export const SetLocationServicesOn: (
    locationServiceOn: boolean,
) => SystemActionTypes = (locationServiceOn) => {
    return {
        type: SET_LOCATION_SERVICES_ON,
        payload: locationServiceOn,
    };
};

export const setNetworkConnection: (
    networkConnection: boolean,
) => SystemActionTypes = (networkConnection) => {
    return {
        type: SET_NETWORK_CONNECTION,
        payload: networkConnection,
    };
};
