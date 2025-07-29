import React, { useRef, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { NavigationProp, useNavigation, usePreventRemove } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "src/types/RootStackParamList";

import { StyledButton } from "src/components/StyledButton";
import Checkbox from "expo-checkbox";
import { StyledInput } from "src/components/StyledInput";

type ScreenNavigationProp = NavigationProp<RootStackParamList, "Home">;

export function AddressAndTerms() {
    const [isChecked, setChecked] = useState(false);

    const navigation = useNavigation<ScreenNavigationProp>();

    // usePreventRemove(true, () => {});

    function handleProsseguirButton() {
        if (!isChecked) {
            Alert.alert(
                'Atenção',
                'É necessário aceitar os termos e serviços!',
            );
            return;
        }
        navigation.navigate("Home", [1.1, 2.2]);
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Digite seu endereço</Text>
            <StyledInput />
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