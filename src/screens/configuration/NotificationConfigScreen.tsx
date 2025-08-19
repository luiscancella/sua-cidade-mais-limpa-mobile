import { useEffect, useState } from "react";
import { StyleSheet, Text, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SwitchItemList } from "src/components/SwitchItemList";

export function NotificationConfigScreen() {
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
            <Text style={styles.notificationLabel}>Habilitar/desabilitar Notificações</Text>
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
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    notificationLabel: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
        marginHorizontal: "auto",
    }
});