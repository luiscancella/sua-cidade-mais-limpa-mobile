import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyledInput } from "src/components/StyledInput";
import { RootStackParamList } from "src/types/RootStackParamList";

type ScreenRouteProps = RouteProp<RootStackParamList, "Home">;

export function Home() {
  const props = useRoute<ScreenRouteProps>();

  const [estimatedTime, setEstimatedTime] = useState(10);
  const [estimatedTimeSufix, setEstimatedTimeSufix] = useState("minutos");

  return (
    <>
      <MapView style={styles.map} />
      <SafeAreaView>
        <View style={styles.topBox}>
          <StyledInput style={styles.addresInput} />
          <Text style={styles.estimatedTimeText}>A coleta de lixo irá chegar em: <Text style={styles.estimatedTimeValue}>{estimatedTime} {estimatedTimeSufix}</Text></Text>
        </View>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  map: {
    zIndex: 0,
    position: "absolute",
    width: '100%',
    height: '100%',
  },
  container: {
    zIndex: 1,
    flex: 1,
    width: "100%",
    height: "100%",
  },
  topBox: {
    backgroundColor: "#D9D9D9",
    width: "90%",
    marginTop: 17,
    marginHorizontal: "auto",
    borderRadius: 20,
  },
  addresInput: {
    width: "90%",
    backgroundColor: "#ffffff",
    marginHorizontal: "auto",
    marginTop: 12,
  },
  estimatedTimeText: {
    width: "95%",
    marginHorizontal: "auto",
    marginVertical: 12,
    textAlign: "center",
    fontSize: 17,
  },
  estimatedTimeValue: {
    fontWeight: "bold",
  }
});