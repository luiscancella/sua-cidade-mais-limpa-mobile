import z from "zod";

const ErrorStateSchema = z.object({
    visible: z.boolean(),
    title: z.string().min(1, "O título do erro não pode ser vazio."),
    messages: z.array(
        z.string().min(1, "A mensagem de erro não pode ser vazia.")
    ),
});

export type ErrorState = z.infer<typeof ErrorStateSchema>;