import z from "zod";

export const CollectionDaySchema = z.enum(["SEG", "TER", "QUA", "QUI", "SEX", "SAB", "DOM"]);
export type CollectionDay = z.infer<typeof CollectionDaySchema>;

export const CollectionDayLabelPTBR : Record<CollectionDay, string> = {
    "SEG": "Segunda-feira",
    "TER": "Terça-feira",
    "QUA": "Quarta-feira",
    "QUI": "Quinta-feira",
    "SEX": "Sexta-feira",
    "SAB": "Sábado",
    "DOM": "Domingo",
};

export const CollectionShiftSchema = z.enum(["MORNING", "AFTERNOON", "NIGHT"]);
export type CollectionShift = z.infer<typeof CollectionShiftSchema>;

export const CollectionShiftLabelPTBR: Record<CollectionShift, string> = {
    "MORNING":   "Manhã",
    "AFTERNOON": "Tarde",
    "NIGHT":     "Noite",
};

export const CollectionDaysSchema = z.array(CollectionDaySchema).min(1);
export type CollectionDays = z.infer<typeof CollectionDaysSchema>;