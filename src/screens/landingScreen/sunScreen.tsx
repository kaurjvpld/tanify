import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, SafeAreaView, ScrollView, View } from 'react-native';
import { getWeatherData, WeatherData } from '../../services/weatherService';
import TanifyLogo from '../../assets/tanify.svg';

const SunScreen = () => {
    const [weatherData, setWeatherData] = useState<WeatherData>({
        uvIndex: 0,
        temperature: -5,
    });

    // useEffect(() => {
    //     getWeatherData()
    //         .then((data) => {
    //             setWeatherData(data);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.contentContainer}>
                <TanifyLogo
                    // height={100}
                    // width={'300'}
                    style={{ borderWidth: 3 }}
                />
                <Text>{weatherData?.uvIndex}</Text>
                <Text>{weatherData?.temperature}</Text>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        backgroundColor: '#3d8bdd',
    },
    contentContainer: {
        alignItems: 'center',
    },
});

export default SunScreen;
