import React, { useEffect } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import SunScreen from './screens/landingScreen/sunScreen';

declare const global: { HermesInternal: null | {} };

const App = () => {
    useEffect(() => {
        (async () => {
            if (Platform.OS === 'android') {
                await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                );
            }
        })();
    });

    return (
        <>
            <SunScreen />
        </>
    );
};

export default App;
