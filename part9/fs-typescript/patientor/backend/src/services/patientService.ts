import patients from '../../data/patients.ts';
import type { patientWithoutSSN } from '../types.ts';

const getPatients = (): patientWithoutSSN[] => {
    return patients;
};

export default {
    getPatients
};