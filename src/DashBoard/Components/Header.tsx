import { Image, Pressable, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
    SharedValue,
    useAnimatedReaction,
    runOnJS,
} from 'react-native-reanimated';

type Props = {
    active: SharedValue<boolean>; // 🔹 Animation ke liye SharedValue
};

export default function Header({ active }: Props) {
    const insets = useSafeAreaInsets(); // 🔹 Safe area (notch, status bar)

    // 🔹 React state sirf UI logic ke liye (icon change)
    // SharedValue directly JSX me kaam nahi karti
    const [isActive, setIsActive] = useState(active.value);

    // 🔹 Button press hone par sirf SharedValue change hoti hai
    // Isse drawer / animation trigger hota hai
    const toggleMenu = () => {
        active.value = !active.value;
    };

    /**
     * 🔥 IMPORTANT PART
     * UI thread (SharedValue) → JS thread (React state)
     * Jab bhi active.value change hoti hai,
     * React ko bolte hain re-render karne ke liye
     */
    useAnimatedReaction(
        () => active.value, // 🔹 UI thread pe active ki value
        (value) => {
            // 🔹 runOnJS se React state update
            runOnJS(setIsActive)(value);
        },
        []
    );

    return (
        <View style={[styles.container, { paddingTop: insets.top, flexDirection: 'row' }]}>
            <Pressable onPress={toggleMenu}>
                {/* 
          🔹 JSX me hamesha React state use hoti hai
          SharedValue ko directly use nahi karte
        */}
                <Image
                    source={
                        isActive
                            ? require('../../source/png/cross.png') // menu open → cross
                            : require('../../source/png/menu2.png') // menu close → menu icon
                    }
                    style={styles.menu}
                />



            </Pressable>

            <View style={styles.btnConatiner}>

                <Image source={require('../../source/png/light.png')} style={styles.btn} />
                <Image source={require('../../source/png/search.png')} style={styles.btn} />

                <Image source={require('../../source/png/power.png')} style={styles.btn} />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'black',
        paddingLeft: 16,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    menu: {
        width: 40,
        height: 40,
    },
    btn: {
        height: 30, width: 30

    },
    btnConatiner: {
        padding: 10,
        gap: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    }
});
