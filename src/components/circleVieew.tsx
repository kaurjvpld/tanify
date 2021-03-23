import React from 'react';
import { View } from 'react-native';

const CircleView = ({ diameter, color, children, style }) => {
    return (
        <View
            style={[
                {
                    width: diameter ? diameter : 0,
                    height: diameter ? diameter : 0,
                    borderRadius: diameter ? diameter / 2 : 0,
                    backgroundColor: color ? color : '#FFFFFF',
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                style,
            ]}>
            {children}
        </View>
    );
};

export default CircleView;
