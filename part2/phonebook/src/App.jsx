import { useEffect, useState } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import personService from "./services/persons.js";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const isAdded = (person) => {
    return person.name === newName;
  };

  const addPerson = (event) => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber,
    };

    if (persons.find(isAdded)) {
      // alert(`${newName} is already added to phonebook`);
      // return;
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const updatedPerson = persons.find(isAdded);
        const changedNumber = { ...updatedPerson, number: newNumber };
        personService
          .update(updatedPerson.id, changedNumber)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === updatedPerson.id ? returnedPerson : person
              )
            );
            setNewName("");
            setNewNumber("");
          });
      }
    } else {
      personService.create(personObject).then((returnedPersons) => {
        setPersons(persons.concat(returnedPersons));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilter = (event) => {
    const nameToFilter = event.target.value;
    setFilterName(nameToFilter);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService.deletePerson(id).then(() => {
        setPersons(persons.filter((person) => person.id != id));
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} handleFilter={handleFilter} />
      <h3>add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons
        filterName={filterName}
        persons={persons}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
