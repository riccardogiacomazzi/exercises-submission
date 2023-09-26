import axios from "axios";

const numberUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(numberUrl)
}

const create = entryObject => {
  return axios.post(numberUrl, entryObject)
}

const numberService = {
  getAll,
  create
}

export default numberService