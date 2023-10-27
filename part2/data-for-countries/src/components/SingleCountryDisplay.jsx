import { useEffect, useState } from "react";
import weatherService from "../services/weather";
import WeatherCode from "./WeatherCode";

const SingleCountryDisplay = ({ displayCountry, currentWeather, setCurrentWeather }) => {
  // const [currentWeather, setCurrentWeather] = useState({
  //   temperature: "",
  //   windspeed: "",
  //   weathercode: "",
  // });

  const latitude = displayCountry.map((country) => country.latlng[0]).toString();
  const longitude = displayCountry.map((country) => country.latlng[1]).toString();

  useEffect(() => {
    weatherService.getWeather(latitude, longitude).then((response) => {
      setCurrentWeather({
        temperature: response.data?.current_weather?.temperature,
        windspeed: response.data?.current_weather?.windspeed,
        weathercode: response.data?.current_weather?.weathercode,
      });
    });
  }, [displayCountry]);

  if (displayCountry.length === 0) {
    null;
  } else {
    return (
      <div>
        <h1>{displayCountry.map((country) => country.name.common)}</h1>
        <p>
          Capital:
          {Object.values(displayCountry[0].capital).map((country, id) => (
            <li key={id}>{country}</li>
          ))}
        </p>
        <p>Population: {displayCountry.map((country) => country.population)}</p>
        <p>Area: {displayCountry.map((country) => country.area)} Square KM</p>
        <h2>Languages</h2>

        {Object.values(displayCountry[0].languages).map((lang, id) => (
          <li key={id}>{lang}</li>
        ))}

        <h2>Flag</h2>
        <img
          src={displayCountry.map((flag) => flag.flags.png)}
          alt={displayCountry.map((flag) => flag.flags.alt)}
        ></img>
        <h2>Weather in {displayCountry.map((country) => country.capital)} </h2>
        <p>Temperature: {currentWeather.temperature}° Celsius</p>
        <p>Windspeed: {currentWeather.windspeed} Km/h</p>
        <WeatherCode id={currentWeather.weathercode} />
      </div>
    );
  }
};

export default SingleCountryDisplay;
