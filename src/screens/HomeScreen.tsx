import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
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
import { GoogleAutocompleteInput } from "src/components/GoogleAutocompleteInput";
import { UserLocation } from "src/types";
import { TruckMarker } from "src/components/TruckMarker";
import NotificationService from "src/service/NotificationService";
import UserService from "src/service/UserService";

export function HomeScreen() {
  const { currentLocation, saveCurrentLocation, getHeaders, clearData } = useRequiredCurrentLocation();
  const { showError } = useError();
  const [estimatedTimePreviewText, setEstimatedTimePreviewText] = useState("Calculando...");
  const ref = React.useRef<GooglePlacesAutocompleteRef | null>(null);
  const mapRef = React.useRef<MapView | null>(null);
  const { TruckDistance, isConnected, connectionFailed, reconnect } = useTruckDistances({ phone_id: currentLocation?.phone_id });
  const { truckIds, animatedRegions, bearings } = useTruckMapPositions();

  useEffect(() => {
    // Use isso caso queira limpar a localização e limpar o fluxo
    // clearData();

    console.log("Requesting notification permission and device token...");
    async function registerForPushNotifications() {
      try {
        const token = await NotificationService.getToken();
        console.log("Device token obtained:", token);
        if (token) {
          console.warn(getHeaders());
          UserService.registerFCMToken(currentLocation.phone_id, token, getHeaders());
          return;
        }
        showError("Erro de Notificação", "Não foi possível obter permissão para notificações. Por favor, verifique as configurações do seu dispositivo.");
      } catch (error) {
        console.error("Error obtaining device token:", error);
        showError("Erro de Notificação", "Não foi possível obter permissão para notificações. Por favor, verifique as configurações do seu dispositivo.");
      }
    }

    registerForPushNotifications();
  }, []);

  useEffect(() => {
    if (connectionFailed) {
      showError(
        "Erro de conexão",
        "Não foi possível conectar ao servidor. Verifique a internet e reinicie o aplicativo.",
      );
      setEstimatedTimePreviewText("Sem conexão");
      return;
    }

    if (!isConnected) {
      setEstimatedTimePreviewText("Conectando...");
    } else if (TruckDistance) {
      setEstimatedTimePreviewText(`${Math.round(TruckDistance.etaMinutes)} minutos`);
    } else {
      setTimeout(() => {
        if (!TruckDistance) {
          setEstimatedTimePreviewText("Caminhões Indisponíveis");
          Toast.show({
            type: "info",
            text1: "Caminhões Indisponíveis",
            text2: "Não foi possível obter a localização dos caminhões. Por favor, tente novamente mais tarde.",
          });
        }
      }, 10000);
      setEstimatedTimePreviewText("Calculando...");
    }
  }, [TruckDistance, isConnected, connectionFailed]);

  useEffect(() => {
    if (currentLocation && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: currentLocation.address.latitude,
        longitude: currentLocation.address.longitude,
        latitudeDelta: 0.0143,
        longitudeDelta: 0.0134,
      }, 1000);
    }
  }, [currentLocation]);

  async function handleLocationSelection(userLocation: UserLocation) {
    try {
      saveCurrentLocation(userLocation);
      setEstimatedTimePreviewText("Calculando...");
      reconnect();
    } catch (error) {
      console.error("Erro ao salvar localização:", error);
      showError("Erro ao salvar localização", "Não foi possível salvar a localização. Tente novamente.");
    }
    ref.current?.setAddressText(userLocation.address.short_address);
  }

  return (
    <>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: currentLocation.address.latitude,
          longitude: currentLocation.address.longitude,
          latitudeDelta: 0.0143,
          longitudeDelta: 0.0134,
        }}
        loadingEnabled={true}
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
              textInputProps={{
                placeholderTextColor: "#fff",
              }}
              onError={() => showError("Erro ao selecionar endereço", "Não foi possível processar o endereço selecionado. Por favor tente novamente ou contate o suporte.")}
              updateCurrentLocationOnSelect={true}
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
