import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker, PROVIDER_DEFAULT, } from "react-native-maps";
import { GooglePlacesAutocompleteRef, Styles } from "react-native-google-places-autocomplete";
import { useCurrentLocation } from "src/hooks/useCurrentLocation";
import { useError } from "src/hooks/useModal";
import { GoogleAutocompleteInput } from "src/components/GoogleAutocompleteInput";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useTruckDistances } from "src/hooks/useTruckPositions";
import Toast from "react-native-toast-message";

export function HomeScreen() {
  const { currentLocation, saveCurrentLocation, clearData } = useCurrentLocation();
  const { showError } = useError();
  const [ estimatedTimePreviewText, setEstimatedTimePreviewText ] = useState("Calculando...");
  const ref = React.useRef<GooglePlacesAutocompleteRef | null>(null);

  useEffect(() => {
    // clearData();
  }, []);

  const { TruckDistance, isConnected, hasConnectedBefore } = useTruckDistances({ 
    phone_id: currentLocation?.phone_id
  });

  useEffect(() => {
    if (!isConnected && hasConnectedBefore) {
      Toast.show({
        type: 'error',
        text1: 'Conexão perdida',
        text2: 'A conexão com o caminhão de coleta de lixo foi perdida. Estamos tentando reconectar...',
        position: 'top',
        visibilityTime: 10000,
      });
    }
    if (isConnected && hasConnectedBefore) {
      Toast.show({
        type: 'success',
        text1: 'Conexão restabelecida',
        text2: 'A conexão com o caminhão de coleta de lixo foi restabelecida.',
        position: 'top',
        visibilityTime: 10000,
      });
    }
  }, [isConnected, hasConnectedBefore]);

  useEffect(() => {
    setEstimatedTimePreviewText(
      TruckDistance
        ? `${Math.round(TruckDistance.etaMinutes)} minutos`
        : "Calculando..."
    );
  }, [TruckDistance]);

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
              onError={() => showError("Erro ao selecionar endereço", "Não foi possível processar o endereço selecionado. Por favor tente novamente ou contate o suporte.")}
              onLocationSelected={saveCurrentLocation}
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