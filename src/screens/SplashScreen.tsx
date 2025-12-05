import * as React from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "src/components/Logo";

export function SplashScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Logo
                    color="#1AB188"
                    size={38}
                    style={styles.logoContainer}
                />
                <Text style={styles.brandName}>Sua Cidade <Text style={styles.bold}>+ Limpa</Text></Text>
            </View>
            <ActivityIndicator size="large" color="#FFF" />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1AB188",
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
    },
    logoContainer: {
        backgroundColor: "#FFF",
        shadowColor: "#0FAD83",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.61,
        shadowRadius: 2.75,
        elevation: 5,
        padding: 18,
        width: "auto",
        height: "auto",
    },
    brandName: {
        fontSize: 32,
        color: "#FFF",
        marginTop: 10,
        fontWeight: "semibold",
    },
    bold: {
        fontWeight: "bold",
    },
});