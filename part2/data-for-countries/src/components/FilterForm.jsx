const FilterForm = ({ filter, handleFormFilter }) => {
  return (
    <div>
      <p>search country:</p>
      <input value={filter} onChange={handleFormFilter}></input>
    </div>
  );
};

export default FilterForm;
