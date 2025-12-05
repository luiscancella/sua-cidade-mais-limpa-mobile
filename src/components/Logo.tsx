import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View, ViewStyle } from "react-native";

interface LogoProps {
    size?: number;
    color ?: string;
    style ?: ViewStyle;
}

export default function Logo({ size = 24, color = "white", style }: LogoProps) {
    return (
        <View style={[styles.logoContainer, style]}>
            <Ionicons name="leaf" size={size} color={color} />
        </View>
    );
}

const styles = StyleSheet.create({
    logoContainer: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#4CAF50",
        borderRadius: 50,
        width: 50,
        height: 50,
        alignSelf: "center",
        // iOS
        shadowColor: "#4CAF50",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.61, // 9C em hex ≈ 156/255 = 0.61
        shadowRadius: 5.5,
        // Android
        elevation: 5,
    },
});