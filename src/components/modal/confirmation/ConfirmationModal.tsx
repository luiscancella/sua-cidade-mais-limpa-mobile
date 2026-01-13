import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StyledButton } from '../../StyledButton';

interface ConfirmationModalProps {
    visible: boolean;
    title: string;
    message: string;
    target: string;
    onConfirm: () => void;
    onCancel?: () => void;
}

export default function ConfirmationModal({ 
    visible, 
    title, 
    message, 
    target, 
    onConfirm, 
    onCancel 
}: ConfirmationModalProps) {
    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        }
    };

    const handleConfirm = () => {
        onConfirm();
    };

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={handleCancel}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <TouchableOpacity style={styles.closeButton} onPress={handleCancel}>
                        <Ionicons name="close-circle" size={30} color="#666" />
                    </TouchableOpacity>

                    <View style={styles.iconContainer}>
                        <Ionicons name="help-circle" size={60} color="#FFA500" />
                    </View>

                    <Text style={styles.title}>{title}</Text>

                    <View style={styles.messageContainer}>
                        <Text style={styles.messageText}>{message}</Text>
                        {target && (
                            <View style={styles.targetContainer}>
                                <Text style={styles.targetLabel}>Item:</Text>
                                <Text style={styles.targetText}>{target}</Text>
                            </View>
                        )}
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity 
                            style={[styles.actionButton, styles.cancelButton]} 
                            onPress={handleCancel}
                        >
                            <Text style={styles.cancelButtonText}>Cancelar</Text>
                        </TouchableOpacity>

                        <StyledButton 
                            onPress={handleConfirm} 
                            style={styles.confirmButton}
                        >
                            <Text style={styles.confirmButtonText}>Sim</Text>
                        </StyledButton>
                    </View>
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
        marginBottom: 16,
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
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 12,
    },
    targetContainer: {
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        padding: 12,
        marginTop: 8,
    },
    targetLabel: {
        fontSize: 12,
        color: '#999',
        marginBottom: 4,
    },
    targetText: {
        fontSize: 14,
        color: '#333',
        fontWeight: '600',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        gap: 10,
    },
    actionButton: {
        flex: 1,
        borderRadius: 20,
        paddingVertical: 15,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancelButton: {
        backgroundColor: '#F0F0F0',
        borderWidth: 1,
        borderColor: '#DDD',
    },
    cancelButtonText: {
        color: '#666',
        fontSize: 16,
        fontWeight: 'bold',
    },
    confirmButton: {
        flex: 1,
    },
    confirmButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
