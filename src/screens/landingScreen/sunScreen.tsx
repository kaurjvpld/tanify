import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getWeatherData, WeatherData } from '../../services/weatherService';

const SunScreen = () => {
    const [weatherData, setWeatherData] = useState<WeatherData>(undefined);

    useEffect(() => {
        getWeatherData()
            .then((data) => {
                setWeatherData(data);
            })
            .catch((error) => {
                console.log(error);
            });
    });

    return (
        <>
            <View style={styles.container}>
                <Text>{weatherData?.uvIndex}</Text>
                <Text>{weatherData?.temperature}</Text>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
});

export default SunScreen;
