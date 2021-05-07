import React from 'react';
import { Text } from 'react-native';

const TanifyText = ({
    children,
    style,
    numberOfLines,
    bold,
    italic,
    ellipsizeMode,
}) => {
    return (
        <Text
            ellipsizeMode={ellipsizeMode}
            numberOfLines={numberOfLines ? numberOfLines : null}
            style={[
                {
                    fontFamily: bold
                        ? italic
                            ? 'EuclidCircularB-BoldItalic'
                            : 'EuclidCircularB-Bold'
                        : 'EuclidCircularB-Regular',
                },
                style,
            ]}>
            {children}
        </Text>
    );
};

export default TanifyText;
