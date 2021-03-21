import {
    SystemState,
    SystemActionTypes,
    SET_MODE,
    SET_TEMPERATURE,
    SET_TIME_OF_DAY,
    SET_LOCATION,
    TimeOfDay,
    Mode,
} from './types';

const initialState: SystemState = {
    mode: Mode.Safe,
    temperature: undefined,
    timeOfDay: TimeOfDay.Cloudy,
    coordinates: undefined,
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
        case SET_LOCATION:
            return {
                ...state,
                coordinates: action.payload,
            };
        default:
            return state;
    }
};

export default systemReducer;
