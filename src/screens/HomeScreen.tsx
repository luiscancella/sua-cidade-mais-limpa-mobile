import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RouteProp, useRoute } from "@react-navigation/native";
import MapView from "react-native-maps";
import { GooglePlaceData, GooglePlaceDetail } from "react-native-google-places-autocomplete";

import { GlobalContext } from "src/hooks/GlobalContext";

import { RootStackParamList } from "src/types/RootStackParamList";
import { SearchAddress } from "src/components/SearchAddress";

type ScreenRouteProps = RouteProp<RootStackParamList, "Home">;

export function HomeScreen() {
  const props = useRoute<ScreenRouteProps>();
  const { location, } = React.useContext(GlobalContext);

  const [estimatedTime, setEstimatedTime] = useState(10);
  const [estimatedTimeSufix, setEstimatedTimeSufix] = useState("minutos");

  function handleLocationSelected(data: GooglePlaceData, details: GooglePlaceDetail | null) {
    console.log("Selected location:", data);
    console.log("Location details:", details);
  }

  return (
    <>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location ? location.latitude : 0,
          longitude: location ? location.longitude : 0,
          latitudeDelta: 0.0143,
          longitudeDelta: 0.0134,
        }}
        showsUserLocation
        loadingEnabled
      />
      <SafeAreaView>
        <View style={styles.topBox}>
          <SearchAddress
            onPress={(data, details) => {
              console.log(JSON.stringify(data, null, 2));
              console.log(JSON.stringify(details, null, 2));
              handleLocationSelected(data, details);
            }}
            placeholder="Altere o endereço aqui"
          />
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
  addresInputBox: {
    width: "90%",
    backgroundColor: "#ffffff",
    marginHorizontal: "auto",
    marginTop: 12,
  },
  estimatedTimeText: {
    width: "95%",
    marginHorizontal: "auto",
    marginVertical: 14,
    textAlign: "center",
    fontSize: 17,
  },
  estimatedTimeValue: {
    fontWeight: "bold",
  }
});