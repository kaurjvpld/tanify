import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUserCoordinates } from '../util/mapUtil';
import { setCoordinates } from '../store/system/actions';

const useCoordinates = () => {
    const dispatch = useDispatch();

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
};

export default useCoordinates;
