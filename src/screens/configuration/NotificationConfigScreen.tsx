import { Ionicons } from "@expo/vector-icons";
import { useContext, useEffect, useRef, useState } from "react";
import { StyleSheet, Switch, Text, View, } from "react-native";
import { GooglePlacesAutocompleteRef, Styles } from "react-native-google-places-autocomplete";
import { SafeAreaView } from "react-native-safe-area-context";
import { ConfigurationSection } from "src/components/configuration/ConfigurationSection";
import { SearchAddress } from "src/components/SearchAddress";
import { GlobalContext } from "src/hooks/GlobalContext";

export function NotificationConfigScreen() {
    const { location } = useContext(GlobalContext);
    const [garbageCollectionNotificationEnabled, setGarbageCollectionNotificationEnabled] = useState(false);
    const [newsEnabled, setNewsEnabled] = useState(false);
    const ref = useRef<GooglePlacesAutocompleteRef | null>(null);

    useEffect(() => {
        // TODO: Implementar logica de mudança de botão
        console.log("Mudando o estado da notificação:", garbageCollectionNotificationEnabled);
    }, [garbageCollectionNotificationEnabled]);

    useEffect(() => {
        // TODO: Implementar logica de mudança de botão
        console.log("Mudando o estado das notícias:", newsEnabled);
    }, [newsEnabled]);

    useEffect(() => {
        if (location && ref.current) {
          ref.current?.setAddressText(location.short_address || location.full_address || "NÃO ENCONTRADO!");
        }
      }, [location]);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Configurações</Text>
            <Text style={styles.addressSearchLabel}>Endereço Principal</Text>
            <SearchAddress
                ref={ref}
                icon={<Ionicons name="location" size={24} color="#4AB469" />}
                placeholder={"Buscar endereço"}
                styles={searchAddressStyles}
            />
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
        // backgroundColor: "#EBFAF5",
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 36,
        fontWeight: "700",
        marginBottom: 16,
        paddingLeft: 25,
    },
    addressSearchLabel: {
        fontSize: 16,
        fontWeight: "600",
        paddingLeft: 25,
        marginTop: 18,
    },
    itemContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 4,
        borderColor: "#E6E6E6",
        borderTopWidth: 1,
    },
    itemIcon: {
        marginLeft: 10,
    },
    itemText: {
        fontWeight: "600",
        fontSize: 14,
        marginLeft: 14,
        marginBottom: 1,
    },
    itemSwitch: {
        marginLeft: "auto",
        marginRight: 4
    }
});

const searchAddressStyles: Partial<Styles> = {
    container: {
        width: "90%",
        alignSelf: "center",
        marginTop: 3,
        marginBottom: 15,
    },
    textInputContainer: {
        backgroundColor: "#EFEFEF",
        borderRadius: 8,
        borderWidth: 0,
        height: 45,
    }
};