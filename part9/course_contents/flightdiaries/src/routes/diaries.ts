import express, {type Response} from 'express';
import diaryService from '../services/diaryService.ts';
import { NonSensitiveDiaryEntry } from '../types.ts';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitiveDiaryEntry[]>) => {
    res.send(diaryService.getNonSensitiveDiaryEntries());
});

router.post('/', (_req, res) => {
    res.send('Saving a diary!');
});

export default router;