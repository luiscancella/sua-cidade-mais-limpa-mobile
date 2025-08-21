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
                backgroundColor: "#0FAD83",
                borderRadius: 20,
                paddingHorizontal: 35,
                paddingVertical: 20,
            }, props.style]}
        >
            {children}
        </TouchableOpacity>
    )
}