import React from 'react';
import { ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { gradientColors } from '../../util/colorUtil';
import { useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import MainSection from './components/mainSection';
import InfoSection from './components/infoSection';

const SunScreen = () => {
    const timeOfDay = useSelector((state) => state.system.timeOfDay);

    return (
        <LinearGradient colors={gradientColors(timeOfDay)}>
            <SafeAreaView>
                <StatusBar backgroundColor={gradientColors(timeOfDay)[0]} />
                <ScrollView>
                    <MainSection />
                    <InfoSection />
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
};

export default SunScreen;
