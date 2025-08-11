import React, { useContext, useEffect, useRef, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity } from "react-native";
import { NavigationProp, useNavigation, usePreventRemove } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "src/types/RootStackParamList";

import { StyledButton } from "src/components/StyledButton";
import Checkbox from "expo-checkbox";

import * as Location from "expo-location";
import { GlobalContext } from "src/hooks/GlobalContext";
import { SearchAddress } from "src/components/SearchAddress";
import { GooglePlaceData, GooglePlaceDetail } from "react-native-google-places-autocomplete";
import { LocationDTO } from "src/types/LocationDTO";

type ScreenNavigationProp = NavigationProp<RootStackParamList, "Home">;

export function AddressAndTerms() {
    const { location, getLocation, saveLocation } = useContext(GlobalContext);

    const [isChecked, setChecked] = useState(false);
    const [locationData, setLocationData] = useState<LocationDTO>();

    const navigation = useNavigation<ScreenNavigationProp>();

    usePreventRemove(true, () => { });

    function handleProsseguirButton() {
        if (!isChecked) {
            Alert.alert(
                'Atenção',
                'É necessário aceitar os termos e serviços!',
            );
            return;
        }
        if (!locationData) {
            console.log("Location data is not set:", locationData);
            Alert.alert(
                'Atenção',
                'É necessário selecionar um endereço!',
            );
            return;
        }
        console.log("Location data salvando no contexto:", locationData);
        saveLocation(locationData);
        // getCurrentLocation();
    }

    function handleLocationSelected(data: GooglePlaceData, details: GooglePlaceDetail | null) {
        if (details === null) {
            console.error('Atenção', 'Não foi possível obter os detalhes do endereço selecionado');
            return;
        }

        const { lat: latitude, lng: longitude } = details.geometry.location;
        const { place_id, description: full_address, structured_formatting: { main_text: short_address } } = data;

        var locationDataTemp: LocationDTO = {
            place_id,
            latitude,
            longitude,
            full_address,
            short_address,
        }

        setLocationData(locationDataTemp);
    };

    async function getCurrentLocation() {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('', 'Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        // saveLocation(location);
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Digite seu endereço</Text>
            <SearchAddress
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