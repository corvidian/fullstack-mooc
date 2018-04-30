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

const Statistic = (props) => {
  const { header, value } = props

  return (
    <p>{header} {value}</p>
  )
}

const Statistics = (props) => {
  const { hyva, neutraali, huono } = props.values

  const sum = hyva + neutraali + huono
  const average = (sum > 0 ? Number.parseFloat((hyva - huono) / sum).toFixed(1) : 0)
  const positive = (sum > 0 ? Number.parseFloat(100 * hyva / sum).toFixed(1) : 0)

  return (
    <div>
      <Otsikko text="statistiikka" />
      <Statistic header="hyvä" value={hyva} />
      <Statistic header="neutraali" value={neutraali} />
      <Statistic header="huono" value={huono} />
      <Statistic header="keskiarvo" value={average} />
      <Statistic header="positiivisia" value={positive + " %"} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)