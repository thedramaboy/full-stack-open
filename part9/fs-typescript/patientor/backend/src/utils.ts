import { type Patient, Gender } from "./types.ts";
import { z } from 'zod';

const newPatientSchema = z.object({
    name: z.string(),
    dateOfBirth: z.iso.date(),
    ssn: z.string(),
    gender: z.enum(Gender),
    occupation: z.string()
});

export const parseNewPatient = (object: unknown): Omit<Patient, 'id' | 'entries'> => {
    return newPatientSchema.parse(object);
};

export default parseNewPatient;