import { Ionicons } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, Switch, Text, TouchableOpacity, View, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ConfigurationSection } from "src/components/configuration/ConfigurationSection";
import { SwitchItemList } from "src/components/SwitchItemList";
import { GlobalContext } from "src/hooks/GlobalContext";

export function NotificationConfigScreen() {
    const { location } = useContext(GlobalContext);
    const [garbageCollectionNotificationEnabled, setGarbageCollectionNotificationEnabled] = useState(false);
    const [newsEnabled, setNewsEnabled] = useState(false);

    useEffect(() => {
        // TODO: Implementar logica de mudança de botão
        console.log("Mudando o estado da notificação:", garbageCollectionNotificationEnabled);
    }, [garbageCollectionNotificationEnabled]);

    useEffect(() => {
        // TODO: Implementar logica de mudança de botão
        console.log("Mudando o estado das notícias:", newsEnabled);
    }, [newsEnabled]);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Configurações</Text>
            <ConfigurationSection
                nameIcon="home"
                title="Meu Endereço"
                description="Alterar endereço principal"
                styleProps={styles.firstSection}
            >
            </ConfigurationSection>
            <ConfigurationSection
                nameIcon="notifications"
                title="Notificações"
                description="Alterar configurações de notificações"
            >
                <View style={styles.itemContainer}>
                    <Ionicons name="newspaper" size={20} color="black" style={styles.itemIcon} />
                    <Text style={styles.itemText}>Notícias e atualizações</Text>
                    <Switch
                        value={newsEnabled}
                        onValueChange={setNewsEnabled}
                        style={styles.itemSwitch}
                        thumbColor={newsEnabled ? '#f9f9f9' : '#e2e1e1ff'}
                        trackColor={{ false: '#C5C5C5', true: '#4AB469' }}
                    />
                </View>
                <View style={styles.itemContainer}>
                    <Ionicons name="alarm" size={20} color="black" style={styles.itemIcon} />
                    <Text style={styles.itemText}>Horários de coleta</Text>
                    <Switch
                        value={garbageCollectionNotificationEnabled}
                        onValueChange={setGarbageCollectionNotificationEnabled}
                        style={styles.itemSwitch}
                        thumbColor={garbageCollectionNotificationEnabled ? '#f9f9f9' : '#e2e1e1ff'}
                        trackColor={{ false: '#C5C5C5', true: '#4AB469' }}
                    />
                </View>
            </ConfigurationSection>
            <ConfigurationSection
                nameIcon="information-circle"
                title="Termos e Serviços"
                onPress={() => console.log("Clicou em termos e serviços")}
            >
            </ConfigurationSection>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: "#EBFAF5",
    },
    title: {
        fontSize: 36,
        fontWeight: "700",
        marginBottom: 16,
        paddingLeft: 25,
    },
    firstSection: {
        borderTopWidth: 1,
        marginTop: 8,
    },
    itemContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 4,
    },
    itemIcon: {
        marginLeft: 10,
    },
    itemText: {
        fontWeight: "400",
        fontSize: 14,
        marginLeft: 14,
        marginBottom: 1,
    },
    itemSwitch: {
        marginLeft: "auto",
        marginRight: 4
    }
});