import React from 'react';
import axios from 'axios';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [],
            newName: '',
            newPhone: '',
            filter: '',
            alerts: []
        }
    }

    componentWillMount = () => {
        axios
            .get("http://localhost:3001/persons")
            .then(response => {
                const people = response.data.map(p => ({ name: p.name, phone: p.number }))
                this.setState({ persons: people })
            })
    }

    nameHandler = (event) => this.setState({ newName: event.target.value })
    phoneHandler = (event) => this.setState({ newPhone: event.target.value })
    filterHandler = (event) => this.setState({ filter: event.target.value })

    addPerson = (event) => {
        event.preventDefault()
        const newPerson = { name: this.state.newName, phone: this.state.newPhone }

        const alerts = []

        if (this.state.persons.some(p => p.name === newPerson.name)) {
            alerts.push('Nimi on jo luettelossa')
        }
        if (this.state.newName === '') {
            alerts.push('Nimi on tyhjä')
        }
        if (this.state.newPhone === '') {
            alerts.push('Numero on tyhjä')
        }
        if (alerts.length === 0) {
            this.setState({
                persons: this.state.persons.concat(newPerson),
                newName: '',
                newPhone: '',
                alerts: []
            })
        } else {
            this.setState({ alerts: alerts })
        }
    }

    render() {
        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <FilterForm filter={this.state.filter} handler={this.filterHandler} />
                <PersonForm
                    alerts={this.state.alerts}
                    newName={this.state.newName}
                    newPhone={this.state.newPhone}
                    nameHandler={this.nameHandler}
                    phoneHandler={this.phoneHandler}
                    formHandler={this.addPerson}
                />
                <PeopleList people={this.state.persons} filter={this.state.filter} />
            </div>
        )
    }
}

const PersonForm = ({ alerts, newName, newPhone, nameHandler, phoneHandler, formHandler }) => (
    <div>
        <h2>Lisää uusi</h2>
        <form onSubmit={formHandler}>
            {alerts.map(a => <p key={a}>{a}</p>)}
            <div>
                nimi: <input value={newName} onChange={nameHandler} />
            </div>
            <div>
                numero: <input value={newPhone} onChange={phoneHandler} />
            </div>
            <div>
                <button type="submit">lisää</button>
            </div>
        </form>
    </div>
)

const FilterForm = ({ filter, handler }) => (
    <div>rajaa näytettäviä<input value={filter} onChange={handler} /></div>
)

const PeopleList = ({ people, filter }) => {
    const peopleShown = filter.length === 0 ?
        people :
        people.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))

    return (
        <div>
            <h2>Numerot</h2>
            <table><tbody>
                {peopleShown.map(p => <Person key={p.name} person={p} />)}
            </tbody></table>
        </div>
    )
}

const Person = ({ person }) => (
    <tr>
        <td>
            {person.name}
        </td>
        <td>
            {person.phone}
        </td>
    </tr>
)

export default App