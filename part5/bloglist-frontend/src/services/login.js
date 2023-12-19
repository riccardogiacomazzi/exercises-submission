import axios from "axios";
const baseUrl = "/api/login";

const loginRequest = async (loginCredentials) => {
  const response = await axios.post(baseUrl, loginCredentials);
  return response.data;
};

export default { loginRequest };
