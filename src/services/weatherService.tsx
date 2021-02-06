import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

const OPEN_WEATHER_API_KEY = 'eb9591c25fb1327202a280c91d7c4d9c';

export const getUVIndex = async () => {
    try {
        let location = await getCurrentLocation();
        let weatherData = await axios.get(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${location.latitude}&lon=${location.longitude}&exclude=hourly,daily,minutely,alerts&appid=${OPEN_WEATHER_API_KEY}`,
        );
        return weatherData.data.current.uvi;
    } catch (error) {
        throw error;
    }
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
