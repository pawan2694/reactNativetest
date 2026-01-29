import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { hp, wp } from "../../utils/helpers";
import { Button } from "../common/Button";

interface EmptyCartProps {
  onShopNow: () => void;
}

export const EmptyCart: React.FC<EmptyCartProps> = ({ onShopNow }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon name="cart-outline" size={wp(25)} color="#DFE6E9" />
      </View>

      <Text style={styles.title}>Your cart is empty</Text>

      <Text style={styles.description}>
        Looks like you haven't added any items to your cart yet. Start shopping
        to fill it up!
      </Text>

      <Button
        title="Shop Now"
        onPress={onShopNow}
        variant="primary"
        size="large"
        style={styles.button}
        icon={
          <Icon
            name="shopping"
            size={20}
            color="#FFFFFF"
            style={styles.buttonIcon}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: wp(10),
  },
  iconContainer: {
    marginBottom: hp(4),
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2D3436",
    marginBottom: hp(2),
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#636E72",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: hp(4),
  },
  button: {
    minWidth: wp(40),
  },
  buttonIcon: {
    marginRight: wp(2),
  },
});
