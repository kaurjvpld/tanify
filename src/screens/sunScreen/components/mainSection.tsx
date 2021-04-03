import React from 'react';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
    numbers,
    circleViewColor,
    textColor,
} from '../../../util/systemStateUtil.tsx';
import { StyleSheet, View, Dimensions, Image, Text } from 'react-native';
import { TimeOfDay } from '../../../store/system/types';
import { TanifyLogo } from '../../../assets/index';
import { useSelector } from 'react-redux';
import UvIndex from '../../../components/uvIndex';
import I18n from '../../../i18n/index';
import CircleView from '../../../components/circleView';
import RadialGradient from 'react-native-radial-gradient';

const MainSection = () => {
    const timeOfDay = useSelector((state) => state.system.timeOfDay);
    const temperature = useSelector((state) => state.system.temperature);
    const uv = useSelector((state) => state.system.uv);
    const mode = useSelector((state) => state.system.mode);
    const location = useSelector((state) => state.system.location);

    const windowHeight = Dimensions.get('window').height;
    const logoWidthHeightRatio = 2.729;
    const logoHeight = windowHeight * 0.17;
    const logoWidth = logoHeight * logoWidthHeightRatio;

    return (
        <RadialGradient
            style={styles.radialGradient}
            colors={
                timeOfDay === TimeOfDay.Day
                    ? ['#3eb1dd', '#3d8bdd']
                    : ['transparent', 'transparent']
            }
            stops={[0.4]}
            radius={200}>
            <View style={styles.container}>
                <View style={{ width: logoWidth }}>
                    <View
                        style={[
                            styles.tanifyLogoContainer,
                            { height: logoHeight },
                        ]}>
                        <Image source={TanifyLogo} style={styles.tanifyLogo} />
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
                    color={circleViewColor(mode)}
                    style={styles.modeContainer}>
                    <Text
                        style={[styles.mode, { color: textColor(timeOfDay) }]}>
                        {I18n.t(`mode.${mode}.title`)}
                    </Text>
                </CircleView>
                <View style={styles.locationContainer}>
                    <Text
                        style={[
                            styles.location,
                            { color: textColor(timeOfDay) },
                        ]}>
                        {location?.city}, {location?.country}
                    </Text>
                </View>
            </View>
        </RadialGradient>
    );
};

export default MainSection;

const styles = StyleSheet.create({
    container: {
        height: hp('100%'),
        alignItems: 'center',
        paddingTop: '20%',
        paddingHorizontal: 30,
    },
    radialGradient: {
        height: hp('100%'),
        width: wp('100%'),
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
        fontSize: hp('3.5%'),
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
        fontSize: hp('3%'),
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
});
