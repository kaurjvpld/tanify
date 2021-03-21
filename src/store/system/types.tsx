import { Action } from 'redux';

export const SET_MODE: string = 'SET_MODE';
export const SET_TEMPERATURE: string = 'SET_TEMPERATURE';
export const SET_TIME_OF_DAY: string = 'SET_TIME_OF_DAY';
export const SET_COORDINATES: string = 'SET_COORDINATES';
export const SET_LOCATION: string = 'SET_LOCATION';

export interface SystemState {
    mode: Mode | undefined;
    temperature: number | undefined;
    timeOfDay: TimeOfDay | undefined;
    coordinates: Coordinates;
    location: Location;
}

export interface SetModeAction extends Action<typeof SET_MODE> {
    payload: Mode;
}

export interface SetTemperatureAction extends Action<typeof SET_TEMPERATURE> {
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

export type SystemActionTypes =
    | SetModeAction
    | SetTemperatureAction
    | SetTimeOfDayAction
    | SetCoordinatesAction
    | SetLocaationAction;

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
