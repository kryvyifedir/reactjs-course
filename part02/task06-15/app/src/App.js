import { useState, useEffect } from 'react'
import dataservice from './services/dataservice'
import Filter from './components/Filter';
import Phonebook from './components/Phonebook';
import NewEntry from './components/NewEntry';

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    dataservice.getAll().then(response => setPersons(response));
  }, [])

  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [filter, setFilter] = useState('');

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const addContact = (event) => {
    event.preventDefault()
    if (newName === "") {
      return;
    }

    const existingPerson = persons.find(person => person.name === newName);
    if (existingPerson) {
      if (!window.confirm('Do you want to replace phone number for user ' + existingPerson.name + '?')) {
        alert('You can\'t have two people with the same name dude!');
        return;
      }
    }

    const newPerson = {
      id: existingPerson ? newName : existingPerson.id,
      name: newName,
      phone: newPhone
    }

    if (existingPerson) {
      dataservice.update(existingPerson.id, newPerson)
        .then(
          setPersons(persons.map(person => {
            if (person.id === existingPerson.id) {
              return newPerson;
            }
            return person;
          }))
        );
    } else {
      dataservice.create(newPerson).then(setPersons(persons.concat(newPerson)));
    }

    setNewName('');
    setNewPhone('');
  }

  const removeEntry = (id) => {
    if (window.confirm("Do you really want to delete this record?")) {
      return dataservice.remove(id).then(setPersons(persons.filter(person => person.id !== id)));
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onFilterChange={handleFilterChange}></Filter>
      <NewEntry nameValue={newName} onNameChange={handleNameChange} phoneValue={newPhone} onPhoneChange={handlePhoneChange} onSubmit={addContact} ></NewEntry>
      <Phonebook entries={persons.filter(person => {
        if (filter && filter !== '') {
          return person.name.toLowerCase().includes(filter.toLocaleLowerCase());
        }
        return true;
      })} removeFunction={removeEntry} />
    </div>
  )
}

export default App