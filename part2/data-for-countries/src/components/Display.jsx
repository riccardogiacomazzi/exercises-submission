import { useEffect } from "react";
import countriesService from "../services/countries";
import SingleCountryDisplay from "./SingleCountryDisplay";

const Display = ({ countries, filter, displayCountry, setDisplayCountry }) => {
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  const namedCountries = filteredCountries.map((country) => country.name.common);

  if (filter.length === 0) {
    // 1 IF : if no text is entered in the form -> nothing is rendered
    return null;
  } else {
    // 1 IF : if some text is added -> check if the results are more than 10
    if (namedCountries.length === 1) {
      const toDisplay = namedCountries.join().toLowerCase();

      useEffect(() => {
        // the GET request for the single country to display is only sent once
        countriesService.getCountry(toDisplay).then((response) => {
          const arrayTransform = [];
          arrayTransform.push(response.data);
          setDisplayCountry(arrayTransform);
        });
      }, []);

      const languagesArray = [];
      languagesArray.push(displayCountry.map((languages) => languages.languages).values());
      console.log("lang array;", languagesArray.values());

      return (
        <div>
          <h1>{displayCountry.map((country) => country.name.common)}</h1>
          <p>Capital: {displayCountry.map((country) => country.capital)}</p>
          <p>Population: {displayCountry.map((country) => country.population)}</p>
          <p>Area: {displayCountry.map((country) => country.area)} Square KM</p>
          <h2>Languages</h2>
          {/* <div>{languagesArray.map((country) => country.languages)}</div> */}
          <h2>Flag</h2>
          <img
            src={displayCountry.map((flag) => flag.flags.png)}
            alt={displayCountry.map((flag) => flag.flags.alt)}
          ></img>
        </div>
      );
    } else {
      if (namedCountries.length < 10) {
        // 2 IF : if length of the "namedCountries" array is <= 10: results are rendered
        return (
          <div>
            {filteredCountries.map((country, index) => (
              <p key={index}>{country.name.common}</p>
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
