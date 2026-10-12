import express, { type Response} from "express";
import type { patientWithoutSSN } from "../types.ts";
import patients from '../../data/patients.ts'

const router = express.Router();

router.get('/', (_req, res:Response<patientWithoutSSN[]>) => {
    res.send(patients);
});

export default router;