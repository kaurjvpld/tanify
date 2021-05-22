import { TimeOfDay } from '../../../store/system/types';

export const animations = new Map([
    ['0', require('../assets/numbers/00.json')],
    ['1', require('../assets/numbers/01.json')],
    ['2', require('../assets/numbers/02.json')],
    ['3', require('../assets/numbers/03.json')],
    ['4', require('../assets/numbers/04.json')],
    ['5', require('../assets/numbers/05.json')],
    ['6', require('../assets/numbers/06.json')],
    ['7', require('../assets/numbers/07.json')],
    ['8', require('../assets/numbers/08.json')],
    ['9', require('../assets/numbers/09.json')],
    ['10', require('../assets/numbers/10.json')],
    ['11', require('../assets/numbers/11.json')],
    ['12', require('../assets/numbers/12.json')],
    ['13', require('../assets/numbers/12+.json')],
    ['14', require('../assets/numbers/12+.json')],
    ['15', require('../assets/numbers/12+.json')],
    ['16', require('../assets/numbers/12+.json')],
    ['17', require('../assets/numbers/12+.json')],
    ['18', require('../assets/numbers/12+.json')],
]);

export const gradientColors = new Map([
    [TimeOfDay.Cloudy, ['#9e9e9e', '#9e9e9e']],
    [TimeOfDay.Sunrise, ['#fc63a1', '#3d8bdd']],
    [TimeOfDay.Day, ['#3d8bdd', '#3d8bdd']],
    [TimeOfDay.Sunset, ['#fc63a1', '#edd937']],
    [TimeOfDay.Night, ['#2b2b2b', '#2b2b2b']],
]);
