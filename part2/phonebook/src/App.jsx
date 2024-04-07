import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import phoneBookService from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showFilterArray, setShowFilterArray] = useState([])

  useEffect(() => {
    phoneBookService.getAll()
    .then(response => {
      console.log(response)
      setPersons(response)
      setShowFilterArray(response)
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
    let newArray = persons.filter(person => person.name.includes(filterValue))
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

      phoneBookService.create(addNewName)
      .then(response => {
        setPersons(persons.concat(response))
        setShowFilterArray(persons.concat(response))
      })
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