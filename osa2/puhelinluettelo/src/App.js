import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterText, setFilterText] = useState("");

  const addEntry = (event) => {
    event.preventDefault();
    const entry = {
      name: newName,
      number: newNumber,
    };
    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat(entry));
      setNewName("");
      setNewNumber("");
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  const shownEntries =
    !filterText || filterText.length === 0
      ? persons
      : persons.filter((person) =>
          new RegExp(filterText, "i").test(person.name)
        );

  return (
    <>
      <h2>Phonebook</h2>
      <Filter filterText={filterText} handleChange={handleFilterChange} />
      <h3>Add a new entry</h3>
      <PersonForm
        addEntry={addEntry}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Entries shownEntries={shownEntries} />
    </>
  );
};

const Filter = ({ filterText, handleChange }) => (
  <p>
    filter shown with <input value={filterText} onChange={handleChange} />
  </p>
);

const PersonForm = ({
  addEntry,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
}) => (
  <form onSubmit={addEntry}>
    <div>
      name: <input value={newName} onChange={handleNameChange} />
    </div>
    <div>
      number: <input value={newNumber} onChange={handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

const Entries = ({ shownEntries }) =>
  shownEntries.map((entry) => (
    <Entry key={entry.name} name={entry.name} number={entry.number} />
  ));

const Entry = ({ name, number }) => (
  <p>
    {name} {number}
  </p>
);

export default App;
