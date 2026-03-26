import { useSelector, useDispatch } from "react-redux";
import { toggleVote } from "../reducers/anecdoteReducer";
import {
  clearNotification,
  setNotification,
} from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    if (state.filter === "") {
      return state.anecdotes;
    }
    return state.anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase()),
    );
  });
  const dispatch = useDispatch();
  const sortedContents = [...anecdotes].sort((a, b) => b.votes - a.votes);

  const handleVote = (anecdote) => {
    dispatch(toggleVote(anecdote.id));
    dispatch(setNotification(`You voted ${anecdote.content}`));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
  };

  return (
    <div>
      {sortedContents.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
