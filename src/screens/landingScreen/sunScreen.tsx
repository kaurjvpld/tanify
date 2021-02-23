import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, ScrollView, View } from 'react-native';
import { getWeatherData, WeatherData } from '../../services/weatherService';
import { TanifyLogo } from '../../assets';
import { Zero } from '../../assets/index';
import CircleView from '../../components/CircleView';

const SunScreen = () => {
    const [weatherData, setWeatherData] = useState<WeatherData>({
        uvIndex: 0,
        temperature: -5,
    });

    useEffect(() => {
        getWeatherData()
            .then((data) => {
                setWeatherData(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.contentContainer}>
            <TanifyLogo.default />
            <Text style={styles.temp}>{weatherData?.temperature}°C</Text>
            <Zero.default style={styles.uv} />
            <Text style={styles.slogan}>'Nothing interesting happens'</Text>
            <CircleView
                diameter={100}
                color={'#00cc7e'}
                style={styles.keyWordContainer}>
                <Text style={styles.keyWord}>SAFE</Text>
            </CircleView>
            <View style={styles.locationContainer}>
                <Text style={styles.location}>Tallinn, Estonia</Text>
            </View>
            <CircleView
                diameter={180}
                color={'#00cc7e'}
                style={styles.uvStickerContainerStyle}>
                <Text style={styles.uvStickerStyle}>UV 0</Text>
            </CircleView>
            <View style={styles.uvInfoBoxContainerStyle}>
                <Text style={styles.uvInfoBoxStyle}>SAFE</Text>
            </View>
            <Text style={styles.uvInfo}>
                The sun's not interested in giving you a tan. We know it's hard,
                but just go out and do something else that's not tanning. Go on
                a date? Sudoku? It's up to you.
            </Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        backgroundColor: '#2b2b2b',
    },
    contentContainer: {
        alignItems: 'center',
        paddingTop: 50,
    },
    temp: {
        color: '#FFFFFF',
        fontSize: 25,
        fontWeight: 'bold',
        alignSelf: 'flex-end',
        marginRight: 57,
        marginTop: -25,
    },
    uv: {
        marginTop: 45,
    },
    slogan: {
        color: 'white',
        fontStyle: 'italic',
        marginTop: 25,
        fontSize: 20,
        fontWeight: 'bold',
    },
    keyWord: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    keyWordContainer: {
        marginTop: 15,
    },
    locationContainer: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 8,
        marginTop: 20,
    },
    location: {
        fontWeight: 'bold',
    },
    uvStickerContainerStyle: {
        marginTop: 180,
    },
    uvStickerStyle: {
        fontWeight: 'bold',
        fontSize: 45,
        color: 'white',
    },
    uvInfoBoxContainerStyle: {
        backgroundColor: 'white',
        paddingVertical: 4,
        paddingHorizontal: 30,
        marginTop: 50,
    },
    uvInfoBoxStyle: {
        fontWeight: 'bold',
        fontSize: 23,
    },
    uvInfo: {
        color: 'white',
        paddingHorizontal: 40,
        marginTop: 50,
        fontSize: 23,
        marginBottom: 180,
    },
});

export default SunScreen;
