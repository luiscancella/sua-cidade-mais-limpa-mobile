import z from "zod";

export const CollectionDaySchema = z.enum(["SEG", "TER", "QUA", "QUI", "SEX", "SAB", "DOM"]);

export const CollectionDayLabelPTBR : Record<CollectionDay, string> = {
    "SEG": "Segunda-feira",
    "TER": "Terça-feira",
    "QUA": "Quarta-feira",
    "QUI": "Quinta-feira",
    "SEX": "Sexta-feira",
    "SAB": "Sábado",
    "DOM": "Domingo",
};

export const CollectionScheduleSchema = z.array(CollectionDaySchema).min(1);

export type CollectionDay = z.infer<typeof CollectionDaySchema>;
export type CollectionSchedule = z.infer<typeof CollectionScheduleSchema>;