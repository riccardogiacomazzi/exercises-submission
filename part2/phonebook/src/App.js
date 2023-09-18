import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([                                  // "Persons Array" -> State containing the names array
    { 
      name: 'Arto Hellas',
      number: '',
      id: 1,
    }
  ]) 
  const [newName, setNewName] = useState('')                                // state of the inputted NAME to the Form
  const [newNumber, setNewNumber] = useState('')                            // state of the inputted NUMBER to the Form

  const addEntry = (event) => {                                              // function called when the button ADD is pressed
    event.preventDefault()
    const entryObjet = {
      name: newName,
      number: newNumber,
      id: persons.length +1,
    }
    const allNames = persons.map(person => person.name)                     // If Else statement for comparing the entered text against the full array of names
    if (allNames.includes(newName)) {                                       
      alert(`${newName} is already added to phonebook`)
    }
    else {setPersons(persons.concat(entryObjet))
      setNewName("")
      setNewNumber("")
    }
  }

  const handleFormName = (event) => {                                     // handle change called when typing in the form                                 
    setNewName(event.target.value)
  }

  const handleFormNumber = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
       <form onSubmit={addEntry}>
        <div>
          name: 
            <input 
              value={newName}
              onChange={handleFormName}
            />
        </div>
        <div>
          number:
            <input
              value={newNumber}
              onChange={handleFormNumber}
            />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
          {persons.map(person => <p key={person.id}> {person.name} {person.number} </p>)} 
    </div>
  )
}

export default App