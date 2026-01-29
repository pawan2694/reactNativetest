import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
    FlatList,
    RefreshControl,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Button } from "../components/common/Button";
import { LoadingIndicator } from "../components/common/LoadingIndicator";
import { ProductCard } from "../components/product/ProductCard";
import { useCart } from "../context/CartContext";
import { productService } from "../services/api";
import { Product } from "../types";
import { hp, wp } from "../utils/helpers";

export default function ProductListScreen() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  const { getCartCount } = useCart();

  const fetchProducts = useCallback(async () => {
    try {
      setError(null);
      const data = await productService.getProducts();
      setProducts(data);
      setFilteredProducts(data);
    } catch (err) {
      setError("Failed to load products. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const data = await productService.getCategories();
      setCategories(data);
    } catch (err) {
      console.error("Failed to load categories:", err);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    let filtered = products;

    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory,
      );
    }

    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, products]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchProducts();
  }, []);

  const renderProductItem = useCallback(
    ({ item }: { item: Product }) => <ProductCard product={item} />,
    [],
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.greeting}>Hello, Shopper!</Text>
      <Text style={styles.subtitle}>Find amazing products for your needs</Text>

      <View style={styles.searchContainer}>
        <Icon
          name="magnify"
          size={20}
          color="#636E72"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#95A5A6"
        />
        {searchQuery ? (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <Icon name="close-circle" size={20} color="#95A5A6" />
          </TouchableOpacity>
        ) : null}
      </View>

      {categories.length > 0 && (
        <FlatList
          data={["All", ...categories]}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryChip,
                selectedCategory === (item === "All" ? null : item) &&
                  styles.categoryChipActive,
              ]}
              onPress={() => setSelectedCategory(item === "All" ? null : item)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === (item === "All" ? null : item) &&
                    styles.categoryTextActive,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
          style={styles.categoriesList}
        />
      )}
    </View>
  );

  const renderFooter = () => {
    if (loading) return null;
    if (filteredProducts.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Icon name="package-variant-closed" size={wp(20)} color="#DFE6E9" />
          <Text style={styles.emptyText}>No products found</Text>
          <Text style={styles.emptySubtext}>
            {searchQuery || selectedCategory
              ? "Try changing your search or filter"
              : "Failed to load products"}
          </Text>
          <Button
            title="Refresh"
            onPress={fetchProducts}
            variant="outline"
            style={styles.emptyButton}
          />
        </View>
      );
    }
    return <View style={styles.listFooter} />;
  };

  if (loading && !refreshing) {
    return <LoadingIndicator fullScreen text="Loading products..." />;
  }

  if (error && !refreshing) {
    return (
      <View style={styles.errorContainer}>
        <Icon name="alert-circle-outline" size={wp(25)} color="#FF6B6B" />
        <Text style={styles.errorText}>{error}</Text>
        <Button
          title="Retry"
          onPress={fetchProducts}
          variant="primary"
          style={styles.errorButton}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <FlatList
        data={filteredProducts}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={["#FF6B6B"]}
            tintColor="#FF6B6B"
          />
        }
        contentContainerStyle={styles.listContent}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews={true}
      />

      <TouchableOpacity
        style={styles.cartFAB}
        onPress={() => router.push("/cart")}
      >
        <Icon name="cart" size={24} color="#FFFFFF" />
        {getCartCount() > 0 && (
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>{getCartCount()}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  listContent: {
    paddingBottom: hp(10),
  },
  header: {
    paddingHorizontal: wp(4),
    paddingTop: hp(2),
    paddingBottom: hp(1),
    backgroundColor: "#FFFFFF",
  },
  greeting: {
    fontSize: 28,
    fontWeight: "700",
    color: "#2D3436",
    marginBottom: hp(0.5),
  },
  subtitle: {
    fontSize: 16,
    color: "#636E72",
    marginBottom: hp(2),
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.5),
    marginBottom: hp(2),
  },
  searchIcon: {
    marginRight: wp(2),
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#2D3436",
    padding: 0,
  },
  categoriesList: {
    marginBottom: hp(1),
  },
  categoryChip: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
    backgroundColor: "#F8F9FA",
    borderRadius: 20,
    marginRight: wp(2),
    marginBottom: hp(1),
  },
  categoryChipActive: {
    backgroundColor: "#FF6B6B",
  },
  categoryText: {
    fontSize: 14,
    color: "#636E72",
    fontWeight: "500",
  },
  categoryTextActive: {
    color: "#FFFFFF",
  },
  listFooter: {
    height: hp(10),
  },
  cartFAB: {
    position: "absolute",
    bottom: hp(3),
    right: wp(4),
    width: wp(15),
    height: wp(15),
    borderRadius: wp(7.5),
    backgroundColor: "#FF6B6B",
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  cartBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "#4ECDC4",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  cartBadgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: hp(10),
    paddingHorizontal: wp(10),
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2D3436",
    marginTop: hp(4),
    marginBottom: hp(1),
  },
  emptySubtext: {
    fontSize: 16,
    color: "#636E72",
    textAlign: "center",
    marginBottom: hp(4),
  },
  emptyButton: {
    minWidth: wp(30),
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: wp(10),
  },
  errorText: {
    fontSize: 18,
    color: "#2D3436",
    textAlign: "center",
    marginVertical: hp(4),
  },
  errorButton: {
    minWidth: wp(30),
  },
});
