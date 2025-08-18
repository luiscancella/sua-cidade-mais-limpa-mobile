import { NavigationProp, useNavigation } from "@react-navigation/native";
import * as React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "src/types/RootStackParamList";

type ScreenNavigationProp = NavigationProp<RootStackParamList, "ConfigsList">;

export function ConfigsListScreen() {
    const navigation = useNavigation<ScreenNavigationProp>();

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <TouchableOpacity style={styles.listElementBox}
                    onPress={() => { navigation.navigate("AddressConfig") }}
                >
                    <Text style={styles.listElementText}>Endereço Principal</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.listElementBox}
                    onPress={() => navigation.navigate("NotificationConfig")}
                >
                    <Text style={styles.listElementText}>Notificações</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.listElementBox}
                    onPress={() => {}}
                >
                    <Text style={styles.listElementText}>Termos e Serviços</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
    listElementBox: {
        width: "90%",
        minHeight: 50,
        borderRadius: 23,
        paddingLeft: 40,
        backgroundColor: "#D9D9D9",
        boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.25)",
        marginHorizontal: "auto",
        marginTop: 25,
    },
    listElementText: {
        marginVertical: "auto",
        fontSize: 18,
    },
});