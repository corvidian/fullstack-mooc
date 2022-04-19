import { useState, useEffect } from "react";
import peopleService from "./services/people";
import Notification from "./components/Notification";
import PersonForm from "./components/PersonForm";
import Entries from "./components/Entries";
import Filter from "./components/Filter";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterText, setFilterText] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    peopleService.list().then((people) => setPersons(people));
  }, []);

  const showNotification = (message) => {
    setNotification({ message, level: "success" });
    setTimeout(() => setNotification(null), 5000);
  };

  const showError = (message) => {
    setNotification({ message, level: "error" });
    setTimeout(() => setNotification(null), 10000);
  };

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
      peopleService
        .create(entry)
        .then((returnedEntry) => {
          setPersons(persons.concat(returnedEntry));
          setNewName("");
          setNewNumber("");
          showNotification(`Added ${returnedEntry.name}`);
        })
        .catch((error) => {
          showError(error.response.data.error);
        });
    }
  };

  const updateEntry = (id, entry) => {
    const message = `${entry.name} is already added to phonebook, do you want to replace the number with a new one?`;
    if (window.confirm(message)) {
      peopleService
        .update(id, entry)
        .then((updatedEntry) => {
          setPersons(
            persons.map((person) =>
              person.id === updatedEntry.id ? updatedEntry : person
            )
          );
          setNewName("");
          setNewNumber("");
          showNotification(`Updated number for ${updatedEntry.name}`);
        })
        .catch((error) => {
          if (error.response.status === 404) {
            showError(
              `Information of ${entry.name} has already been removed from server`
            );
            setPersons(persons.filter((person) => person.id !== id));
          } else if (error.response.status === 400) {
            showError(error.response.data.error);
          } else {
            showError("Update failed");
          }
        });
    }
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      peopleService.delete(id).then((response) => {
        setPersons(persons.filter((person) => person.id !== id));
        showNotification(`Deleted entry for ${name}`);
      });
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
      <Notification notification={notification} />
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

export default App;
