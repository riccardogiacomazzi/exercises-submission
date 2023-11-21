import axios from "axios";
const baseUrl = "http://localhost:3001/api/persons";

const getAll = () => {
  return axios.get(baseUrl);
};

const create = (newObject) => {
  return axios.post(baseUrl, newObject);
};

const deleteNumber = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const updateNumber = (id, entryObject) => {
  return axios.put(`${baseUrl}/${id}`, entryObject);
};

const numberService = {
  getAll,
  create,
  deleteNumber,
  updateNumber,
};

export default numberService;
