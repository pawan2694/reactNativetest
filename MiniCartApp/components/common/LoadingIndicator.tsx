import React from "react";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
    ViewStyle,
} from "react-native";
import { hp, wp } from "../../utils/helpers";

interface LoadingIndicatorProps {
  size?: "small" | "large";
  color?: string;
  text?: string;
  style?: ViewStyle;
  fullScreen?: boolean;
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  size = "large",
  color = "#FF6B6B",
  text,
  style,
  fullScreen = false,
}) => {
  const containerStyle = fullScreen
    ? [styles.fullScreenContainer, style]
    : [styles.container, style];

  return (
    <View style={containerStyle}>
      <ActivityIndicator size={size} color={color} />
      {text && <Text style={styles.text}>{text}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  container: {
    padding: wp(5),
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginTop: hp(2),
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
  },
});
