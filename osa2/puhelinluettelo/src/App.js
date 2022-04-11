import { useState, useEffect } from "react";
import peopleService from "./services/people";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    peopleService.list().then((people) => setPersons(people));
  }, []);

  const addEntry = (event) => {
    event.preventDefault();
    const entry = {
      name: newName,
      number: newNumber,
    };
    const oldEntry = persons.find((person) => person.name === newName);
    if (oldEntry) {
      updateEntry(oldEntry.id, entry);
    } else {
      peopleService.create(entry).then((returnedEntry) => {
        setPersons(persons.concat(returnedEntry));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const updateEntry = (id, entry) => {
    const message = `${entry.name} is already added to phonebook, do you want to replace the number with a new one?`;
    if (window.confirm(message)) {
      peopleService
        .update(id, entry)
        .then((updatedEntry) =>
          setPersons(
            persons.map((person) =>
              person.id === updatedEntry.id ? updatedEntry : person
            )
          )
        );
    }
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      peopleService
        .delete(id)
        .then((response) =>
          setPersons(persons.filter((person) => person.id !== id))
        );
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
      <Entries shownEntries={shownEntries} handleDelete={handleDelete} />
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

const Entries = ({ shownEntries, handleDelete }) =>
  shownEntries.map((entry) => (
    <Entry key={entry.id} entry={entry} handleDelete={handleDelete} />
  ));

const Entry = ({ entry: { name, number, id }, handleDelete }) => (
  <p>
    {name} {number}{" "}
    <button onClick={() => handleDelete(id, name)}>delete</button>
  </p>
);

export default App;
