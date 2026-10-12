export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'storm';

export type Visisbility = 'great' | 'good' | 'ok' | 'poor';

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;

export interface DiaryEntry {
    id: number;
    date: string;
    weather: Weather;
    visibility: Visisbility;
    comment?: string;
};