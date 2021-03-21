import { Platform, PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

export const getUserCoordinates = () => {
    return new Promise((resolve, reject) => {
        askCoordinatesPermission().then((granted) => {
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
                        reject(error);
                    },
                    {
                        enableHighAccuracy: false,
                        timeout: 5000,
                        maximumAge: 600000,
                    },
                );
            }
        });
    });
};

const askCoordinatesPermission = async () => {
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
