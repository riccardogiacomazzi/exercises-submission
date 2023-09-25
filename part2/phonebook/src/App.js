import { useState, useEffect } from 'react'
import axios from 'axios'
import PersonsForm from './components/PersonsForm'
import FilterForm from './components/FilterForm'
import Display from './components/Display'

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {                                                       
  axios
    .get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    })
}, [])



  const [newName, setNewName] = useState('')                                // state of the inputted NAME to the Form
  const [newNumber, setNewNumber] = useState('')                            // state of the inputted NUMBER to the Form
  const [filter, setFilter] = useState('')                                  // state of the inputted text to FILTER 

  const addEntry = (event) => {                                             // function called when the button ADD is pressed
    event.preventDefault()
    const entryObject = {
      name: newName,
      number: newNumber,
      id: persons.length +1,
    }
    const allNames = persons.map(person => person.name)                     // If Else statement for comparing the entered text against the full array of names
    if (allNames.includes(newName)) {                                       
      alert(`${newName} is already added to phonebook`)
    }
    else {setPersons(persons.concat(entryObject))
      setNewName("")
      setNewNumber("")
    }
  }

  const handleFormName = (event) => {                                                                      
    setNewName(event.target.value)
  }

  const handleFormNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFormFilter = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
        <FilterForm
           filter={filter}
           handleFormFilter={handleFormFilter}
        />
        <PersonsForm 
          addEntry={addEntry} 
          newName={newName}
          newNumber={newNumber}
          handleFormName={handleFormName}
          handleFormNumber={handleFormNumber}
        />
      <h2>Numbers</h2>
        <Display 
          persons={persons}
          filter={filter}
        />

    </div>
    
  )
}

export default App