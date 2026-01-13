import { StyleSheet, Text } from 'react-native';
import React from 'react';
import Header from './Components/Header';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
  useDerivedValue,
  interpolate,
  Extrapolation
} from 'react-native-reanimated';
import Overlay from './Components/Overlay';
import Drawer from '../Drawer/Drawer';
import WalletCard from './Components/walletCard';
import { useSelector } from 'react-redux';


function HomeScreen() {

  const colors = useSelector((state: RootStat   e) => state.theme.colors);

  const active = useSharedValue(false);
  const progess = useDerivedValue(() => {
    return withTiming(active.value ? 1 : 0)
  })
  const animatedStyle = useAnimatedStyle(() => {
    const isActive = active.value;
    const rotateY = interpolate(progess.value, [0, 1], [0, -15], Extrapolation.CLAMP)

    return {
      borderRadius: withTiming(isActive ? 40 : 0, {
        duration: 300,
        easing: Easing.out(Easing.exp),
      }),

      transform: [
        { perspective: 1000 },
        {
          scale: withTiming(isActive ? 0.85 : 1, {
            duration: 300,
            easing: Easing.out(Easing.exp),
          }),
        },
        {
          translateX: withTiming(isActive ? 240 : 0, {
            duration: 300,
            easing: Easing.out(Easing.exp),
          }),
        },
        {
          translateY: withTiming(isActive ? 20 : 0, {
            duration: 300,
            easing: Easing.out(Easing.exp),
          }),
        },
        {
          rotateY: `${rotateY}deg`
        }
      ],
    };
  });

  return (
    <>
      <Drawer />
      <Animated.View style={[styles.container, animatedStyle]}>
        <Header active={active} />
        <Overlay active={active} />

        <WalletCard />
      </Animated.View>
    </>

  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    flex: 1,
    backgroundColor: '#fff',

    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
  },
});
