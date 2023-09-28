import { useState, useEffect } from 'react'
import axios from 'axios'
import numberService from './services/numbers'
import PersonsForm from './components/PersonsForm'
import FilterForm from './components/FilterForm'
import Display from './components/Display'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')                                // state of the inputted NAME to the Form
  const [newNumber, setNewNumber] = useState('')                            // state of the inputted NUMBER to the Form
  const [filter, setFilter] = useState('') 

  // useEffect(() => {                                                       
  //   axios
  //     .get('http://localhost:3001/persons')
  //     .then(response => {
  //       console.log(response.data)
  //       setPersons(response.data)
  //     })
  // }, [])

  useEffect(() => {                                                       
    numberService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addEntry = (event) => {                                             // function called when the button ADD is pressed
    event.preventDefault()
    const entryObject = {
      name: newName,
      number: newNumber,
      id: Math.max(...persons.map(id => id.id)) +1,
    }
    console.log("id of the newly added entry:", entryObject.id)
    
    const allNames = persons.map(person => person.name)                     // If Else statement for comparing the entered text against the full array of names
    if (allNames.includes(newName)) {                                       
      alert(`${newName} is already added to phonebook`)
    }
    else {setPersons(persons.concat(entryObject))
      numberService                                                           // create service from ./services/numbers.js
        .create(entryObject)
        .then(response => {
          console.log(response.data)
        })
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