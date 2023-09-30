import { useState, useEffect } from 'react'
import numberService from './services/numbers'
import PersonsForm from './components/PersonsForm'
import FilterForm from './components/FilterForm'
import Display from './components/Display'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')                                // state of the inputted NAME to the Form
  const [newNumber, setNewNumber] = useState('')                            // state of the inputted NUMBER to the Form
  const [filter, setFilter] = useState('') 

  useEffect(() => {                                                       
    numberService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addEntry = (event) => {                                             // function called when the button ADD is pressed
    event.preventDefault()
        
    const allNames = persons.map(person => person.name)                     // If Else statement for comparing the entered text against the full array of names

    if (allNames.includes(newName)) {                                       
      if (window.confirm(`${newName} is already added to phonebook, do you want to update their number?`)) {
        const idToUpdate = persons.filter((name) => name.name === newName)
        const idToPutRequest = idToUpdate.map((id) => id.id)
  
        const updatedNumber = {
          name: newName,
          number: newNumber,
          id: idToPutRequest
        }

        numberService
          .updateNumber(idToPutRequest, updatedNumber)
        numberService
          .getAll().then(response => setPersons(response.data))
        setNewName("")
        setNewNumber("")
        
        
      } else
      {
        setPersons(persons)
      }
    } else 
    {
      const entryObject = {
        name: newName,
        number: newNumber,
        id: Math.max(...persons.map(id => id.id)) +1,
      }
      numberService.create(entryObject)
      numberService.getAll().then(response=> setPersons(response.data))
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

  const handleClickDelete = (id) => {
    const toDeleteName = persons.filter((index) => index.id === id)
    if (window.confirm(`Do you want to delete ${toDeleteName.map((index) => index.name)}?`)) {
        numberService
          .deleteNumber(id)
          setPersons(persons.filter(function(deletedId) {return deletedId.id !== id;} ))
        numberService
          .getAll().then(response => {
          })
    } else {}                                                                                //If window.confirm is not "Ok", then nothing is done
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
          handleClickDelete={handleClickDelete}
        />
    </div>
  )
}

export default App