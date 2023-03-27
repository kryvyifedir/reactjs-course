import { useState, useEffect } from 'react'
import dataservice from './services/dataservice'
import Filter from './components/Filter';
import Phonebook from './components/Phonebook';
import NewEntry from './components/NewEntry';
import Notifications from './components/Notifications';

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    dataservice.getAll()
      .then(response => setPersons(response))
      .catch(error => {
        console.log(JSON.stringify(error))
        setMessageStyle('error');
        setMessage(
          `Unable to get Phonebook entries from json-server`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      });
  }, [])

  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState('');
  const [messageStyle, setMessageStyle] = useState('');

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const showMessage = (message, style) => {
    setMessageStyle(style);
    setMessage(message);
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const addContact = (event) => {
    event.preventDefault()
    if (newName === "") {
      return;
    }

    const existingPerson = persons.find(person => person.name === newName);
    if (existingPerson) {
      if (!window.confirm('Do you want to replace phone number for user ' + existingPerson.name + '?')) {
        showMessage("You can't have two people with the same name, dude!", "error")
        return;
      }
    }

    const newPerson = {
      id: existingPerson ? existingPerson.id : newName,
      name: newName,
      phone: newPhone
    }

    if (existingPerson) {
      dataservice.update(existingPerson.id, newPerson)
        .then(() => {
          setPersons(persons.map(person => {
            if (person.id === existingPerson.id) {
              return newPerson;
            }
            return person;
          }));
          showMessage('Phone number was updated', 'success');
        })
        .catch(showMessage('Unable to update persons number', 'error'));
    } else {
      dataservice.create(newPerson)
        .then(() => {
          setPersons(persons.concat(newPerson));
          showMessage('New person was created', 'success');
        })
        .catch(showMessage('Unable to create new Person', 'success'));
    }

    setNewName('');
    setNewPhone('');
  }

  const removeEntry = (id) => {
    if (window.confirm("Do you really want to delete this record?")) {
      dataservice.remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
          showMessage('Person was deleted', 'success');
        })
        .catch(() => {
          showMessage("Can't remove person from DB", 'error');
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notifications message={message} className={messageStyle}/>
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