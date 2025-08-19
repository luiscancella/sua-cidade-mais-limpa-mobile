import { StyleSheet, Switch, SwitchProps, Text, TextProps, View, ViewProps } from "react-native";

interface SwitchItemListProps {
    text: string;
    value: boolean;
    onValueChange: (value: boolean) => void;
}

export function SwitchItemList({ text, value, onValueChange }: SwitchItemListProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{text}</Text>
            <Switch
                value={value}
                onValueChange={onValueChange}
                style={styles.switch}
                thumbColor={value ? '#f4f3f4' : '#e2e1e1ff'}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        width: "90%",
        marginHorizontal: "auto",
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginVertical: 7,
    },
    text: {
        
    },
    switch: {
        marginLeft: "auto",
        marginRight: 4,
    },
});