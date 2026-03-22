import { useSelector, useDispatch } from "react-redux";
import { createAnecdote, toggleVote } from "./reducers/anecdoteReducer";

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.new_anec.value;
    event.target.new_anec.value = "";
    dispatch(createAnecdote(content));
  };

  const sortedContents = [...anecdotes].sort((a, b) => b.votes - a.votes);

  return (
    <div>
      <h2>Anecdotes</h2>
      {sortedContents.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(toggleVote(anecdote.id))}>
              vote
            </button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="new_anec" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default App;
