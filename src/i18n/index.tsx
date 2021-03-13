import * as RNLocalize from 'react-native-localize';
import I18n from 'i18n-js';
import en from './locales/en';
import et from './locales/et';

export const appLanguages = ['en', 'et'];

/*
Check if locale used in the phone is one of the suppported locales, if so then set the
phone locale, otherwise use default locale.
*/
const locales = RNLocalize.getLocales();

if (Array.isArray(locales) && appLanguages.includes(locales[0].languageCode)) {
    I18n.locale = locales[0].languageCode;
} else {
    I18n.locale = appLanguages[0];
}

I18n.translations = {
    default: en,
    en,
    et,
};

I18n.fallbacks = true;

export default I18n;
