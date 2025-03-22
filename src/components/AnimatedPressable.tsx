import React from "react";
import { Pressable, PressableProps, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const AnimPressable = Animated.createAnimatedComponent(Pressable);

enum animType {
  MINOR_ANIM = 0.96,
}

interface AnimatedButtonProps extends PressableProps {
  scaledAnimValue?: keyof typeof animType;
}

const AnimatedPressable = (props: AnimatedButtonProps) => {
  const scaleAnim = useSharedValue(1);
  const onPressIn = () => {
    scaleAnim.value = props.scaledAnimValue
      ? animType[props.scaledAnimValue]
      : 0.9;
  };
  const onPressOut = () => {
    scaleAnim.value = 1;
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withTiming(scaleAnim.value, { duration: 200 }) }],
    };
  });
  return (
    <AnimPressable
      {...props}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={[props.style, animatedStyle]}
    >
      {props.children}
    </AnimPressable>
  );
};

export default AnimatedPressable;

const styles = StyleSheet.create({});
