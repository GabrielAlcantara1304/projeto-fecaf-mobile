import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch } from "../store";
import { logout } from "../store/authSlice";
import { getProductsByCategory } from "../services/api";
import ProductItem from "../components/ProductItem";

const maleCategories = ["mens-shirts", "mens-shoes", "mens-watches"];
const femaleCategories = [
  "womens-bags",
  "womens-dresses",
  "womens-jewellery",
  "womens-shoes",
  "womens-watches",
];

export default function ProductListScreen() {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const [genderTab, setGenderTab] = useState("masculino");
  const [category, setCategory] = useState(maleCategories[0]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadProducts(selectedCategory) {
    try {
      setLoading(true);
      setError("");
      const data = await getProductsByCategory(selectedCategory);
      setProducts(data.products || []);
    } catch (e) {
      setError("Erro ao carregar produtos. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts(category);
  }, [category]);

  function handleLogout() {
    dispatch(logout());
    navigation.replace("Login");
  }

  const categories =
    genderTab === "masculino" ? maleCategories : femaleCategories;

  return (
    <View style={styles.container}>
      <View className="header" style={styles.header}>
        <Text style={styles.title}>Catálogo de Produtos</Text>
        <Button title="Sair" onPress={handleLogout} />
      </View>

      <View style={styles.tabsRow}>
        <Text
          style={[
            styles.tab,
            genderTab === "masculino" && styles.tabActive,
          ]}
          onPress={() => {
            setGenderTab("masculino");
            setCategory(maleCategories[0]);
          }}
        >
          Masculino
        </Text>
        <Text
          style={[
            styles.tab,
            genderTab === "feminino" && styles.tabActive,
          ]}
          onPress={() => {
            setGenderTab("feminino");
            setCategory(femaleCategories[0]);
          }}
        >
          Feminino
        </Text>
      </View>

      <View style={styles.subTabsRow}>
        {categories.map((cat) => (
          <Text
            key={cat}
            style={[
              styles.subTab,
              category === cat && styles.subTabActive,
            ]}
            onPress={() => setCategory(cat)}
          >
            {cat}
          </Text>
        ))}
      </View>

      {loading && <ActivityIndicator style={{ marginTop: 16 }} />}

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <FlatList
        data={products}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ paddingVertical: 8 }}
        renderItem={({ item }) => (
          <ProductItem
            title={item.title}
            price={item.price}
            thumbnail={item.thumbnail}
            discountPercentage={item.discountPercentage}
            onPress={() =>
              navigation.navigate("ProductDetails", { id: item.id })
            }
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: { fontSize: 20, fontWeight: "bold" },
  tabsRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  tab: {
    flex: 1,
    textAlign: "center",
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  tabActive: {
    backgroundColor: "#1976d2",
    color: "#fff",
    fontWeight: "bold",
  },
  subTabsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 8,
  },
  subTab: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    marginRight: 4,
    marginBottom: 4,
    fontSize: 12,
  },
  subTabActive: {
    backgroundColor: "#1976d2",
    color: "#fff",
  },
  error: { color: "red", marginTop: 8 },
});

