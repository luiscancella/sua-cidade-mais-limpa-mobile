import React, { ReactNode } from "react";
import { Text, TextProps, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface StyledButtonProps extends TouchableOpacityProps {
    children?: ReactNode
}

export function StyledButton(props: StyledButtonProps) {
    const { children } = props;

    return (
        <TouchableOpacity
            {...props}
            activeOpacity={0.5}
            style={[{
                backgroundColor: "#D9D9D9",
                borderRadius: 20,
                paddingHorizontal: 35,
                paddingVertical: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.25)",
            }, props.style]}
        >
            {children}
        </TouchableOpacity>
    )
}