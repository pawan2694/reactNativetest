import React from "react";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    ViewStyle,
} from "react-native";
import { hp, wp } from "../../utils/helpers";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  size = "medium",
  loading = false,
  disabled = false,
  style,
  textStyle,
  icon,
}) => {
  const getButtonStyles = () => {
    const baseStyles: ViewStyle = {
      borderRadius: 12,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      opacity: disabled ? 0.6 : 1,
    };

    const sizeStyles: Record<string, ViewStyle> = {
      small: {
        paddingHorizontal: wp(4),
        paddingVertical: hp(1),
        minHeight: hp(4),
      },
      medium: {
        paddingHorizontal: wp(6),
        paddingVertical: hp(1.5),
        minHeight: hp(5),
      },
      large: {
        paddingHorizontal: wp(8),
        paddingVertical: hp(2),
        minHeight: hp(6),
      },
    };

    const variantStyles: Record<string, ViewStyle> = {
      primary: { backgroundColor: "#FF6B6B" },
      secondary: { backgroundColor: "#4ECDC4" },
      outline: {
        backgroundColor: "transparent",
        borderWidth: 2,
        borderColor: "#FF6B6B",
      },
    };

    return [baseStyles, sizeStyles[size], variantStyles[variant], style];
  };

  const getTextStyles = () => {
    const baseStyles: TextStyle = {
      fontWeight: "600",
      textAlign: "center",
    };

    const sizeStyles: Record<string, TextStyle> = {
      small: { fontSize: 14 },
      medium: { fontSize: 16 },
      large: { fontSize: 18 },
    };

    const variantStyles: Record<string, TextStyle> = {
      primary: { color: "#FFFFFF" },
      secondary: { color: "#FFFFFF" },
      outline: { color: "#FF6B6B" },
    };

    return [baseStyles, sizeStyles[size], variantStyles[variant], textStyle];
  };

  const renderContent = () => {
    if (loading) {
      return (
        <ActivityIndicator
          color={variant === "outline" ? "#FF6B6B" : "#FFFFFF"}
        />
      );
    }

    return (
      <>
        {icon && <>{icon}</>}
        <Text style={getTextStyles()}>{title}</Text>
      </>
    );
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={getButtonStyles()}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  gradient: {
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
