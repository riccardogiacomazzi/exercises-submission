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

      return (
        <div>
          <SingleCountryDisplay displayCountry={displayCountry} />
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
