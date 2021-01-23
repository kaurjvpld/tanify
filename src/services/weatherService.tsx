import Geolocation from '@react-native-community/geolocation';

export const getWeatherData = async () => {
    let location = await getCurrentLocation();
    console.log('location: ' + JSON.stringify(location));
};

const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
            (position) => {
                if (position) {
                    const userLocation = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    };
                    resolve(userLocation);
                }
            },
            (error) => {
                reject(error);
            },
            { enableHighAccuracy: false, timeout: 5000, maximumAge: 600000 },
        );
    });
};
