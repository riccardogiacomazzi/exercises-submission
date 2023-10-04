import countriesService from "../services/countries";

const Display = ({ countries, filter }) => {
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
      countriesService.getCountry(namedCountries);
      // Only 1 country = display some info
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
