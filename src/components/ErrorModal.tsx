import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StyledButton } from './StyledButton';

interface ErrorModalProps {
    visible: boolean;
    title: string;
    message: string[];
    onSuccess?: () => void;
    onClose?: () => void;
}

export default function ErrorModal({ visible, title, message, onSuccess, onClose }: ErrorModalProps) {
    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    };

    const handleSuccess = () => {
        if (onSuccess) {
            onSuccess();
        } else {
            handleClose();
        }
    };

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={handleClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
                        <Ionicons name="close-circle" size={30} color="#FF4444" />
                    </TouchableOpacity>

                    <View style={styles.iconContainer}>
                        <Ionicons name="alert-circle" size={60} color="#FF4444" />
                    </View>

                    <Text style={styles.title}>{title}</Text>

                    <View style={styles.messageContainer}>
                        {message.map((msg, index) => (
                            <Text key={index} style={styles.messageText}>
                                • {msg}
                            </Text>
                        ))}
                    </View>

                    <StyledButton 
                        onPress={handleSuccess} 
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Entendido</Text>
                    </StyledButton>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '85%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 25,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    closeButton: {
        position: 'absolute',
        top: 15,
        right: 15,
        zIndex: 1,
    },
    iconContainer: {
        marginTop: 10,
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 15,
    },
    messageContainer: {
        width: '100%',
        marginBottom: 25,
    },
    messageText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
        lineHeight: 20,
    },
    button: {
        width: '100%',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});