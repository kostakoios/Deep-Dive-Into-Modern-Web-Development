import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-12435'},
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    setNewNumber(event.target.value)
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
        number: newNumber
      }
      setPersons(persons.concat(addNewName))
    }
    setNewName("")
    setNewNumber("")
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((person, index) => <p key={index}>{person.name} {person.number}</p>)}
        </div>
    </div>
  )
}

export default App