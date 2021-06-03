import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNetworkConnection } from '../store/system/actions';
import NetInfo from '@react-native-community/netinfo';

const useNetworkConnectionData = () => {
    const dispatch = useDispatch();
    const networkConnection = useSelector(
        (state) => state.system.networkConnection,
    );

    useEffect(() => {
        const setNewNetworkConnection = (newNetworkConnection: boolean) =>
            dispatch(setNetworkConnection(newNetworkConnection));

        const unsubscribeNetInfoListener = NetInfo.addEventListener((state) => {
            if (state?.isConnected !== networkConnection) {
                setNewNetworkConnection(state.isConnected);
            }
        });

        return () => {
            unsubscribeNetInfoListener();
        };
    }, [networkConnection, dispatch]);
};

export default useNetworkConnectionData;
