import React from 'react';
import peopleService from './services/people'

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
        peopleService.getAll()
            .then(people => {
                this.setState({ persons: people })
            })
    }

    nameHandler = (event) => this.setState({ newName: event.target.value })
    phoneHandler = (event) => this.setState({ newPhone: event.target.value })
    filterHandler = (event) => this.setState({ filter: event.target.value })

    resetForm = { newName: '', newPhone: '', alerts: [] }

    addPerson = (event) => {
        event.preventDefault()
        const newPerson = { name: this.state.newName, phone: this.state.newPhone }

        const alerts = []

        if (this.state.newName === '') {
            alerts.push('Nimi on tyhjä')
        }
        if (this.state.newPhone === '') {
            alerts.push('Numero on tyhjä')
        }
        const foundPerson = this.state.persons.find(p => p.name === newPerson.name)
        if (alerts.length === 0 && foundPerson) {
            this.updatePerson(foundPerson, newPerson.phone)
        } else if (alerts.length === 0) {
            peopleService.create(newPerson)
                .then(person =>
                    this.setState({ ...this.resetForm, persons: this.state.persons.concat(person) }))
        } else {
            this.setState({ alerts: alerts })
        }
    }

    updatePerson = (person, newNumber) => {
        if (window.confirm(`${person.name} on jo luettelossa, korvataanko vanha numero uudella?`)) {
            peopleService.update({ ...person, phone: newNumber })
                .then(person => {
                    this.setState({ ...this.resetForm, persons: this.state.persons.map(p => p.id === person.id ? person : p) })
                })
        }
    }

    deleteHandler = (person) => {
        return () => {
            if (window.confirm(`Poistetaanko ${person.name}?`)) {
                peopleService.del(person.id)
                    .then(response => { this.componentWillMount() })
            }
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
                <PeopleList people={this.state.persons} filter={this.state.filter} deleteHandler={this.deleteHandler} />
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

const PeopleList = ({ people, filter, deleteHandler }) => {
    const peopleShown = filter.length === 0 ?
        people :
        people.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))

    return (
        <div>
            <h2>Numerot</h2>
            <table><tbody>
                {peopleShown.map(p => <Person key={p.id} person={p} deleteHandler={deleteHandler(p)} />)}
            </tbody></table>
        </div>
    )
}

const Person = ({ person, deleteHandler }) => (
    <tr>
        <td>
            {person.name}
        </td>
        <td>
            {person.phone}
        </td>
        <td>
            <button onClick={deleteHandler}>poista</button>
        </td>
    </tr>
)

export default App