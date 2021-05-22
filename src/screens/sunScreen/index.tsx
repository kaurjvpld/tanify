import React, { useEffect } from 'react';
import { ScrollView, SafeAreaView, StatusBar, Animated } from 'react-native';
import { useSelector } from 'react-redux';
import { GradientHelper } from './components/GradientHelper';
import { gradientColors } from './assets/index';
import MainSection from './components/mainSection';
import InfoSection from './components/infoSection';

const SunScreen = () => {
    const timeOfDay = useSelector((state) => state.system.timeOfDay);
    const gradientColorOne = new Animated.Value(0);
    const gradientColorTwo = new Animated.Value(0);
    const backgroundColors = gradientColors.get(timeOfDay);
    const AnimatedLinearGradient = Animated.createAnimatedComponent(
        GradientHelper,
    );

    const gradientColorOneConfig = gradientColorOne.interpolate({
        inputRange: [0, 1],
        outputRange: ['#3d8bdd', backgroundColors[0]],
    });
    const gradientColorTwoConfig = gradientColorTwo.interpolate({
        inputRange: [0, 1],
        outputRange: ['#3d8bdd', backgroundColors[1]],
    });

    useEffect(() => {
        Animated.timing(gradientColorOne, {
            toValue: 1,
            duration: 750,
            useNativeDriver: false,
        }).start();

        Animated.timing(gradientColorTwo, {
            toValue: 1,
            duration: 750,
            useNativeDriver: false,
        }).start();
    }, [timeOfDay, gradientColorOne, gradientColorTwo]);

    return (
        <AnimatedLinearGradient
            color1={gradientColorOneConfig}
            color2={gradientColorTwoConfig}
            style={{ flex: 1 }}>
            <SafeAreaView>
                <StatusBar backgroundColor={backgroundColors[0]} />
                <ScrollView>
                    <MainSection />
                    <InfoSection />
                </ScrollView>
            </SafeAreaView>
        </AnimatedLinearGradient>
    );
};

export default SunScreen;
