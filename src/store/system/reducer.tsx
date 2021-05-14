import {
    SystemState,
    SystemActionTypes,
    SET_MODE,
    SET_TEMPERATURE,
    SET_TIME_OF_DAY,
    SET_COORDINATES,
    SET_LOCATION,
    SET_UV,
    SET_DATA_LOADING,
    SET_TIME_OF_MEASURE,
    SET_APP_STATE,
    TimeOfDay,
    Mode,
} from './types';

const initialState: SystemState = {
    mode: Mode.Safe,
    temperature: undefined,
    uv: undefined,
    timeOfMeasure: undefined,
    timeOfDay: TimeOfDay.Cloudy,
    coordinates: undefined,
    location: undefined,
    dataLoading: true,
};

const systemReducer: (
    state: SystemState,
    action: SystemActionTypes,
) => SystemState = (state = initialState, action) => {
    switch (action.type) {
        case SET_MODE:
            return {
                ...state,
                mode: action.payload,
            };
        case SET_TEMPERATURE:
            return {
                ...state,
                temperature: action.payload,
            };
        case SET_TIME_OF_DAY:
            return {
                ...state,
                timeOfDay: action.payload,
            };
        case SET_COORDINATES:
            return {
                ...state,
                coordinates: action.payload,
            };
        case SET_LOCATION:
            return {
                ...state,
                location: action.payload,
            };
        case SET_UV:
            return {
                ...state,
                uv: action.payload,
            };
        case SET_TIME_OF_MEASURE:
            return {
                ...state,
                timeOfMeasure: action.payload,
            };
        case SET_APP_STATE:
            return {
                ...state,
                appState: action.payload,
            };
        case SET_DATA_LOADING:
            return {
                ...state,
                dataLoading: action.payload,
            };
        default:
            return state;
    }
};

export default systemReducer;
