import React from 'react';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [
                { name: 'Arto Hellas', phone: '040-123456' },
                { name: 'Martti Tienari', phone: '040-123456' },
                { name: 'Arto Järvinen', phone: '040-123456' },
                { name: 'Lea Kutvonen', phone: '040-123456' }
            ],
            newName: '',
            newPhone: '',
            filter: '',
            alerts: []
        }
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
        const personsShown = this.state.filter.length === 0 ?
            this.state.persons :
            this.state.persons.filter(p => p.name.toLowerCase().includes(this.state.filter.toLowerCase()))

        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <div>rajaa näytettäviä<input value={this.state.filter} onChange={this.filterHandler} /></div>
                <h2>Lisää uusi</h2>
                <form onSubmit={this.addPerson}>
                    {this.state.alerts.map(a => <p key={a}>{a}</p>)}
                    <div>
                        nimi: <input value={this.state.newName} onChange={this.nameHandler} />
                    </div>
                    <div>
                        numero: <input value={this.state.newPhone} onChange={this.phoneHandler} />
                    </div>
                    <div>
                        <button type="submit">lisää</button>
                    </div>
                </form>
                <h2>Numerot</h2>
                <table><tbody>
                    {personsShown.map(p => <Person key={p.name} person={p} />)}
                </tbody></table>
            </div>
        )
    }
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