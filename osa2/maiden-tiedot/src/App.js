import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleChange = (event) => setFilter(event.target.value);

  const matchingCountries = countries.filter((country) =>
    new RegExp(filter, "i").test(country.name.common)
  );

  console.log(matchingCountries);
  const chooseView = () => {
    if (matchingCountries.length == 1) {
      return <Details country={matchingCountries[0]} />;
    } else if (matchingCountries.length < 1) {
      return <p>No matches</p>;
    } else if (matchingCountries.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    } else {
      return <CountryList countries={matchingCountries} />;
    }
  };

  return (
    <>
      find countries <input onChange={handleChange}></input>
      {chooseView()}
    </>
  );
};

const Details = ({ country }) => (
  <div>
    <h1>{country.name.common}</h1>
    <div>
      {country.capital.length > 1 ? "capitals" : "capital"}:{" "}
      {country.capital.join(", ")}
    </div>
    <div>area: {country.area}</div>

    <h2>languages:</h2>
    <LanguageList country={country} />

    <img
      alt={`The flag of ${country.name.common}`}
      src={country.flags.png}
      height="200"
    />
  </div>
);

const LanguageList = ({ country }) => (
  <ul>
    {Object.values(country.languages).map((lang) => (
      <li key={lang}>{lang}</li>
    ))}
  </ul>
);

const CountryList = ({ countries }) => (
  <ul>
    {countries.map((country) => (
      <li key={country.ccn3}>{country.name.common}</li>
    ))}
  </ul>
);

export default App;
