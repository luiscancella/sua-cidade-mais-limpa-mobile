import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RadioButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Toast from "react-native-toast-message";

import { StyledButton } from "src/components/StyledButton";
import { useError } from "src/contexts/modal.context";
import { useRequiredUserRegistration } from "src/contexts/registration.context";
import { RootStackParamList } from "src/types/navigation";
import { SupportFormData, SupportFormSchema, SupportReasonLabelPTBR, SupportReasonSchema } from "src/types/support/support.schema";
import SupportService from "src/service/SupportService";

type SupportScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Support">;

export function SupportScreen() {
    const navigation = useNavigation<SupportScreenNavigationProp>();
    const { showError } = useError();
    const { registration, getAuthHeaders } = useRequiredUserRegistration();
    const [isSaving, setIsSaving] = useState(false);

    const { control, handleSubmit, formState: { errors } } = useForm<SupportFormData>({
        resolver: zodResolver(SupportFormSchema),
        defaultValues: {
            email: "",
            reason: undefined,
            description: "",
        },
    });

    async function onSubmit(data: SupportFormData) {
        setIsSaving(true);
        try {
            await SupportService.createTicket(
                {
                    phoneId: registration.phoneId,
                    ...data,
                },
                getAuthHeaders()
            );
            Toast.show({
                type: "success",
                text1: "Ticket enviado",
                text2: "Sua mensagem foi recebida. Entraremos em contato em breve.",
            });
            navigation.goBack();
        } catch {
            showError("Erro ao enviar", "Não foi possível enviar sua mensagem. Por favor, tente novamente.");
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
                <Text style={styles.title}>Suporte</Text>
                <Text style={styles.subtitle}>Envie sua dúvida, sugestão ou reporte um problema.</Text>

                <Text style={styles.label}>E-mail para contato</Text>
                <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={[styles.input, errors.email && styles.inputError]}
                            placeholder="seu@email.com"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
                {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

                <Text style={styles.label}>Motivo</Text>
                <Controller
                    control={control}
                    name="reason"
                    render={({ field: { onChange, value } }) => (
                        <View style={[styles.radioGroup, errors.reason && styles.inputError]}>
                            {SupportReasonSchema.options.map((option) => (
                                <TouchableOpacity
                                    key={option}
                                    style={styles.radioItem}
                                    onPress={() => onChange(option)}
                                >
                                    <RadioButton
                                        value={option}
                                        status={value === option ? "checked" : "unchecked"}
                                        onPress={() => onChange(option)}
                                        color="#0FAD83"
                                    />
                                    <Text style={styles.radioLabel}>{SupportReasonLabelPTBR[option]}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                />
                {errors.reason && <Text style={styles.errorText}>{errors.reason.message}</Text>}

                <Text style={styles.label}>Descrição</Text>
                <Controller
                    control={control}
                    name="description"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={[styles.input, styles.textArea, errors.description && styles.inputError]}
                            placeholder="Descreva sua mensagem em detalhes..."
                            multiline
                            numberOfLines={5}
                            textAlignVertical="top"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
                {errors.description && <Text style={styles.errorText}>{errors.description.message}</Text>}

                <Text style={styles.phoneIdLabel}>ID do cadastro: {registration.phoneId}</Text>

                <StyledButton
                    style={styles.submitButton}
                    onPress={handleSubmit(onSubmit)}
                    disabled={isSaving}
                >
                    <Text style={styles.submitButtonText}>
                        {isSaving ? "Enviando..." : "Enviar"}
                    </Text>
                </StyledButton>

                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.backButtonText}>Voltar</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    content: {
        paddingHorizontal: 25,
        paddingTop: 20,
        paddingBottom: 40,
    },
    title: {
        fontSize: 36,
        fontWeight: "700",
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: "#666",
        marginBottom: 24,
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 8,
    },
    input: {
        backgroundColor: "#EFEFEF",
        borderRadius: 8,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 14,
        marginBottom: 4,
        borderWidth: 1,
        borderColor: "transparent",
    },
    textArea: {
        height: 120,
        paddingTop: 12,
    },
    inputError: {
        borderColor: "#E53E3E",
    },
    errorText: {
        color: "#E53E3E",
        fontSize: 12,
        marginBottom: 12,
    },
    radioGroup: {
        backgroundColor: "#EFEFEF",
        borderRadius: 8,
        marginBottom: 4,
        borderWidth: 1,
        borderColor: "transparent",
    },
    radioItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderTopWidth: 1,
        borderColor: "#E6E6E6",
    },
    radioLabel: {
        fontSize: 14,
        fontWeight: "600",
        marginLeft: 4,
    },
    phoneIdLabel: {
        fontSize: 12,
        color: "#999",
        marginTop: 16,
        marginBottom: 24,
    },
    submitButton: {
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 12,
    },
    submitButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    backButton: {
        alignItems: "center",
        paddingVertical: 12,
    },
    backButtonText: {
        color: "#0FAD83",
        fontSize: 16,
        fontWeight: "600",
    },
});
