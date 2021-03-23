import React from 'react';
import {
    Text,
    StyleSheet,
    ScrollView,
    View,
    Image,
    Dimensions,
} from 'react-native';
import { useSelector } from 'react-redux';
import { TanifyLogo } from '../../assets';
import { TimeOfDay, Mode } from '../../store/system/types';
import LinearGradient from 'react-native-linear-gradient';
import RadialGradient from 'react-native-radial-gradient';
import CircleView from '../../components/circleView';
import UvIndex from '../../components/uvIndex';
import I18n from '../../i18n/index';

const numbers = [
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten',
    'eleven',
    'twelve',
];

const SunScreen = () => {
    const timeOfDay = useSelector((state) => state.system.timeOfDay);
    const mode = useSelector((state) => state.system.mode);
    const location = useSelector((state) => state.system.location);
    const uv = useSelector((state) => state.system.uv);
    const temperature = useSelector((state) => state.system.temperature);

    const windowHeight = Dimensions.get('window').height;
    const windowWidth = Dimensions.get('window').width;
    const logoWidthHeightRatio = 2.729;
    const logoHeight = windowHeight * 0.17;
    const logoWidth = logoHeight * logoWidthHeightRatio;

    const circeViewColor = (() => {
        switch (mode) {
            case Mode.Safe:
                return '#00cc7e';
            case Mode.Easy:
                return '#ffce00';
            case Mode.Medium:
                return '#ff9700';
            case Mode.Hard:
                return '#ff5500';
            case Mode.Extreme:
                return '#6900ff';
            default:
                return '#00cc7e';
        }
    })();

    const gradientColors = (() => {
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
    })();

    return (
        <LinearGradient colors={gradientColors}>
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
                                {temperature > 0 && '+'}
                                {temperature}°C
                            </Text>
                        </View>

                        <View style={styles.uv}>
                            <UvIndex index={uv} />
                        </View>
                        <Text style={styles.slogan}>
                            ‘{I18n.t(`slogan.${numbers[uv]}`)}’
                        </Text>
                        <CircleView
                            diameter={80}
                            color={circeViewColor}
                            style={styles.modeContainer}>
                            <Text style={styles.mode}>
                                {I18n.t(`mode.${mode}.title`)}
                            </Text>
                        </CircleView>
                        <View style={styles.locationContainer}>
                            <Text style={styles.location}>
                                {location?.city}, {location?.country}
                            </Text>
                        </View>
                    </View>
                </RadialGradient>

                <View
                    style={[{ height: windowHeight }, styles.secondContainer]}>
                    <CircleView
                        diameter={180}
                        color={circeViewColor}
                        style={styles.uvStickerContainerStyle}>
                        <Text style={styles.uvStickerStyle}>UV {uv}</Text>
                    </CircleView>
                    <View style={styles.uvInfoBoxContainerStyle}>
                        <Text style={styles.uvInfoBoxStyle}>
                            {I18n.t(`mode.${mode}.title`)}
                        </Text>
                    </View>
                    <Text style={styles.uvInfo}>
                        {I18n.t(`mode.${mode}.info`)}
                    </Text>
                    {mode && mode !== Mode.Safe && (
                        <>
                            <Text style={styles.guideTitle}>
                                {I18n.t('general.beginnersGuide')}
                            </Text>
                            <Text style={styles.guideInfo}>
                                {I18n.t(`mode.${mode}.beginnersGuide`)}
                            </Text>
                            <Text style={styles.guideTitle}>
                                {I18n.t('general.tanhuntersGuide')}
                            </Text>
                            <Text style={styles.guideInfo}>
                                {I18n.t(`mode.${mode}.tanhuntersGuide`)}
                            </Text>
                        </>
                    )}
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
        fontFamily: 'EuclidCircularB-Regular',
        alignSelf: 'flex-start',
    },
    guideTitle: {
        color: 'white',
        alignSelf: 'flex-start',
        fontFamily: 'EuclidCircularB-Bold',
        marginTop: 10,
    },
    guideInfo: {
        color: 'white',
        alignSelf: 'flex-start',
        fontFamily: 'EuclidCircularB-Regular',
        marginTop: 5,
    },
});

export default SunScreen;
