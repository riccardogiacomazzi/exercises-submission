import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([                                  // "Persons Array" -> State containing the names array
    { 
      name: 'Arto Hellas',
      id: 1,
    }
  ]) 
  const [newName, setNewName] = useState('')                                // state of the inputted text to the Form

  const addNumber = (event) => {                                            // function called when the button ADD is pressed
    event.preventDefault()
    const numberObjet = {
      name: newName,
      id: persons.length +1,
    }
    setNewName("")
    const allNames = persons.map(person => person.name)
    if (allNames.includes(newName)) {                                       // If Else statement for comparing the entered text against the full array of names
      alert(`${newName} is already added to phonebook`)
    }
    else {setPersons(persons.concat(numberObjet))}
  }


  const handleFormChange = (event) => {                                     // handle change called when typing in the form                                 
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
       <form onSubmit={addNumber}>
        <div>
          name: 
            <input 
              value={newName}
              onChange={handleFormChange}
            />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
          {persons.map(person => <p key={person.id}> {person.name} </p>)}
    </div>
  )
}

export default App