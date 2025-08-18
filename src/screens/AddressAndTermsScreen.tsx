import React, { useContext, useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity } from "react-native";
import { usePreventRemove } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import { handleAddressRequestToAutocompleteGoogleAPI, getAddressByCoords, askForLocation } from "src/service/MapsApiService";

import Checkbox from "expo-checkbox";
import { StyledButton } from "src/components/StyledButton";
import { GlobalContext } from "src/hooks/GlobalContext";
import { SearchAddress } from "src/components/SearchAddress";
import { GooglePlaceData, GooglePlaceDetail, GooglePlacesAutocompleteRef } from "react-native-google-places-autocomplete";
import { LocationDTO } from "src/types/LocationDTO";

export function AddressAndTerms() {
    const { location, getLocation, saveLocation } = useContext(GlobalContext);
    const [isChecked, setChecked] = useState(false);
    const [selectedPageLocation, setSelectedPageLocation] = useState<LocationDTO>();
    const ref = React.useRef<GooglePlacesAutocompleteRef | null>(null);

    usePreventRemove(true, () => { });

    useEffect(() => {
        if (selectedPageLocation !== undefined && ref.current) {
            ref.current.setAddressText(
                selectedPageLocation.short_address ?
                    selectedPageLocation.short_address :
                    selectedPageLocation.full_address
            );
        }
    }, [selectedPageLocation]);

    useEffect(() => {
        askForLocation()
            .then(coords => {
                getAddressByCoords(coords)
                    .then(locationData => {
                        if (selectedPageLocation === undefined) setSelectedPageLocation(locationData);
                    })
                    .catch(error => console.error("Erro ao obter endereço:", error));
            })
            .catch(error => console.error("Erro ao obter coordenadas:", error));
    }, []);

    function handleLocationSelected(data: GooglePlaceData, details: GooglePlaceDetail | null) {
        let locationData = handleAddressRequestToAutocompleteGoogleAPI(data, details);
        setSelectedPageLocation(locationData);
    };

    function handleProsseguirButton() {
        if (!isChecked) {
            Alert.alert(
                'Atenção',
                'É necessário aceitar os termos e serviços!',
            );
            return;
        }
        if (!selectedPageLocation) {
            console.log("Location data is not set:", selectedPageLocation);
            Alert.alert(
                'Atenção',
                'É necessário selecionar um endereço!',
            );
            return;
        }
        console.log("Location data salvando no contexto:", selectedPageLocation);
        saveLocation(selectedPageLocation);
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Digite seu endereço</Text>
            <SearchAddress
                ref={ref}
                onPress={(data, details) => {
                    console.log(JSON.stringify(data, null, 2));
                    console.log(JSON.stringify(details, null, 2));
                    handleLocationSelected(data, details);
                }}
            />
            <TouchableOpacity style={styles.termsContainer} onPress={() => setChecked(!isChecked)}>
                <Checkbox color={"black"} value={isChecked} onValueChange={setChecked} />
                <Text>Aceito os Termos e Serviços</Text>
            </TouchableOpacity>
            <StyledButton
                onPress={handleProsseguirButton}
                style={styles.button}
            >
                <Text style={styles.buttonText}>PROSSEGUIR</Text>
            </StyledButton>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 27,
    },
    input: {
        marginTop: 30,
    },
    termsContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 7,
        marginTop: 25,
    },
    button: {
        paddingHorizontal: 80,
        paddingVertical: 16,
        margin: 25,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "bold"
    },
})