import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, ScrollView, View, Image } from 'react-native';
import { getWeatherData, WeatherData } from '../../services/weatherService';
import { TanifyLogo } from '../../assets';
import CircleView from '../../components/circleView';
import UvIndex from '../../components/uvIndex';

const SunScreen = () => {
    const [weatherData, setWeatherData] = useState<WeatherData>({
        uvIndex: 0,
        temperature: undefined,
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
            <View style={styles.tanifyLogoContainer}>
                <Image source={TanifyLogo} style={styles.tanifyLogo} />
            </View>
            <Text style={styles.temp}>
                {weatherData?.temperature >= 0 && '+'}
                {weatherData?.temperature}°C
            </Text>
            <View style={styles.uv}>
                <UvIndex index={weatherData.uvIndex} />
            </View>
            <Text style={styles.slogan}>'Nothing interesting happens'</Text>
            <CircleView
                diameter={100}
                color={'#00cc7e'}
                style={styles.modeContainer}>
                <Text style={styles.mode}>SAFE</Text>
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
    scrollView: {
        backgroundColor: '#2b2b2b',
    },
    contentContainer: {
        alignItems: 'center',
        paddingTop: '10%',
        paddingHorizontal: 20,
    },
    tanifyLogoContainer: {
        height: '10%',
        width: '100%',
    },
    tanifyLogo: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain',
    },
    temp: {
        color: '#FFFFFF',
        fontSize: 25,
        fontFamily: 'EuclidCircularB-Bold',
        alignSelf: 'flex-end',
    },
    uv: {
        marginTop: '8%',
        height: '17%',
        width: '100%',
    },
    slogan: {
        color: 'white',
        marginTop: '6%',
        fontSize: 20,
        fontFamily: 'EuclidCircularB-BoldItalic',
    },
    mode: {
        fontFamily: 'EuclidCircularB-Bold',
        fontSize: 18,
    },
    modeContainer: {
        marginTop: '5%',
    },
    locationContainer: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 8,
        marginTop: '7%',
    },
    location: {
        fontFamily: 'EuclidCircularB-Bold',
    },
    uvStickerContainerStyle: {
        marginTop: 180,
    },
    uvStickerStyle: {
        fontFamily: 'EuclidCircularB-Bold',
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
        fontFamily: 'EuclidCircularB-Bold',
        fontSize: 23,
    },
    uvInfo: {
        color: 'white',
        paddingHorizontal: 40,
        marginTop: 50,
        fontSize: 23,
        marginBottom: 180,
        fontFamily: 'EuclidCircularB-Regular',
    },
});

export default SunScreen;
