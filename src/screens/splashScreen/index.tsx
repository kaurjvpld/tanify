import React from 'react';
import { StyleSheet, ImageBackground, StatusBar } from 'react-native';
import { Splash } from '../../assets/index';
import useAppState from '../../hooks/useAppState';
import useWeatherData from '../../hooks/useWeatherData';
import useLocation from '../../hooks/useLocation';
import useCoordinates from '../../hooks/useCoordinates';

const SplashScreen = () => {
    useCoordinates();
    useLocation();
    useWeatherData();
    useAppState();

    return (
        <>
            <StatusBar backgroundColor={'#3d8bdd'} />
            <ImageBackground source={Splash} style={styles.container} />
        </>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
    },
});
