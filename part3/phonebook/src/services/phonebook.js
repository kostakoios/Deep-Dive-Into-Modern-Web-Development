import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (createObject) => {
    const request = axios.post(baseUrl, createObject)
    return request.then(response => response.data)
}

const updateNumber = (id, newObject) => {
    console.log('updatenumber service id:', id)
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}
export default { getAll, create, updateNumber, deletePerson }