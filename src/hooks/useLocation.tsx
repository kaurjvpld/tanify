import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Coordinates } from '../store/system/types';
import { setLocation } from '../store/system/actions';
import { configuration } from '../../config';
import axios from 'axios';

const useLocation = () => {
    const dispatch = useDispatch();
    const coordinates: Coordinates = useSelector(
        (state) => state.system.coordinates,
    );

    useEffect(() => {
        const setNewLocation = (location: Location) =>
            dispatch(setLocation(location));

        if (coordinates) {
            axios
                .get('https://revgeocode.search.hereapi.com/v1/revgeocode', {
                    params: {
                        apiKey: configuration.hereApiKey,
                        at: `${coordinates.latitude},${coordinates.longitude}`,
                        lang: 'en',
                    },
                })
                .then((geocode) => {
                    const newLocation: Location = {
                        city: geocode?.data?.items[0]?.address?.city,
                        country: geocode?.data?.items[0]?.address?.countryName,
                    };

                    setNewLocation(newLocation);
                })
                .catch((error) => {
                    console.log('ERROR: ' + error.response.data.title);
                });
        }
    }, [coordinates, dispatch]);
};

export default useLocation;
