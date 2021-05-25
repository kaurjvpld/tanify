import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserCoordinates } from '../util/mapUtil';
import { setCoordinates, SetLocationServicesOn } from '../store/system/actions';

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
                setNewCoordinates(userCoordinates);
            } catch (error) {
                console.log('ERROR: ' + error?.message);
                if (error?.message === 'Location settings are not satisfied.') {
                    setNewLocationServiceOn(false);
                }
            }
        };

        if (appState === 'active' && locationServiceOn) {
            getCoordinates();
        }
    }, [dispatch, appState, locationServiceOn]);
};

export default useCoordinates;
