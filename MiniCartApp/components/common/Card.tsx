import React from "react";
import {
    Animated,
    StyleSheet,
    TouchableWithoutFeedback,
    View,
    ViewStyle,
} from "react-native";
import { hp, wp } from "../../utils/helpers";

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  elevation?: number;
  animated?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  onPress,
  elevation = 2,
  animated = false,
}) => {
  const scaleValue = new Animated.Value(1);

  const handlePressIn = () => {
    if (animated) {
      Animated.spring(scaleValue, {
        toValue: 0.95,
        useNativeDriver: true,
      }).start();
    }
  };

  const handlePressOut = () => {
    if (animated) {
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  };

  const cardStyle = {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: elevation,
    },
    shadowOpacity: 0.1,
    shadowRadius: elevation * 2,
    elevation: elevation,
  };

  const Container = animated ? Animated.View : View;
  const containerStyle = animated
    ? [{ transform: [{ scale: scaleValue }] }, style]
    : style;

  if (onPress) {
    return (
      <TouchableWithoutFeedback
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Container style={[styles.card, cardStyle, containerStyle]}>
          {children}
        </Container>
      </TouchableWithoutFeedback>
    );
  }

  return (
    <Container style={[styles.card, cardStyle, style]}>{children}</Container>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: wp(4),
    marginHorizontal: wp(2),
    marginVertical: hp(1),
  },
});
