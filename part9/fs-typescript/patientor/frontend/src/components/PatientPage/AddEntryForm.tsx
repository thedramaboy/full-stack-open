import { useState, SyntheticEvent } from "react";
import { TextField, Alert } from "@mui/material";
import { type EntryWithoutId, HealthCheckRating } from "../../types";

interface AddEntryFormProps {
    onSubmit: (values: EntryWithoutId) => void;
    error: string
}

const isHealthCheckRating = (value: number): value is HealthCheckRating => {
    return (Object.values(HealthCheckRating) as number[]).includes(value);
};

const AddEntryForm = ({ onSubmit, error }: AddEntryFormProps) => {
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [healthCheckRating, setHealthCheckRating] = useState('');
    const [diagnosisCodes, setDiagnosisCodes] = useState('');
    const [formError, setFormError] = useState('');

    const addEntry = (event: SyntheticEvent) => {
        event.preventDefault();
        
        const rating = Number(healthCheckRating);

        if (healthCheckRating.trim() === '' || !isHealthCheckRating(rating)) {
            setFormError('Health rating must be 0, 1, 2 or 3');
            setTimeout(() => {
                setFormError('');
            }, 5000);
            return;
        }

        const codes = diagnosisCodes.trim() === '' ? undefined : diagnosisCodes.split(',').map((code) => code.trim());

        onSubmit({
            type: "HealthCheck",
            description,
            date,
            specialist,
            healthCheckRating: rating,
            diagnosisCodes: codes
        });
    };

    const shownError = formError || error;

    return (
        <div>
            {shownError && <Alert severity="error">{shownError}</Alert>}
            <form onSubmit={addEntry}>
                <TextField
                    label="Description"
                    fullWidth 
                    value={description}
                    onChange={({ target }) => setDescription(target.value)}
                />
                <TextField
                    type="date"
                    fullWidth
                    value={date}
                    onChange={({ target }) => setDate(target.value)}
                />
                <TextField
                    label="Specialist"
                    fullWidth
                    value={specialist}
                    onChange={({ target }) => setSpecialist(target.value)}
                />
                <TextField
                    label="Health rating"
                    fullWidth
                    value={healthCheckRating}
                    onChange={({ target }) => setHealthCheckRating(target.value)}
                />
                <TextField
                    label="Diagnose codes"
                    fullWidth
                    value={diagnosisCodes}
                    onChange={({ target }) => setDiagnosisCodes(target.value)}
                />
                <button type="submit">Add entry</button>
            </form>
        </div>
    );
};

export default AddEntryForm;