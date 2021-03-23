import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserCoordinates } from '../util/mapUtil';
import { setCoordinates } from '../store/system/actions';

const useCoordinates = () => {
    const dispatch = useDispatch();
    const appState = useSelector((state) => state.system.appState);

    useEffect(() => {
        const setNewCoordinates = (newCoordinates: Coordinates) =>
            dispatch(setCoordinates(newCoordinates));

        const getCoordinates = async () => {
            try {
                const userCoordinates = await getUserCoordinates();
                setNewCoordinates(userCoordinates);
            } catch (error) {
                console.log('ERROR: ' + error.message);
            }
        };

        getCoordinates();
    }, [dispatch]);

    useEffect(() => {
        const setNewCoordinates = (newCoordinates: Coordinates) =>
            dispatch(setCoordinates(newCoordinates));

        const getCoordinates = async () => {
            try {
                const userCoordinates = await getUserCoordinates();
                setNewCoordinates(userCoordinates);
            } catch (error) {
                console.log('ERROR: ' + error.message);
            }
        };

        if (appState === 'active') {
            getCoordinates();
        }
    }, [dispatch, appState]);
};

export default useCoordinates;
