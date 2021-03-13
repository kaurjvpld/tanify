import React, { useEffect } from 'react';
import { PermissionsAndroid, Platform, Alert } from 'react-native';
import { getWeatherData } from './services/weatherService';
import { useDispatch } from 'react-redux';
import { setTemperature, setTimeOfDay, setMode } from './store/system/actions';
import { getTimeOfDay, getMode } from './util/systemStateUtil';
import { TimeOfDay, Mode } from './store/system/types';
import SunScreen from './screens/sunScreen';

declare const global: { HermesInternal: null | {} };

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            if (Platform.OS === 'android') {
                await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                );
            }
        })();
    }, []);

    useEffect(() => {
        const setNewTemperature = (temperature: string) =>
            dispatch(setTemperature(temperature));
        const setNewTimeOfDay = (timeOfDay: TimeOfDay) =>
            dispatch(setTimeOfDay(timeOfDay));
        const setNewMode = (mode: Mode) => dispatch(setMode(mode));

        getWeatherData()
            .then((data) => {
                setNewTemperature(data?.temperature);
                getTimeOfDay(data?.timeOfMeasure).then((timeOfDay) => {
                    setNewTimeOfDay(timeOfDay);
                });
                setNewMode(getMode(data?.uvIndex));
            })
            .catch((error) => {
                Alert.alert(error.message);
            });
    }, [dispatch]);

    return (
        <>
            <SunScreen />
        </>
    );
};

export default App;
