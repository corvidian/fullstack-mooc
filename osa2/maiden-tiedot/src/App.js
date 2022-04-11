import { useState, useEffect } from "react";
import axios from "axios";

const api_key = process.env.REACT_APP_API_KEY;

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleChange = (event) => setFilter(event.target.value);

  const changeCountry = (name) => setFilter(name);

  const matchingCountries = countries.filter((country) =>
    new RegExp(filter, "i").test(country.name.common)
  );

  const chooseView = () => {
    if (matchingCountries.length === 1) {
      return <Details country={matchingCountries[0]} />;
    } else if (matchingCountries.length < 1) {
      return <p>No matches</p>;
    } else if (matchingCountries.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    } else {
      return (
        <CountryList
          countries={matchingCountries}
          changeCountry={changeCountry}
        />
      );
    }
  };

  return (
    <>
      find countries <input value={filter} onChange={handleChange} />
      {chooseView()}
    </>
  );
};

const Details = ({ country }) => (
  <div>
    <h1>{country.name.common}</h1>
    <div>
      {country.capital.length > 1 ? "capitals: " : "capital: "}
      {country.capital.join(", ")}
    </div>
    <div>area: {country.area}</div>

    <h2>languages:</h2>
    <LanguageList country={country} />

    <img
      alt={`The flag of ${country.name.common}`}
      src={country.flags.svg}
      height="200"
    />

    <Weather city={country.capital[0]} />
  </div>
);

const Weather = ({ city }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`
      )
      .then((response) => setWeather(response.data));
  }, [city]);

  if (weather) {
    return (
      <>
        <h2>Weather in {city}</h2>
        <p>temperature {weather.main.temp} celcius</p>
        <img
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].main}
        />
        <p>wind {weather.wind.speed} m/s</p>
      </>
    );
  }
};

const LanguageList = ({ country }) => (
  <ul>
    {Object.values(country.languages).map((lang) => (
      <li key={lang}>{lang}</li>
    ))}
  </ul>
);

const CountryList = ({ countries, changeCountry }) => (
  <ul>
    {countries.map((country) => (
      <CountryListItem
        key={country.ccn3}
        country={country}
        changeCountry={changeCountry}
      />
    ))}
  </ul>
);

const CountryListItem = ({ country, changeCountry }) => {
  const name = country.name.common;
  return (
    <li>
      {name} <button onClick={() => changeCountry(name)}>show</button>
    </li>
  );
};

export default App;
