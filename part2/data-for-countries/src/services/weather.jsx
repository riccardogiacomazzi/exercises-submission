import axios from "axios";

const getWeather = (latitude, longitude) => {
  return axios.get(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,weathercode,windspeed_10m&current_weather=true`
  );
};

const weatherService = {
  getWeather,
};
export default weatherService;
