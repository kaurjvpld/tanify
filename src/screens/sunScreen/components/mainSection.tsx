import React, { useEffect, useRef } from 'react';
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
import { animations } from '../assets/index';
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
    const dataLoading = useSelector((state) => state.system.dataLoading);
    const animationProgress = useRef(new Animated.Value(0)).current;
    const logoLocation = useRef(new Animated.Value(hp('40%'))).current;
    const uvHeight = useRef(new Animated.Value(0)).current;
    const uvSpinValue = useRef(new Animated.Value(1)).current;
    const tempMarginRight = useRef(new Animated.Value(-wp('40%'))).current;
    const sloganWidth = useRef(new Animated.Value(0)).current;
    const modeDiameter = useRef(new Animated.Value(0)).current;
    const locationMarginTop = useRef(new Animated.Value(hp('17%'))).current;
    const uvAnimationRef = useRef();

    useEffect(() => {
        if (!dataLoading) {
            Animated.timing(animationProgress, {
                delay: 600,
                toValue: 1,
                duration: 2000,
                easing: Easing.linear,
                useNativeDriver: true,
            }).start(() => {
                uvAnimationRef.current.play();

                Animated.timing(logoLocation, {
                    toValue: hp('8%'),
                    duration: 300,
                    useNativeDriver: false,
                }).start(() => {
                    Animated.timing(tempMarginRight, {
                        toValue: 0,
                        duration: 100,
                        useNativeDriver: false,
                    }).start();

                    Animated.timing(locationMarginTop, {
                        toValue: hp('2%'),
                        duration: 100,
                        useNativeDriver: false,
                    }).start();

                    Animated.timing(sloganWidth, {
                        toValue: wp('100%'),
                        duration: 1000,
                        useNativeDriver: false,
                    }).start();

                    Animated.timing(modeDiameter, {
                        toValue: hp('12%'),
                        duration: 200,
                        useNativeDriver: false,
                    }).start(() => {
                        Animated.timing(modeDiameter, {
                            toValue: hp('10%'),
                            duration: 200,
                            useNativeDriver: false,
                        }).start();
                    });
                });

                Animated.timing(uvHeight, {
                    toValue: hp('28%'),
                    delay: 60,
                    duration: 240,
                    useNativeDriver: false,
                }).start();

                Animated.timing(uvSpinValue, {
                    toValue: 0,
                    delay: 60,
                    duration: 240,
                    useNativeDriver: false,
                    easing: Easing.linear,
                }).start();
            });
        }
    }, [
        animationProgress,
        logoLocation,
        uvHeight,
        uvSpinValue,
        tempMarginRight,
        sloganWidth,
        modeDiameter,
        locationMarginTop,
        dataLoading,
    ]);

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
                <View style={styles.tempContainer}>
                    <View style={styles.tanifyLogoContainer} />
                    <Animated.View style={{ marginRight: tempMarginRight }}>
                        <TanifyText bold={true} style={styles.temp}>
                            {temperature > 0 && '+'}
                            {temperature}°C
                        </TanifyText>
                    </Animated.View>
                </View>

                <View style={styles.uvContainer}>
                    <Animated.View style={{ height: uvHeight }}>
                        <LottieView
                            ref={uvAnimationRef}
                            source={animations.get(uv ? uv.toString() : '0')}
                            resizeMode="contain"
                            loop={false}
                        />
                    </Animated.View>
                </View>
                <Animated.View
                    style={{
                        width: sloganWidth,
                        flexDirection: 'row',
                        justifyContent: 'center',
                    }}>
                    <TanifyText
                        numberOfLines={1}
                        ellipsizeMode="clip"
                        style={styles.slogan}
                        bold={true}
                        italic={true}>
                        ‘{I18n.t(`slogan.${numbers[uv]}`)}’
                    </TanifyText>
                </Animated.View>

                <View style={styles.modeContainer}>
                    <CircleView
                        diameter={modeDiameter}
                        color={circleViewColor(mode)}>
                        <TanifyText
                            numberOfLines={1}
                            ellipsizeMode="clip"
                            bold={true}
                            style={[
                                styles.mode,
                                { color: textColor(timeOfDay) },
                            ]}>
                            {I18n.t(`mode.${mode}.title`)}
                        </TanifyText>
                    </CircleView>
                </View>

                <Animated.View
                    style={{
                        ...styles.locationContainer,
                        marginTop: locationMarginTop,
                    }}>
                    <TanifyText
                        bold={true}
                        style={{ color: textColor(timeOfDay) }}>
                        {location?.city}, {location?.country}
                    </TanifyText>
                </Animated.View>
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
        overflow: 'hidden',
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
    uvContainer: {
        marginTop: hp('7%'),
        height: hp('28%'),
        width: '100%',
        justifyContent: 'center',
    },
    slogan: {
        color: 'white',
        marginTop: hp('5%'),
        fontSize: hp('3%'),
    },
    mode: {
        fontSize: hp('2.2%'),
    },
    modeContainer: {
        marginTop: hp('1.5%'),
        height: hp('10%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    locationContainer: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 3,
    },
});
