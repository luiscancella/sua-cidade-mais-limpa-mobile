import { Ionicons } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SwitchItemList } from "src/components/SwitchItemList";
import { GlobalContext } from "src/hooks/GlobalContext";

export function NotificationConfigScreen() {
    const { location } = useContext(GlobalContext);
    const [notificationEnabled, setNotificationEnabled] = useState(false);
    const [newsEnabled, setNewsEnabled] = useState(false);

    useEffect(() => {
        // TODO: Implementar logica de mudança de botão
        console.log("Mudando o estado da notificação:", notificationEnabled);
    }, [notificationEnabled]);

    useEffect(() => {
        // TODO: Implementar logica de mudança de botão
        console.log("Mudando o estado das notícias:", newsEnabled);
    }, [newsEnabled]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.label}>Endereço Principal</Text>
                <View style={styles.addressInfosContainer}>
                    <Ionicons name="home-outline" size={24} color="black"/>
                    <Text style={styles.addressInfosText}>{location?.full_address ?? "ERRO!"}</Text>
                </View>
            </View>
            <View style={styles.section}>
                <Text style={styles.label}>Habilitar/Desabilitar Notificações</Text>
                <SwitchItemList
                    text="Previsão de chegada de coleta de lixo"
                    value={notificationEnabled}
                    onValueChange={(value) => setNotificationEnabled(value)}
                />

                <SwitchItemList
                    text="Notícias e atualizações"
                    value={newsEnabled}
                    onValueChange={(value) => setNewsEnabled(value)}
                />
            </View>
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    section: {
        width: "98%",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingVertical: 12,
        marginVertical: 8,
        alignSelf: "center",
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
        marginHorizontal: "auto",
    },
    addressInfosContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    addressInfosText: {
        width: "85%",
        marginLeft: 8,
        marginRight: 0,
        fontSize: 16,
        color: "#333",
    },
});