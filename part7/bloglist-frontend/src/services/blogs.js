import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
  console.log('token must token: ', token)
};

console.log('token must be token: ', token)

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  console.log('token must token inside create: ', token)

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (id, newObject) => {
  console.log('token inside update service: ', token)
  
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(`${baseUrl}/${id}`, newObject, config);
  return response.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  await axios.delete(`${baseUrl}/${id}`, config);
};

const getBlogData = async (id) => {
  const config = {
     headers: { Authorization: token },
   };
   console.log('token must config: ', token)
   const response = await axios.get(`${baseUrl}/${id}`, config)
   console.log('respjonsnlsnkdsfsdf as: ', response.data)
   return response.data;
}

export default { getAll, create, setToken, update, deleteBlog, getBlogData };
