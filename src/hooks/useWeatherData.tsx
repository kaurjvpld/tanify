import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTimeOfMeasure } from '../store/system/actions';
import { Alert } from 'react-native';
import { getWeatherData } from '../services/weatherService';
import { getTimeOfDay, getMode } from '../util/systemStateUtil';
import { useNavigation } from '@react-navigation/native';
import {
    setTemperature,
    setTimeOfDay,
    setMode,
    setUv,
} from '../store/system/actions';

const useWeatherData = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
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

        if (timeOfMeasure && coordinates) {
            getTimeOfDay(timeOfMeasure, coordinates).then((timeOfDay) => {
                setNewTimeOfDay(timeOfDay);
                // navigation.replace('SunScreen');
            });
        }
    }, [dispatch, coordinates, timeOfMeasure, navigation]);

    useEffect(() => {
        const setNewMode = (mode: Mode) => dispatch(setMode(mode));

        if (uv) {
            const mode = getMode(uv);
            setNewMode(mode);
        }
    }, [dispatch, uv]);
};

export default useWeatherData;
