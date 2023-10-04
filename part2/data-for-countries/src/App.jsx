import { useState, useEffect } from "react";
import "./App.css";
import Display from "./components/Display";
import FilterForm from "./components/FilterForm";
import countriesService from "./services/countries";

const App = () => {
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState([]);

  const handleFormFilter = (event) => {
    setFilter(event.target.value);
  };

  useEffect(() => {
    countriesService.getAll().then((response) => {
      setCountries(response.data);
    });
  }, []);

  return (
    <div>
      <FilterForm filter={filter} handleFormFilter={handleFormFilter} />
      <Display countries={countries} filter={filter} />
    </div>
  );
};

export default App;
