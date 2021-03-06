import React from 'react';
import { circleViewColor } from '../../../util/colorUtil';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Mode } from '../../../store/system/types';
import CircleView from '../../../components/circleView';
import I18n from '../../../i18n/index';
import TanifyText from '../../../components/TanifyText';

const InfoSection = () => {
    const mode = useSelector((state) => state.system.mode);
    const uv = useSelector((state) => state.system.uv);

    return (
        <View style={styles.container}>
            <CircleView
                diameter={hp('23%')}
                color={circleViewColor(mode)}
                style={styles.uvStickerContainerStyle}>
                <TanifyText bold={true} style={styles.uvStickerStyle}>
                    UV {uv}
                </TanifyText>
            </CircleView>
            <View
                style={[
                    styles.modeContainer,
                    { backgroundColor: circleViewColor(mode) },
                ]}>
                <TanifyText bold={true} style={styles.mode}>
                    {I18n.t(`mode.${mode}.title`)}
                </TanifyText>
            </View>
            <TanifyText style={styles.uvInfo}>
                {I18n.t(`mode.${mode}.info`)}
            </TanifyText>
            {mode && mode !== Mode.Safe && (
                <>
                    <TanifyText bold={true} style={styles.guideTitle}>
                        {I18n.t('general.beginnersGuide')}
                    </TanifyText>
                    <TanifyText style={styles.guideInfo}>
                        {I18n.t(`mode.${mode}.beginnersGuide`)}
                    </TanifyText>
                    <TanifyText bold={true} style={styles.guideTitle}>
                        {I18n.t('general.tanhuntersGuide')}
                    </TanifyText>
                    <TanifyText style={styles.guideInfo}>
                        {I18n.t(`mode.${mode}.tanhuntersGuide`)}
                    </TanifyText>
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
        marginTop: hp('9%'),
    },
    uvStickerStyle: {
        fontSize: hp('8%'),
        color: 'white',
    },
    modeContainer: {
        paddingVertical: 2,
        paddingHorizontal: 30,
        width: wp('55%'),
        marginTop: hp('7%'),
        alignItems: 'center',
        borderRadius: 3,
    },
    mode: {
        fontSize: 25,
        color: 'white',
    },
    uvInfo: {
        color: 'white',
        marginTop: hp('5%'),
        fontSize: hp('3.2%'),
        alignSelf: 'flex-start',
    },
    guideTitle: {
        color: 'white',
        alignSelf: 'flex-start',
        marginTop: 10,
    },
    guideInfo: {
        color: 'white',
        alignSelf: 'flex-start',
        marginTop: 5,
    },
});
