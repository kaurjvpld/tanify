import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { routes } from './navigation/routes';
import { navigationRef } from './navigation/RootNavigation';
import SplashScreen from 'react-native-splash-screen';
import useCoordinates from './hooks/useCoordinates';
import useLocation from './hooks/useLocation';
import useWeatherData from './hooks/useWeatherData';
import useAppState from './hooks/useAppState';

declare const global: { HermesInternal: null | {} };
const Stack = createStackNavigator();

const App = () => {
    useCoordinates();
    useLocation();
    useWeatherData();
    useAppState();

    useEffect(() => {
        setTimeout(() => {
            SplashScreen.hide();
        }, 600);
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
