import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { ETAStatus } from "src/types";

export function ETACard({ status }: { status: ETAStatus }) {
  const content = getETAContent(status);

  return (
    <View style={styles.container}>
      <Ionicons name={content.icon} size={24} color="white" />
      <View style={styles.textContainer}>
        <Text style={styles.label}>{content.label}</Text>
        {content.value ? (
          <Text style={styles.value}>{content.value}</Text>
        ) : (
          <Text style={styles.subtext}>{content.subtext}</Text>
        )}
      </View>
    </View>
  );
}

function getETAContent(status: ETAStatus): {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  label: string;
  value?: string;
  subtext?: string;
} {
  switch (status.kind) {
    case "available":
      return {
        icon: "time",
        label: "A coleta de lixo irá chegar em:",
        value: `${status.minutes} minutos`,
      };
    case "calculating":
    case "connecting":
      return {
        icon: "time",
        label: "A coleta de lixo irá chegar em:",
        value: "Calculando...",
      };
    case "unavailable":
      return {
        icon: "time-outline",
        label: "Nenhum caminhão na sua região",
        subtext: "Você será notificado quando um chegar",
      };
    case "no_connection":
      return {
        icon: "cloud-offline-outline",
        label: "Sem conexão com o servidor",
        subtext: "Verifique sua internet e tente novamente",
      };
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#49C5A0",
    marginTop: 15,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: "rgba(255, 255, 255, 0.5)",
    padding: 8,
    paddingLeft: 12,
  },
  textContainer: {
    marginLeft: 12,
  },
  label: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "300",
  },
  subtext: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 16,
    fontWeight: "300",
    marginTop: 2,
  },
  value: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
  },
});
