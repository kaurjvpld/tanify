import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from 'react-native';
import { setAppState } from '../store/system/actions';

const useAppState = () => {
    const appState = useSelector((state) => state.system.appState);
    const dispatch = useDispatch();

    useEffect(() => {
        const setNewAppState = (state: string) => dispatch(setAppState(state));

        const handleAppStateChange = async (state: string) => {
            if (state === 'background' || state === 'active') {
                if (appState !== state) {
                    setNewAppState(state);
                }
            }
        };

        AppState.addEventListener('change', handleAppStateChange);

        return () => {
            AppState.removeEventListener('change', handleAppStateChange);
        };
    }, [dispatch, appState]);
};

export default useAppState;
