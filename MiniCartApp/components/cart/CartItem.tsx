import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useCart } from "../../context/CartContext";
import { CartItem as CartItemType } from "../../types";
import { formatCurrency, hp, wp } from "../../utils/helpers";
import { Card } from "../common/Card";

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleIncrease = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      removeFromCart(item.id);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  return (
    <Card style={styles.container} elevation={2}>
      <Image
        source={{ uri: item.image }}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={2}>
            {item.title}
          </Text>
          <TouchableOpacity onPress={handleRemove} style={styles.removeButton}>
            <Icon name="close" size={20} color="#FF6B6B" />
          </TouchableOpacity>
        </View>

        <Text style={styles.category}>{item.category}</Text>

        <View style={styles.footer}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={handleDecrease}
              style={styles.quantityButton}
              disabled={item.quantity === 1}
            >
              <Icon
                name={item.quantity === 1 ? "trash-can-outline" : "minus"}
                size={20}
                color={item.quantity === 1 ? "#FF6B6B" : "#2D3436"}
              />
            </TouchableOpacity>

            <View style={styles.quantityDisplay}>
              <Text style={styles.quantityText}>{item.quantity}</Text>
            </View>

            <TouchableOpacity
              onPress={handleIncrease}
              style={styles.quantityButton}
            >
              <Icon name="plus" size={20} color="#2D3436" />
            </TouchableOpacity>
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.unitPrice}>
              {formatCurrency(item.price)} each
            </Text>
            <Text style={styles.totalPrice}>
              {formatCurrency(item.price * item.quantity)}
            </Text>
          </View>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: wp(2),
    marginVertical: hp(1),
    padding: wp(3),
  },
  image: {
    width: wp(20),
    height: wp(20),
    borderRadius: 8,
    backgroundColor: "#F8F9FA",
  },
  content: {
    flex: 1,
    marginLeft: wp(3),
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: "#2D3436",
    marginRight: wp(2),
  },
  removeButton: {
    padding: wp(1),
  },
  category: {
    fontSize: 12,
    color: "#636E72",
    marginTop: hp(0.5),
    textTransform: "capitalize",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: hp(2),
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    borderRadius: 8,
    padding: wp(1),
  },
  quantityButton: {
    width: wp(8),
    height: wp(8),
    justifyContent: "center",
    alignItems: "center",
  },
  quantityDisplay: {
    width: wp(10),
    alignItems: "center",
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2D3436",
  },
  priceContainer: {
    alignItems: "flex-end",
  },
  unitPrice: {
    fontSize: 12,
    color: "#636E72",
    marginBottom: hp(0.5),
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FF6B6B",
  },
});
