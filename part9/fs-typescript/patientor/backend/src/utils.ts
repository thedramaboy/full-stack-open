import { type Patient, Gender } from "./types.ts";

const parseNewPatient = (object: unknown): Omit<Patient, 'id'> => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
        const newPatient: Omit<Patient, 'id'> = {
            name: parseStr(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseStr(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseStr(object.occupation)
        };
        return newPatient;
    }
    throw new Error('Incorrect data: some fields are missing');
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return !isNaN(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
    return (Object.values(Gender) as string[]).includes(param);
};

const parseStr = (str: unknown): string => {
  if (!str || !isString(str)) {
    throw new Error('Incorrect or missing some elements');
  }
  return str;
};

const parseDate = (date: unknown): string => {
    if (!isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

const parseGender = (gender: unknown): Gender => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

export default parseNewPatient;