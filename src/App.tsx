import React, { useEffect } from 'react';
import { PermissionsAndroid, Platform, Alert } from 'react-native';
import { getWeatherData } from './services/weatherService';
import { useDispatch, useSelector } from 'react-redux';
import {
    setTemperature,
    setTimeOfDay,
    setMode,
    setCoordinates,
} from './store/system/actions';
import { getTimeOfDay, getMode } from './util/systemStateUtil';
import { TimeOfDay, Mode, Coordinates, Location } from './store/system/types';
import { getUserCoordinates } from './util/mapUtil';
import { configuration } from '../config';
import { setLocation } from './store/system/actions';
import SplashScreen from 'react-native-splash-screen';
import SunScreen from './screens/sunScreen';
import axios from 'axios';

declare const global: { HermesInternal: null | {} };

const App = () => {
    const dispatch = useDispatch();
    const coordinates: Coordinates = useSelector(
        (state) => state.system.coordinates,
    );

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
                    SplashScreen.hide();
                });
                setNewMode(getMode(data?.uvIndex));
            })
            .catch((error) => {
                Alert.alert(error.message);
            });
    }, [dispatch]);

    useEffect(() => {
        const setNewCoordinates = (newCoordinates: Coordinates) =>
            dispatch(setCoordinates(newCoordinates));

        const getInitialRegion = async () => {
            try {
                const userCoordinates = await getUserCoordinates();
                setNewCoordinates(userCoordinates);
            } catch (error) {
                console.log('ERROR: ' + error.message);
            }
        };

        getInitialRegion();
    }, [dispatch]);

    useEffect(() => {
        const setNewLocation = (location: Location) =>
            dispatch(setLocation(location));

        if (coordinates) {
            axios
                .get('https://revgeocode.search.hereapi.com/v1/revgeocode', {
                    params: {
                        apiKey: configuration.hereApiKey,
                        at: `${coordinates.latitude},${coordinates.longitude}`,
                        lang: 'en',
                    },
                })
                .then((geocode) => {
                    const newLocation: Location = {
                        city: geocode?.data?.items[0]?.address?.city,
                        country: geocode?.data?.items[0]?.address?.countryName,
                    };

                    setNewLocation(newLocation);
                })
                .catch((error) => {
                    console.log('ERROR: ' + error.response.data.title);
                });
        }
    }, [coordinates, dispatch]);

    return <SunScreen />;
};

export default App;
