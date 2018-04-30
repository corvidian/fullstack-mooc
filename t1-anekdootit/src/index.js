import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      votes: Array(props.anecdotes.length).fill(0)
    }
  }

  render() {
    const randomize = () => {
      const random = Math.floor(Math.random() * this.props.anecdotes.length)
      this.setState({ selected: random })
    }

    const vote = (selected) => {
      return () => {
        const copy = [...this.state.votes]
        copy[selected] += 1
        this.setState({ votes: copy })
      }
    }

    return (
      <div>
        <Anecdote anecdotes={this.props.anecdotes} number={this.state.selected} />
        <Votes votes={this.state.votes[this.state.selected]} />
        <Button text="vote" handler={vote(this.state.selected)} />
        <Button text="next anecdote" handler={randomize} />
      </div>
    )
  }
}

const Anecdote = ({ anecdotes, number }) => (
  <p>{anecdotes[number]}</p>
)

const Votes = ({ votes }) => (
  <p>has {votes} votes</p>
)

const Button = ({ text, handler }) => (
  <button onClick={handler}>
    {text}
  </button>
)

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)