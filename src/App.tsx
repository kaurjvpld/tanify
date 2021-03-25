import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { routes } from './navigation/routes';
import SplashScreen from 'react-native-splash-screen';

declare const global: { HermesInternal: null | {} };
const Stack = createStackNavigator();

const App = () => {
    useEffect(() => {
        setTimeout(() => {
            SplashScreen.hide();
        }, 600);
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {routes.map((route, index) => (
                    <Stack.Screen
                        key={index}
                        name={route.name}
                        component={route.screen}
                        options={{ headerShown: false }}
                    />
                ))}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
