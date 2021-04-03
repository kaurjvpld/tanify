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

const getDawnEnd = (sunrise: number, dawnStart: number) => {
    const dawnStartToSunrise = sunrise - dawnStart;

    return sunrise + dawnStartToSunrise;
};

const getDuskStart = (sunset: number, dawnEnd: number) => {
    const sunsetToDuskEnd = dawnEnd - sunset;

    return sunset - sunsetToDuskEnd;
};
