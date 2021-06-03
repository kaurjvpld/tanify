import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { routes } from './navigation/routes';
import { navigationRef } from './navigation/RootNavigation';
import useCoordinates from './hooks/useCoordinates';
import useLocation from './hooks/useLocation';
import useWeatherData from './hooks/useWeatherData';
import useAppState from './hooks/useAppState';
import RNBootSplash from 'react-native-bootsplash';
import useNetworkConnectionData from './hooks/useNetworkConnectionData';

declare const global: { HermesInternal: null | {} };
const Stack = createStackNavigator();

const App = () => {
    useCoordinates();
    useLocation();
    useWeatherData();
    useAppState();
    useNetworkConnectionData();

    useEffect(() => {
        RNBootSplash.hide({ fade: true });
    }, []);

    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator>
                {routes.map((route, index) => (
                    <Stack.Screen
                        key={index}
                        name={route.name}
                        component={route.screen}
                        options={{
                            headerShown: false,
                            animationEnabled: route.animationEnabled,
                        }}
                    />
                ))}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
