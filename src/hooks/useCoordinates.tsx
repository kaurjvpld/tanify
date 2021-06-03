import { useEffect } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getUserCoordinates } from '../util/mapUtil';
import { setCoordinates, SetLocationServicesOn } from '../store/system/actions';
import I18n from '../i18n/index';

const useCoordinates = () => {
    const dispatch = useDispatch();
    const appState = useSelector((state) => state.system.appState);
    const locationServiceOn = useSelector(
        (state) => state.system.locationServicesOn,
    );

    useEffect(() => {
        const setNewCoordinates = (newCoordinates: Coordinates) =>
            dispatch(setCoordinates(newCoordinates));
        const setNewLocationServiceOn = (newLocationServiceOn: boolean) =>
            dispatch(SetLocationServicesOn(newLocationServiceOn));

        const getCoordinates = async () => {
            try {
                const userCoordinates = await getUserCoordinates();
                userCoordinates
                    ? setNewCoordinates(userCoordinates)
                    : setNewLocationServiceOn(false);
            } catch (error) {
                console.log('ERROR: ' + error?.message);
                if (error?.message === 'Location settings are not satisfied.') {
                    setNewLocationServiceOn(false);
                } else if (error?.message === 'Location request timed out.') {
                    Alert.alert(
                        I18n.t('error.locationTimeout.title'),
                        I18n.t('error.locationTimeout.body'),
                    );
                }
            }
        };

        if (appState === 'active' && locationServiceOn) {
            getCoordinates();
        }
    }, [dispatch, appState, locationServiceOn]);
};

export default useCoordinates;
