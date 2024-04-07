import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showFilterArray, setShowFilterArray] = useState(persons)

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
      setShowFilterArray(response.data)
    })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    let filterValue = event.target.value;
    setNewFilter(filterValue)
    let newArray = persons.filter(person => {
      return person.name.includes(filterValue)
    })
    setShowFilterArray(newArray)
  }

  const addName = (event) => {
    event.preventDefault()
    // check if newName is already exist in persons array
    const isName = persons.find(person => person.name == newName)
    if (isName) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const addNewName = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      setPersons(persons.concat(addNewName))
      setShowFilterArray(persons.concat(addNewName))
    }
    setNewName("")
    setNewNumber("")
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>

      <h2>Add a new</h2>
      <PersonForm addName={addName} newName={newName} 
          handleNameChange={handleNameChange} newNumber={newNumber} handleNumber={handleNumber} />
      
      <h2>Numbers</h2>
      <Persons showFilterArray={showFilterArray} />
    </div>
  )
}

export default App