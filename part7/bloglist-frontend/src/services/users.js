import axios from "axios";

const baseUrl = "/api/users";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
  console.log('token must token now into the: ', token)
};


const getAllusers = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getUserData = async (id) => {
  const config = {
     headers: { Authorization: token },
   };
   console.log('token must config: ', token)
   const response = await axios.get(`${baseUrl}/${id}`, config)
   console.log('respjonsnlsnkdsfsdf as: ', response.data)
   return response.data;
}

export default { getAllusers, getUserData, setToken };
