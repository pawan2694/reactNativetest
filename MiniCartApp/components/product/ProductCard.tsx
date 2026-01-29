import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useCart } from "../../context/CartContext";
import { Product } from "../../types";
import { formatCurrency, hp, truncateText, wp } from "../../utils/helpers";
import { Button } from "../common/Button";
import { Card } from "../common/Card";

interface ProductCardProps {
  product: Product;
  onPress?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onPress,
}) => {
  const { addToCart, cart } = useCart();
  const cartItem = cart.find((item) => item.id === product.id);
  const isInCart = !!cartItem;

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <Card
      style={styles.container}
      onPress={onPress}
      animated={true}
      elevation={3}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{product.category}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {truncateText(product.title, 50)}
        </Text>

        <View style={styles.ratingContainer}>
          <Icon name="star" size={16} color="#FFD700" />
          <Text style={styles.ratingText}>
            {product.rating.rate} ({product.rating.count})
          </Text>
        </View>

        <Text style={styles.description} numberOfLines={2}>
          {product.description}
        </Text>

        <View style={styles.footer}>
          <View>
            <Text style={styles.price}>{formatCurrency(product.price)}</Text>
            {isInCart && (
              <Text style={styles.inCartText}>
                In cart: {cartItem.quantity}
              </Text>
            )}
          </View>

          <Button
            title={isInCart ? "Add More" : "Add to Cart"}
            onPress={handleAddToCart}
            size="small"
            variant={isInCart ? "secondary" : "primary"}
            style={styles.addButton}
          />
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: wp(2),
    marginVertical: hp(1),
    padding: 0,
    overflow: "hidden",
  },
  imageContainer: {
    position: "relative",
    height: hp(20),
    backgroundColor: "#F8F9FA",
    padding: wp(4),
  },
  image: {
    width: "100%",
    height: "100%",
  },
  categoryBadge: {
    position: "absolute",
    top: wp(3),
    left: wp(3),
    backgroundColor: "rgba(255, 107, 107, 0.9)",
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.5),
    borderRadius: 12,
  },
  categoryText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  content: {
    padding: wp(4),
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2D3436",
    marginBottom: hp(1),
    lineHeight: 22,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp(1),
  },
  ratingText: {
    marginLeft: wp(1),
    fontSize: 14,
    color: "#666666",
  },
  description: {
    fontSize: 14,
    color: "#636E72",
    lineHeight: 20,
    marginBottom: hp(2),
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 20,
    fontWeight: "800",
    color: "#FF6B6B",
  },
  inCartText: {
    fontSize: 12,
    color: "#4ECDC4",
    marginTop: hp(0.5),
  },
  addButton: {
    minWidth: wp(25),
  },
});
