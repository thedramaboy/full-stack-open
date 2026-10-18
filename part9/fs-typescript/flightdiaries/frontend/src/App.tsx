import { useEffect, useState } from "react";
import { type DiaryEntry, type NewDiaryEntry } from "./types";
import diaryService from "./services/diaryService";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [newDiary, setNewDiary] = useState<NewDiaryEntry>({
    date: '',
    weather: '',
    visibility: '',
    comment: ''
  });

  useEffect(() => {
    diaryService.getAll().then(initialDiaries => {
      setDiaries(initialDiaries);
    });
  }, []);

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    diaryService.create(newDiary).then((returnedDiary) => {
      setDiaries(diaries.concat(returnedDiary));
      setNewDiary({ date:'', weather:'', visibility:'', comment:''});
    })
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={diaryCreation}>
        <div>
          <span>date</span>
          <input
            value={newDiary.date}
            type="date"
            placeholder="date"
            onChange={(event) => setNewDiary({ ...newDiary, date: event.target.value})}
          />
        </div>
        <div>
          <span>visibility</span>
          <input
            value={newDiary.visibility}
            placeholder="visibility"
            onChange={(event) => setNewDiary({ ...newDiary, visibility: event.target.value})}
          />
        </div>
        <div>
          <span>weather</span>
          <input
            value={newDiary.weather}
            placeholder="weather"
            onChange={(event) => setNewDiary({ ...newDiary, weather: event.target.value})}
          />
        </div>
        <div>
          <span>comment</span>
          <input
            value={newDiary.comment}
            placeholder="comment"
            onChange={(event) => setNewDiary({ ...newDiary, comment: event.target.value})}
          />
        </div>
        <button type="submit">add</button>
      </form>
      {diaries.map((diary) => (
        <div key={diary.id}>
          <h3>{diary.date}</h3>
          <p>visibility: {diary.visibility}</p>
          <p>weather: {diary.weather}</p>
          <p>{diary.comment}</p>
        </div>
      ))}
    </div>
  )
};

export default App;