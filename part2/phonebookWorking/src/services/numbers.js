import axios from "axios";

const numberUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(numberUrl)
  }

const create = entryObject => {
  return axios.post(numberUrl, entryObject)
}

const deleteNumber = (id) => {
  return axios.delete(numberUrl+"/"+id)
}

const updateNumber = (idToPutRequest, updatedNumber) => {
  return axios.put(numberUrl+"/"+idToPutRequest, updatedNumber)
}

const numberService ={
  getAll,
  create,
  deleteNumber,
  updateNumber,
}

export default numberService