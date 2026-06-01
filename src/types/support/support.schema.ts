import z from "zod";

export const SupportReasonSchema = z.enum(["DOUBT", "SUGGESTION", "BUG_REPORT", "OTHER"]);
export type SupportReason = z.infer<typeof SupportReasonSchema>;

export const SupportReasonLabelPTBR: Record<SupportReason, string> = {
    "DOUBT": "Dúvida",
    "SUGGESTION": "Sugestão",
    "BUG_REPORT": "Reportar Bug",
    "OTHER": "Outro Motivo",
};

export const SupportFormSchema = z.object({
    email: z.string().min(1, "E-mail é obrigatório").email("E-mail inválido"),
    reason: SupportReasonSchema,
    description: z.string().min(10, "Descrição deve ter pelo menos 10 caracteres"),
});

export type SupportFormData = z.infer<typeof SupportFormSchema>;
