import React, { useEffect, useState } from 'react';
import { View, Text, Animated } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const TimerCircle = ({ timeLeft }: { timeLeft: number }) => {
    const radius = 26;
    const strokeWidth = 4;
    const circumference = 2 * Math.PI * radius;

    const dashOffsetAnim = useState(new Animated.Value(circumference))[0];

    useEffect(() => {
        if (timeLeft >= 0) {
            const offset = (timeLeft / 10) * circumference;

            Animated.timing(dashOffsetAnim, {
                toValue: offset,
                duration: 1000,
                useNativeDriver: true,
            }).start();
        }
    }, [timeLeft]);

    return (
        <View className="absolute justify-center items-center h-14 w-14 -mt-6 rounded-full bg-white">
            <Svg width="56" height="56" viewBox="0 0 56 56">
                <Circle
                    cx="28"
                    cy="28"
                    r={radius}
                    stroke="#ddd"
                    strokeWidth={strokeWidth}
                    fill="none"
                />
                <AnimatedCircle
                    cx="28"
                    cy="28"
                    r={radius}
                    stroke="red"
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffsetAnim}
                    strokeLinecap="round"
                />
            </Svg>
            <Text className="absolute text-center">{timeLeft}</Text>
        </View>
    );
};

export default TimerCircle;
