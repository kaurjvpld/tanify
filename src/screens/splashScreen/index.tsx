import React from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
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

    return <ImageBackground source={Splash} style={styles.container} />;
};

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
    },
});
