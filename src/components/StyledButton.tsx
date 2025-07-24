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
                backgroundColor: "#000",
                borderRadius: 20,
                height: 80,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 20,
                paddingVertical: 10
            }, props.style]}
        >
            {children}
        </TouchableOpacity>
    )
}