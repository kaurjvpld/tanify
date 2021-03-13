import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import App from './src/App';
import configureStore from './src/store';

const store = configureStore();

const Main = () => {
    return (
        <StoreProvider store={store}>
            <App />
        </StoreProvider>
    );
};

AppRegistry.registerComponent(appName, () => Main);
