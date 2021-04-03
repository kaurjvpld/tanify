import { getDuskAndDawn, DuskAndDawn } from '../services/weatherService';
import { TimeOfDay, Mode, Coordinates } from '../store/system/types';

export const getTimeOfDay = async (
    currentTime: number,
    coordinates: Coordinates,
) => {
    const duskAndDawn: DuskAndDawn = await getDuskAndDawn(coordinates);

    const dawnStart = duskAndDawn.dawn;
    const dawnEnd = getDawnEnd(duskAndDawn.sunrise, dawnStart);
    const duskEnd = duskAndDawn.dusk;
    const duskStart = getDuskStart(duskAndDawn.sunset, duskEnd);

    if (currentTime > duskEnd || currentTime < dawnStart) {
        return TimeOfDay.Night;
    } else if (currentTime > dawnStart && currentTime < dawnEnd) {
        return TimeOfDay.Sunrise;
    } else if (currentTime > dawnEnd && currentTime < duskStart) {
        return TimeOfDay.Day;
    } else if (currentTime > duskStart && currentTime < duskEnd) {
        return TimeOfDay.Sunset;
    }
};

export const getMode = (uv: number) => {
    if (uv >= 0 && uv <= 2) {
        return Mode.Safe;
    } else if (uv >= 5 && uv <= 5) {
        return Mode.Easy;
    } else if (uv >= 6 && uv <= 7) {
        return Mode.Medium;
    } else if (uv >= 8 && uv <= 10) {
        return Mode.Hard;
    } else if (uv >= 11) {
        return Mode.Extreme;
    }
};

export const numbers = [
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten',
    'eleven',
    'twelve',
];

export const circleViewColor = (mode) => {
    switch (mode) {
        case Mode.Safe:
            return '#00cc7e';
        case Mode.Easy:
            return '#ffce00';
        case Mode.Medium:
            return '#ff9700';
        case Mode.Hard:
            return '#ff5500';
        case Mode.Extreme:
            return '#6900ff';
        default:
            return '#00cc7e';
    }
};

export const gradientColors = (timeOfDay) => {
    switch (timeOfDay) {
        case TimeOfDay.Cloudy:
            return ['#9e9e9e', '#9e9e9e'];
        case TimeOfDay.Sunrise:
            return ['#fc63a1', '#3d8bdd'];
        case TimeOfDay.Day:
            return ['#3d8bdd', '#3d8bdd'];
        case TimeOfDay.Sunset:
            return ['#fc63a1', '#edd937'];
        case TimeOfDay.Night:
            return ['#2b2b2b', '#2b2b2b'];
        default:
            return ['#9e9e9e', '#9e9e9e'];
    }
};

export const textColor = (timeOfDay) => {
    switch (timeOfDay) {
        case TimeOfDay.Cloudy:
            return '#9e9e9e';
        case TimeOfDay.Sunrise:
            return '#3d8bdd';
        case TimeOfDay.Day:
            return '#3d8bdd';
        case TimeOfDay.Sunset:
            return '#edd937';
        case TimeOfDay.Night:
            return '#2b2b2b';
        default:
            return '#9e9e9e';
    }
};

const getDawnEnd = (sunrise: number, dawnStart: number) => {
    const dawnStartToSunrise = sunrise - dawnStart;

    return sunrise + dawnStartToSunrise;
};

const getDuskStart = (sunset: number, dawnEnd: number) => {
    const sunsetToDuskEnd = dawnEnd - sunset;

    return sunset - sunsetToDuskEnd;
};
