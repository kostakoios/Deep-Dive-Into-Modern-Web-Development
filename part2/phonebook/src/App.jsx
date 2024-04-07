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
    }).catch(error => console.log(error));
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
      }

      phoneBookService.create(addNewName)
      .then(response => {
        setPersons(persons.concat(response))
        setShowFilterArray(persons.concat(response))
      }).catch(error => console.log(error));
    }
    setNewName("")
    setNewNumber("")
  }

  const deletePerson = (id) => {
    let findPerson = persons.filter(person => person.id === id)
    if(window.confirm(`Delete ${findPerson[0].name}?`)){
      phoneBookService.deletePerson(id)
      .then(response => {
        let newArray = persons.filter(person => {
          if(person.id !== response.id){
            return person
          }
        })
        setPersons(newArray)
        let newFilterArray = newArray.filter(person => person.name.includes(newFilter))
        setShowFilterArray(newFilterArray)
      })  
      .catch(err => console.log(err))
      
    } else {
      console.log("no")
    }
   
    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>

      <h2>Add a new</h2>
      <PersonForm addName={addName} newName={newName} 
          handleNameChange={handleNameChange} newNumber={newNumber} handleNumber={handleNumber} />
      
      <h2>Numbers</h2>
      <Persons showFilterArray={showFilterArray} deletePerson={deletePerson}/>
    </div>
  )
}

export default App