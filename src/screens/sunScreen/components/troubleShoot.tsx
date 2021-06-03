import React from 'react';
import { StatusBar } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import TanifyText from '../../../components/TanifyText';
import I18n from '../../../i18n/index';

const Troubleshoot = () => {
    const networkConnection = useSelector(
        (state) => state.system.networkConnection,
    );

    return (
        <>
            <StatusBar backgroundColor={'#3d8bdd'} />

            <View style={styles.container}>
                <TanifyText style={styles.text}>
                    {I18n.t(
                        networkConnection
                            ? 'general.noLocation'
                            : 'general.noNetwork',
                    )}
                </TanifyText>
            </View>
        </>
    );
};

export default Troubleshoot;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#3d8bdd',
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: wp('3%'),
    },
    text: {
        color: 'white',
        fontSize: wp('5%'),
        textAlign: 'center',
    },
});
