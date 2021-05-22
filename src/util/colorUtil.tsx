import { Mode, TimeOfDay } from '../store/system/types';

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

export const radialGradientColors = (timeOfDay) => {
    return timeOfDay === TimeOfDay.Day
        ? ['#3eb1dd', '#3d8bdd']
        : ['transparent', 'transparent'];
};
