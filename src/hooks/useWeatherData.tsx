import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTimeOfMeasure, setDataLoading } from '../store/system/actions';
import { Alert } from 'react-native';
import { getWeatherData } from '../services/weatherService';
import { getTimeOfDay, getMode } from '../util/systemStateUtil';
import {
    setTemperature,
    setTimeOfDay,
    setMode,
    setUv,
} from '../store/system/actions';

const useWeatherData = () => {
    const dispatch = useDispatch();
    const coordinates: Coordinates = useSelector(
        (state) => state.system.coordinates,
    );
    const timeOfMeasure: string = useSelector(
        (state) => state.system.timeOfMeasure,
    );
    const uv: number = useSelector((state) => state.system.uv);

    useEffect(() => {
        const setNewTemperature = (temperature: string) =>
            dispatch(setTemperature(temperature));
        const setNewUv = (newUv: number) => dispatch(setUv(newUv));
        const setNewTimeOfMeasure = (newTimeOfMeasure: number) =>
            dispatch(setTimeOfMeasure(newTimeOfMeasure));

        if (coordinates) {
            getWeatherData(coordinates)
                .then((data) => {
                    setNewTemperature(data?.temperature);
                    setNewUv(Math.round(data?.uvIndex));
                    setNewTimeOfMeasure(data?.timeOfMeasure);
                })
                .catch((error) => {
                    Alert.alert(error.message);
                });
        }
    }, [dispatch, coordinates]);

    useEffect(() => {
        const setNewTimeOfDay = (timeOfDay: TimeOfDay) =>
            dispatch(setTimeOfDay(timeOfDay));
        const setNewDataLoading = (dataLoading: boolean) =>
            dispatch(setDataLoading(dataLoading));

        if (timeOfMeasure && coordinates) {
            getTimeOfDay(timeOfMeasure, coordinates).then((timeOfDay) => {
                setNewTimeOfDay(timeOfDay);
                setNewDataLoading(false);
            });
        }
    }, [dispatch, coordinates, timeOfMeasure]);

    useEffect(() => {
        const setNewMode = (mode: Mode) => dispatch(setMode(mode));

        if (uv) {
            const mode = getMode(uv);
            setNewMode(mode);
        }
    }, [dispatch, uv]);
};

export default useWeatherData;
