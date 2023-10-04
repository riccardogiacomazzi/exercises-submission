import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/";
// https://studies.cs.helsinki.fi/restcountries/api/all -> all countries
// https://studies.cs.helsinki.fi/restcountries/api/name/NAME -> single country

const getAll = () => {
  return axios.get(baseUrl + "all");
};

const getCountry = (name) => {
  return axios.get(`${baseUrl}name/${name}`);
};

const countriesService = {
  getAll,
  getCountry,
};

export default countriesService;
