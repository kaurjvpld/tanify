import React from 'react';
import { circleViewColor, textColor } from '../../../util/systemStateUtil.tsx';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StyleSheet, View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { Mode } from '../../../store/system/types';
import CircleView from '../../../components/circleView';
import I18n from '../../../i18n/index';

const InfoSection = () => {
    const timeOfDay = useSelector((state) => state.system.timeOfDay);
    const mode = useSelector((state) => state.system.mode);
    const uv = useSelector((state) => state.system.uv);

    return (
        <View style={styles.container}>
            <CircleView
                diameter={180}
                color={circleViewColor(mode)}
                style={styles.uvStickerContainerStyle}>
                <Text style={styles.uvStickerStyle}>UV {uv}</Text>
            </CircleView>
            <View
                style={[
                    styles.uvInfoBoxContainerStyle,
                    { backgroundColor: circleViewColor(mode) },
                ]}>
                <Text
                    style={[
                        styles.uvInfoBoxStyle,
                        { color: textColor(timeOfDay) },
                    ]}>
                    {I18n.t(`mode.${mode}.title`)}
                </Text>
            </View>
            <Text style={styles.uvInfo}>{I18n.t(`mode.${mode}.info`)}</Text>
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
    );
};

export default InfoSection;

const styles = StyleSheet.create({
    container: {
        height: hp('100%'),
        alignItems: 'center',
        paddingHorizontal: 30,
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
        fontSize: hp('3.2%'),
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
