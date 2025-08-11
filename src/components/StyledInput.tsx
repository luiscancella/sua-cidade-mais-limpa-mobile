import React, { useRef } from "react";
import { StyleSheet, TextInput, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface StyledInputProps extends TouchableOpacityProps {
    placeholder?: string
}

export function StyledInput(props: StyledInputProps) {
    const inputRef = useRef<TextInput>(null);

    const focusInput = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    return (
        <TouchableOpacity style={[styles.textInputContainer, props.style]} onPress={focusInput}>
            <TextInput
                ref={inputRef}
                style={styles.textInput}
                placeholder={props.placeholder}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    textInputContainer: {
        width: "80%",
        paddingVertical: 6,
        borderRadius: 20,
        backgroundColor: "#D9D9D9",
        boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.25)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    textInput: {
        maxWidth: "90%",
        minWidth: "60%",
    }
})