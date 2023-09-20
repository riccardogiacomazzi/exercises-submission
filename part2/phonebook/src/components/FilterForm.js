const FilterForm = (props) => {
  return(
    <div>
      filter for:
        <input 
          value={props.filter}
          onChange={props.handleFormFilter}
        />
    </div>
  )
}

export default FilterForm