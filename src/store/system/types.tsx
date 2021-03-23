import { Action } from 'redux';

export const SET_MODE: string = 'SET_MODE';
export const SET_TEMPERATURE: string = 'SET_TEMPERATURE';
export const SET_TIME_OF_DAY: string = 'SET_TIME_OF_DAY';
export const SET_COORDINATES: string = 'SET_COORDINATES';
export const SET_LOCATION: string = 'SET_LOCATION';
export const SET_UV: string = 'SET_UV';
export const SET_TIME_OF_MEASURE: string = 'SET_TIME_OF_MEASURE';
export const SET_APP_STATE: string = 'SET_APP_STATE';

export interface SystemState {
    mode: Mode | undefined;
    temperature: number | undefined;
    uv: number | undefined;
    timeOfMeasure: string | undefined;
    timeOfDay: TimeOfDay | undefined;
    coordinates: Coordinates;
    location: Location;
    appState: string;
}

export interface SetModeAction extends Action<typeof SET_MODE> {
    payload: Mode;
}

export interface SetTemperatureAction extends Action<typeof SET_TEMPERATURE> {
    payload: number;
}

export interface SetUvAction extends Action<typeof SET_UV> {
    payload: number;
}

export interface SetTimeOfMeasureAction
    extends Action<typeof SET_TIME_OF_MEASURE> {
    payload: string;
}

export interface SetTimeOfDayAction extends Action<typeof SET_TIME_OF_DAY> {
    payload: TimeOfDay;
}

export interface SetCoordinatesAction extends Action<typeof SET_COORDINATES> {
    payload: Coordinates;
}

export interface SetLocationAction extends Action<typeof SET_LOCATION> {
    payload: Location;
}

export interface SetAppStateAction extends Action<typeof SET_APP_STATE> {
    payload: string;
}

export type SystemActionTypes =
    | SetModeAction
    | SetTemperatureAction
    | SetUvAction
    | SetTimeOfMeasureAction
    | SetTimeOfDayAction
    | SetCoordinatesAction
    | SetLocationAction
    | SetAppStateAction;

export enum TimeOfDay {
    Sunrise,
    Sunset,
    Day,
    Night,
    Cloudy,
}

export enum Mode {
    Safe = 'safe',
    Easy = 'easy',
    Medium = 'medium',
    Hard = 'hard',
    Extreme = 'extreme',
}

export interface Coordinates {
    latitude: string;
    longitude: string;
}

export interface Location {
    city: string;
    country: string;
}
