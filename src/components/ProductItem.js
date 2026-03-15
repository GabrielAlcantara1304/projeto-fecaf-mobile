import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

export default function ProductItem({
  title,
  price,
  thumbnail,
  discountPercentage,
  onPress,
}) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: thumbnail }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.price}>R$ {price.toFixed(2)}</Text>
        <Text style={styles.discount}>{discountPercentage}% OFF</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 8,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 6,
    backgroundColor: "#fff",
  },
  image: { width: 80, height: 80, borderRadius: 4, marginRight: 8 },
  info: { flex: 1, justifyContent: "space-between" },
  title: { fontWeight: "bold" },
  price: { color: "#2e7d32" },
  discount: { color: "#e53935", fontSize: 12 },
});

