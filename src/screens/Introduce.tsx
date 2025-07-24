import React from "react"
import { StyleSheet, View, Text, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";

import { StyledButton } from "../components/StyledButton";
import { Ionicons } from "@expo/vector-icons";

export function Introduce() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={[styles.title, styles.welcomeTitle]}> Bem-Vindo ao </Text>
      <Text style={[styles.title, styles.nameTitle]}> Sua Cidade + Limpa </Text>
      <StyledButton onPress={() => {}} style={styles.button}>
        <Text style={{
          color: "#fff",
          fontSize: 30
        }}> Prosseguir </Text>
        <Ionicons name="arrow-forward" size={32} color="white"></Ionicons>
      </StyledButton>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: "#000",
  },
  welcomeTitle: {
    fontSize: 35,
    fontStyle: "italic",

  },
  nameTitle: {
    fontSize: 40,
    fontWeight: "bold",
  },
  button: {
    flexDirection: "row",
    marginTop: 10
  },
});