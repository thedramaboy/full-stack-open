import { useEffect, useState } from "react";
import { Patient } from "../../types";
import { useParams } from "react-router-dom";
import patientService from "../../services/patientService";

const PatientPage = () => {
    const { id } = useParams();
    const [patient, setPatient] = useState<Patient | null>(null);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!id) {
            return;
        }
        patientService.getById(id)
            .then((data) => setPatient(data))
            .catch(() => setError('Patient not found'));
    }, [id]);

    if (error) {
        return <p>{error}</p>;
    }

    if (!patient) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>{patient.name} {patient.gender}</h2>
            <p>ssn: {patient.ssn}</p>
            <p>occupation: {patient.occupation}</p>
            <p>date of birth: {patient.dateOfBirth}</p>
        </div>
    );
};

export default PatientPage;