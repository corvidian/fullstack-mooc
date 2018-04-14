import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const kurssi = 'Half Stack -sovelluskehitys'
  const osa1 = {
    nimi: 'Reactin perusteet',
    tehtavia: 10
  }
  const osa2 = {
    nimi: 'Tiedonvälitys propseilla',
    tehtavia: 7
  }
  const osa3 = {
    nimi: 'Komponenttien tila',
    tehtavia: 14
  }

  return (
    <div>
      <Otsikko kurssi={kurssi} />
      <Sisalto osa1={osa1} osa2={osa2} osa3={osa3} />
      <Yhteensa yhteensa={osa1.tehtavia + osa2.tehtavia + osa3.tehtavia} />
    </div>
  )
}

const Otsikko = (props) => (
  <h1>{props.kurssi}</h1>
)

const Sisalto = (props) => (
  <div>
    <p>{props.osa1.nimi} {props.osa1.tehtavia}</p>
    <p>{props.osa2.nimi} {props.osa2.tehtavia}</p>
    <p>{props.osa3.nimi} {props.osa3.tehtavia}</p>
  </div>
)

const Yhteensa = (props) => (
  <p>yhteensä {props.yhteensa} tehtävää</p>
)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)