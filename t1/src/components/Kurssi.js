import React from 'react'

const Kurssi = ({ kurssi }) => (
    <div>
      <Otsikko kurssi={kurssi.nimi} />
      <Sisalto osat={kurssi.osat} />
      <Yhteensa osat={kurssi.osat} />
    </div>
  )
  
  const Otsikko = (props) => (
    <h1>{props.kurssi}</h1>
  )
  
  const Sisalto = (props) => (
    <div>
      {props.osat.map((o) => <Osa key={o.nimi} osa={o} />)}
    </div>
  )
  
  const Osa = ({osa}) => (
    <p>{osa.nimi} {osa.tehtavia}</p>
  )
  
  const Yhteensa = (props) => (
    <p>yhteensä {props.osat.map(o => o.tehtavia).reduce((a, b) => a + b)} tehtävää</p>
  )

  export default Kurssi