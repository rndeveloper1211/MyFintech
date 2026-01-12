// 🔹 React Native ke basic UI components import ho rahe hain
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

// 🔹 React aur useState hook import
import React, { useState } from 'react';

// 🔹 Reanimated ke hooks jo animation ke kaam aate hain
import Animated, {
    useAnimatedStyle,   // animated style banane ke liye
    useSharedValue,     // UI thread value (fast animation)
    withTiming,         // smooth timing based animation
} from 'react-native-reanimated';

// 🔹 WalletCard functional component
const WalletCard = ({ }) => {

    // 🔹 React state
    // false = balance hidden
    // true = balance visible
    const [showBal, setShowBal] = useState(false);

    // 🔹 SharedValue for balance slide animation
    // Balance thoda neeche se aayega (10px)
    const slideY = useSharedValue(10);

    // 🔹 SharedValue for eye icon rotation
    // 0 degree = normal
    // 180 degree = rotate
    const rotate = useSharedValue(0);

    // 🔹 Eye button press hone par ye function chalega
    const toggleBalance = () => {

        // 🔹 React state toggle
        setShowBal(!showBal);

        // 🔹 Balance slide animation
        // Agar balance pehle se visible tha → neeche bhejo
        // Agar hidden tha → upar lao
        slideY.value = withTiming(showBal ? 10 : 0, {
            duration: 250, // animation duration
        });

        // 🔹 Eye icon rotate animation
        // Balance hide → rotate
        // Balance show → wapas seedha
        rotate.value = withTiming(showBal ? 0 : 180, {
            duration: 250,
        });
    };

    // 🔹 Animated style for balance text
    const balanceStyle = useAnimatedStyle(() => ({
        // 🔹 Y-axis pe slide
        transform: [{ translateY: slideY.value }],

        // 🔹 Jab hidden ho tab thodi transparent feel
        opacity: showBal ? 1 : 0.6,
    }));

    // 🔹 Animated style for eye icon
    const eyeStyle = useAnimatedStyle(() => ({
        // 🔹 Rotation degree ke according eye ghoomta hai
        transform: [{ rotate: `${rotate.value}deg` }],
    }));

    return (
        // 🔹 Card container
        <View style={styles.card}>

            {/* 🔹 LEFT SIDE (Wallet info) */}
            <View>
                {/* Wallet title */}
                <Text style={styles.digital}>Digital Wallet</Text>

                {/* Wallet / mobile number */}
                <Text style={styles.number}>{9370521211}</Text>

                {/* 🔹 Animated balance text */}
                <Animated.Text style={[styles.balance, balanceStyle]}>
                    ₹ {showBal ? 65464 : '*****'}
                </Animated.Text>
            </View>

            {/* 🔹 RIGHT SIDE (Actions) */}
            <View style={styles.right}>

                {/* 🔹 Add money button */}
                <Pressable style={styles.addBtn}>
                    <Text style={styles.addText}>₹ Add</Text>
                </Pressable>

                {/* 🔹 Eye button */}
                <Pressable onPress={toggleBalance} style={styles.eyeBtn}>
                    <Animated.Image
                        source={
                            showBal
                                ? require('../../source/png/eyeh.png') // eye open
                                : require('../../source/png/eyes.png') // eye closed
                        }
                        style={[styles.eyeIcon, eyeStyle]}
                    />
                </Pressable>
            </View>

        </View>
    );
};

export default WalletCard;
const styles = StyleSheet.create({

    // 🔹 Main card container
    card: {
        top: 20,                     // thoda neeche shift
        marginHorizontal: 12,        // left-right spacing
        borderRadius: 20,            // rounded corners
        padding: 20,                 // inner spacing
        flexDirection: 'row',        // left-right layout
        justifyContent: 'space-between',

        // 🔹 Solid blue background (bank style)
        backgroundColor: 'black',

        // 🔹 Android shadow
        elevation: 8,
    },

    // 🔹 "Digital Wallet" text
    digital: {
        color: '#DBEAFE',
        fontSize: 14,
        fontWeight: '600',
    },

    // 🔹 Wallet number text
    number: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
        marginTop: 4,
    },

    // 🔹 Balance amount style
    balance: {
        color: '#FFFFFF',
        fontSize: 28,
        fontWeight: '900',
        marginTop: 10,
    },

    // 🔹 Right side container
    right: {
        alignItems: 'flex-end',       // right align
        justifyContent: 'space-between',
    },

    // 🔹 Add button style
    addBtn: {
        backgroundColor: '#DBEAFE',
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 6,
    },

    // 🔹 Add button text
    addText: {
        color: '#2563EB',
        fontWeight: '700',
    },

    // 🔹 Eye button container
    eyeBtn: {
        backgroundColor: '#DBEAFE',
        height: 38,
        width: 38,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },

    // 🔹 Eye icon style
    eyeIcon: {
        height: 20,
        width: 20,
        tintColor: '#2563EB',
    },
});
