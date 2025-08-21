import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RouteProp, useRoute } from "@react-navigation/native";
import MapView, { Marker, PROVIDER_DEFAULT, } from "react-native-maps";
import { GooglePlaceData, GooglePlaceDetail, GooglePlacesAutocompleteRef, Styles } from "react-native-google-places-autocomplete";

import { GlobalContext } from "src/hooks/GlobalContext";

import { RootStackParamList } from "src/types/RootStackParamList";
import { SearchAddress } from "src/components/SearchAddress";
import { StyledButton } from "src/components/StyledButton";
import { LocationDTO } from "src/types/LocationDTO";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

type ScreenRouteProps = RouteProp<RootStackParamList, "Home">;

export function HomeScreen() {
  const props = useRoute<ScreenRouteProps>();
  const { location, } = React.useContext(GlobalContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPageLocation, setSelectedPageLocation] = useState<LocationDTO | undefined>(location);
  const [estimatedTimePreviewText, setEstimatedTimePreviewText] = useState("10 minutos");
  const ref = React.useRef<GooglePlacesAutocompleteRef | null>(null);

  function handleLocationSelected(data: GooglePlaceData, details: GooglePlaceDetail | null) {
    console.log("handleLocationSelected called");
    console.log("Selected location:", data);
    console.log("Location details:", details);
  }

  function setAddressSearchBarText() {
    if (selectedPageLocation) {
      ref.current?.setAddressText(selectedPageLocation.short_address || selectedPageLocation.full_address || "NÃO ENCONTRADO!");
    }
  }

  useEffect(() => {
    if (selectedPageLocation) {
      setAddressSearchBarText();
    }
  }, [selectedPageLocation]);

  return (
    <>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location?.latitude ?? 0,
          longitude: location?.longitude ?? 0,
          latitudeDelta: 0.0143,
          longitudeDelta: 0.0134,
        }}
        loadingEnabled={true}
        provider={PROVIDER_DEFAULT}
      >
        <Marker
          coordinate={{
            latitude: location?.latitude ?? 0,
            longitude: location?.longitude ?? 0,
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
            <SearchAddress
              ref={ref}
              icon={<Ionicons name="location-outline" size={24} color="white" />}
              styles={searchAddressStyles}
              textInputProps={{
                placeholderTextColor: "#fff",
              }}
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