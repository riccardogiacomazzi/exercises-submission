const SingleCountryDisplay = (displayCountry) => {
  return (
    <div>
      <h1>{displayCountry.map((country) => country.name.common)}</h1>
    </div>
  );
};

export default SingleCountryDisplay;
