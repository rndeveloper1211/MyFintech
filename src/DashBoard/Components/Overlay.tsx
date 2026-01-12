import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import Animated, { SharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated'

type Props = {
    active: SharedValue<boolean>
}

const Overlay = ({ active }: Props) => {
    const animatedStyle = useAnimatedStyle(() => {
        return {
            // display ki jagah opacity use karein
            opacity: withTiming(active.value ? 1 : 0),
            // zIndex zaroori hai taaki jab band ho toh buttons click ho sakein
            zIndex: active.value ? 10 : -1,
        };
    });

    return (
        <Animated.View style={[styles.container, animatedStyle]}>
            <Pressable
                style={StyleSheet.absoluteFill} // Poori screen cover karne ke liye
                onPress={() => {
                    active.value = false; // Drawer band karein
                }}
            />
        </Animated.View>
    );
};

export default Overlay
const styles = StyleSheet.create({

    container: {
        ...StyleSheet.absoluteFillObject
    }
});
