import patients from '../../data/patients.ts';
import type { Patient, PatientWithoutSSN } from '../types.ts';
import { v1 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
    return patients;
};

const getPatientsWithoutSSN = (): PatientWithoutSSN[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id, 
        name, 
        dateOfBirth, 
        gender, 
        occupation
    }));
};

const addPatient = (patient: Omit<Patient, 'id'>): Patient => {
    const id = uuid();
    const newPatient = {
        ...patient, id: id
    };
    patients.push(newPatient);
    return newPatient;
};

export default {
    getPatients,
    getPatientsWithoutSSN,
    addPatient
};