import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const wp = (percentage: number) => {
  return (percentage * width) / 100;
};

export const hp = (percentage: number) => {
  return (percentage * height) / 100;
};

export const formatCurrency = (amount: number): string => {
  return `$${amount.toFixed(2)}`;
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};
