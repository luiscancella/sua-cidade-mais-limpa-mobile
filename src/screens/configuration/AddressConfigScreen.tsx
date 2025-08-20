import { useContext } from "react";
import { StyleSheet, Text, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SearchAddress } from "src/components/SearchAddress";
import { GlobalContext } from "src/hooks/GlobalContext";

export function AddressConfigScreen() {
    const { location } = useContext(GlobalContext);

    return (
        <SafeAreaView>
            <Text style={styles.title}>Configurações de Endereço</Text>
            <Text>Seu endereço atual:</Text>
            <Text>{location?.short_address ?? "NÃO ENCONTRADO"}</Text>
            <SearchAddress />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontWeight: "bold",
    },
    notificationLabel: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
        marginHorizontal: "auto",
    }
});