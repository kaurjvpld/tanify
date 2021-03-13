import { Action } from 'redux';

export const SET_MODE: string = 'SET_MODE';
export const SET_TEMPERATURE: string = 'SET_TEMPERATURE';
export const SET_TIME_OF_DAY: string = 'SET_TIME_OF_DAY';

export interface SystemState {
    mode: string | undefined;
    temperature: number | undefined;
    timeOfDay: string | undefined;
}

export interface SetModeAction extends Action<typeof SET_MODE> {
    payload: string;
}

export interface SetTemperatureAction extends Action<typeof SET_TEMPERATURE> {
    payload: string;
}

export interface SetTimeOfDayAction extends Action<typeof SET_TIME_OF_DAY> {
    payload: string;
}

export type SystemActionTypes =
    | SetModeAction
    | SetTemperatureAction
    | SetTimeOfDayAction;
