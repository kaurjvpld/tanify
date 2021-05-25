import { Platform, PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

export const getUserCoordinates = async () => {
    const granted = await askLocationPermission();

    return new Promise((resolve, reject) => {
        if (granted) {
            Geolocation.getCurrentPosition(
                (position) => {
                    const location = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    };

                    resolve(location);
                },
                (error) => {
                    reject(new Error(error.message));
                },
                {
                    enableHighAccuracy: true,
                    timeout: 20000,
                    maximumAge: 10000,
                },
            );
        } else {
            resolve();
        }
    });
};

const askLocationPermission = async () => {
    if (Platform.OS === 'ios') {
        let locationPermission = await Geolocation.requestAuthorization(
            'whenInUse',
        );

        return locationPermission === 'granted';
    } else {
        let locationPermission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        return locationPermission === PermissionsAndroid.RESULTS.GRANTED;
    }
};
