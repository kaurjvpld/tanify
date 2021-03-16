import React, { useEffect, useState } from 'react';
import {
    Text,
    StyleSheet,
    ScrollView,
    View,
    Image,
    Dimensions,
} from 'react-native';
import { useSelector } from 'react-redux';
import { getWeatherData, WeatherData } from '../../services/weatherService';
import { TanifyLogo } from '../../assets';
import { TimeOfDay } from '../../store/system/types';
import LinearGradient from 'react-native-linear-gradient';
import RadialGradient from 'react-native-radial-gradient';
import CircleView from '../../components/circleView';
import UvIndex from '../../components/uvIndex';

const SunScreen = () => {
    const [weatherData, setWeatherData] = useState<WeatherData>({
        uvIndex: 0,
        temperature: undefined,
    });
    const timeOfDay = useSelector((state) => state.system.timeOfDay);
    const windowHeight = Dimensions.get('window').height;
    const windowWidth = Dimensions.get('window').width;
    const logoWidthHeightRatio = 2.729;
    const logoHeight = windowHeight * 0.17;
    const logoWidth = logoHeight * logoWidthHeightRatio;

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
        <LinearGradient
            colors={(() => {
                switch (timeOfDay) {
                    case TimeOfDay.Cloudy:
                        return ['#9e9e9e', '#9e9e9e'];
                    case TimeOfDay.Sunrise:
                        return ['#fc63a1', '#3d8bdd'];
                    case TimeOfDay.Day:
                        return ['#3d8bdd', '#3d8bdd'];
                    case TimeOfDay.Sunset:
                        return ['#fc63a1', '#edd937'];
                    case TimeOfDay.Night:
                        return ['#2b2b2b', '#2b2b2b'];
                    default:
                        return ['#9e9e9e', '#9e9e9e'];
                }
            })()}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <RadialGradient
                    style={{
                        height: windowHeight,
                        width: windowWidth,
                    }}
                    colors={
                        timeOfDay === TimeOfDay.Day
                            ? ['#3eb1dd', '#3d8bdd']
                            : ['transparent', 'transparent']
                    }
                    stops={[0.4]}
                    radius={200}>
                    <View
                        style={[
                            { height: windowHeight },
                            styles.mainContainer,
                        ]}>
                        <View style={{ width: logoWidth }}>
                            <View
                                style={[
                                    styles.tanifyLogoContainer,
                                    { height: logoHeight },
                                ]}>
                                <Image
                                    source={TanifyLogo}
                                    style={styles.tanifyLogo}
                                />
                            </View>
                            <Text style={styles.temp}>
                                {weatherData?.temperature > 0 && '+'}
                                {weatherData?.temperature}°C
                            </Text>
                        </View>

                        <View style={styles.uv}>
                            <UvIndex index={weatherData.uvIndex} />
                        </View>
                        <Text style={styles.slogan}>
                            ‘Nothing interesting happens’
                        </Text>
                        <CircleView
                            diameter={80}
                            color={'#00cc7e'}
                            style={styles.modeContainer}>
                            <Text style={styles.mode}>SAFE</Text>
                        </CircleView>
                        <View style={styles.locationContainer}>
                            <Text style={styles.location}>
                                Tallinn, Estonia
                            </Text>
                        </View>
                    </View>
                </RadialGradient>

                <View
                    style={[{ height: windowHeight }, styles.secondContainer]}>
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
                        The sun's not interested in giving you a tan. We know
                        it's hard, but just go out and do something else that's
                        not tanning. Go on a date? Sudoku? It's up to you.
                    </Text>
                </View>
            </ScrollView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        alignItems: 'center',
        paddingTop: '20%',
        paddingHorizontal: 30,
    },
    secondContainer: {
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    tanifyLogoContainer: {
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
        marginTop: 2,
    },
    uv: {
        marginTop: '8%',
        height: '30%',
        width: '100%',
    },
    slogan: {
        color: 'white',
        marginTop: '10%',
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
        borderRadius: 3,
    },
    location: {
        fontFamily: 'EuclidCircularB-Bold',
    },
    uvStickerContainerStyle: {
        marginTop: '20%',
    },
    uvStickerStyle: {
        fontFamily: 'EuclidCircularB-Bold',
        fontSize: 55,
        color: 'white',
    },
    uvInfoBoxContainerStyle: {
        backgroundColor: 'white',
        paddingVertical: 2,
        paddingHorizontal: 30,
        width: 180,
        marginTop: 50,
        alignItems: 'center',
        borderRadius: 3,
    },
    uvInfoBoxStyle: {
        fontFamily: 'EuclidCircularB-Bold',
        fontSize: 25,
    },
    uvInfo: {
        color: 'white',
        marginTop: 50,
        fontSize: 23,
        marginBottom: 180,
        fontFamily: 'EuclidCircularB-Regular',
    },
});

export default SunScreen;
