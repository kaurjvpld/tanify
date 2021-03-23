import axios from 'axios';
import { Coordinates } from '../store/system/types';

const OPEN_WEATHER_API_KEY = 'eb9591c25fb1327202a280c91d7c4d9c';

export interface WeatherData {
    uvIndex: string;
    temperature: number;
    timeOfMeasure: number;
}

export interface DuskAndDawn {
    sunrise: string;
    sunset: string;
    dawn: string;
    dusk: string;
}

export const getWeatherData: (coordinates: Coordinates) => WeatherData = async (
    coordinates,
) => {
    try {
        let weatherData = await axios.get(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.latitude}&lon=${coordinates.longitude}&exclude=hourly,daily,minutely,alert&units=metric&appid=${OPEN_WEATHER_API_KEY}`,
        );

        let result = {
            uvIndex: weatherData.data.current.uvi,
            temperature: Math.round(weatherData.data.current.temp),
            timeOfMeasure: weatherData.data.current.dt,
        };

        return result;
    } catch (error) {
        throw error;
    }
};

export const getDuskAndDawn: (coordinates: Coordinates) => DuskAndDawn = async (
    coordinates,
) => {
    const duskAndDawn = await axios.get(
        `https://api.sunrise-sunset.org/json?lat=${coordinates.latitude}&lng=${coordinates.longitude}&formatted=0`,
    );

    const result = {
        sunrise: Date.parse(duskAndDawn.data.results.sunrise) / 1000,
        sunset: Date.parse(duskAndDawn.data.results.sunset) / 1000,
        dawn: Date.parse(duskAndDawn.data.results.civil_twilight_begin) / 1000,
        dusk: Date.parse(duskAndDawn.data.results.civil_twilight_end) / 1000,
    };

    return result;
};
