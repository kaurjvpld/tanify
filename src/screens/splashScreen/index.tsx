import React from 'react';
import { StyleSheet, ImageBackground, StatusBar } from 'react-native';
import { Splash } from '../../assets/index';

const SplashScreen = () => {
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
