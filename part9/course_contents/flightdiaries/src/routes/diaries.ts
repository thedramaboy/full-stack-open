import express, {type Response} from 'express';
import diaryService from '../services/diaryService.ts';
import { NewEntrySchema, type NonSensitiveDiaryEntry } from '../types.ts';
import { z } from 'zod';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitiveDiaryEntry[]>) => {
    res.send(diaryService.getNonSensitiveDiaryEntries());
});

router.get('/:id', (req, res) => {
    const diary = diaryService.findById(Number(req.params.id));

    if (diary) {
        res.send(diary);
    } else {
        res.sendStatus(404);
    }
});

router.post('/', (req, res) => {
    try {
        const newDiaryEntry = NewEntrySchema.parse(req.body);
        const addedEntry = diaryService.addDiary(newDiaryEntry);
        res.json(addedEntry);
    } catch (error: unknown) {
        if (error instanceof z.ZodError) {      
            res.status(400).send({ error: error.issues });    
        } else {      
            res.status(400).send({ error: 'unknown error' });    
        }  
    }
});

export default router;