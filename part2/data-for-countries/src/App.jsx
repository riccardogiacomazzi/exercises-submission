import { useState, useEffect } from "react";
import "./App.css";
import Display from "./components/Display.jsx";
import FilterForm from "./components/FilterForm";
import countriesService from "./services/countries";

const App = () => {
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState([]);
  const [displayCountry, setDisplayCountry] = useState([]);
  const [buttonShow, setButtonShow] = useState(false);

  const handleFormFilter = (event) => {
    setFilter(event.target.value);
    setButtonShow(false);
  };

  const handleClickCountryShow = (countryButton) => {
    const toDisplay = countries.filter((filter) => filter.name.common.toLowerCase() === countryButton.toLowerCase());
    setDisplayCountry(toDisplay);
    setButtonShow(true);
  };

  useEffect(() => {
    countriesService.getAll().then((response) => {
      setCountries(response.data);
    });
  }, []);

  return (
    <div>
      <FilterForm filter={filter} handleFormFilter={handleFormFilter} />
      <Display
        countries={countries}
        filter={filter}
        displayCountry={displayCountry}
        setDisplayCountry={setDisplayCountry}
        handleClickCountryShow={handleClickCountryShow}
        buttonShow={buttonShow}
        setButtonShow={setButtonShow}
      />
    </div>
  );
};

export default App;
