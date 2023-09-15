import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas'}
  ]) 
  const [newName, setNewName] = useState('')                                // controls Form input element


  const addNumber = (event) => {                                            // function called when the button ADD is pressed
    event.preventDefault()
    setNewName()
    const numberObjet = {
      name: newName,
      id: persons.length +1,
    }
    setPersons(persons.concat(numberObjet))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNumber}>
        <div>
          name: 
            <input />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
    </div>
  )
}

export default App