import React from 'react';
import SunScreen from './screens/sunScreen';
import useCoordinates from './hooks/useCoordinates';
import useLocation from './hooks/useLocation';
import useWeatherData from './hooks/useWeatherData';

declare const global: { HermesInternal: null | {} };

const App = () => {
    useCoordinates();
    useLocation();
    useWeatherData();

    return <SunScreen />;
};

export default App;
