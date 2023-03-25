import { useState } from 'react'
import Filter from './components/Filter';
import Phonebook from './components/Phonebook';
import NewEntry from './components/NewEntry';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456', id: 'Arto Hellas' },
    { name: 'Ada Lovelace', phone: '39-44-5323523', id: 'Ada Lovelace' },
    { name: 'Dan Abramov', phone: '12-43-234345', id: 'Dan Abramov' },
    { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 'Mary Poppendieck' }
  ])

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

    if (persons.find(person => person.name === newName)) {
      alert('You can\'t have two people with the same name dude!');
      return;
    }

    const newPerson = {
      id: newName,
      name: newName,
      phone: newPhone
    }

    setPersons(persons.concat(newPerson));
    setNewName('');
    setNewPhone('');
  }

  return (
    <div> 
      <h2>Phonebook</h2>
      <Filter onFilterChange={handleFilterChange}></Filter>
      <NewEntry nameValue={newName} onNameChange={handleNameChange} phoneValue={newPhone} onPhoneChange ={handlePhoneChange} onSubmit={addContact} ></NewEntry>
      <Phonebook entries={persons.filter(person => {
        if (filter && filter !== '') {
          return person.name.toLowerCase().includes(filter.toLocaleLowerCase());
        }
        return true;
      })}/>
    </div>
  )
}

export default App