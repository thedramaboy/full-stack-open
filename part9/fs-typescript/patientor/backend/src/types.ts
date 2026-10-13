export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
}

export type PatientWithoutSSN = Omit<Patient, 'ssn'>;

export const Gender = {
  Male: 'male',
  Female: 'female',
  Other: 'other',
} as const;

export type Gender = typeof Gender[keyof typeof Gender];