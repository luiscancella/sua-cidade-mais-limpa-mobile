import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RouteProp, useRoute } from "@react-navigation/native";
import MapView, { Marker, PROVIDER_DEFAULT, } from "react-native-maps";
import { GooglePlaceData, GooglePlaceDetail, GooglePlacesAutocompleteRef } from "react-native-google-places-autocomplete";

import { GlobalContext } from "src/hooks/GlobalContext";

import { RootStackParamList } from "src/types/RootStackParamList";
import { SearchAddress } from "src/components/SearchAddress";
import { StyledButton } from "src/components/StyledButton";
import { LocationDTO } from "src/types/LocationDTO";
import { set } from "zod";

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
      if (ref.current) {
        ref.current.setAddressText(selectedPageLocation.short_address || selectedPageLocation.full_address || "NÃO ENCONTRADO!");
      }
    }
  }, []);

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
      <SafeAreaView style={styles.container}>
        <View style={styles.topBox}>
          <SearchAddress
            ref={ref}
            onPress={(data, details) => {
              // console.log(data, null, 2);
              // console.log(details, null, 2);
              handleLocationSelected(data, details);
            }}
            placeholder="Altere o endereço aqui"
          />
          <Text style={styles.estimatedTimeText}>A coleta de lixo irá chegar em: <Text style={styles.estimatedTimeValue}>{estimatedTimePreviewText}</Text></Text>
          <Modal
            animationType="fade"
            transparent
            visible={modalVisible}
            onRequestClose={() => setModalVisible(!modalVisible)}
          >
            <View style={styles.modalContainer}>
              <Text>Deseja alterar o endereço?</Text>
              <View style={styles.modalButtonContainer}>
                <StyledButton
                  style={styles.modalButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text>Sim</Text>
                </StyledButton>
                <StyledButton
                  style={styles.modalButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text>Não</Text>
                </StyledButton>
              </View>
            </View>
          </Modal>
        </View>
      </SafeAreaView>
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
    position: "relative",
  },
  topBox: {
    backgroundColor: "#D9D9D9",
    width: "90%",
    marginTop: 17,
    alignSelf: "center",
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
  },
  modalContainer: {
    width: 320,
    backgroundColor: "#ffffff",
    marginHorizontal: "auto",
    top: "20%",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 18,
    padding: 19,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 12,
  },
  modalButton: {
    backgroundColor: "#D9D9D9",
    paddingHorizontal: 30,
    paddingVertical: 8,
  }
});