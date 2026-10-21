import { useEffect, useState } from "react";
import { Diagnosis, Patient } from "../../types";
import { useParams } from "react-router-dom";
import patientService from "../../services/patientService";
import diagnoseService from "../../services/diagnoseService";

const PatientPage = () => {
    const { id } = useParams();
    const [patient, setPatient] = useState<Patient | null>(null);
    const [error, setError] = useState('');
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

    useEffect(() => {
        if (!id) {
            return;
        }
        patientService.getById(id)
            .then((data) => setPatient(data))
            .catch(() => setError('Patient not found'));
    }, [id]);

    useEffect(() => {
        diagnoseService.getAll()
        .then((data) => setDiagnoses(data))
        .catch(() => setError('Diagnose not found'));
    }, []);

    if (error) {
        return <p>{error}</p>;
    }

    if (!patient) {
        return <p>Loading...</p>;
    }

    const { entries } = patient;

    return (
        <div>
            <h2>{patient.name} {patient.gender}</h2>
            <p>ssn: {patient.ssn}</p>
            <p>occupation: {patient.occupation}</p>
            {/* <p>date of birth: {patient.dateOfBirth}</p> */}
            <h3>entries</h3>
            {entries.map((entry) => (
                <div key={entry.id}>
                    {entry.date} {entry.description}
                    <ul>
                        {entry.diagnosisCodes?.map((code) => (
                            <li key={code}>{code} {diagnoses.find((diagnose) => diagnose.code === code)?.name}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default PatientPage;