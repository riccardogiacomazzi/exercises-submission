import { useState, useEffect } from "react";
import countriesService from "../services/countries";
import SingleCountryDisplay from "./SingleCountryDisplay";

const Display = ({ countries, filter, displayCountry, setDisplayCountry, buttonShow, handleClickCountryShow }) => {
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  const namedCountries = filteredCountries.map((country) => country.name.common);
  const toDisplay = namedCountries.join().toLowerCase();
  const [currentWeather, setCurrentWeather] = useState({
    temperature: "",
    windspeed: "",
    weathercode: "",
  });

  const [getRequest, setGetRequest] = useState(false);

  useEffect(() => {
    // When the filter state changes, useEffect checks if the resulting countries are 1, if so, the GET request grab the data for the country to display
    if (namedCountries.length === 1) {
      countriesService.getCountry(toDisplay).then((response) => {
        const arrayTransform = [];
        arrayTransform.push(response.data);
        setDisplayCountry(arrayTransform);
      });
    }
  }, [filter]);

  if (buttonShow === true) {
    return (
      <div>
        <SingleCountryDisplay
          displayCountry={displayCountry}
          currentWeather={currentWeather}
          setCurrentWeather={setCurrentWeather}
        />
      </div>
    );
  }
  if (filter.length === 0) {
    // 1 IF : if no text is entered in the form -> nothing is rendered
    return null;
  } else {
    // 1 IF : if some text is added -> check if the results are more than 10
    if (namedCountries.length === 1) {
      // countriesService.getCountry(toDisplay).then((response) => {
      //   const arrayTransform = [];
      //   arrayTransform.push(response.data);
      //   setDisplayCountry(arrayTransform);
      // });

      return (
        <div>
          <SingleCountryDisplay
            displayCountry={displayCountry}
            currentWeather={currentWeather}
            setCurrentWeather={setCurrentWeather}
          />
        </div>
      );
    } else {
      if (namedCountries.length < 10) {
        // 2 IF : if length of the "namedCountries" array is <= 10: results are rendered
        return (
          <div>
            {filteredCountries.map((country, index) => (
              <p key={index}>
                {country.name.common}
                <button onClick={() => handleClickCountryShow(country.name.common)}>show</button>
              </p>
            ))}
          </div>
        );
      } else {
        // 2 IF : if the results are more than 10: error
        return (
          <div>
            <p>Too many results. Please narrow your research</p>
          </div>
        );
      }
    }
  }
};

export default Display;
