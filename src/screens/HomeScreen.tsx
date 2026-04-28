import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { GooglePlacesAutocompleteRef, Styles } from "react-native-google-places-autocomplete";
import Toast from "react-native-toast-message";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

import { useError } from "src/hooks/useModal";
import { useTruckDistances } from "src/hooks/useTruckPositions";
import { useTruckMapPositions } from "src/hooks/useTruckMapPositions";
import { useRequiredCurrentLocation } from "src/hooks/useCurrentLocation";
import { usePushNotification } from "src/hooks/usePushNotification";
import { GoogleAutocompleteInput } from "src/components/GoogleAutocompleteInput";
import { ETACard } from "src/components/ETACard";
import { Address, ETAStatus } from "src/types";
import { TruckMarker } from "src/components/TruckMarker";

const MAP_DELTA = { latitudeDelta: 0.0143, longitudeDelta: 0.0134 };

export function HomeScreen() {
  const { currentLocation, getHeaders } = useRequiredCurrentLocation();
  const { showError } = useError();
  const [etaStatus, setEtaStatus] = useState<ETAStatus>({ kind: "calculating" });

  const ref = useRef<GooglePlacesAutocompleteRef | null>(null);
  const mapRef = useRef<MapView | null>(null);
  const unavailableTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { TruckDistance, isConnected, connectionFailed, reconnect } = useTruckDistances({
    phone_id: currentLocation?.phone_id,
  });
  const { truckIds, animatedRegions, bearings } = useTruckMapPositions();

  usePushNotification({ phoneId: currentLocation.phone_id, getHeaders });

  useEffect(() => {
    return () => {
      if (unavailableTimerRef.current) clearTimeout(unavailableTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (unavailableTimerRef.current) {
      clearTimeout(unavailableTimerRef.current);
      unavailableTimerRef.current = null;
    }

    if (connectionFailed) {
      showError(
        "Erro de conexão",
        "Não foi possível conectar ao servidor. Verifique a internet e reinicie o aplicativo.",
      );
      setEtaStatus({ kind: "no_connection" });
      return;
    }

    if (!isConnected) {
      setEtaStatus({ kind: "connecting" });
      return;
    }

    if (TruckDistance) {
      setEtaStatus({ kind: "available", minutes: Math.round(TruckDistance.etaMinutes) });
      return;
    }

    setEtaStatus({ kind: "calculating" });
    unavailableTimerRef.current = setTimeout(() => {
      setEtaStatus({ kind: "unavailable" });
      Toast.show({
        type: "info",
        text1: "Nenhum caminhão disponível",
        text2: "Você será notificado quando um chegar na sua região.",
      });
    }, 10000);
  }, [TruckDistance, isConnected, connectionFailed]);

  useEffect(() => {
    if (currentLocation && mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: currentLocation.address.latitude,
          longitude: currentLocation.address.longitude,
          ...MAP_DELTA,
        },
        1000,
      );
    }
  }, [currentLocation]);

  async function handleLocationSelection(userLocation: Address) {
    try {
      if (unavailableTimerRef.current) {
        clearTimeout(unavailableTimerRef.current);
        unavailableTimerRef.current = null;
      }
      setEtaStatus({ kind: "calculating" });
      reconnect();
    } catch (error) {
      console.error("Erro ao salvar localização:", error);
      showError("Erro ao salvar localização", "Não foi possível salvar a localização. Tente novamente.");
    }
  }

  return (
    <>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: currentLocation.address.latitude,
          longitude: currentLocation.address.longitude,
          ...MAP_DELTA,
        }}
        loadingEnabled
        provider={PROVIDER_GOOGLE}
      >
        <Marker
          coordinate={{
            latitude: currentLocation.address.latitude,
            longitude: currentLocation.address.longitude,
          }}
        />
        {truckIds.map((id) => (
          <TruckMarker
            key={id}
            coordinate={animatedRegions.get(id)!}
            rotation={bearings[id] ?? 0}
          />
        ))}
      </MapView>

      <View style={styles.container} pointerEvents="box-none">
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
              textInputProps={{ placeholderTextColor: "#fff" }}
              onError={() =>
                showError(
                  "Erro ao selecionar endereço",
                  "Não foi possível processar o endereço selecionado. Por favor tente novamente ou contate o suporte.",
                )
              }
              updateCurrentLocationOnSelect
              onLocationSelected={handleLocationSelection}
            />
            <ETACard status={etaStatus} />
          </SafeAreaView>
        </LinearGradient>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    zIndex: -2,
    position: "absolute",
    width: "100%",
    height: "100%",
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
    paddingHorizontal: 25,
    paddingBottom: 15,
    borderBottomLeftRadius: 37,
    borderBottomRightRadius: 37,
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
    fontSize: 16,
    fontWeight: "300",
    color: "#fff",
  },
  listView: {},
};
