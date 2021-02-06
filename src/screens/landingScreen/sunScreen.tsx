import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getUVIndex } from '../../services/weatherService';

const SunScreen = () => {
    const [uvindex, setUvindex] = useState();

    useEffect(() => {
        getUVIndex()
            .then((uvi) => {
                setUvindex(uvi);
            })
            .catch((error) => {
                console.log(error);
            });
    });

    return (
        <>
            <View style={styles.container}>
                <Text>{uvindex}</Text>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
});

export default SunScreen;
