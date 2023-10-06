const SingleCountryDisplay = ({ displayCountry }) => {
  return (
    <div>
      <h1>{displayCountry.map((country) => country.name.common)}</h1>
      <p>Capital: {displayCountry.map((country) => country.capital)}</p>
      <p>Population: {displayCountry.map((country) => country.population)}</p>
      <p>Area: {displayCountry.map((country) => country.area)} Square KM</p>
      <h2>Languages</h2>
      {Object.values(displayCountry[0].languages).map((lang) => (
        <li>{lang}</li>
      ))}
      <h2>Flag</h2>
      <img src={displayCountry.map((flag) => flag.flags.png)} alt={displayCountry.map((flag) => flag.flags.alt)}></img>
    </div>
  );
};

export default SingleCountryDisplay;
