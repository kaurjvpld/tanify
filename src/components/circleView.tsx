import React from 'react';
import { Animated } from 'react-native';

const CircleView = ({ diameter, color, children, style }) => {
    return (
        <Animated.View
            style={[
                {
                    width: diameter ? diameter : 0,
                    height: diameter ? diameter : 0,
                    borderRadius: 999,
                    backgroundColor: color ? color : '#FFFFFF',
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                style,
            ]}>
            {children}
        </Animated.View>
    );
};

export default CircleView;
