import React from 'react';
import { ScrollView } from 'react-native';
import { gradientColors } from '../../util/colorUtil';
import { useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import MainSection from './components/mainSection';
import InfoSection from './components/infoSection';

const SunScreen = () => {
    const timeOfDay = useSelector((state) => state.system.timeOfDay);

    return (
        <LinearGradient colors={gradientColors(timeOfDay)}>
            <ScrollView>
                <MainSection />
                <InfoSection />
            </ScrollView>
        </LinearGradient>
    );
};

export default SunScreen;
