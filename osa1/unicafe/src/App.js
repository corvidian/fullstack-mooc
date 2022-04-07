import { useState } from "react";

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>{text}</button>
);

const App = () => {
  // tallenna napit omiin tiloihinsa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const increaseGood = () => setGood(good + 1);
  const increaseNeutral = () => setNeutral(neutral + 1);
  const increaseBad = () => setBad(bad + 1);

  return (
    <>
      <h1>Give feedback</h1>
      <Button text="good" handleClick={increaseGood} />
      <Button text="neutral" handleClick={increaseNeutral} />
      <Button text="bad" handleClick={increaseBad} />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;

  if (all > 0) {
    return (
      <table>
        <tbody>
          <StatisticLine name="good" value={good} />
          <StatisticLine name="neutral" value={neutral} />
          <StatisticLine name="bad" value={bad} />
          <StatisticLine name="all" value={all} />
          <StatisticLine name="average" value={(good - bad) / all} />
          <StatisticLine name="positive" value={(good / all) * 100 + " %"} />
        </tbody>
      </table>
    );
  }
  return <p>No feedback given</p>;
};

const StatisticLine = ({ name, value }) => (
  <tr>
    <td>{name}</td>
    <td>{value}</td>
  </tr>
);

export default App;
