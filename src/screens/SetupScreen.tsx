import React, { useContext, useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GooglePlaceData, GooglePlaceDetail, GooglePlacesAutocompleteRef, Styles } from "react-native-google-places-autocomplete";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { SearchAddress } from "src/components/SearchAddress";
import { GlobalContext } from "src/hooks/GlobalContext";
import * as MapsApiService from "src/service/MapsApiService";
import { GoogleReverseGeocodingApiPlace, GoogleReverseGeocodingApiResponse, UserLocation } from "src/types";
import UserMapper from "src/mapper/UserMapper";

export function SetupScreen() {
    const { saveLocation } = useContext(GlobalContext);

    const [isChecked, setChecked] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState<UserLocation>();
    const ref = React.useRef<GooglePlacesAutocompleteRef | null>(null);

    useEffect(() => {
        if (selectedLocation !== undefined && ref.current) {
            ref.current.setAddressText(
                selectedLocation.short_address ?
                    selectedLocation.short_address :
                    selectedLocation.full_address
            );
        }
    }, [selectedLocation]);

    useEffect(() => {
        async function fetchCurrentLocationAndAddress() {
            try {
                console.log("Solicitando coordenadas do usuário...");
                const coords = await MapsApiService.askForLocation();
                console.log("Coordenadas obtidas:");
                // console.log(JSON.stringify(coords, null, 2));
                try {
                    const googleResponse : GoogleReverseGeocodingApiResponse = await MapsApiService.reverseGoogleGeocoding(coords);
                    const firstResult : GoogleReverseGeocodingApiPlace = googleResponse.results[0];
                    const userLocation = UserMapper.fromGoogleReverseGeocodingApiPlace(firstResult);
                    //console.log("Endereço obtido via Google Reverse Geocoding:");
                    // console.log(JSON.stringify(googleResponse, null, 2));
                    if (!userLocation) {
                        console.error("Não foi possível mapear o endereço do usuário a partir da resposta do Google.");
                        return;
                    }
                    setSelectedLocation(userLocation);
                } catch (error) {
                    console.error("Erro ao obter endereço reverso:", error);
                    return;
                }
            } catch (error) {
                console.error("Erro ao obter coordenadas do usuário:", error);
                return;
            }
        }

        fetchCurrentLocationAndAddress();
    }, []);

    function handleLocationSelected(data: GooglePlaceData, details: GooglePlaceDetail | null) {
        let locationData = MapsApiService.handleAddressRequestToAutocompleteGoogleAPI(data, details);
        setSelectedLocation(locationData);
    };

    function handleProsseguirButton() {
        if (!isChecked) {
            Alert.alert(
                'Atenção',
                'É necessário aceitar os termos e serviços!',
            );
            return;
        }
        if (!selectedLocation) {
            console.log("Location data is not set:", selectedLocation);
            Alert.alert(
                'Atenção',
                'É necessário selecionar um endereço!',
            );
            return;
        }
        console.log("Location data salvando no contexto:", selectedLocation);
        saveLocation(selectedLocation);
    }

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.logoContainer}>
                    <Ionicons name="leaf" size={24} color="white" />
                </View>
                <Text style={styles.title}>Sua Cidade <Text style={styles.coloredText}>+ Limpa</Text></Text>
                <Text style={styles.inputLabel}>Digite seu endereço:</Text>
                <SearchAddress
                    ref={ref}
                    styles={searchAddressStyles}
                    placeholder="Rua das Flores, 123 - Belo Horizonte"
                    onPress={(data, details) => {
                        // console.log(JSON.stringify(data, null, 2));
                        // console.log(JSON.stringify(details, null, 2));
                        handleLocationSelected(data, details);
                    }}
                />
                <View style={styles.checkboxContainer}>
                    <Checkbox
                        value={isChecked}
                        onValueChange={setChecked}
                    />
                    <Text style={styles.checkboxLabel}>Aceito os <Text style={styles.coloredText}>Termos de Serviço</Text></Text>
                </View>
                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => handleProsseguirButton()}
                >
                    <Text style={styles.buttonText}>Continuar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#EBFAF5",
        padding: 16,
    },
    card: {
        backgroundColor: "white",
        borderRadius: 30,
        padding: 30,
        // iOS
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.05,
        shadowRadius: 11.6,
        // Android
        elevation: 4,
    },
    logoContainer: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#4CAF50",
        borderRadius: 50,
        width: 50,
        height: 50,
        alignSelf: "center",
        // iOS
        shadowColor: "#4CAF50",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.61, // 9C em hex ≈ 156/255 = 0.61
        shadowRadius: 5.5,
        // Android
        elevation: 5,
    },
    title: {
        marginTop: 15,
        fontSize: 32,
        fontWeight: "600",
        marginBottom: 8,
        textAlign: "center",
    },
    coloredText: {
        color: "#0FAD83",
        fontWeight: "700",
    },
    inputLabel: {
        marginTop: 25,
        marginLeft: 5,
        fontWeight: "400",
        fontSize: 15,
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
    },
    checkboxLabel: {
        fontSize: 14,
        marginLeft: 8,
    },
    buttonContainer: {
        backgroundColor: "#0FAD83",
        marginTop: 20,
        borderRadius: 13,
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    buttonText: {
        color: "white",
        fontWeight: "700",
        fontSize: 20,
        width: "100%",
        textAlign: "center",
    }
});

const searchAddressStyles: Partial<Styles> = {
    container: {
        marginTop: 8,
    },
    textInputContainer: {
        elevation: 0,
        backgroundColor: "#FAFAFA",
        shadowColor: "transparent",
        shadowOpacity: 0,
        shadowRadius: 0,
        shadowOffset: { width: 0, height: 0 },
        borderWidth: 1,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderRadius: 13,
        borderColor: "#E4E4E4",
        height: 54,
        marginLeft: 0,
        marginBottom: 0,
        alignSelf: "center",
    },
    textInput: {
        // borderWidth: 1
        fontSize: 15,
    },
    listView: {
        // borderWidth: 1,
        // borderColor: "#F00",
        width: "100%",
        marginLeft: 0,
    },
};