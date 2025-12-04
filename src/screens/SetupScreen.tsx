import React, { useEffect, useState } from "react";
import { Alert, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GooglePlacesAutocompleteRef, Styles } from "react-native-google-places-autocomplete";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { GoogleAutocompleteInput } from "src/components/GoogleAutocompleteInput";
import { useCurrentLocation } from "src/hooks/useCurrentLocation";
import * as MapsApiService from "src/service/MapsApiService";
import { UserLocation } from "src/types";
import UserMapper from "src/mapper/UserMapper";
import { useError } from "src/hooks/useModal";

export function SetupScreen() {
    const { saveCurrentLocation } = useCurrentLocation();
    const { showError } = useError();
    const [ isChecked, setChecked ] = useState(false);
    const [ selectedLocation, setSelectedLocation ] = useState<UserLocation>();
    const ref = React.useRef<GooglePlacesAutocompleteRef | null>(null);

    useEffect(() => {
        if (selectedLocation && ref.current) {
            ref.current.setAddressText(
                selectedLocation.short_address || selectedLocation.full_address
            );
        }
    }, [selectedLocation]);

    useEffect(() => {
        async function fetchCurrentLocationAndAddress() {
            try {
                console.log("Solicitando coordenadas do usuário...");
                const coords = await MapsApiService.askForLocation();
                
                const googleResponse = await MapsApiService.reverseGoogleGeocoding(coords);
                const firstResult = googleResponse.results[0];
                const userLocation = UserMapper.fromGoogleReverseGeocodingApiPlace(firstResult);
                
                if (!userLocation) {
                    console.error("Não foi possível mapear o endereço do usuário a partir da resposta do Google.");
                    showError(
                        "Erro ao obter localização",
                        "Não foi possível determinar seu endereço automaticamente. Por favor, digite seu endereço manualmente.");
                    return;
                }
                
                if (ref?.current?.getAddressText() === "") {
                    setSelectedLocation(userLocation);
                }
            } catch (error: any) {
                console.error("Erro ao obter localização:", error);
                
                if (error?.code === 'PERMISSION_DENIED') {
                    showError("Permissão Necessária", [
                        "Permissão de localização negada, digite seu endereço manualmente."
                    ]);
                } else {
                    showError("Erro ao obter localização", [
                        "Não foi possível obter sua localização automaticamente. Por favor, digite seu endereço manualmente."
                    ]);
                }
            }
        }

        fetchCurrentLocationAndAddress();
    }, []);

    async function handleProsseguirButton() {
        const errors: string[] = [];
        
        if (!isChecked) {
            errors.push("É necessário aceitar os termos e serviços!");
        }
        if (!selectedLocation) {
            errors.push("É necessário selecionar um endereço!");
        }

        if (errors.length > 0) {
            showError("Atenção!", errors);
            return;
        }

        if (selectedLocation) {
            console.log("Location data salvando no contexto:", selectedLocation);
            let result = await saveCurrentLocation(selectedLocation);

            if (!result) {
                showError("Erro ao salvar localização", [
                    "Não foi possível salvar sua localização. Tente novamente mais tarde."
                ]);
            }
        }
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={styles.card}>
                <View style={styles.logoContainer}>
                    <Ionicons name="leaf" size={24} color="white" />
                </View>
                <Text style={styles.title}>Sua Cidade <Text style={styles.coloredText}>+ Limpa</Text></Text>
                <Text style={styles.inputLabel}>Digite seu endereço:</Text>
                <GoogleAutocompleteInput
                    ref={ref}
                    styles={searchAddressStyles}
                    placeholder="Rua das Flores, 123 - Belo Horizonte"
                    onLocationSelected={setSelectedLocation}
                    ignoreAlert={true}
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
        </KeyboardAvoidingView>
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