const PersonsForm = (props) => {
  return (
    <form onSubmit={props.addEntry}>
      <div>
        name:
        <input value={props.newName} onChange={props.handleFormName} />
      </div>
      <div>
        number:
        <input value={props.newNumber} onChange={props.handleFormNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonsForm;
