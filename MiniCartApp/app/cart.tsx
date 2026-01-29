import { useRouter } from "expo-router";
import React, { useCallback } from "react";
import {
    FlatList,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { CartItem } from "../components/cart/CartItem";
import { EmptyCart } from "../components/cart/EmptyCart";
import { Button } from "../components/common/Button";
import { useCart } from "../context/CartContext";
import { formatCurrency, hp, wp } from "../utils/helpers";

export default function CartScreen() {
  const router = useRouter();
  const { cart, getCartTotal, clearCart } = useCart();

  const handleCheckout = useCallback(() => {
    alert("Checkout functionality would be implemented here!");
  }, []);

  const handleShopNow = useCallback(() => {
    router.back();
  }, []);

  const handleClearCart = useCallback(() => {
    clearCart();
  }, []);

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Icon name="chevron-left" size={28} color="#2D3436" />
      </TouchableOpacity>
      <Text style={styles.title}>Shopping Cart</Text>
      <View style={styles.headerRight} />
    </View>
  );

  const renderCartItem = useCallback(
    ({ item }: { item: any }) => <CartItem item={item} />,
    [],
  );

  const renderFooter = () => {
    if (cart.length === 0) return null;

    const total = getCartTotal();
    const deliveryFee = total > 50 ? 0 : 4.99;
    const tax = total * 0.08;
    const grandTotal = total + deliveryFee + tax;

    return (
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Order Summary</Text>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>{formatCurrency(total)}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Delivery Fee</Text>
          <Text
            style={[styles.summaryValue, deliveryFee === 0 && styles.freeText]}
          >
            {deliveryFee === 0 ? "FREE" : formatCurrency(deliveryFee)}
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Tax (8%)</Text>
          <Text style={styles.summaryValue}>{formatCurrency(tax)}</Text>
        </View>

        <View style={styles.divider} />

        <View style={[styles.summaryRow, styles.grandTotalRow]}>
          <Text style={styles.grandTotalLabel}>Grand Total</Text>
          <Text style={styles.grandTotalValue}>
            {formatCurrency(grandTotal)}
          </Text>
        </View>

        {total < 50 && (
          <View style={styles.freeDeliveryBanner}>
            <Icon name="truck-fast" size={20} color="#4ECDC4" />
            <Text style={styles.freeDeliveryText}>
              Add {formatCurrency(50 - total)} more for free delivery!
            </Text>
          </View>
        )}

        <View style={styles.actionButtons}>
          <Button
            title="Clear Cart"
            onPress={handleClearCart}
            variant="outline"
            style={styles.clearButton}
          />
          <Button
            title="Proceed to Checkout"
            onPress={handleCheckout}
            variant="primary"
            style={styles.checkoutButton}
            icon={
              <Icon
                name="arrow-right"
                size={20}
                color="#FFFFFF"
                style={styles.checkoutIcon}
              />
            }
          />
        </View>
      </View>
    );
  };

  if (cart.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        {renderHeader()}
        <EmptyCart onShopNow={handleShopNow} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      {renderHeader()}

      <FlatList
        data={cart}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListFooterComponent={renderFooter}
        ListHeaderComponent={() => (
          <View style={styles.cartHeader}>
            <Text style={styles.cartCount}>
              {cart.length} item{cart.length !== 1 ? "s" : ""} in cart
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
    borderBottomWidth: 1,
    borderBottomColor: "#F1F2F6",
  },
  backButton: {
    padding: wp(1),
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2D3436",
  },
  headerRight: {
    width: wp(10),
  },
  cartHeader: {
    paddingHorizontal: wp(4),
    paddingTop: hp(2),
    paddingBottom: hp(1),
  },
  cartCount: {
    fontSize: 16,
    color: "#636E72",
  },
  listContent: {
    paddingBottom: hp(4),
  },
  summaryContainer: {
    marginHorizontal: wp(4),
    marginTop: hp(3),
    padding: wp(4),
    backgroundColor: "#F8F9FA",
    borderRadius: 16,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2D3436",
    marginBottom: hp(2),
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp(1),
  },
  summaryLabel: {
    fontSize: 16,
    color: "#636E72",
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2D3436",
  },
  freeText: {
    color: "#4ECDC4",
  },
  divider: {
    height: 1,
    backgroundColor: "#DFE6E9",
    marginVertical: hp(2),
  },
  grandTotalRow: {
    marginTop: hp(1),
  },
  grandTotalLabel: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2D3436",
  },
  grandTotalValue: {
    fontSize: 20,
    fontWeight: "800",
    color: "#FF6B6B",
  },
  freeDeliveryBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(78, 205, 196, 0.1)",
    padding: wp(3),
    borderRadius: 8,
    marginTop: hp(2),
  },
  freeDeliveryText: {
    marginLeft: wp(2),
    fontSize: 14,
    color: "#4ECDC4",
    fontWeight: "500",
  },
  actionButtons: {
    flexDirection: "row",
    marginTop: hp(3),
  },
  clearButton: {
    flex: 1,
    marginRight: wp(2),
  },
  checkoutButton: {
    flex: 2,
  },
  checkoutIcon: {
    marginLeft: wp(2),
  },
});
