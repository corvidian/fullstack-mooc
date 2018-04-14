import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const kurssi = 'Half Stack -sovelluskehitys'
  const osat = [
    {
      nimi: 'Reactin perusteet',
      tehtavia: 10
    },
    {
      nimi: 'Tiedonvälitys propseilla',
      tehtavia: 7
    },
    {
      nimi: 'Komponenttien tila',
      tehtavia: 14
    }
  ]

  return (
    <div>
      <Otsikko kurssi={kurssi} />
      <Sisalto osat={osat} />
      <Yhteensa osat={osat} />
    </div>
  )
}

const Otsikko = (props) => (
  <h1>{props.kurssi}</h1>
)

const Sisalto = (props) => (
  <div>
    {props.osat.map((o) => <p>{o.nimi} {o.tehtavia}</p>)}
  </div>
)

const Yhteensa = (props) => (
  <p>yhteensä {props.osat.map(o => o.tehtavia).reduce((a, b) => a + b, 0)} tehtävää</p>
)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)