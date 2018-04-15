import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hyva: 0,
      neutraali: 0,
      huono: 0
    }
  }

  render() {
    const addHyva = () => this.setState({ hyva: this.state.hyva + 1 })
    const addNeutraali = () => this.setState({ neutraali: this.state.neutraali + 1 })
    const addHuono = () => this.setState({ huono: this.state.huono + 1 })

    return (
      <div>
        <Otsikko text="anna palautetta" />
        <Button text="hyvä" handler={addHyva} />
        <Button text="neutraali" handler={addNeutraali} />
        <Button text="huono" handler={addHuono} />
        <Statistics values={this.state} />
      </div>
    )
  }
}

const Otsikko = (props) => (
  <h1>{props.text}</h1>
)

const Button = ({ text, handler }) => (
  <button onClick={handler}>
    {text}
  </button>
)

const Statistics = (props) => {
  const { hyva, neutraali, huono } = props.values
  return (
    <div>
      <Otsikko text="statistiikka" />
      <p>hyvä {hyva}</p>
      <p>neutraali {neutraali}</p>
      <p>huono {huono}</p>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)