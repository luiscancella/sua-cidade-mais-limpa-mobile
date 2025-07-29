import React from "react"
import { StyleSheet, View, Text, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";

import { StyledButton } from "../components/StyledButton";
import { Ionicons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "src/types/RootStackParamList";

type ScreenNavigationProp = NavigationProp<RootStackParamList, "Welcome">;

export function WelcomeScreen() {
  const navigation = useNavigation<ScreenNavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={[styles.title, styles.welcomeTitle]}> Bem-Vindo ao </Text>
      <Text style={[styles.title, styles.nameTitle]}> Sua Cidade + Limpa </Text>
      <StyledButton onPress={() => {navigation.navigate("Address and Terms")}} style={styles.button}>
        <Text style={styles.buttonText}> Prosseguir </Text>
        <Ionicons name="arrow-forward" size={32} color="black"></Ionicons>
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
    marginTop: 13
  },
  buttonText: {
    color: "black",
    fontSize: 30
  },
});