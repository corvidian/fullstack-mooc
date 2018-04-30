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
    const add = (field) => {
      return () => {
        this.setState({ [field]: this.state[field] + 1 })
      }
    }

    return (
      <div>
        <Otsikko text="anna palautetta" />
        <Button text="hyvä" handler={add('hyva')} />
        <Button text="neutraali" handler={add('neutraali')} />
        <Button text="huono" handler={add('huono')} />
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
    <tr>
      <td>{header}</td>
      <td>{value}</td>
    </tr>
  )
}

const StatisticsTable = ({ hyva, neutraali, huono }) => {
  const sum = hyva + neutraali + huono
  const average = (sum > 0 ? Number.parseFloat((hyva - huono) / sum).toFixed(1) : 0)
  const positive = (sum > 0 ? Number.parseFloat(100 * hyva / sum).toFixed(1) : 0)

  if (sum > 0) return (
    <table>
      <tbody>
        <Statistic key="hyvä" header="hyvä" value={hyva} />
        <Statistic key="neutraali" header="neutraali" value={neutraali} />
        <Statistic key="huono" header="huono" value={huono} />
        <Statistic key="keskiarvo" header="keskiarvo" value={average} />
        <Statistic key="positiivisia" header="positiivisia" value={positive + " %"} />
      </tbody>
    </table>
  )
  else return <p>ei yhtään palautetta annettu</p>
}

const Statistics = (props) => {
  const { hyva, neutraali, huono } = props.values

  return (
    <div>
      <Otsikko text="statistiikka" />
      <StatisticsTable hyva={hyva} neutraali={neutraali} huono={huono} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
