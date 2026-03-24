import React, { useEffect, useState } from "react";
import { Alert, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GooglePlacesAutocompleteRef, Styles } from "react-native-google-places-autocomplete";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { GoogleAutocompleteInput } from "src/components/GoogleAutocompleteInput";
import { useCurrentLocation } from "src/hooks/useCurrentLocation";
import * as MapsApiService from "src/service/MapsApiService";
import { Address, UserLocation } from "src/types";
import UserMapper from "src/mapper/UserMapper";
import { useError } from "src/hooks/useModal";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "src/types/navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import UserService from "src/service/UserService";
import Logo from "src/components/Logo";
import Toast from "react-native-toast-message";
import NotificationService from "src/service/NotificationService";
import AddressMapper from "src/mapper/AddressMapper";

type SetupScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Setup'>;

export function SetupScreen() {
    const { saveCurrentLocation, clearData } = useCurrentLocation();
    const { showError } = useError();
    const [ isChecked, setChecked ] = useState(false);
    const [ selectedAddress, setSelectedAddress ] = useState<Address>();
    const navigation = useNavigation<SetupScreenNavigationProp>();
    const ref = React.useRef<GooglePlacesAutocompleteRef | null>(null);

    useEffect(() => {
        if (selectedAddress && ref.current) {
            ref.current.setAddressText(
                selectedAddress.short_address || selectedAddress.full_address
            );
        }
    }, [selectedAddress]);

    useEffect(() => {
        async function fetchCurrentLocationAndAddress() {
            try {
                console.log("Solicitando coordenadas do usuário...");
                const coords = await MapsApiService.askForLocation();

                const googleResponse = await MapsApiService.reverseGoogleGeocoding(coords);
                const firstResult = googleResponse.results[0];
                const address = AddressMapper.fromGoogleReverseGeocodingApiPlace(firstResult);
                
                if (!address) {
                    console.error("Não foi possível mapear o endereço do usuário a partir da resposta do Google.");
                    showError(
                        "Erro ao obter localização",
                        "Não foi possível determinar seu endereço automaticamente. Por favor, digite seu endereço manualmente.");
                    return;
                }

                if (address?.city !== "Machado" && address?.city !== "Ribeirão das Neves") {
                    console.info("Área não atendida:", address?.city);
                    showError("Área não atendida", "Detectamos que sua localização está fora da área atendida. No momento, nosso serviço está disponível apenas para as cidades de Machado e Ribeirão das Neves. Estamos trabalhando para expandir nossa cobertura em breve!");
                    return;
                }

                if (ref?.current?.getAddressText() === "") {
                    setSelectedAddress(address);
                    Toast.show({
                        type: "info",
                        text1: "Endereço definido",
                        text2: "Seu endereço foi definido automaticamente com base na sua localização atual.",
                        visibilityTime: 6000,
                    });
                    console.log("Endereço do usuário definido automaticamente:", address.full_address);
                }
            } catch (error: any) {
                console.error("Erro ao obter localização:", error);
            }
        }

        fetchCurrentLocationAndAddress();
        NotificationService.requestNotificationPermission();
    }, []);

    async function handleProsseguirButton() {
        const errors: string[] = [];

        if (!isChecked) {
            errors.push("É necessário aceitar os termos e serviços!");
        }
        if (!selectedAddress) {
            errors.push("É necessário selecionar um endereço!");
        }

        if (errors.length > 0) {
            showError("Atenção!", errors);
            return;
        }

        if (selectedAddress) {
            // const deviceNotificationToken = await NotificationService.getToken();
            // selectedLocation.fcmToken = deviceNotificationToken || undefined;

            try {
                const user = {
                    address: selectedAddress,
                    fcmToken: await NotificationService.getToken() || undefined,
                } as UserLocation;
                const userToBeCreated = UserMapper.toCreateUserLocationRequest(user);
                const userCreated = await UserService.createUser(userToBeCreated);
                console.log("Usuário criado no servidor com sucesso.");

                let result = await saveCurrentLocation(userCreated);
                if (!result) {
                    showError("Erro ao salvar localização", "Não foi possível salvar sua localização. Tente novamente mais tarde.");
                    console.error("Falha ao salvar localização localmente. Provavelmente excedeu o tamanho máximo permitido localmente.");
                }
            } catch (error) {
                console.error("Erro ao criar usuário no servidor:", error);
                showError("Erro ao salvar localização", "Não foi possível salvar sua localização no servidor. Tente novamente mais tarde.");
                clearData();
                return;
            }
        }
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={styles.card}>
                <Logo />
                <Text style={styles.title}>Sua Cidade <Text style={styles.coloredText}>+ Limpa</Text></Text>
                <Text style={styles.inputLabel}>Digite seu endereço:</Text>
                <GoogleAutocompleteInput
                    ref={ref}
                    styles={searchAddressStyles}
                    placeholder="Rua das Flores, 123 - Belo Horizonte"
                    onError={() => showError("Erro ao selecionar endereço", "Não foi possível processar o endereço selecionado. Por favor tente novamente ou contate o suporte.")}
                    onLocationSelected={setSelectedAddress}
                    ignoreConfirmation={true}
                />
                <TouchableOpacity style={styles.checkboxContainer} onPress={() => setChecked(!isChecked)}>
                    <Checkbox
                        value={isChecked}
                        onValueChange={setChecked}
                    />
                    <TouchableOpacity onPress={() => {
                        navigation.navigate("TermsOfService");
                    }}>
                        <Text style={styles.checkboxLabel}>Aceito os <Text style={styles.coloredText}>Termos de Serviço</Text></Text>
                    </TouchableOpacity>
                </TouchableOpacity>
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