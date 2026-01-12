import * as React from 'react';
import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
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
            <TouchableOpacity style={[styles.section, styleProps, collapsed && styles.sectionCollapsed]} onPress={() => onPress ? onPress() : setCollapsed(!collapsed)}>
                <View style={styles.iconContainer}>
                    <Ionicons name={nameIcon} size={18} color="white" style={styles.icon} />
                </View>
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
        backgroundColor: "#EFEFEF",
        borderRadius: 11,
        borderBottomLeftRadius: 11,
        borderBottomRightRadius: 11,
        marginTop: 12,
        alignSelf: "center",
        flexDirection: "row",
        alignItems: "center",
    },
    sectionCollapsed: {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    iconContainer: {
        marginLeft: 12,
        backgroundColor: "#4AB469",
        borderRadius: 50,
        padding: 6,
    },
    icon: {
    },
    topicContainer: {
        flex: 1,
        marginLeft: 9,
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
        backgroundColor: "#EFEFEF",
        width: "90%",
        paddingTop: 10,
        paddingBottom: 2,
        alignSelf: "center",
        borderBottomLeftRadius: 11,
        borderBottomRightRadius: 11,
    },
});