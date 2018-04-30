import React from 'react';
import axios from 'axios';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            countries: [],
            filter: ''
        }
    }

    componentWillMount = () => {
        axios
            .get("https://restcountries.eu/rest/v2/all")
            .then(response => {
                this.setState({ countries: response.data })
            })
    }

    filterHandler = (event) => this.setState({ filter: event.target.value })

    render() {
        const matchingCountries = this.state.countries.filter(c => c.name.toLowerCase().includes(this.state.filter.toLowerCase()))

        console.log("matching countries", matchingCountries)

        return (
            <div>
                <FilterForm filter={this.state.filter} handler={this.filterHandler} />
                {matchingCountries.length > 10 ?
                    <p>too many matches, specify another filter</p> :
                    matchingCountries.length > 1 ?
                        <CountryList countries={matchingCountries} /> :
                        matchingCountries.length > 0 ?
                            <CountryInfo country={matchingCountries[0]} /> :
                            <p>No matches</p>
                }
            </div>
        )
    }
}

const FilterForm = ({ filter, handler }) => (
    <div>find countries: <input value={filter} onChange={handler} /></div>
)

const CountryList = ({ countries }) => (
    <ul>
        {countries.map(c =>
            <li key={c.alpha3Code}>{c.name}</li>
        )}
    </ul>
)

const CountryInfo = ({ country }) => (
    <div>
        <h2>{country.name}</h2>
        <p>capital: {country.capital}</p>
        <p>population: {country.population}</p>
        <img src={country.flag} width="500" />
    </div>
)

export default App