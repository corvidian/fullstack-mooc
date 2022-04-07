import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const useRandom = () =>
    setSelected(Math.floor(Math.random() * anecdotes.length));

  const giveVote = () => {
    let newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button text="vote" handleClick={giveVote} />
      <Button text="next anecdote" handleClick={useRandom} />
      <BestAnecdote anecdotes={anecdotes} votes={votes} />
    </div>
  );
};

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>{text}</button>
);

const Anecdote = ({ anecdote, votes }) => (
  <>
    <p>{anecdote}</p>
    <p>has {votes} votes</p>
  </>
);

const BestAnecdote = ({ anecdotes, votes }) => {
  const highestVotes = Math.max(...votes);
  const bestAnecdote = anecdotes[votes.indexOf(highestVotes)];
  return (
    <>
      <h1>Anecdote with most votes</h1>
      <Anecdote anecdote={bestAnecdote} votes={highestVotes} />
    </>
  );
};

export default App;
