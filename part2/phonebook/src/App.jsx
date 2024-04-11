import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import phoneBookService from './services/phonebook'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showFilterArray, setShowFilterArray] = useState([])
  const [message, setMessage] = useState(null)

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
    const isName = persons.find(person => person.name == newName.trim())
    if (isName) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)){
        console.log('newNumber: ', newNumber)
        let changeNumberOfPerson = {...isName, number: newNumber}
        console.log("isName", isName)
        phoneBookService
        .updateNumber(isName.id, changeNumberOfPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== isName.id ? person : returnedPerson))
          setMessage(`${returnedPerson.name} number is updated`) 
        })
        .catch(err => {
          console.log(err)
          throw new Error(err)
        })
      } else {
        console.log("don't replace old number");
      }
    } else {
      const addNewName = {
        name: newName,
        number: newNumber,
      }

      phoneBookService.create(addNewName)
      .then(response => {
        setPersons(persons.concat(response))
        setShowFilterArray(persons.concat(response))
        setMessage(`Added ${response.name}`)
      }).catch(error => console.log(error));
    }
    setTimeout(() => {
      setMessage(null)
    }, 1000);
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
      <Notification message={message}/>
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