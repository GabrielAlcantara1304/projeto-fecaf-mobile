import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { getProductById } from "../services/api";

export default function ProductDetailsScreen({ route }) {
  const { id } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadProduct() {
    try {
      setLoading(true);
      setError("");
      const data = await getProductById(id);
      setProduct(data);
    } catch (e) {
      setError("Erro ao carregar detalhes do produto.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "red" }}>{error}</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.center}>
        <Text>Nenhum produto encontrado.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: product.thumbnail }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <Text style={styles.price}>Preço: R$ {product.price.toFixed(2)}</Text>
      <Text style={styles.discount}>
        Desconto: {product.discountPercentage}% OFF
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, alignItems: "center" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  image: {
    width: 180,
    height: 180,
    resizeMode: "contain",
    borderRadius: 8,
    marginBottom: 12,
  },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 8, alignSelf: "flex-start" },
  description: { fontSize: 14, marginBottom: 8, alignSelf: "flex-start" },
  price: { fontSize: 16, color: "#2e7d32", marginBottom: 4 },
  discount: { fontSize: 14, color: "#e53935" },
});

