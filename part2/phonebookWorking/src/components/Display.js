const Display = (props) => {
  const filteredPersons = props.persons.filter(person => person.name.toLowerCase().includes(props.filter.toLowerCase()))
    return(
      <div>
        
          {filteredPersons.map(person => <p key={person.id}> {person.id} {person.name} {person.number} </p>)} 
        
      </div>
    )
}

export default Display