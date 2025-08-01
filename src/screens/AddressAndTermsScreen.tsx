import React, { useContext, useEffect, useRef, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { NavigationProp, useNavigation, usePreventRemove } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "src/types/RootStackParamList";

import { StyledButton } from "src/components/StyledButton";
import Checkbox from "expo-checkbox";
import { StyledInput } from "src/components/StyledInput";

import * as Location from "expo-location";
import { GlobalContext } from "src/hooks/GlobalContext";

type ScreenNavigationProp = NavigationProp<RootStackParamList, "Home">;

export function AddressAndTerms() {
    const { location, getLocation, saveLocation } = useContext(GlobalContext);
    
    const [isChecked, setChecked] = useState(false);

    const navigation = useNavigation<ScreenNavigationProp>();

    usePreventRemove(true, () => {});

    function handleProsseguirButton() {
        if (!isChecked) {
            Alert.alert(
                'Atenção',
                'É necessário aceitar os termos e serviços!',
            );
            return;
        }
    }

    useEffect(() => {
        async function getCurrentLocation() {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('', 'Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            saveLocation(location);
        }

        if (location == undefined) getCurrentLocation();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Digite seu endereço</Text>
            <StyledInput placeholder="Digite seu endereço aqui"/>
            <TouchableOpacity style={styles.termsContainer} onPress={() => setChecked(!isChecked)}>
                <Checkbox color={"black"} value={isChecked} onValueChange={setChecked} />
                <Text>Aceito os Termos e Serviços {location ? JSON.stringify(location) : "VIXI"}</Text>
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