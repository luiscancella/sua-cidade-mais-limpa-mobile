import * as React from 'react';
import { StyleProp, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View, ViewProps, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

interface ConfigurationSectionProps {
    nameIcon: keyof typeof Ionicons.glyphMap,
    title: string;
    description?: string;
    styleProps?: StyleProp<ViewStyle>;
    onPress?: () => void;
    children?: React.ReactNode;
}

export function ConfigurationSection({ nameIcon, title, description, styleProps, onPress, children }: ConfigurationSectionProps) {
    const [collapsed, setCollapsed] = React.useState(false);

    const uncollapseIconName = "caret-forward-outline";
    const collapseIconName = "caret-down-outline";

    return (
        <>
            <TouchableOpacity style={[styles.section, styleProps]} onPress={() => onPress ? onPress() : setCollapsed(!collapsed)}>
                <Ionicons name={nameIcon} size={24} color="black" style={styles.sectionMainIcon} />
                <View style={styles.topicContainer}>
                    <Text style={styles.topicTitle}>{title}</Text>
                    {description && <Text style={styles.topicDescription}>{description}</Text>}
                </View>
                <Ionicons name={collapsed ? collapseIconName : uncollapseIconName} size={24} color="black" style={styles.sectionCollapseIcon} />
            </TouchableOpacity>
            {collapsed && (
                <View style={styles.childrenContainer}>
                    {children}
                </View>
            )}

        </>
    );
}

const styles = StyleSheet.create({
    section: {
        width: "90%",
        height: "auto",
        minHeight: 68,
        alignSelf: "center",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderColor: "#00000040",
        borderBottomWidth: 1,
        paddingVertical: 10,
    },
    firstSection: {
        borderTopWidth: 1,
        marginTop: 8,
    },
    sectionMainIcon: {
        marginLeft: 10,
    },
    topicContainer: {
        width: "78%",
        marginLeft: 6,
    },
    topicTitle: {
        fontSize: 15,
        fontWeight: "700",
    },
    topicDescription: {
        fontSize: 14,
        fontWeight: "400",
    },
    sectionCollapseIcon: {
        marginRight: 10,
    },
    childrenContainer: {
        backgroundColor: "rgba(0, 0, 0, 0.04)",
        width: "90%",
        paddingVertical: 10,
        alignSelf: "center",
        borderBottomWidth: 1,
        borderColor: "#00000040",
    },
});