import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useAppDispatch } from "../store";
import { login } from "../store/authSlice";

export default function LoginScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useAppDispatch();

  function handleLogin() {
    if (!name.trim() || !email.trim()) {
      Alert.alert("Atenção", "Preencha todos os campos.");
      return;
    }

    dispatch(login({ name, email }));
    navigation.replace("Products");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 16 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 4,
    marginBottom: 12,
  },
});

