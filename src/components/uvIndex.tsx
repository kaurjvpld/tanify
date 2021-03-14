import React from 'react';
import { Image, StyleSheet } from 'react-native';
import {
    Zero,
    One,
    Two,
    Three,
    Four,
    Five,
    Six,
    Seven,
    Eight,
    Nine,
    Ten,
    Eleven,
    Twelve,
} from '../assets/index';

const UvIndex = ({ index = 0 }) => {
    switch (index) {
        case 0:
            return <Image source={Zero} style={styles.number} />;
        case 1:
            return <Image source={One} style={styles.number} />;
        case 2:
            return <Image source={Two} style={styles.number} />;
        case 3:
            return <Image source={Three} style={styles.number} />;
        case 4:
            return <Image source={Four} style={styles.number} />;
        case 5:
            return <Image source={Five} style={styles.number} />;
        case 6:
            return <Image source={Six} style={styles.number} />;
        case 7:
            return <Image source={Seven} style={styles.number} />;
        case 8:
            return <Image source={Eight} style={styles.number} />;
        case 9:
            return <Image source={Nine} style={styles.number} />;
        case 10:
            return <Image source={Ten} style={styles.number} />;
        case 11:
            return <Image source={Eleven} style={styles.number} />;
        case 12:
            return <Image source={Twelve} style={styles.number} />;
        default:
            return <Image source={Zero} style={styles.number} />;
    }
};

export default UvIndex;

const styles = StyleSheet.create({
    number: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain',
    },
});
