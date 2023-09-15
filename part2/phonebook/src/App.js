import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([                                  // State containing the names array
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
    setPersons(persons.concat(numberObjet))
  }

  const handleFormChange = (event) => {                                     
    // console.log(event.target.value)
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