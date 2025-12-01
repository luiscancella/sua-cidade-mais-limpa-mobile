import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker, PROVIDER_DEFAULT, } from "react-native-maps";
import { GooglePlacesAutocompleteRef, Styles } from "react-native-google-places-autocomplete";
import { useCurrentLocation } from "src/hooks/useCurrentLocation";
import { GoogleAutocompleteInput } from "src/components/GoogleAutocompleteInput";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { UserLocation } from "src/types";
import { useTruckDistances } from "src/hooks/useTruckPositions";

export function HomeScreen() {
  const { currentLocation, userCreatedOnServer, clearData } = useCurrentLocation();
  const [ selectedPageLocation, setSelectedPageLocation ] = useState<UserLocation | undefined>(currentLocation);
  const [ estimatedTimePreviewText, setEstimatedTimePreviewText ] = useState("Calculando...");
  const ref = React.useRef<GooglePlacesAutocompleteRef | null>(null);

  useEffect(() => {
    // clearData();
  }, []);

  const { TruckDistance, isConnected, error, reconnect } = useTruckDistances({ 
    phone_id: currentLocation?.phone_id,
    isUserSavedOnServer: userCreatedOnServer 
  });

  useEffect(() => {
    setEstimatedTimePreviewText(
      TruckDistance
        ? `${TruckDistance.etaMinutes} minutos`
        : "Calculando..."
    );
  }, [TruckDistance]);

  useEffect(() => {
    if (selectedPageLocation) {
      ref.current?.setAddressText(
        selectedPageLocation.short_address ||
        selectedPageLocation.full_address ||
        "NÃO ENCONTRADO!"
      );
    }
  }, [selectedPageLocation]);

  return (
    <>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: currentLocation?.latitude ?? 0,
          longitude: currentLocation?.longitude ?? 0,
          latitudeDelta: 0.0143,
          longitudeDelta: 0.0134,
        }}
        loadingEnabled={true}
        provider={PROVIDER_DEFAULT}
      >
        <Marker
          coordinate={{
            latitude: currentLocation?.latitude ?? 0,
            longitude: currentLocation?.longitude ?? 0,
          }}
        />
      </MapView>
      <View style={styles.container}>
        <LinearGradient
          colors={["#1CB788", "#19AB89"]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.topCardContainer}
        >
          <SafeAreaView>
            <GoogleAutocompleteInput
              ref={ref}
              icon={<Ionicons name="location-outline" size={24} color="white" />}
              styles={searchAddressStyles}
              textInputProps={{
                placeholderTextColor: "#fff",
              }}
              onLocationSelected={setSelectedPageLocation}
            />
            <View style={styles.estimatedTimeCardContainer}>
              <Ionicons name="time" size={24} color="white" />
              <View style={styles.estimatedTimeTextContainer}>
                <Text style={styles.estimatedTimeText}>A coleta de lixo irá chegar em:</Text>
                <Text style={styles.estimatedTimeValue}>{estimatedTimePreviewText}</Text>
              </View>
            </View>
          </SafeAreaView>
        </LinearGradient>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  map: {
    zIndex: -2,
    position: "absolute",
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    right: 0,
  },
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    zIndex: -1,
  },
  topCardContainer: {
    backgroundColor: "#D9D9D9",
    paddingHorizontal: 25,
    paddingBottom: 15,
    borderBottomLeftRadius: 37,
    borderBottomRightRadius: 37,
  },
  estimatedTimeCardContainer: {
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
  estimatedTimeTextContainer: {
    // borderWidth: 1,
    marginLeft: 12,
  },
  estimatedTimeText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "300",
  },
  estimatedTimeValue: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
  },
});

const searchAddressStyles: Partial<Styles> = {
  container: {
    marginTop: 15,
  },
  textInputContainer: {
    backgroundColor: "#49C5A0",
    borderColor: "rgba(255, 255, 255, 0.5)",
  },
  textInput: {
    // borderWidth: 1
    fontSize: 16,
    fontWeight: "300",
    color: "#fff",
  },
  listView: {

  },
};