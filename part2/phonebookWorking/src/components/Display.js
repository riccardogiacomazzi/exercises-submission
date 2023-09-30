const Display = (props) => {
  const filteredPersons = props.persons.filter(person => person.name.toLowerCase().includes(props.filter.toLowerCase()))
    return(
      <div>
        {filteredPersons.map(person => 
          <p key={person.id}> 
            {person.name} {person.number}  
            <button onClick={() => props.handleClickDelete(person.id)}>
              delete
            </button>
          </p>)} 
      </div>
    )
}

export default Display