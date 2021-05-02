import React, { useState, useEffect } from 'react';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
    numbers,
    circleViewColor,
    textColor,
    radialGradientColors,
} from '../../../util/colorUtil';
import { StyleSheet, View, Animated, Easing } from 'react-native';
import { useSelector } from 'react-redux';
import UvIndex from '../../../components/uvIndex';
import I18n from '../../../i18n/index';
import CircleView from '../../../components/circleView';
import RadialGradient from 'react-native-radial-gradient';
import TanifyText from '../../../components/TanifyText';
import LottieView from 'lottie-react-native';

const logoWidthHeightRatio = 2.506;
const logoHeightPercentage = 16;

const MainSection = () => {
    const temperature = useSelector((state) => state.system.temperature);
    const timeOfDay = useSelector((state) => state.system.timeOfDay);
    const location = useSelector((state) => state.system.location);
    const mode = useSelector((state) => state.system.mode);
    const uv = useSelector((state) => state.system.uv);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [animationProgress, setAnimationProgress] = useState(
        new Animated.Value(0),
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [logoLocation, setLogoLocation] = useState(
        new Animated.Value(hp('40%')),
    );

    useEffect(() => {
        Animated.timing(animationProgress, {
            delay: 600,
            toValue: 1,
            duration: 10000,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start(() => {
            Animated.timing(logoLocation, {
                toValue: hp('8%'),
                duration: 500,
                useNativeDriver: false,
            }).start();
        });
    }, [animationProgress, logoLocation]);

    return (
        <RadialGradient
            style={styles.radialGradient}
            colors={radialGradientColors(timeOfDay)}
            stops={[0.4]}
            radius={200}>
            <View style={styles.container}>
                <Animated.View
                    style={{
                        ...styles.tanifyLogoContainer,
                        position: 'absolute',
                        top: logoLocation,
                    }}>
                    <LottieView
                        source={require('../assets/logoAnimation.json')}
                        progress={animationProgress}
                        resizeMode="contain"
                    />
                </Animated.View>
                {true && (
                    <>
                        <View style={styles.tempContainer}>
                            <View style={styles.tanifyLogoContainer} />
                            <TanifyText bold={true} style={styles.temp}>
                                {temperature > 0 && '+'}
                                {temperature}°C
                            </TanifyText>
                        </View>

                        <View style={styles.uv}>
                            <UvIndex index={uv} />
                        </View>
                        <TanifyText
                            style={styles.slogan}
                            bold={true}
                            italic={true}>
                            ‘{I18n.t(`slogan.${numbers[uv]}`)}’
                        </TanifyText>
                        <CircleView
                            diameter={hp('10%')}
                            color={circleViewColor(mode)}
                            style={styles.modeContainer}>
                            <TanifyText
                                bold={true}
                                style={[
                                    styles.mode,
                                    { color: textColor(timeOfDay) },
                                ]}>
                                {I18n.t(`mode.${mode}.title`)}
                            </TanifyText>
                        </CircleView>
                        <View style={styles.locationContainer}>
                            <TanifyText
                                bold={true}
                                style={{ color: textColor(timeOfDay) }}>
                                {location?.city}, {location?.country}
                            </TanifyText>
                        </View>
                    </>
                )}
            </View>
        </RadialGradient>
    );
};

export default MainSection;

const styles = StyleSheet.create({
    radialGradient: {
        height: hp('100%'),
        width: wp('100%'),
    },
    container: {
        height: hp('100%'),
        alignItems: 'center',
        paddingTop: hp('8%'),
        paddingHorizontal: wp('6%'),
    },
    tanifyLogoContainer: {
        height: hp(logoHeightPercentage),
        width: '100%',
    },
    tanifyLogo: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain',
    },
    tempContainer: {
        width: hp(logoHeightPercentage) * logoWidthHeightRatio,
    },
    temp: {
        color: '#FFFFFF',
        fontSize: hp('3.5%'),
        alignSelf: 'flex-end',
        marginTop: hp('0.3%'),
    },
    uv: {
        marginTop: hp('7%'),
        height: hp('28%'),
        width: '100%',
    },
    slogan: {
        color: 'white',
        marginTop: hp('5%'),
        fontSize: hp('3%'),
    },
    mode: {
        fontSize: hp('3%'),
    },
    modeContainer: {
        marginTop: hp('1.5%'),
    },
    locationContainer: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 8,
        marginTop: hp('2%'),
        borderRadius: 3,
    },
});
