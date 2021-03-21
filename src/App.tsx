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
import { TimeOfDay, Mode, Coordinates } from './store/system/types';
import { getUserCoordinates } from './util/mapUtil';
import Geocoder from 'react-native-geocoding';
import SunScreen from './screens/sunScreen';
import { configuration } from '../config';
import axios from 'axios';

declare const global: { HermesInternal: null | {} };

const App = () => {
    const dispatch = useDispatch();
    const location: Coordinates = useSelector((state) => state.system.location);
    Geocoder.init(configuration.googleApiKey);

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
        if (location) {
            axios
                .get('https://revgeocode.search.hereapi.com/v1/revgeocode', {
                    params: {
                        apiKey: configuration.hereApiKey,
                        at: `${location.latitude},${location.longitude}`,
                    },
                })
                .then((geocode) => {
                    // const newCoordinates = {
                    //     geocode?.data?.items[0]?.address
                    // }
                })
                .catch((error) => {
                    console.log('ERROR: ' + error.response.data.title);
                });
            // Geocoder.from(location.latitude, location.longitude)
            //     .then((json) => {
            //         var addressComponent =
            //             json.results[0].address_components[0];
            //         console.log(addressComponent);
            //     })
            //     .catch((error) => console.warn(error));
        }
    }, [location]);

    return <SunScreen />;
};

export default App;
