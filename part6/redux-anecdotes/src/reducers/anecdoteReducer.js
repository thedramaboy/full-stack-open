import { createSlice } from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit";

const anecdotesAtStart = [];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload);
    },
    toggleVote(state, action) {
      console.log(current(state));
      const id = action.payload;
      const anecToChange = state.find((anec) => anec.id === id);
      if (anecToChange) {
        anecToChange.votes += 1;
      }
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { createAnecdote, toggleVote, setAnecdotes } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;
