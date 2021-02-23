import React from 'react';
import {
    Zero,
    One,
    Two,
    Three,
    Four,
    Five,
    Six,
    Seven,
    Eight,
    Nine,
    Ten,
    Eleven,
    Twelve,
} from '../assets/index';

const UvIndex = ({ index = 0 }) => {
    switch (index) {
        case 0:
            return <Zero.default />;
        case 1:
            return <One.default />;
        case 2:
            return <Two.default />;
        case 3:
            return <Three.default />;
        case 4:
            return <Four.default />;
        case 5:
            return <Five.default />;
        case 6:
            return <Six.default />;
        case 7:
            return <Seven.default />;
        case 8:
            return <Eight.default />;
        case 9:
            return <Nine.default />;
        case 10:
            return <Ten.default />;
        case 11:
            return <Eleven.default />;
        case 12:
            return <Twelve.default />;
        default:
            return <Zero.default />;
    }
};

export default UvIndex;
