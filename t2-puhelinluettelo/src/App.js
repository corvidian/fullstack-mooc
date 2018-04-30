import React from 'react';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [
                { name: 'Arto Hellas' }
            ],
            newName: ''
        }
    }

    nameHandler = (event) => this.setState({ newName: event.target.value })

    addPerson = (event) => {
        event.preventDefault()
        const newPerson = { name: this.state.newName }

        this.setState({ persons: this.state.persons.concat(newPerson) })
    }

    render() {
        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <form onSubmit={this.addPerson}>
                    <div>
                        nimi: <input value={this.state.newName} onChange={this.nameHandler} />
                    </div>
                    <div>
                        <button type="submit">lisää</button>
                    </div>
                </form>
                <h2>Numerot</h2>
                <table><tbody>
                    {this.state.persons.map(p => <Person key={p.name} person={p} />)}
                </tbody></table>
            </div>
        )
    }
}

const Person = ({ person }) => (
    <tr><td>{person.name}</td></tr>
)

export default App